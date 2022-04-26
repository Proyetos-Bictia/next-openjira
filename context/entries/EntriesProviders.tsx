import { useSnackbar } from 'notistack';
import { FC, useEffect, useReducer } from 'react';

import { entriesApi } from '../../apis';

import { Entry } from '../../interfaces';
import { EntriesConext, entriesReducer } from './';


export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
}

interface Props {
  children: JSX.Element
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {

    const { data } = await entriesApi.post<Entry>('/entries', {
      description
    })
    dispatch({ type: '[Entry]  Add-Entry', payload: data });

  }

  const updateEntry = async ({description, status, _id}: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      });
      dispatch({ type: '[Entry]  Entry-Update', payload: data });
      if (showSnackbar) {
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }
    } catch (error) {
      console.log({ error });
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    console.log(data);
    dispatch({ type: '[Entry]  Refresh-Data', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])


  return (
    <EntriesConext.Provider value={{
      ...state,

      addNewEntry,
      updateEntry
    }}>
      {children}
    </EntriesConext.Provider>
  )
}