export interface IGetAll {
  nameStartsWith?: string;
  orderBy?: string;
  limit: number;
  offset: number;
}

export * from './Characters';
