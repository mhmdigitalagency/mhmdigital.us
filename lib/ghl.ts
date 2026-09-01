/**
 * GoHighLevel (LeadConnector) integration for syncing website form submissions.
 *
 * Supports:
 * 1. Inbound webhooks (map fields in GHL workflows)
 * 2. Contacts API upsert + note (when API key + location ID are set)
 *
 * Form submissions still succeed if GHL sync fails — errors are logged only.
 */

const GHL_API_BASE = "https://services.leadconnectorhq.com";

export type GhlFormSource =
  | "contact-form"
  | "website-quote"
  | "print-bulk"
  | "print-order"
  | "checkout-order";

export type GhlLeadPayload = {
  source: GhlFormSource | string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message?: string | null;
  budget?: string | null;
  timeline?: string | null;
  tags?: string[];
  metadata?: Record<string, string | number | boolean | null | undefined>;
};

type GhlSyncResult = {
  synced: boolean;
  webhook?: boolean;
  api?: boolean;
  contactId?: string;
  error?: string;
};

function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function resolveWebhookUrl(source: string): string | undefined {
  const generic = process.env.GHL_WEBHOOK_URL?.trim();
  const bySource: Record<string, string | undefined> = {
    "contact-form": process.env.GHL_WEBHOOK_CONTACT?.trim(),
    "website-quote": process.env.GHL_WEBHOOK_QUOTE?.trim(),
    "print-bulk": process.env.GHL_WEBHOOK_QUOTE?.trim(),
    "print-order": process.env.GHL_WEBHOOK_PRINT?.trim(),
    "checkout-order": process.env.GHL_WEBHOOK_CHECKOUT?.trim(),
  };

  return bySource[source] || generic;
}

function buildWebhookBody(payload: GhlLeadPayload) {
  const { firstName, lastName } = splitName(payload.name);
  const tags = [...new Set([payload.source, ...(payload.tags ?? [])])];

  return {
    firstName,
    lastName,
    name: payload.name,
    email: payload.email,
    phone: payload.phone ?? "",
    company: payload.company ?? "",
    companyName: payload.company ?? "",
    service: payload.service ?? "",
    message: payload.message ?? "",
    budget: payload.budget ?? "",
    timeline: payload.timeline ?? "",
    source: payload.source,
    tags,
    ...payload.metadata,
  };
}

function buildNoteBody(payload: GhlLeadPayload): string {
  const lines = [
    `Source: ${payload.source}`,
    payload.service ? `Service: ${payload.service}` : null,
    payload.company ? `Company: ${payload.company}` : null,
    payload.budget ? `Budget: ${payload.budget}` : null,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    payload.message ? `\nMessage:\n${payload.message}` : null,
  ].filter(Boolean);

  if (payload.metadata && Object.keys(payload.metadata).length > 0) {
    lines.push("\nAdditional details:");
    for (const [key, value] of Object.entries(payload.metadata)) {
      if (value !== null && value !== undefined && value !== "") {
        lines.push(`${key}: ${value}`);
      }
    }
  }

  return lines.join("\n");
}

async function postWebhook(url: string, body: Record<string, unknown>): Promise<boolean> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`GHL webhook failed (${response.status}): ${text.slice(0, 200)}`);
  }

  return true;
}

async function upsertContact(payload: GhlLeadPayload): Promise<string | undefined> {
  const apiKey = process.env.GHL_API_KEY?.trim();
  const locationId = process.env.GHL_LOCATION_ID?.trim();

  if (!apiKey || !locationId) {
    return undefined;
  }

  const { firstName, lastName } = splitName(payload.name);
  const tags = [...new Set([payload.source, ...(payload.tags ?? [])])];

  const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId,
      firstName,
      lastName,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || undefined,
      companyName: payload.company || undefined,
      source: payload.source,
      tags,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`GHL contact upsert failed (${response.status}): ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as { contact?: { id?: string }; id?: string };
  return data.contact?.id ?? data.id;
}

async function addContactNote(contactId: string, body: string): Promise<void> {
  const apiKey = process.env.GHL_API_KEY?.trim();

  if (!apiKey || !body.trim()) {
    return;
  }

  const response = await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`GHL note creation failed (${response.status}): ${text.slice(0, 200)}`);
  }
}

export function isGhlConfigured(): boolean {
  return Boolean(
    process.env.GHL_WEBHOOK_URL?.trim() ||
      process.env.GHL_WEBHOOK_CONTACT?.trim() ||
      process.env.GHL_WEBHOOK_QUOTE?.trim() ||
      process.env.GHL_WEBHOOK_PRINT?.trim() ||
      process.env.GHL_WEBHOOK_CHECKOUT?.trim() ||
      (process.env.GHL_API_KEY?.trim() && process.env.GHL_LOCATION_ID?.trim())
  );
}

/**
 * Sync a lead to GoHighLevel. Never throws — logs errors and returns status.
 */
export async function syncLeadToGhl(payload: GhlLeadPayload): Promise<GhlSyncResult> {
  if (!isGhlConfigured()) {
    return { synced: false, error: "GHL not configured" };
  }

  const result: GhlSyncResult = { synced: false };
  const webhookUrl = resolveWebhookUrl(payload.source);

  try {
    if (webhookUrl) {
      await postWebhook(webhookUrl, buildWebhookBody(payload));
      result.webhook = true;
      result.synced = true;
    }

    const contactId = await upsertContact(payload);
    if (contactId) {
      result.api = true;
      result.synced = true;
      result.contactId = contactId;

      const note = buildNoteBody(payload);
      if (note.trim()) {
        await addContactNote(contactId, note);
      }
    }
  } catch (error) {
    console.error("[GHL sync]", payload.source, error);
    result.error = error instanceof Error ? error.message : "Unknown GHL sync error";
  }

  return result;
}
