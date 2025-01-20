import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button, Snackbar } from '@mui/material';
import { MdInfo as InfoIcon } from 'react-icons/md';

export const PWABadge = () => {
  const period = 60 * 60 * 1000;

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === 'activated')
            registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <Snackbar
      open={offlineReady || needRefresh}
      onClose={() => close()}
      action={
        needRefresh ? (
          <Button
            color='inherit'
            onClick={() => updateServiceWorker(true)}
            size='small'
          >
            Update Now
          </Button>
        ) : (
          <Button color='inherit' onClick={() => close()} size='small'>
            Close
          </Button>
        )
      }
      message={
        <>
          <InfoIcon />
          {offlineReady
            ? 'App ready to work offline'
            : 'A new version of this App is available'}
        </>
      }
    />
  );
};

const registerPeriodicSync = (
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration,
) => {
  if (period <= 0) return;

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache',
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
};
