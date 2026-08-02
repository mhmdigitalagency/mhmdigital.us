import Link from "next/link";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/print-services", label: "Print Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/packages", label: "Packages" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/contact", label: "Contact" },
  { href: "/appointment", label: "Book a Consultation" },
  { href: "/faq", label: "FAQ" },
  { href: "/process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/connexion", label: "Login" },
  { href: "/inscription", label: "Register" },
];

export default function SitemapPage() {
  return (
    <div className="px-4 py-16 xl:px-14 xxl:px-40 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      <ul className="space-y-2">
        {PAGES.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="text-red-500 hover:underline font-medium">
              {p.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
