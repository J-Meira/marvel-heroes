import {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';

export interface IProvidersProps {
  children: React.ReactNode;
}

interface ILoadingContextData {
  isLoading: boolean;
  setLoading: () => void;
  removeLoading: () => void;
}

const LoadingContext = createContext({} as ILoadingContextData);

export const LoadingProvider: FC<IProvidersProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSetLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleRemoveLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading: handleSetLoading,
        removeLoading: handleRemoveLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
