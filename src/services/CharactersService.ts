import { API } from '.';
import { useToast } from '@j-meira/mui-theme';
import { ICharacterDataWrapper, IGetAll } from '../types';

const path = '/v1/public/characters';

const getAll = async (
  data: IGetAll,
): Promise<ICharacterDataWrapper | void> => {
  const result = await API.get(path, { params: data });
  if (result instanceof Error) {
    useToast.error(result.message);
    return;
  } else {
    return result.data;
  }
};

const getById = async (
  _id: number,
): Promise<ICharacterDataWrapper | void> => {
  const result = await API.get(`${path}/${_id}`);
  if (result instanceof Error) {
    useToast.error(result.message);
    return;
  } else {
    return result.data;
  }
};

export const CharactersService = {
  getAll,
  getById,
};
