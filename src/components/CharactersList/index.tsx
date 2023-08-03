import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  DataTablePagination,
  Input,
  PagesProps,
  SelectOptionsProps,
  useDebounce,
} from '@j-meira/mui-theme';
import { CharacterCard, ICharacterCardProps } from '..';
import { ICharacter, IGetAll } from '../../types';

export interface ICharactersListProps {
  characters: ICharacter[];
  onGetCharacters: (params: IGetAll) => void;
  openDetail: ICharacterCardProps['openDetail'];
  totalOfCharacters: number;
}

const initialRows = Number(localStorage.getItem('M_HEROS_RP') || '12');

export const pagesList: SelectOptionsProps[] = [
  {
    value: 4,
    label: '4',
  },
  {
    value: 12,
    label: '12',
  },
  {
    value: 24,
    label: '24',
  },
  {
    value: 36,
    label: '36',
  },
  {
    value: 48,
    label: '48',
  },
];

export const orberByList: SelectOptionsProps[] = [
  {
    value: 1,
    label: 'Name',
    obj: { apiValue: 'name' },
  },
  {
    value: 2,
    label: 'Name desc',
    obj: { apiValue: '-name' },
  },
  {
    value: 3,
    label: 'Modified',
    obj: { apiValue: 'modified' },
  },
  {
    value: 4,
    label: 'Modified dec',
    obj: { apiValue: '-modified' },
  },
];

export const CharactersList = ({
  characters,
  onGetCharacters,
  openDetail,
  totalOfCharacters,
}: ICharactersListProps) => {
  const { debounce } = useDebounce(500, false);
  const [search, setSearch] = useState('');
  const [params, setParams] = useState<IGetAll>({
    limit: initialRows,
    offset: 0,
    orderBy: 'name',
    nameStartsWith: undefined,
  });
  const [orderBy, setOrderBy] = useState(1);
  const [pages, setPages] = useState<PagesProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRows);

  const onHandleOrderBy = (order: number) => {
    const test = orberByList.find((o) => o.value === order);
    setOrderBy(order);
    setParams({
      ...params,
      orderBy: test?.obj.apiValue,
      nameStartsWith: search !== '' ? search : undefined,
    });
  };

  const onHandlePage = (page: number) => {
    setCurrentPage(page);
    setParams({
      ...params,
      offset: page * rowsPerPage - rowsPerPage,
    });
  };

  const onHandleRows = (rows: number) => {
    setRowsPerPage(rows);
    localStorage.setItem('M_HEROS_RP', String(rows));
    setCurrentPage(1);
    setParams({
      ...params,
      offset: 0,
      limit: rows,
    });
  };

  const arrangePages = () => {
    const totalPages = Math.ceil(totalOfCharacters / rowsPerPage);
    const pagesTemp: PagesProps[] = [];
    for (let i = 0; i < totalPages; i++) {
      pagesTemp.push({ pageNumber: i + 1 });
    }
    setPages(pagesTemp);
  };

  useEffect(() => {
    arrangePages();

    // eslint-disable-next-line
  }, [totalOfCharacters, rowsPerPage]);

  useEffect(() => {
    debounce(() => {
      onGetCharacters({
        ...params,
        nameStartsWith: search !== '' ? search : undefined,
      });
    });

    // eslint-disable-next-line
  }, [params, search]);

  return (
    <div className='characters-list'>
      <Input
        autoFocus
        label='Search'
        model='icon'
        grid={{ md: 12, lg: 12 }}
        icon={<SearchIcon />}
        isNoFormik
        className='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Input
        label='Order by'
        model='select'
        grid={{ md: 12, lg: 12 }}
        isNoFormik
        className='order'
        options={orberByList}
        value={orderBy}
        onChange={(e) => onHandleOrderBy(Number(e.target.value))}
      />
      <Grid container className='rows'>
        <Input
          label='Cards per page'
          model='select'
          isNoFormik
          grid={{ md: 6, lg: 6, sm: 6, xs: 6 }}
          options={pagesList}
          value={rowsPerPage}
          onChange={(e) => onHandleRows(Number(e.target.value))}
        />
        <Typography variant='caption'>
          {`${totalOfCharacters > 0 ? params.offset + 1 : 0}-${
            params.offset + characters.length
          }
          of ${totalOfCharacters}`}
        </Typography>
      </Grid>
      <Grid container justifyContent='center' className='list'>
        {characters.map((character, i) => (
          <CharacterCard
            key={i}
            data={character}
            openDetail={(id) => openDetail(id)}
          />
        ))}
        {characters.length === 0 && search !== '' && (
          <Typography variant='caption'>No cards to display.</Typography>
        )}
      </Grid>
      <DataTablePagination
        title='character-list'
        pages={pages}
        currentPage={currentPage}
        setPage={onHandlePage}
        lastPage={pages.length}
      />
    </div>
  );
};
