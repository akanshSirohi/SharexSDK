class JsonDBAdapter {
    constructor(db_name, websocket, db_callbacks) {
        this.db_name = db_name;
        this.websocket = websocket;
        this.db_callbacks = db_callbacks;
    }

    websocket_handleDBAction(data) {
        // We can use this.db_callbacks to call the callback functions
        // Here we receive the data from the server as callback
    }
}