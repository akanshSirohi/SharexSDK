import { v4 as uuidv4 } from 'uuid';

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

    insert(collection, data, options = null, callback = null) {
        let isBulk = Array.isArray(data);
        
        // Verify if data is an object or an array
        if ((!isBulk && typeof data !== 'object') || (isBulk && !Array.isArray(data))) {
            throw new Error(isBulk ? 'data must be an array of objects' : 'data must be an object');
        }
    
        // Handle the case where options is a callback
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
    
        // Verify if options is an object
        if (options !== null && typeof options !== 'object') {
            throw new Error('options must be an object');
        } else {
            // Generate UUID if specified in options
            if (options?.uuid === true) {
                if (isBulk) {
                    data.forEach((element, index) => {
                        data[index]._uuid = uuidv4();
                    });
                } else {
                    data._uuid = uuidv4();
                }
            } else if (options?.uuid !== undefined) {
                throw new Error('options.uuid must be a boolean');
            }
        }

        this.insert_data_callback = callback;
    
        const action = isBulk ? 'db_action_insert_data_bulk' : 'db_action_insert_data';
    
        this.websocket.send(JSON.stringify({
            action: action,
            data: {
                db_name: this.db_name,
                collection: collection,
                new_data: data
            }
        }));
    }
    
}

export default JsonDBAdapter;