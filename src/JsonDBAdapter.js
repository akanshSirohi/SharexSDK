(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['uuid', './utils'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('uuid'), require('./utils'));
    } else {
        // Browser globals
        root.JsonDBAdapter = factory(root.uuid, root.utils);
    }
}(typeof self !== 'undefined' ? self : this, function (uuid, utils) {
    class JsonDBAdapter {

        // Properties
        #db_name = null;
        #websocket = null;
        #db_callbacks = null;

        // Callbacks
        #insert_data_callback = null;
        #get_data_callback = null;
        #update_data_callback = null;
        #delete_data_callback = null;


        #dbActions = {
            INIT_DB: "init_db",
            INIT_DB_RESULT: "init_db_result",
            INSERT_DATA: "insert_data",
            INSERT_DATA_BULK: "insert_data_bulk",
            INSERT_DATA_RESULT: "insert_data_result",
            GET_ALL_DATA: "get_all_data",
            GET_ALL_DATA_RESULT: "get_all_data_result",
            GET_DATA: "get_data",
            GET_DATA_RESULT: "get_data_result",
            UPDATE_DATA: "update_data",
            UPDATE_DATA_RESULT: "update_data_result",
            DELETE_DATA: "delete_data",
            DELETE_DATA_RESULT: "delete_data_result"
        };

        /**
         * This is a constructor function for a JavaScript class that initializes a database connection and
         * sets up various callbacks for database actions.
         * @param db_name - The name of the database you want to connect to or perform actions on.
         * @param websocket - The `websocket` parameter is a WebSocket object that is used to establish a
         * connection with a server. It allows for real-time communication between the client and the
         * server.
         * @param db_callbacks - The `db_callbacks` parameter is an object that contains callback functions
         * for different database actions. These callback functions are used to handle the results of the
         * database actions.
         */
        constructor(db_name, websocket, db_callbacks) {
            this.#db_name = db_name;
            this.#websocket = websocket;
            this.#db_callbacks = db_callbacks;
    
            this.#insert_data_callback = null;
            this.#get_data_callback = null;
            this.#update_data_callback = null;
            this.#delete_data_callback = null;
    
            this.#websocket.send(JSON.stringify({
                action: 'db_action_init_db',
                data: {
                    db_name: this.#db_name
                }
            }));
        }
    
        /**
         * The function updates the internal websocket property with the provided websocket object.
         * @param websocket - The `websocket` parameter is the new WebSocket object that you want to update
         * the internal WebSocket with.
         */
        updateInternalWebsocket(websocket) {
            this.#websocket = websocket;
        }
    
        /**
         * The function `websocket_handleDBAction` handles different actions received from the server and
         * calls the appropriate callback functions based on the action.
         * @param data - The `data` parameter is an object that contains information received from the
         * server. It typically has two properties:
         */
        websocket_handleDBAction(data) {
            // Here we receive the data from the server as callback
            data.action = data.action.replace('db_action_', '');
            if(data.action == this.#dbActions.INIT_DB_RESULT && this.#db_callbacks != null) {
                this.#db_callbacks(data.action, data.data);
            }else if(data.action == this.#dbActions.INSERT_DATA_RESULT) {
                if(this.#insert_data_callback != null) {
                    this.#insert_data_callback(JSON.parse(data.data));
                }
            }else if(data.action == this.#dbActions.GET_ALL_DATA_RESULT || data.action == this.#dbActions.GET_DATA_RESULT) {
                if(this.#get_data_callback != null) {
                    if(data.action == this.#dbActions.GET_DATA_RESULT) {
                        let _data = JSON.parse(data.data);
                        this.#get_data_callback({
                            status: _data.status,
                            data: JSON.parse(_data.data)
                        });
                    }else{
                        this.#get_data_callback(JSON.parse(data.data));
                    }
                }
            }else if(data.action == this.#dbActions.UPDATE_DATA_RESULT) {
                if(this.#update_data_callback != null) {
                    this.#update_data_callback(JSON.parse(data.data));
                }
            }else if(data.action == this.#dbActions.DELETE_DATA_RESULT) {
                if(this.#delete_data_callback != null) {
                    this.#delete_data_callback(JSON.parse(data.data));
                }
            }
        }
    
        /**
         * The function `insert` is used to insert data into a collection in a database, either as a single
         * object or an array of objects, with optional options and a callback function.
         * @param collection - The name of the collection where the data will be inserted.
         * @param data - The `data` parameter can be either an object or an array of objects. If it is an
         * object, it represents a single data entry to be inserted into the collection. If it is an array
         * of objects, each object represents a separate data entry to be inserted into the collection.
         * @param [options=null] - The `options` parameter is an optional object that can be passed to the
         * `insert` function. It allows you to specify additional options for the insertion operation. If
         * not provided, it defaults to `null`.
         * @param [callback=null] - The `callback` parameter is a function that will be called after the
         * data insertion is completed. It allows you to perform additional actions or handle the result of
         * the insertion. If no callback function is provided, the insertion will be performed without any
         * further action.
         */
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
            if (options !== null && typeof options !== 'object' && !Array.isArray(options)) {
                throw new Error('options must be an object');
            } else {
                // Generate UUID if specified in options
                if (options?.uuid === true) {
                    if (isBulk) {
                        data.forEach((element, index) => {
                            data[index]._uuid = uuid.v4();
                        });
                    } else {
                        data._uuid = uuid.v4();
                    }
                } else if (options?.uuid !== undefined) {
                    throw new Error('options.uuid must be a boolean');
                }
            }
    
            this.#insert_data_callback = callback;
        
            const action = isBulk ? `db_action_${this.#dbActions.INSERT_DATA_BULK}` : `db_action_${this.#dbActions.INSERT_DATA}`;
        
            this.#websocket.send(JSON.stringify({
                action: action,
                data: {
                    db_name: this.#db_name,
                    collection: collection,
                    new_data: data
                }
            }));
        }
    
        /**
         * The `find` function sends a request to the server to retrieve data from a specified collection
         * in a database, based on a query if provided, and calls a callback function with the retrieved
         * data.
         * @param collection - The name of the collection in the database where the data is stored. It
         * should be a string.
         * @param query - The query parameter is used to specify the conditions for filtering the data in
         * the collection. It can be either a string or an object. If it is a string, it represents a query
         * string that will be sent to the server for filtering the data. If it is an object, it represents
         * a JSON
         * @param callback - The callback parameter is a function that will be called once the data is
         * retrieved from the server. It is used to handle the response and perform any necessary actions
         * with the data.
         */
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
            this.#get_data_callback = callback;
    
            // Send the request to the server
            if(is_query) {
                this.#websocket.send(JSON.stringify({
                    action: `db_action_${this.#dbActions.GET_DATA}`,
                    data: {
                        db_name: this.#db_name,
                        collection: collection,
                        query: query
                    }
                }));
            }else{
                this.#websocket.send(JSON.stringify({
                    action: `db_action_${this.#dbActions.GET_ALL_DATA}`,
                    data: {
                        db_name: this.#db_name,
                        collection: collection,
                    }
                }));
            }
        }
    
        /**
         * The function `updateById` updates a document in a collection based on its UUID.
         * @param collection - The name of the collection in which the document needs to be updated.
         * @param uuid - The unique identifier of the document you want to update in the collection.
         * @param document - The `document` parameter is an object that contains the updated data that you
         * want to apply to the document in the collection.
         * @param callback - The `callback` parameter is a function that will be called once the update
         * operation is completed. It is used to handle the result of the update operation or any errors
         * that may occur during the update.
         */
        updateById(collection, uuid, document, callback) {
            // Validate arguments
            if (typeof callback !== 'function') {
                throw new Error('callback must be a function');
            } else if (typeof collection !== 'string') {
                throw new Error('collection must be a string');
            } else if (typeof uuid !== 'string') {
                throw new Error('uuid must be a string');
            }else if (typeof document !== 'object' && !Array.isArray(document)) {
                throw new Error('document must be an object');
            }
            this.update(collection, `$[?(@._uuid == '${uuid}')]`, document, callback);
        }
    
        /**
         * The function `update` is used to update data in a specified collection using a query and a
         * document, and it sends the update request to a WebSocket server.
         * @param collection - The name of the collection in the database where the update operation will
         * be performed.
         * @param query - The query parameter is a string that represents the query or condition to be used
         * for updating the document(s) in the collection. It specifies which documents should be updated
         * based on certain criteria.
         * @param document - The `document` parameter is an object that represents the data that you want
         * to update in the collection. It should contain the fields and values that you want to update.
         * @param callback - The callback parameter is a function that will be called once the update
         * operation is completed. It is used to handle the result or any errors that occur during the
         * update operation.
         */
        update(collection, query, document, callback) {
            // Validate arguments
            if (typeof callback !== 'function') {
                throw new Error('callback must be a function');
            } else if (typeof collection !== 'string') {
                throw new Error('collection must be a string');
            } else if (typeof query !== 'string') {
                throw new Error('query must be a string');
            }else if (typeof document !== 'object' && !Array.isArray(document)) {
                throw new Error('document must be an object');
            }
    
            this.#update_data_callback = callback;
    
            let update_data_arr = utils.convertToDotNotation(document);
    
            this.#websocket.send(JSON.stringify({
                action: `db_action_${this.#dbActions.UPDATE_DATA}`,
                data: {
                    db_name: this.#db_name,
                    collection: collection,
                    query: query,
                    update: update_data_arr
                }
            }));
        }
    
        /**
         * The function `deleteById` deletes an item from a collection based on its UUID.
         * @param collection - The name of the collection from which you want to delete an item.
         * @param uuid - The unique identifier of the item to be deleted from the collection.
         * @param callback - The callback parameter is a function that will be called once the deletion
         * operation is complete. It is used to handle the result of the deletion operation or any errors
         * that may occur.
         */
        deleteById(collection, uuid, callback) {
            // Validate arguments
            if (typeof callback !== 'function') {
                throw new Error('callback must be a function');
            } else if (typeof collection !== 'string') {
                throw new Error('collection must be a string');
            } else if (typeof uuid !== 'string') {
                throw new Error('uuid must be a string');
            }
            this.delete(collection, `$[?(@._uuid == '${uuid}')]`, callback);
        }
    
        /**
         * The delete function is used to delete data from a specified collection in a database using a
         * query.
         * @param collection - The collection parameter is a string that represents the name of the
         * collection in the database from which you want to delete data.
         * @param query - The query parameter is a string that represents the query to be executed for
         * deleting data from the specified collection in the database. It is used to specify the criteria
         * for selecting the documents to be deleted.
         * @param callback - The callback parameter is a function that will be called once the delete
         * operation is completed. It is used to handle the result or any errors that occur during the
         * operation.
         */
        delete(collection, query, callback) {
            // Validate arguments
            if (typeof callback !== 'function') {
                throw new Error('callback must be a function');
            } else if (typeof collection !== 'string') {
                throw new Error('collection must be a string');
            } else if (typeof query !== 'string') {
                throw new Error('query must be a string');
            }
    
            this.#delete_data_callback = callback;
    
            this.#websocket.send(JSON.stringify({
                action: `db_action_${this.#dbActions.DELETE_DATA}`,
                data: {
                    db_name: this.#db_name,
                    collection: collection,
                    query: query
                }
            }));
        }
    }

    return JsonDBAdapter;
}));
