import React from "react";
import { addMessage, clearMessages } from "./actions";
const useDispatch = (dispatch) => {
    const add = (msg) => {
        dispatch(addMessage(msg));
    }

    const clear = () => {
        dispatch(clearMessages());
    }
    return ({
        addMessage: add,
        clearMessages: clear
    })
}
export default useDispatch;