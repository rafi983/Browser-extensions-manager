'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';
import data from '../data.json';

export type ExtensionType = {
  id: number;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

type State = {
  filter: 'All' | 'Active' | 'Inactive';
  extensions: ExtensionType[];
  allExtensions: ExtensionType[];
};

type Action =
  | { type: 'SET_FILTER'; payload: { filter: 'All' | 'Active' | 'Inactive' } }
  | { type: 'DELETE_EXTENSION'; payload: { id: number } }
  | { type: 'TOGGLE_ACTIVE'; payload: { id: number } };

const initialState: State = {
  filter: 'All',
  extensions: data,
  allExtensions: data,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      const { filter } = action.payload;
      const filteredExtensions = state.allExtensions.filter((extension) => {
        if (filter === 'All') return true;
        if (filter === 'Active') return extension.isActive;
        if (filter === 'Inactive') return !extension.isActive;
      });
      return {
        ...state,
        extensions: filteredExtensions,
        filter,
      };
    }
    case 'DELETE_EXTENSION': {
      const { id } = action.payload;
      const updatedExtensions = state.extensions.filter((extension) => extension.id !== id);
      return {
        ...state,
        extensions: updatedExtensions,
        allExtensions: state.allExtensions.filter((extension) => extension.id !== id), // 元のデータも更新
      };
    }
    case 'TOGGLE_ACTIVE': {
      const { id } = action.payload;
      const updatedAllExtensions = state.allExtensions.map((extension) =>
        extension.id === id ? { ...extension, isActive: !extension.isActive } : extension
      );
      const filteredExtensions = updatedAllExtensions.filter((extension) => {
        if (state.filter === 'All') return true;
        if (state.filter === 'Active') return extension.isActive;
        if (state.filter === 'Inactive') return !extension.isActive;
      });

      return {
        ...state,
        allExtensions: updatedAllExtensions,
        extensions: filteredExtensions,
      };
    }
    default:
      return state;
  }
};

const FilterContext = createContext<{
  state: State;
  setFilter: (filter: 'All' | 'Active' | 'Inactive') => void;
  deleteExtension: (id: number) => void;
  toggleActive: (id: number) => void;
}>({
  state: {
    filter: 'All',
    extensions: [],
    allExtensions: [],
  },
  setFilter: () => {},
  deleteExtension: () => {},
  toggleActive: () => {},
});

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setFilter = (filter: 'All' | 'Active' | 'Inactive') => {
    dispatch({ type: 'SET_FILTER', payload: { filter } });
  };

  const deleteExtension = (id: number) => {
    dispatch({ type: 'DELETE_EXTENSION', payload: { id } });
  };

  const toggleActive = (id: number) => {
    dispatch({ type: 'TOGGLE_ACTIVE', payload: { id } });
  };

  return (
    <FilterContext.Provider value={{ state, setFilter, deleteExtension, toggleActive }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export { FilterProvider, useFilter };
