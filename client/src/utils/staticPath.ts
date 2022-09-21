import {backend} from "../axios";

export default function staticPath(link?: string){
    if(!link){
        return  ""
    }
    if(link.startsWith("http")){
        return link
    } else {
        return backend + "/" + link
    }
}