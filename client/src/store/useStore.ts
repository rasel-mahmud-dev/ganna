import React, {useContext} from "react";
import AppContext from "./AppContext";
import {AppContextInterface, dispatch} from "./AppProvider";


function useStore(): [AppContextInterface, React.Dispatch<any>] {
    const context = useContext(AppContext ) as AppContextInterface
    return [context, dispatch]
    
}
export default useStore
