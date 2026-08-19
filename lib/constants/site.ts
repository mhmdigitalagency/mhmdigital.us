export const OFFICE_ADDRESS = {
  name: "Share Space MADDA WALABU",
  street: "9040 Rainier Ave S #2",
  city: "Seattle",
  state: "WA",
  postalCode: "98118",
  country: "US",
} as const;

export const OFFICE_ADDRESS_LINES = [
  OFFICE_ADDRESS.name,
  `${OFFICE_ADDRESS.street}, ${OFFICE_ADDRESS.city}, ${OFFICE_ADDRESS.state} ${OFFICE_ADDRESS.postalCode}`,
] as const;

export const OFFICE_ADDRESS_FULL = OFFICE_ADDRESS_LINES.join(" · ");

export const CONTACT_EMAIL = "contact@mhmdigital.us";
export const CONTACT_PHONE = "+1 206-312-3762";
