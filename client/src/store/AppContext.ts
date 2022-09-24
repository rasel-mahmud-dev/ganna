import {createContext} from "react";
import {AppContextInterface} from "./AppProvider";



const AppContext = createContext<AppContextInterface | null>(null)

export default AppContext