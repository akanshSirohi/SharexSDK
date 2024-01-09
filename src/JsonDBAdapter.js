class JsonDBAdapter {

    constructor(db_name, websocket, db_callbacks) {
        this.db_name = db_name;
        this.websocket = websocket;
        this.db_callbacks = db_callbacks;

        Object.defineProperty(this, 'DBActions', {
            value: {
                INIT_DB: "init_user",
            },
            writable: false
        });

        this.websocket.send(JSON.stringify({
            action: 'db_action_init_db',
            data: {
                db_name: this.db_name
            }
        }));
    }

    websocket_handleDBAction(data) {
        data.action = data.action.replace('db_action_', '');
        this.db_callbacks(data.action, data.data);
        // We can use this.db_callbacks to call the callback functions
        // Here we receive the data from the server as callback
    }
}

export default JsonDBAdapter;