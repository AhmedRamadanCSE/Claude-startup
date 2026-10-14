/**
 * Consent-gated analytics (Google Consent Mode v2, "basic" implementation):
 * no third-party tag is loaded until the visitor accepts. Exposes window.siTrack()
 * for conversion events (lead form submit, calendar booking).
 */
import {
  PUBLIC_GA4_MEASUREMENT_ID,
  PUBLIC_GOOGLE_ADS_CONVERSION_ID,
  PUBLIC_GOOGLE_ADS_LEAD_LABEL,
  PUBLIC_GOOGLE_ADS_BOOKING_LABEL,
  PUBLIC_LINKEDIN_PARTNER_ID,
  PUBLIC_LINKEDIN_LEAD_CONVERSION_ID,
  PUBLIC_LINKEDIN_BOOKING_CONVERSION_ID,
} from 'astro:env/client';

type ConsentChoice = 'all' | 'essential';
type TrackEvent = 'lead_submit' | 'calendar_booking' | 'cta_click' | 'calendar_open';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    siTrack: (event: TrackEvent, params?: Record<string, unknown>) => void;
    siOpenConsent: () => void;
  }
}

const COOKIE = 'si_consent';
const COOKIE_DAYS = 365;

window.dataLayer = window.dataLayer || [];
function gtag(...args: unknown[]) {
  window.dataLayer.push(args);
}
window.gtag = gtag;

// Consent Mode v2 defaults: everything denied until the visitor chooses.
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500,
});

function readChoice(): ConsentChoice | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(all|essential)`));
  return (m?.[1] as ConsentChoice | undefined) ?? null;
}

function writeChoice(choice: ConsentChoice) {
  const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
  document.cookie = `${COOKIE}=${choice}; expires=${expires}; path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
}

let tagsLoaded = false;

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadTags() {
  if (tagsLoaded) return;
  tagsLoaded = true;

  const gaId = PUBLIC_GA4_MEASUREMENT_ID;
  const adsId = PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  const primary = gaId || adsId;
  if (primary) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primary)}`);
    gtag('js', new Date());
    if (gaId) gtag('config', gaId, { anonymize_ip: true, allow_google_signals: false });
    if (adsId) gtag('config', adsId, { allow_enhanced_conversions: false });
  }

  const liId = PUBLIC_LINKEDIN_PARTNER_ID;
  if (liId) {
    window._linkedin_partner_id = liId;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(liId);
    loadScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
  }
}

function grantAll() {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
  });
  loadTags();
}

/** Conversion and engagement events. Safe to call before consent: nothing leaves the page until tags load. */
window.siTrack = (event, params = {}) => {
  window.dataLayer.push({ event, ...params });
  if (readChoice() !== 'all') return;

  const adsId = PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  const sendAds = (label: string) => {
    if (adsId && label) gtag('event', 'conversion', { send_to: `${adsId}/${label}` });
  };
  const sendLinkedIn = (conversionId: string) => {
    if (conversionId && typeof window.lintrk === 'function') window.lintrk('track', { conversion_id: Number(conversionId) });
  };

  switch (event) {
    case 'lead_submit':
      gtag('event', 'generate_lead', { method: 'nda_call_form', ...params });
      sendAds(PUBLIC_GOOGLE_ADS_LEAD_LABEL);
      sendLinkedIn(PUBLIC_LINKEDIN_LEAD_CONVERSION_ID);
      break;
    case 'calendar_booking':
      gtag('event', 'calendar_booking', { method: 'embedded_calendar', ...params });
      sendAds(PUBLIC_GOOGLE_ADS_BOOKING_LABEL);
      sendLinkedIn(PUBLIC_LINKEDIN_BOOKING_CONVERSION_ID);
      break;
    default:
      gtag('event', event, params);
  }
};

// ---- Banner wiring -------------------------------------------------------
const banner = document.getElementById('consent-banner');

function showBanner() {
  if (!banner) return;
  banner.hidden = false;
  banner.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
}

function hideBanner() {
  if (banner) banner.hidden = true;
}

window.siOpenConsent = showBanner;

banner?.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-consent]');
  if (!target) return;
  const choice = target.dataset.consent as ConsentChoice;
  writeChoice(choice);
  hideBanner();
  if (choice === 'all') grantAll();
  else window.dataLayer.push({ event: 'consent_rejected' });
});

document.querySelectorAll<HTMLElement>('[data-open-consent]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showBanner();
  });
});

const existing = readChoice();
if (existing === 'all') grantAll();
else if (existing === null) showBanner();

// Generic CTA click tracking (no PII).
document.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
  if (el?.dataset.track) window.siTrack('cta_click', { label: el.dataset.track, path: location.pathname });
});

export {};
