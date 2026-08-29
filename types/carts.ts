export type BillingCycle = "ONE_TIME" | "MONTHLY" | "YEARLY";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface SubService {
  id: string;
  name: string;
  description: string;
}

export interface Package {
  id: string;
  slug?: string;
  serviceId: string | null;
  subServiceId?: string | null;
  name: string;
  priceByYear: number | null;
  priceByMonth: number | null;
  price: number | null;
  description: string;
  points: string[];
  image?: string | null;
  pricingType?: "ONE_TIME" | "MONTHLY_YEARLY";
  service?: {
    id: string;
    name: string;
    description: string;
    icon: string;
  } | null;
  subService?: {
    id: string;
    name: string;
    description: string;
  } | null;
}

export interface CartItem {
  packageId: string;
  quantity: number;
  packageDuration: BillingCycle;
  package: Package;
}

export interface Carts {
  items: CartItem[];
}