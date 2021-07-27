export const addMessage=(message)=>(
    {
        type:"ADD_MESSAGE",
        payload:message
    }
)

export const clearMessages=()=>({
    type:"CLEAR_MESSAGES"
});

export const initialState={
    messages:[]
};