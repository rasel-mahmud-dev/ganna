import React, {ComponentType, FC, useReducer} from 'react';
import AppContext, {AppContextInterface} from './AppContext';
import appContext from "./AppContext";
import {ACTION_TYPES} from "./types";

export let dispatch: React.Dispatch<any>;

// Provider in your app

const sampleAppContext: AppContextInterface = {
    auth: null
};

function reducer(state: AppContextInterface, action: { type: any; payload: any; }){
    
    switch(action.type){
        case ACTION_TYPES.LOGIN:
            const {user, token } = action.payload;
            localStorage.setItem("token", token)
            return {
                ...state,
                auth: user,
            }
            
        default:
            return state
    }
}


function AppProvider<T>(HOC: ComponentType<T>){
    return function (props: any){
        const [state, d] = useReducer(reducer, sampleAppContext )
        dispatch = d
        
        
        return (
            <AppContext.Provider value={state}>
                <HOC {...props} />
            </AppContext.Provider>

        );
    }
};

export default AppProvider;