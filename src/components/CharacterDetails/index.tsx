import {
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useMultiContext } from '@j-meira/mui-theme';
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
      open={open}
      onClose={toggle}
      aria-labelledby='character-details'
      className={`character-details${
        dark ? ' character-details-dark' : ''
      }`}
    >
      <IconButton
        aria-label='close'
        className='details-close'
        onClick={toggle}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={5}
            className='hero-img'
            style={{
              backgroundImage: `url('${`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`.replace(
                'http:',
                'https:',
              )}')`,
            }}
          ></Grid>
          <Grid item xs={12} sm={7}>
            <Typography component='h3' className='hero-name'>
              {data.name}
            </Typography>
            <Typography variant='body1' className='hero-resume'>
              {data.description || 'No description'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
