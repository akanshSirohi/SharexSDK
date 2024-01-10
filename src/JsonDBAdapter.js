class JsonDBAdapter {

    constructor(db_name, websocket, db_callbacks) {
        this.db_name = db_name;
        this.websocket = websocket;
        this.db_callbacks = db_callbacks;

        this.insert_data_callback = null;

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
        // Here we receive the data from the server as callback
        data.action = data.action.replace('db_action_', '');
        if(data.action == 'init_db_result') {
            this.db_callbacks(data.action, data.data);
        }else if(data.action == 'insert_data_result') {
            if(this.insert_data_callback != null) {
                this.insert_data_callback(data.data);
            }
        }        
    }

    insert(collection, data, callback = null) {
        // verify if data is a object
        if(typeof data != 'object' || data == null || data == undefined) {
            throw new Error('Data must be a object');
        }
        this.insert_data_callback = callback;
        this.websocket.send(JSON.stringify({
            action: 'db_action_insert_data',
            data: {
                db_name: this.db_name,
                collection: collection,
                new_data: data
            }
        }));
    }
}

export default JsonDBAdapter;