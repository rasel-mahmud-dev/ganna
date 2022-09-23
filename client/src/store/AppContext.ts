import {createContext} from "react";


export interface AppContextInterface {
    
    auth: {
        firstName: string;
        lastName?: string;
        avatar?: string;
        email: string;
        role?: string;
    } | null
    
    musicDetail: null | object
}



const AppContext = createContext<AppContextInterface | null>({
    auth: null,
    musicDetail: null
})

export default AppContext