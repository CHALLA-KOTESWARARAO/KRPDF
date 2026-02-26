import { useEffect, useMemo, useRef } from 'react';
import { ADSENSE_CLIENT, ensureAdSenseScript, getAdSlotByType, isAdSenseEnabled } from '../utils/adsense';

function AdPlaceholder({ type = 'content' }) {
  const adRef = useRef(null);
  const slot = useMemo(() => getAdSlotByType(type), [type]);

  useEffect(() => {
    if (!isAdSenseEnabled() || !slot || !adRef.current) {
      return;
    }

    ensureAdSenseScript();

    if (adRef.current.dataset.loaded === 'true') {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adRef.current.dataset.loaded = 'true';
    } catch {
      // Ignore ad initialization retries when script is not fully ready yet.
    }
  }, [slot]);

  const labels = {
    header: 'Header Ad',
    content: 'Content Ad',
    footer: 'Footer Ad'
  };

  if (!isAdSenseEnabled() || !slot) return null;

  return (
    <aside className={`ad-slot ad-${type}`} aria-label={labels[type]}>
      <ins
        ref={adRef}
        className="adsbygoogle ad-live"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

export default AdPlaceholder;
