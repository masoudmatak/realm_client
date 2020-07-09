import { w3cwebsocket as W3CWebSocket } from "websocket";
import { WEBSOCKET_URL } from '../constants';

const WebSocket = (callback) => {
    const client = new W3CWebSocket(WEBSOCKET_URL);
    client.onmessage = (message) => {
        console.log("Header:" + message.data);
        const i = message.data.startsWith("New")? 1:-1;
        callback(i);
    };
}

export default WebSocket;