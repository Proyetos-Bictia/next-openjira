import { createContext } from 'react';
import { Entry } from '../../interfaces';
interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
}

export const EntriesConext = createContext({} as ContextProps)