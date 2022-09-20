import React, {useContext} from "react";
import AppContext, {AppContextInterface} from "./AppContext";
import {dispatch} from "./AppProvider";


function useStore(): [AppContextInterface, React.Dispatch<any>] {
    const context = useContext(AppContext ) as AppContextInterface
    return [context, dispatch]
    
}
export default useStore
