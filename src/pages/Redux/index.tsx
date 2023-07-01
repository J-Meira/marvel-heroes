import { useParams } from 'react-router-dom';

export const ReduxPage = () => {
  const { charId } = useParams();
  return <div>Redux{charId}</div>;
};
