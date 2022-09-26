import React, {useEffect, useRef} from 'react';
import "./style.scss";
import {dispatch} from "../../store/AppProvider";
import {ACTION_TYPES} from "../../store/types";


const Alert = (props) => {
    const {message} = props;
    let timerId = useRef<number>()
    
    useEffect(()=>{
        clearTimeout(timerId.current)
        if(message){
            timerId.current = setInterval(()=>{
                dispatch({
                    type: ACTION_TYPES.SET_ALERT_MESSAGE,
                    payload: ""
                })
            }, 1000)
        }
        return ()=> clearTimeout(timerId.current)
    }, [message])
    
    
    return (
        <div className="alert">
           { message }
  </div>
    );
};

export default Alert;