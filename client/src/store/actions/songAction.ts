import {ACTION_TYPES} from "../types";
import api from "../../axios";


export function fetchFavoriteListAction(dispatch: (value: any) => void) {
    api.get("/api/v1/favorite/all").then(({status, data})=>{
        if(status ===  200){
            dispatch({
                type: ACTION_TYPES.FETCH_FAVORITES_SONG,
                payload: data.favorites
            })
        }
    })
    
}