import {createContext} from "react";


export interface AppContextInterface {
    auth?: {
        firstName: string;
        lastName?: string;
        avatar?: string;
        email: string;
        role?: string;
    } | null
}



const AppContext = createContext<AppContextInterface | null>({})

export default AppContext