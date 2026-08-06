"use client";

import { useActionState } from "react";
import { updatePopupSettings, type PopupActionState } from "@/actions/admin-popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PopupSettings = {
  id: string;
  enabled: boolean;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
  secondaryText: string | null;
  secondaryUrl: string | null;
  backgroundStyle: string;
  startDate: Date | null;
  endDate: Date | null;
  targetAccount: string;
  newVisitorsOnly: boolean;
  loggedInOnly: boolean;
  displayDelay: number;
  showOnceSession: boolean;
  showOnceUser: boolean;
  showMobile: boolean;
  showDesktop: boolean;
};

function formatDateInput(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 16);
}

function CheckboxField({
  name,
  label,
  defaultChecked,
  description,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
  description?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 rounded border-gray-300"
      />
      <span>
        <span className="text-sm font-medium text-gray-900">{label}</span>
        {description && <span className="block text-xs text-gray-500 mt-0.5">{description}</span>}
      </span>
    </label>
  );
}

export function PopupSettingsForm({ settings }: { settings: PopupSettings }) {
  const [state, formAction, pending] = useActionState<PopupActionState, FormData>(
    updatePopupSettings,
    null
  );

  return (
    <form action={formAction} className="space-y-8">
      {state && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <section className="space-y-4">
        <h2 className="font-semibold text-gray-900">General</h2>
        <CheckboxField
          name="enabled"
          label="Enable promotional popup"
          defaultChecked={settings.enabled}
          description="When enabled, the popup appears on the public site based on the rules below."
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-gray-900">Content</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={settings.title ?? ""} placeholder="Summer Sale" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={settings.description ?? ""}
              placeholder="Get 20% off your first print order this month."
              rows={3}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={settings.imageUrl ?? ""}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonText">Primary button text</Label>
            <Input id="buttonText" name="buttonText" defaultValue={settings.buttonText ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonUrl">Primary button URL</Label>
            <Input id="buttonUrl" name="buttonUrl" defaultValue={settings.buttonUrl ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryText">Secondary button text</Label>
            <Input id="secondaryText" name="secondaryText" defaultValue={settings.secondaryText ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryUrl">Secondary button URL</Label>
            <Input id="secondaryUrl" name="secondaryUrl" defaultValue={settings.secondaryUrl ?? ""} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-gray-900">Display rules</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="displayDelay">Display delay (seconds)</Label>
            <Input
              id="displayDelay"
              name="displayDelay"
              type="number"
              min={0}
              defaultValue={settings.displayDelay}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="backgroundStyle">Background style</Label>
            <select
              id="backgroundStyle"
              name="backgroundStyle"
              defaultValue={settings.backgroundStyle}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="datetime-local"
              defaultValue={formatDateInput(settings.startDate)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="datetime-local"
              defaultValue={formatDateInput(settings.endDate)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetAccount">Target audience</Label>
            <select
              id="targetAccount"
              name="targetAccount"
              defaultValue={settings.targetAccount}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All visitors</option>
              <option value="guests">Guests only</option>
              <option value="logged_in">Logged-in users only</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <CheckboxField name="showMobile" label="Show on mobile" defaultChecked={settings.showMobile} />
          <CheckboxField name="showDesktop" label="Show on desktop" defaultChecked={settings.showDesktop} />
          <CheckboxField
            name="showOnceSession"
            label="Show once per session"
            defaultChecked={settings.showOnceSession}
          />
          <CheckboxField name="showOnceUser" label="Show once per user" defaultChecked={settings.showOnceUser} />
          <CheckboxField
            name="newVisitorsOnly"
            label="New visitors only"
            defaultChecked={settings.newVisitorsOnly}
          />
          <CheckboxField name="loggedInOnly" label="Logged-in users only" defaultChecked={settings.loggedInOnly} />
        </div>
      </section>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={pending} className="bg-brand hover:opacity-90 text-white">
          {pending ? "Saving..." : "Save popup settings"}
        </Button>
      </div>
    </form>
  );
}
