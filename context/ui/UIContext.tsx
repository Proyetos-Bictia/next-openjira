import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (stateAdding: boolean) => void;

  endDragging: () => void;
  startDragging: () => void;
}

export const UIConext = createContext({} as ContextProps);
