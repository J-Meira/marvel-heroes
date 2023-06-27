import { useToast } from '@j-meira/mui-theme';
import { API } from '.';
import { ICharacterDataWrapper } from './Characters';

const path = '/v1/public/characters';

export interface IGetAll {
  nameStartsWith?: string;
  order?: string;
  limit?: number;
  offset?: number;
}

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
