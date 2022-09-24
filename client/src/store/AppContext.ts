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
    isOpenLeftSidebar: boolean,
    player: {
        playlistName: string,
        items: any[]
    }
}



const AppContext = createContext<AppContextInterface | null>({
    auth: null,
    musicDetail: null,
    isOpenLeftSidebar: false,
    player: {
        playlistName: "",
        items: []
    }
})

export default AppContext