import { v4 as uuidv4 } from 'uuid';

class JsonDBAdapter {

    constructor(db_name, websocket, db_callbacks) {
        this.db_name = db_name;
        this.websocket = websocket;
        this.db_callbacks = db_callbacks;

        this.insert_data_callback = null;
        this.get_data_callback = null;

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
    
        Object.defineProperty(this, 'dbActions', {
            value: {
                INIT_DB: "init_db",
                INIT_DB_RESULT: "init_db_result",
                INSERT_DATA: "insert_data",
                INSERT_DATA_BULK: "insert_data_bulk",
                INSERT_DATA_RESULT: "insert_data_result",
                GET_ALL_DATA: "get_all_data",
                GET_ALL_DATA_RESULT: "get_all_data_result",
                GET_DATA: "get_data",
                GET_DATA_RESULT: "get_data_result",
            },
            writable: false
        });
    }

    websocket_handleDBAction(data) {
        // Here we receive the data from the server as callback
        data.action = data.action.replace('db_action_', '');
        if(data.action == this.dbActions.INIT_DB_RESULT) {
            this.db_callbacks(data.action, data.data);
        }else if(data.action == this.dbActions.INSERT_DATA_RESULT) {
            if(this.insert_data_callback != null) {
                this.insert_data_callback(JSON.parse(data.data));
            }
        }else if(data.action == this.dbActions.GET_ALL_DATA_RESULT || data.action == this.dbActions.GET_DATA_RESULT) {
            if(this.get_data_callback != null) {
                if(data.action == this.dbActions.GET_DATA_RESULT) {
                    let _data = JSON.parse(data.data);
                    this.get_data_callback({
                        status: _data.status,
                        data: JSON.parse(_data.data)
                    });
                }else{
                    this.get_data_callback(JSON.parse(data.data));
                }
            }
        }
    }

    insert(collection, data, options = null, callback = null) {
        let isBulk = Array.isArray(data);
        
        // Verify if data is an object or an array of objects
        if ((!isBulk && typeof data !== 'object') || (isBulk && !Array.isArray(data))) {
            throw new Error(isBulk ? 'data must be an array of objects' : 'data must be an object');
        }
        if (typeof collection !== 'string') {
            throw new Error('collection must be a string');
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
    
        const action = isBulk ? `db_action_${this.dbActions.INSERT_DATA_BULK}` : `db_action_${this.dbActions.INSERT_DATA}`;
    
        this.websocket.send(JSON.stringify({
            action: action,
            data: {
                db_name: this.db_name,
                collection: collection,
                new_data: data
            }
        }));
    }

    find(collection, query, callback) {
        
        // Handle the case where query is a callback
        if(typeof query === 'function') {
            callback = query;
            query = null;
        }

        // Validate arguments
        if (typeof callback !== 'function') {
            throw new Error('callback must be a function');
        } else if (typeof collection !== 'string') {
            throw new Error('collection must be a string');
        }

        // Verify if query is a string
        const is_query = query !== null && typeof query === 'string';

        // Verify if query is an object
        this.get_data_callback = callback;

        // Send the request to the server
        if(is_query) {
            this.websocket.send(JSON.stringify({
                action: `db_action_${this.dbActions.GET_DATA}`,
                data: {
                    db_name: this.db_name,
                    collection: collection,
                    query: query
                }
            }));
        }else{
            this.websocket.send(JSON.stringify({
                action: `db_action_${this.dbActions.GET_ALL_DATA}`,
                data: {
                    db_name: this.db_name,
                    collection: collection,
                }
            }));
        }
    }
}

export default JsonDBAdapter;