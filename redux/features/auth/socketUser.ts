import {createReducer} from "@reduxjs/toolkit";
interface SocketState {
    loading: boolean;
    messages: Array<any>;
    socket?: WebSocket; // Make socket optional to avoid initial error
}
const initialState: SocketState = {
    loading: false,
    messages: [],
    socket: undefined
}
// Define the action interface
interface SetSocketAction {
    type: "SET_SOCKET";
    socket: WebSocket;
}

interface SetMessages{
    type: "ADD_MESSAGES",
    newMessage:{}
}

interface LoadMessages{
    type: "LOAD_MESSAGES",
    messages:[]
}

export const socketReducer = createReducer(initialState,(builder) => {
      

    builder.addCase("LOAD_MESSAGES", (state, action: LoadMessages) => {
        state.loading = false,
        state.messages = action.messages
    })

    builder.addCase("SET_SOCKET", (state, action:SetSocketAction) => {
    state.loading = false,
    state.socket = action.socket
    })

    builder.addCase("ADD_MESSAGES", (state, action:SetMessages) => {
        state.loading = false,
        state.messages = [...state.messages, action.newMessage]
    })
})