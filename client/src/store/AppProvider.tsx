import React, { ComponentType, FC, useReducer } from "react";
import AppContext from "./AppContext";
import { ACTION_TYPES } from "./types";

export let dispatch: React.Dispatch<any>;

// Provider in your app

export interface AppContextInterface {
  auth: {
    firstName: string;
    lastName?: string;
    avatar?: string;
    email: string;
    role?: string;
  } | null;

  musicDetail: null | object;
  isOpenLeftSidebar: boolean;
  player: {
    playlistName: string;
    items: any[];
    playIndex: number;
  };
  favorites: any[]
}

const sampleAppContext: AppContextInterface = {
  auth: null,
  musicDetail: null,
  isOpenLeftSidebar: false,
  player: {
    playlistName: "",
    items: [],
    playIndex: 0,
  },
  favorites: []
};

function reducer(
  state: AppContextInterface,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      const { user, token } = action.payload;
      if (token) {
        localStorage.setItem("token", token);
      }
      return {
        ...state,
        auth: user,
      };

    case ACTION_TYPES.SET_MUSIC_DETAIL:
      return {
        ...state,
        musicDetail: action.payload,
      };

    case ACTION_TYPES.TOGGLE_LEFT_SIDEBAR:
      return {
        ...state,
        isOpenLeftSidebar: !state.isOpenLeftSidebar,
      };

    case ACTION_TYPES.SET_PREPARE_PLAYLIST:
      return {
        ...state,
        player: action.payload,
      };

    case ACTION_TYPES.FETCH_FAVORITES_SONG:
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return state;
  }
}

function AppProvider<T>(HOC: ComponentType<T>) {
  return function (props: any) {
    // @ts-ignore
    const [state, d] = useReducer(reducer, sampleAppContext);
    dispatch = d;

    return (
      <AppContext.Provider value={state}>
        <HOC {...props} />
      </AppContext.Provider>
    );
  };
};

export default AppProvider;