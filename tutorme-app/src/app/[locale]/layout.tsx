import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/config";
import { getLocaleInfo, type Locale } from "@/lib/i18n/config";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "sonner";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const localeInfo = getLocaleInfo(locale as Locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        {children}
        <PWAInstallPrompt />
        <Toaster position="top-right" />
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
