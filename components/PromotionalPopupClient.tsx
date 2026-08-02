"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

type PopupSettings = {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
  secondaryText: string | null;
  secondaryUrl: string | null;
  displayDelay: number;
  showOnceSession: boolean;
  showOnceUser: boolean;
  showMobile: boolean;
  showDesktop: boolean;
  startDate: Date | null;
  endDate: Date | null;
};

const SESSION_KEY = "mhm_popup_dismissed";

export function PromotionalPopupClient({ settings }: { settings: PopupSettings }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;
    if (isMobile && !settings.showMobile) return;
    if (!isMobile && !settings.showDesktop) return;

    const now = new Date();
    if (settings.startDate && now < new Date(settings.startDate)) return;
    if (settings.endDate && now > new Date(settings.endDate)) return;

    if (settings.showOnceSession && sessionStorage.getItem(SESSION_KEY)) return;
    if (settings.showOnceUser && localStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => setVisible(true), (settings.displayDelay || 3) * 1000);
    return () => clearTimeout(timer);
  }, [settings]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
    if (settings.showOnceUser) localStorage.setItem(SESSION_KEY, "1");
  };

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className="relative max-w-md w-full rounded-2xl bg-white shadow-2xl overflow-hidden">
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        {settings.imageUrl && (
          <div className="relative h-40 w-full">
            <Image src={settings.imageUrl} alt="" fill className="object-cover" />
          </div>
        )}

        <div className="p-6">
          {settings.title && (
            <h2 id="popup-title" className="text-xl font-bold text-gray-900 mb-2">
              {settings.title}
            </h2>
          )}
          {settings.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{settings.description}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            {settings.buttonText && settings.buttonUrl && (
              <Link
                href={settings.buttonUrl}
                onClick={dismiss}
                className="inline-flex justify-center bg-red-500 text-white rounded-full px-6 py-3 font-semibold hover:bg-red-600 transition-colors"
              >
                {settings.buttonText}
              </Link>
            )}
            {settings.secondaryText && settings.secondaryUrl && (
              <Link
                href={settings.secondaryUrl}
                onClick={dismiss}
                className="inline-flex justify-center border border-gray-200 rounded-full px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {settings.secondaryText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
