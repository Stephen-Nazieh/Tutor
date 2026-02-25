// Enterprise-grade internationalization with next-intl
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

// Global language support for enterprise deployment
export const LOCALES = [
  "en",
  "zh-CN",
  "es",
  "fr",
  "de",
  "ja",
  "ko",
  "pt",
  "ru",
  "ar",
] as const;
export type Locale = (typeof LOCALES)[number];

// Default locale for global platform
export const DEFAULT_LOCALE = "en" as const;

// Routing configuration for next-intl middleware
export const routing = defineRouting({
  locales: [...LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed", // Clean URLs for SEO
  pathnames: {
    "/": "/",
    "/courses": "/courses",
    "/dashboard": "/dashboard",
    "/parent": "/parent",
    "/tutor": "/tutor",
    "/login": "/login",
    "/register": "/register",
    "/ai-tutor": "/ai-tutor",
    "/live-class": "/live-class",
  } as const,
});

// Navigation configuration with i18n
export const {
  Link: IntlLink,
  redirect: intlRedirect,
  usePathname: useIntlPathname,
  useRouter: useIntlRouter,
  getPathname,
} = createNavigation(routing);

// Locale detection for user preferences
export function detectLocale(requestHeaders: Headers): Locale {
  const acceptLanguage = requestHeaders.get("accept-language");

  // Parse Accept-Language header
  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage
      .split(",")
      .map((lang) => lang.trim().split(";")[0])
      .filter(Boolean);

    // Find best match for user's preferred language
    for (const language of preferredLanguages) {
      const baseLanguage = language.split("-")[0];

      // Direct match
      const directMatch = LOCALES.find((locale) => locale === language);
      if (directMatch) return directMatch;

      // Base language match
      const baseMatch = LOCALES.find((locale) => locale === baseLanguage);
      if (baseMatch) return baseMatch;
    }
  }

  // Return default if no match found
  return DEFAULT_LOCALE;
}

// Translation namespaces for enterprise scale
export const NAMESPACES = [
  "common",
  "navigation",
  "auth",
  "courses",
  "dashboard",
  "classroom",
  "parent",
  "tutor",
  "ai-tutor",
  "gamification",
  "payments",
  "notifications",
  "errors",
  "validation",
  "forms",
  "time",
  "accessibility",
] as const;
export type Namespace = (typeof NAMESPACES)[number];

// Time and number formatting based on locale
export function getLocaleInfo(locale: Locale) {
  const localeConfigs: Record<
    Locale,
    {
      direction: "ltr" | "rtl";
      language: string;
      region: string;
      currency: string;
      timezone: string;
      dateFormat: string;
      numberFormat: string;
      name: string;
    }
  > = {
    en: {
      direction: "ltr",
      language: "en",
      region: "en-US",
      currency: "USD",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      numberFormat: "1,000.00",
      name: "English",
    },
    "zh-CN": {
      direction: "ltr",
      language: "zh",
      region: "zh-CN",
      currency: "CNY",
      timezone: "Asia/Shanghai",
      dateFormat: "YYYY/MM/DD",
      numberFormat: "1,0000.00",
      name: "中文 (简体)",
    },
    es: {
      direction: "ltr",
      language: "es",
      region: "es-ES",
      currency: "EUR",
      timezone: "Europe/Madrid",
      dateFormat: "DD/MM/YYYY",
      numberFormat: "1.000,00",
      name: "Español",
    },
    fr: {
      direction: "ltr",
      language: "fr",
      region: "fr-FR",
      currency: "EUR",
      timezone: "Europe/Paris",
      dateFormat: "DD/MM/YYYY",
      numberFormat: "1 000,00",
      name: "Français",
    },
    de: {
      direction: "ltr",
      language: "de",
      region: "de-DE",
      currency: "EUR",
      timezone: "Europe/Berlin",
      dateFormat: "DD.MM.YYYY",
      numberFormat: "1.000,00",
      name: "Deutsch",
    },
    ja: {
      direction: "ltr",
      language: "ja",
      region: "ja-JP",
      currency: "JPY",
      timezone: "Asia/Tokyo",
      dateFormat: "YYYY/MM/DD",
      numberFormat: "1,000",
      name: "日本語",
    },
    ko: {
      direction: "ltr",
      language: "ko",
      region: "ko-KR",
      currency: "KRW",
      timezone: "Asia/Seoul",
      dateFormat: "YYYY/MM/DD",
      numberFormat: "1,000",
      name: "한국어",
    },
    pt: {
      direction: "ltr",
      language: "pt",
      region: "pt-BR",
      currency: "BRL",
      timezone: "America/Sao_Paulo",
      dateFormat: "DD/MM/YYYY",
      numberFormat: "1.000,00",
      name: "Português",
    },
    ru: {
      direction: "ltr",
      language: "ru",
      region: "ru-RU",
      currency: "RUB",
      timezone: "Europe/Moscow",
      dateFormat: "DD.MM.YYYY",
      numberFormat: "1 000,00",
      name: "Русский",
    },
    ar: {
      direction: "rtl",
      language: "ar",
      region: "ar-SA",
      currency: "SAR",
      timezone: "Asia/Riyadh",
      dateFormat: "DD/MM/YYYY",
      numberFormat: "1,000.00",
      name: "العربية",
    },
  };

  return localeConfigs[locale] ?? localeConfigs[DEFAULT_LOCALE];
}
