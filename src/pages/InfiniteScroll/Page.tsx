import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import 'intersection-observer';

import { Box, Grid2, Typography } from '@mui/material';
import {
  Button,
  Input,
  useDebounce,
  useMultiContext,
  useWindowDimensions,
} from '@j-meira/mui-theme';
import { MdSearch as SearchIcon } from 'react-icons/md';

import {
  CharacterCard,
  CharacterDetails,
  Loading,
  orderByList,
} from '../../components';

import { useLoadingContext } from '../../contexts';
import { CharactersService } from '../../services';
import { ICharacter, IGetAll } from '../../types';

const params: IGetAll = {
  limit: 20,
  offset: 0,
  orderBy: 'name',
  nameStartsWith: undefined,
};

export const Page = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const observerTarget = useRef(null);
  const refToTop = useRef<HTMLInputElement>(null);
  const { debounce } = useDebounce(500, true);
  const { dark } = useMultiContext();
  const { width } = useWindowDimensions();
  const { isLoading, setLoading, removeLoading } = useLoadingContext();
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState(1);
  const [offset, setOffset] = useState(0);
  const [local, setLocal] = useState(false);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [totalOfCharacters, setTotalOfCharacters] = useState(0);
  const [character, setCharacter] = useState<ICharacter | undefined>(
    undefined,
  );
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [hide, setHide] = useState(false);

  const getCharacters = (params: IGetAll, more: boolean) => {
    setLoading();
    setLocal(more);
    CharactersService.getAll(params).then((result) => {
      setLocal(false);
      removeLoading();
      if (result) {
        if (more) {
          return setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...result.data.results,
          ]);
        }

        setCharacters(result.data.results);
        setTotalOfCharacters(result.data.total);
      }
    });
  };

  const getMoreCharacters = (scrollTrigger: boolean) => {
    if (scrollTrigger && (isLoading || totalOfCharacters === 0))
      return null;

    const newOffset = offset + 20;
    setOffset(newOffset);

    return getCharacters(
      {
        ...params,
        offset: newOffset,
        orderBy: testOrderBy(),
        nameStartsWith: search !== '' ? search : undefined,
      },
      true,
    );
  };

  const openDetail = (paramId: number) => {
    setLoading();
    CharactersService.getById(paramId).then((result) => {
      removeLoading();
      if (result && result.data.results[0]) {
        setCharacter(result.data.results[0]);
      }
    });
  };

  const closeDetail = () => {
    setOpen(false);
    setCharacter(undefined);
    if (id) navigate('/infinite-scroll');
  };

  const testOrderBy = () => {
    const test = orderByList.find((o) => o.value === orderBy);
    return test?.obj.apiValue;
  };

  useEffect(() => {
    debounce(() => {
      setOffset(0);
      refToTop.current && refToTop.current.scrollIntoView();
      getCharacters(
        {
          ...params,
          orderBy: testOrderBy(),
          nameStartsWith: search !== '' ? search : undefined,
        },
        false,
      );
    });

    // eslint-disable-next-line
  }, [orderBy, search]);

  useEffect(() => {
    if (character) setOpen(true);

    // eslint-disable-next-line
  }, [character]);

  useEffect(() => {
    debounce(() => {
      if (id) {
        openDetail(Number(id));
      }
    });

    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    setMobile(width < 840);

    // eslint-disable-next-line
  }, [width]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && offset < totalOfCharacters) {
          getMoreCharacters(true);
          observer.unobserve(entries[0].target);
          setHide(false);
        }

        if (offset >= totalOfCharacters) {
          setHide(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };

    // eslint-disable-next-line
  }, [isLoading, totalOfCharacters]);

  return (
    <Box className='infinite-scroll'>
      <Grid2
        container
        className={`actions bar${dark ? '-dark' : ''}`}
        spacing={2}
      >
        <Input
          name='search'
          autoFocus
          label='Search'
          model='icon'
          grid={{ xs: 6, sm: 6, md: 6, lg: 6 }}
          icon={<SearchIcon />}
          localControl
          className='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Input
          name='orderBy'
          label='Order by'
          model='select'
          grid={{ xs: 6, sm: 6, md: 4, lg: 4 }}
          localControl
          noNativeOptions
          className='order'
          options={orderByList}
          value={orderBy}
          onChange={(e) => setOrderBy(Number(e.target.value))}
        />
        {!mobile && (
          <Grid2 size={2} display='flex' alignItems='center'>
            <Typography variant='caption'>
              {`${totalOfCharacters > 0 ? 1 : 0}-${characters.length}
          of ${totalOfCharacters}`}
            </Typography>
          </Grid2>
        )}
      </Grid2>
      <Grid2 container justifyContent='center' className='list'>
        <span ref={refToTop}></span>
        {characters.map((character, i) => (
          <CharacterCard
            key={i}
            data={character}
            openDetail={(id) => openDetail(id)}
          />
        ))}
        <Grid2 size={12} className='list-footer' ref={observerTarget}>
          {characters.length === 0 && search !== '' && (
            <Typography variant='caption'>No cards to display.</Typography>
          )}
          {isLoading && !hide && (
            <Typography variant='caption'>Loading...</Typography>
          )}
          {hide && characters.length > 0 && (
            <Typography variant='caption'>
              No more cards to display.
            </Typography>
          )}
          {!isLoading && !hide && (
            <Button
              size='large'
              onClick={() => getMoreCharacters(false)}
              fullWidth={false}
            >
              Load More
            </Button>
          )}
        </Grid2>
      </Grid2>
      <Loading isLoading={isLoading && !local} />
      {character && (
        <CharacterDetails
          open={open}
          toggle={closeDetail}
          data={character}
        />
      )}
    </Box>
  );
};
