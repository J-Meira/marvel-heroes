import {
  Dialog,
  DialogContent,
  IconButton,
  Grid2,
  Typography,
} from '@mui/material';
import { useMultiContext } from '@j-meira/mui-theme';
import { MdClose as CloseIcon } from 'react-icons/md';

import { ICharacter } from '../../types';

export interface ICharacterDetailsProps {
  data: ICharacter;
  open: boolean;
  toggle: () => void;
}

export const CharacterDetails = ({
  data,
  open,
  toggle,
}: ICharacterDetailsProps) => {
  const { dark } = useMultiContext();

  return (
    <Dialog
      className={`character-details${
        dark ? ' character-details-dark' : ''
      }`}
      aria-labelledby='character-details'
      onClose={toggle}
      open={open}
    >
      <IconButton
        aria-label='close'
        className='details-close'
        onClick={toggle}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid2 container spacing={2}>
          <Grid2
            className='hero-img'
            size={{ xs: 12, sm: 5 }}
            style={{
              backgroundImage: `url('${`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`.replace(
                'http:',
                'https:',
              )}')`,
            }}
          ></Grid2>
          <Grid2 size={{ xs: 12, sm: 7 }}>
            <Typography component='h3' className='hero-name'>
              {data.name}
            </Typography>
            <Typography variant='body1' className='hero-resume'>
              {data.description || 'No description'}
            </Typography>
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};
