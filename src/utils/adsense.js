export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT?.trim() || '';

const SLOT_BY_TYPE = {
  header: import.meta.env.VITE_ADSENSE_SLOT_HEADER?.trim() || '',
  content: import.meta.env.VITE_ADSENSE_SLOT_CONTENT?.trim() || '',
  footer: import.meta.env.VITE_ADSENSE_SLOT_FOOTER?.trim() || ''
};

let scriptRequested = false;

export function isAdSenseEnabled() {
  return Boolean(ADSENSE_CLIENT);
}

export function getAdSlotByType(type) {
  return SLOT_BY_TYPE[type] || '';
}

export function ensureAdSenseScript() {
  if (typeof window === 'undefined' || !isAdSenseEnabled() || scriptRequested) {
    return;
  }

  const existing = document.querySelector('script[data-adsense-script="true"]');
  if (existing) {
    scriptRequested = true;
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.crossOrigin = 'anonymous';
  script.dataset.adsenseScript = 'true';
  document.head.appendChild(script);
  scriptRequested = true;
}
