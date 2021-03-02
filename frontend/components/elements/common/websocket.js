/**************************************************************************************************
WEBSOCKET LOGIC
**************************************************************************************************/

function Websocket(){}

Websocket.initializeWs = function (caller, channel) {
    
    let host = 'ws://localhost:8000';
    if (window.location.host.includes('localhost') == false) 
        host = `wss://${window.location.host}:443`;
    const socketUrl = `${host}/ws/${channel}/`;

    caller.websocket = new WebSocket(socketUrl);
    let websocket = caller.websocket;

    websocket.onopen = () => {
        console.log('WebSocket Connecting');
        let newState = {
            'connection': ['Connecting', 'Open', 'Closing', 'Closed'][websocket.readyState]
        };
        caller.setState(newState, () => {
            caller.initialCalls();
        });
    };

    websocket.onmessage = (message) => {
        let wsMessage = JSON.parse(message.data);
        caller.responseRouter(wsMessage);
    };

    websocket.onclose = () => {
        console.log('WebSocket Disconnected');
        let newState = {
            'connection': ['Connecting', 'Open', 'Closing', 'Closed'][websocket.readyState]
        };
        caller.setState(newState);
    };

};

export default Websocket;
