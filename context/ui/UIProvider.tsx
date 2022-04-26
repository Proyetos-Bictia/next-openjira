import { FC, useReducer } from 'react';
import { UIConext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false
}

interface Props {
  children: JSX.Element
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI- Open Sidebar' })
  }

  const closeSideMenu = () => dispatch({ type: 'UI- Close Sidebar' });

  const setIsAddingEntry = (stateAdding: boolean) => {
    // console.log('entramos a agregar el payload es', stateAdding);
    dispatch({ type: 'UI- Show/Hide new Entry', payload: stateAdding })
  }

  const startDragging = () => dispatch({ type: 'UI- Start Dragging' });
  const endDragging = () => dispatch({ type: 'UI- End Dragging' });

  return (
    <UIConext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,

      // Draggin
      startDragging,
      endDragging
    }}>
      {children}
    </UIConext.Provider>
  )
}