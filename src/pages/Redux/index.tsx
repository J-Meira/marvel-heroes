import { useParams } from 'react-router-dom';

export const ReduxPage = () => {
  const { id } = useParams();
  return <div>Redux{id}</div>;
};
