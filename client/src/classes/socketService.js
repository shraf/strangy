import {io} from "socket.io-client";


const ENDPOINT = '/';

export default class SocketService {
     

    constructor( ) {
        this.socket = io(ENDPOINT);
    }

     send = (channel,message) => {
        this.socket.emit(channel, message);
    }

    listen=(channel,callback)=>{
        this.socket.on(channel,callback);
    }

    // disconnect - used when unmounting
     disconnect () {
        this.socket.disconnect();
    }

    getInstance=()=>{
        return this.socket;
    }
}