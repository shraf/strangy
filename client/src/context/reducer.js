import { initialState } from "./actions";

export const messageReducer=(state=initialState,action)=>{
    console.log(action);

    switch(action.type){
        case "ADD_MESSAGE":
            console.log(state);
            console.log(action.payload);
            return{
                ...state,
                messages:state.messages.concat(action.payload)
            }
        case "CLEAR_MESSAGES":
            return initialState
        default:
            return state;
    }
}