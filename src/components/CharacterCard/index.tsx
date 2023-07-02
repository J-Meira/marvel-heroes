import { useMultiContext } from '@j-meira/mui-theme';
import { ICharacter } from '../../types';

export interface ICharacterCardProps {
  data: ICharacter;
  openDetail: (id: number) => void;
}

export const CharacterCard = ({
  data,
  openDetail,
}: ICharacterCardProps) => {
  const { dark } = useMultiContext();
  return (
    <div
      className={`character-card${dark ? ' character-card-dark' : ''}`}
      onClick={() => openDetail(data.id)}
    >
      <div className='hover-effect'></div>
      <div
        className='hero-img'
        style={{
          backgroundImage: `url('${`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`.replace(
            'http:',
            'https:',
          )}')`,
        }}
      ></div>
      <div className='hero-name'>
        <span className='label'>{data.name}</span>
      </div>
    </div>
  );
};
