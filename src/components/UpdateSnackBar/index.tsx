import { Button, Snackbar } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import { useServiceWorker } from '../../utils';
import { useEffect, useState } from 'react';

export const UpdateSnackBar = () => {
  const { waitingWorker, showReload, reloadPage } = useServiceWorker();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (showReload && waitingWorker) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [waitingWorker, showReload, reloadPage]);

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      action={
        <Button color='inherit' size='small' onClick={() => reloadPage()}>
          Update Now
        </Button>
      }
      message={
        <>
          <InfoIcon />A new version of this App is available
        </>
      }
    />
  );
};
