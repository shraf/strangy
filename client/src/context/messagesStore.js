import React, { useReducer } from "react";
import { initialState } from "./actions";
import { messageReducer } from "./reducer";

export const Store=React.createContext();

export const StoreProvider=({children})=>{
    const [state,dispatch]=useReducer(messageReducer,initialState);
    return (
        <Store.Provider value={[state,dispatch]}>
            {children}
        </Store.Provider>
    )
}