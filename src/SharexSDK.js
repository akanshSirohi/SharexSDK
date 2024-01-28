(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['uuid', './utils', './JsonDBAdapter'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('uuid'), require('./utils'), require('./JsonDBAdapter'));
    } else {
        // Browser globals
        root.SharexSDK = factory(root.uuid, root.utils, root.JsonDBAdapter);
    }
}(typeof self !== 'undefined' ? self : this, function (uuid, utils, JsonDBAdapter) {
    class SharexSDK {
        /**
         * This is a constructor function that initializes a WebSocket connection and sets up various
         * properties and methods for managing the connection and handling server actions.
         * @param [options] - An object containing optional parameters for the constructor.
         */

        // List of private variables

        #preserve_session_id = false; // Default preserve_session_id
        #debug = false; // Default debug mode
        #hostname = null; // Default hostname
        #port = null; // Default port
        #package_name = null; // Default package name
        #uuid = null; // Default uuid

        #connectionStatus = false; // Default connection status
        #websocket_callbacks = null; // Default websocket callbacks
        #reconnect_timer = null; // Default reconnect timer
        #reconnect_timer_interval = 3000; // Default reconnect timer interval

        #db_instance = null; // Default db instance

        #public_data = {}; // Default public data
        #init_websocket = false; // Default init websocket

        // List of server actions
        #serverActions = {
            INIT_USER: "init_user",
            UPDATE_USER_DATA: "update_user_data",
            GET_ALL_USERS: "get_all_users",
            RETURN_ALL_USERS: "return_all_users",
            USER_LEFT: "user_left",
            USER_ARRIVE: "user_arrive",
            SEND_MSG: "send_msg",
            MSG_ARRIVE: "msg_arrive",
            GET_PUBLIC_DATA_OF_USER: "get_public_data_of_user",
            RETURN_PUBLIC_DATA_OF_USER: "return_public_data_of_user",
            CREATE_JSON_FILE: "create_json_file",
            RETURN_CREATE_JSON_FILE: "return_create_json_file",
            READ_JSON_FILE: "read_json_file",
            RETURN_READ_JSON_FILE: "return_read_json_file",
        };

        // Internal Callback Functions
        #returnAllUsers = null; // Default return all users
        #returnPublicDataOfUser = null; // Default return public data of user
        #returnCreateJSONFile = null; // Default return create json file
        #returnReadJSONFile = null; // Default return read json file

        // Default websocket
        #websocket = null;

        constructor(options = {}) {
    
            if(typeof options !== 'object' || options === null) {
                throw new Error('options must be an object');
            }
    
            // Preserve session id
            if(options.hasOwnProperty('preserve_session_id')) {
                // Check if preserve_session_id is a boolean
                if(typeof options.preserve_session_id !== 'boolean') {
                    throw new Error('preserve_session_id must be a boolean');
                }
                this.#preserve_session_id = options.preserve_session_id;
            }
    
            if(options.hasOwnProperty('debug')) {
                // Check if debug is a object
                if(typeof options.debug !== 'object' || options.debug === null) {
                    throw new Error('debug must be an object');
                }
                // Check if debug has a property called mode
                if(options.debug.hasOwnProperty('host') && typeof options.debug.host == 'string' && options.debug.hasOwnProperty('port')) {
                    
                    // Hostname
                    this.#hostname = options.debug.host;
    
                    // Port
                    this.#port = parseInt(options.debug.port);
                    
                    // Package Name
                    this.#package_name = 'debug';
    
                    // Debug mode
                    this.#debug = true;
                }else{
                    throw new Error('debug must have a property called host and port');
                }
            }
    
            if(!this.#debug) {
                // Hostname
                this.#hostname = window.location.hostname;
    
                // Port
                this.#port = parseInt(window.location.port);
    
                // Package Name
                this.#package_name = utils.extractPluginUID(window.location.pathname).replaceAll('-', '.');
            }
            
            if(!this.#preserve_session_id) {
                // UUID for session
                this.#uuid = uuid.v4();
            }else{
                // Check if preserve_session_id is stored in localStorage and is a valid UUID
                if(!localStorage.hasOwnProperty('sharex_sdk_uuid') || !uuid.validate(localStorage.getItem('sharex_sdk_uuid'))) {
                    localStorage.setItem('sharex_sdk_uuid', uuid.v4());
                }
                // UUID for session retrieved from localStorage
                this.#uuid = localStorage.getItem('sharex_sdk_uuid')
            }
    
            if(options.hasOwnProperty('reconnect_interval')) {
                if(typeof options.reconnect_interval !== 'number') {
                    throw new Error('reconnect_interval must be a number');
                }
                this.#reconnect_timer_interval = options.reconnect_interval;
            }
    
            // Public Init Data
            if(options.hasOwnProperty('public_data')) {
                if(typeof options.public_data !== 'object' || options.public_data === null || Array.isArray(options.public_data)) {
                    throw new Error('public_data must be an object');
                }
                this.#public_data = options.public_data;
            }
    
            
        }
    
        /**
         * The `init` function initializes a WebSocket connection and sets up event listeners for various
         * WebSocket events.
         * @param [websocket_callbacks=null] - The `websocket_callbacks` parameter is a callback function
         * that allows you to handle different events that occur with the WebSocket connection. It takes
         * two parameters: the event type (e.g., 'open', 'error', 'close', etc.) and the event object
         * itself.
         */
        init(websocket_callbacks = null) {
            this.#websocket_callbacks = websocket_callbacks;
            
            // WebSocket Init
            this.#websocket = new WebSocket(`ws://${this.#hostname}:${this.#port + 1}`);
            this.#websocket.addEventListener("open", (event) => {
                this.#connectionStatus = true;
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.INIT_USER,
                    package_name: this.#package_name,
                    data: {
                        uuid: this.#uuid,
                        public_data: this.#public_data
                    }
                }));
    
                if(this.#reconnect_timer !== null) {
                    clearTimeout(this.#reconnect_timer);
                    this.#reconnect_timer = null;
                    if(this.#db_instance !== null) {
                        this.#db_instance.updateInternalWebsocket(this.#websocket);
                    }
                    if(this.#websocket_callbacks != null) {
                        this.#websocket_callbacks('reconnect', event);
                    }
                }else{
                    if(this.#websocket_callbacks != null) {
                        this.#websocket_callbacks('open', event);
                    }
                }
            });
    
            this.#websocket.addEventListener("error", (event) => {
                if (this.#websocket_callbacks != null) {
                    this.#websocket_callbacks('error', event);
                }
            });
    
            this.#websocket.addEventListener("close", (event) => {
                this.#connectionStatus = false;
                this.#websocket = null;
                if (this.#websocket_callbacks != null) {
                    this.#websocket_callbacks('close', event);
                }
                
                // Reconnect
                this.#reconnect_timer = setTimeout(() => {
                    this.init(this.#websocket_callbacks);
                }, this.#reconnect_timer_interval);
            });
    
            this.#websocket.addEventListener("message", (event) => {
                let data = event.data;
                if(data.length > 0) {data = JSON.parse(data);}else{return;}
                switch (data.action) {
                    case this.#serverActions.RETURN_ALL_USERS:
                        if (this.#returnAllUsers != null) {
                            this.#returnAllUsers(data.all_users);
                        }
                        break;
                    case this.#serverActions.USER_ARRIVE:
                        if (this.#websocket_callbacks != null) {
                            this.#websocket_callbacks(this.#serverActions.USER_ARRIVE, data.user);
                        }
                        break;
                    case this.#serverActions.USER_LEFT:
                        if (this.#websocket_callbacks != null) {
                            this.#websocket_callbacks(this.#serverActions.USER_LEFT, data);
                        }
                        break;
                    case this.#serverActions.MSG_ARRIVE:
                        if (this.#websocket_callbacks != null) {
                            this.#websocket_callbacks(this.#serverActions.MSG_ARRIVE, data.message);
                        }
                        break;
                    case this.#serverActions.RETURN_PUBLIC_DATA_OF_USER:
                        if (this.#returnPublicDataOfUser != null) {
                            this.#returnPublicDataOfUser(data.public_data);
                        }
                        break;
                    case this.#serverActions.RETURN_CREATE_JSON_FILE:
                        if (this.#returnCreateJSONFile != null) {
                            this.#returnCreateJSONFile(data);
                        }
                        break;
                    case this.#serverActions.RETURN_READ_JSON_FILE:
                        if (this.#returnReadJSONFile != null) {
                            this.#returnReadJSONFile(data);
                        }
                        break;
                    default:
                        if(data.action.startsWith('db_action_')) {
                            this.#db_instance.websocket_handleDBAction(data);
                        }
                }
            });
    
            // Init WebSocket bool
            this.#init_websocket = true;
        }
    
        /**
         * The function creates a new instance of a database with the given name and callbacks.
         * @param db_name - The name of the database that you want to create.
         * @param db_callbacks - The db_callbacks parameter is an object that contains callback functions
         * for various database events. These callback functions are used to handle the response or perform
         * certain actions when these events occur.
         * @returns {JsonDBAdapter} db_instance - An instance of JsonDBAdapter.
        */
        createDBInstance(db_name, db_callbacks) {
            this.#db_instance = new JsonDBAdapter(db_name, this.#websocket, db_callbacks);
            return this.#db_instance;
        }
    
        /**
         * The function sends a message over a WebSocket connection with a specified UUID and message.
         * @param uuid - The `uuid` parameter is a unique identifier for the message recipient. It is used
         * to specify the recipient of the message.
         * @param msg - The `msg` parameter is a string that represents the message you want to send.
         */
        sendMsg(uuid, msg) {
            if (this.#init_websocket) {
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.SEND_MSG,
                    data: {
                        uuid: uuid,
                        msg: msg
                    }
                }));
            } else {
                throw new Error('WebSocket not initialized');
            }
        }
    
        /**
         * The function returns the public data.
         * @returns The public_data variable is being returned.
         */
        getMyPublicData() {
            return this.#public_data;
        }

        /**
         * The function returns the connection status.
         * @returns The value of the private variable `connectionStatus` is being returned.
         */
        getConnectionStatus() {
            return this.#connectionStatus;
        }
    
        /**
         * The function getMyUUID returns the UUID of the current object.
         * @returns The UUID (Universally Unique Identifier) of the object.
         */
        getMyUUID() {
            return this.#uuid;
        }
    
        /**
         * The function `getAllUsers` sends a request to the server to get all users and returns the result
         * through a callback function.
         * @param callback - The `callback` parameter is a function that will be called once the server
         * responds with the list of all users. It is used to handle the response and perform any necessary
         * actions with the data.
         */
        getAllUsers(callback) {
            if (this.#init_websocket) {
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.GET_ALL_USERS,
                }));
                this.#returnAllUsers = callback;
            } else {
                throw new Error('WebSocket not initialized');
            }
        }
    
        /**
         * The function sends a request to a server to retrieve public data of a user identified by a UUID,
         * and invokes a callback function with the retrieved data.
         * @param uuid - The `uuid` parameter is a unique identifier for a user. It is used to specify
         * which user's public data should be retrieved.
         * @param callback - The callback parameter is a function that will be called once the public data
         * of the user is retrieved. It is typically used to handle the response or perform additional
         * actions with the data.
         */
        requestPublicData(uuid, callback) {     
            if (this.#init_websocket) {
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.GET_PUBLIC_DATA_OF_USER,
                    data: {
                        uuid: uuid
                    }
                }));
                this.#returnPublicDataOfUser = callback;
            } else {
                throw new Error('WebSocket not initialized');
            }
        }
    
        /**
         * The function updates the public data and sends it to the server via a websocket.
         * @param data - The `data` parameter is the new public data that you want to update. It should be
         * an object containing the updated information.
         */
        updateMyPublicData(data) {
            if(typeof data === 'object' && data !== null && !Array.isArray(data)) {
                this.#public_data = data;
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.UPDATE_USER,
                    data: {
                        public_data: this.#public_data
                    }
                }));
            }else{
                throw new Error('Public data must be an object');
            }
        }

        /**
         * The function `createJSONFile` takes in a filename, data, and callback function, and sends a
         * WebSocket request to create a JSON file with the given filename and data.
         * @param filename - The name of the JSON file you want to create. It should be a string.
         * @param data - The `data` parameter is the JSON data that you want to write to the file. It
         * can be either an object or an array.
         * @param callback - The callback parameter is a function that will be called once the JSON
         * file creation is complete. It is used to handle the result or any errors that may occur
         * during the process.
         */
        createJSONFile(filename, data, callback) {
            if(typeof filename !== 'string') {
                throw new Error('Filename must be a string');
            }
            // Check if data is either an object or an array
            if(typeof data !== 'object' || data === null) {
                throw new Error('Data must be an object or an array');
            }
            if(typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }
            this.#returnCreateJSONFile = callback;
            this.#websocket.send(JSON.stringify({
                action: this.#serverActions.CREATE_JSON_FILE,
                data: {
                    filename: filename,
                    data: data
                }
            }));
        }

        /**
         * The function `readJSONFile` sends a request to a server to read a JSON file and returns the
         * result through a callback function.
         * @param filename - The filename parameter is a string that represents the name of the JSON
         * file that you want to read.
         * @param callback - The `callback` parameter is a function that will be called once the JSON
         * file has been read. It is used to handle the data returned from reading the file.
         */
        readJSONFile(filename, callback) {
            if(typeof filename !== 'string') {
                throw new Error('Filename must be a string');
            }
            if(typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }
            this.#returnReadJSONFile = callback;
            this.#websocket.send(JSON.stringify({
                action: this.#serverActions.READ_JSON_FILE,
                data: {
                    filename: filename
                }
            }));
        }

    }

    return SharexSDK;
}));