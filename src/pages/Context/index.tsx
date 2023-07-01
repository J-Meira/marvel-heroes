import { useParams } from 'react-router-dom';

export const ContextPage = () => {
  const { charId } = useParams();
  return <div>Context:{charId}</div>;
};
