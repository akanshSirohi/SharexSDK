import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { extractPluginUID } from './utils.js';
import JsonDBAdapter from './JsonDBAdapter.js';

class SharexSDK {
    /**
     * This is a constructor function that initializes a WebSocket connection and sets up various
     * properties and methods for managing the connection and handling server actions.
     * @param [options] - An object containing optional parameters for the constructor.
     */
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
            this.preserve_session_id = options.preserve_session_id;
        }else{
            this.preserve_session_id = false;
        }

        // Default debug mode
        this.debug = false;

        if(options.hasOwnProperty('debug')) {
            // Check if debug is a object
            if(typeof options.debug !== 'object' || options.debug === null) {
                throw new Error('debug must be an object');
            }
            // Check if debug has a property called mode
            if(options.debug.hasOwnProperty('host') && typeof options.debug.host == 'string' && options.debug.hasOwnProperty('port')) {
                
                // Hostname
                Object.defineProperty(this, 'hostname', {
                    value: options.debug.host,
                    writable: false
                });

                // Port
                Object.defineProperty(this, 'port', {
                    value: parseInt(options.debug.port),
                    writable: false
                });

                // Package Name
                Object.defineProperty(this, 'package_name', {
                    value: 'debug',
                    writable: false
                });

                // Debug mode
                this.debug = true;
            }else{
                throw new Error('debug must have a property called host and port');
            }
        }

        if(!this.debug) {
            // Hostname
            Object.defineProperty(this, 'hostname', {
                value: window.location.hostname,
                writable: false
            });

            // Port
            Object.defineProperty(this, 'port', {
                value: parseInt(window.location.port),
                writable: false
            });

            // Package Name
            Object.defineProperty(this, 'package_name', {
                value: extractPluginUID(window.location.pathname).replaceAll('-', '.'),
                writable: false
            });
        }
        
        if(!this.preserve_session_id) {
            // UUID for session
            Object.defineProperty(this, 'uuid', {
                value: uuidv4(),
                writable: false
            });
        }else{
            // Check if preserve_session_id is stored in localStorage and is a valid UUID
            if(!localStorage.hasOwnProperty('sharex_sdk_uuid') || !uuidValidate(localStorage.getItem('sharex_sdk_uuid'))) {
                localStorage.setItem('sharex_sdk_uuid', uuidv4());
            }
            // UUID for session retrieved from localStorage
            Object.defineProperty(this, 'uuid', {
                value: localStorage.getItem('sharex_sdk_uuid'),
                writable: false
            }); 
        }

        // Connection Status Bool
        this.connectionStatus = false;

        this.websocket_callbacks = null;
        this.db_instance = null;

        this.reconnect_timer = null;
        this.reconnect_timer_interval = 3000;

        if(options.hasOwnProperty('reconnect_interval')) {
            if(typeof options.reconnect_interval !== 'number') {
                throw new Error('reconnect_interval must be a number');
            }
            this.reconnect_timer_interval = options.reconnect_interval;
        }

        // Public Init Data
        if(options.hasOwnProperty('public_data')) {
            if(typeof options.public_data !== 'object' || options.public_data === null) {
                throw new Error('public_data must be an object');
            }
            this.public_data = options.public_data;
        }else{
            this.public_data = {};
        }


        // Init WebSocket bool
        this.init_websocket = false;

        Object.defineProperty(this, 'serverActions', {
            value: {
                INIT_USER: "init_user",
                UPDATE_USER_DATA: "update_user_data",
                GET_ALL_USERS: "get_all_users",
                RETURN_ALL_USERS: "return_all_users",
                USER_LEFT: "user_left",
                USER_ARRIVE: "user_arrive",
                SEND_MSG: "send_msg",
                MSG_ARRIVE: "msg_arrive",
                GET_PUBLIC_DATA_OF_USER: "get_public_data_of_user",
                RETURN_PUBLIC_DATA_OF_USER: "return_public_data_of_user"
            },
            writable: false
        });

        // Internal Callback Functions
        this.returnAllUsers = null;
        this.returnPublicDataOfUser = null;
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
        this.websocket_callbacks = websocket_callbacks;
        
        // WebSocket Init
        this.websocket = new WebSocket(`ws://${this.hostname}:${this.port + 1}`);
        this.websocket.addEventListener("open", (event) => {
            this.connectionStatus = true;
            this.websocket.send(JSON.stringify({
                action: this.serverActions.INIT_USER,
                package_name: this.package_name,
                data: {
                    uuid: this.uuid,
                    public_data: this.public_data
                }
            }));

            if(this.reconnect_timer !== null) {
                clearTimeout(this.reconnect_timer);
                this.reconnect_timer = null;
                if(this.db_instance !== null) {
                    this.db_instance.updateInternalWebsocket(this.websocket);
                }
                if(this.websocket_callbacks != null) {
                    this.websocket_callbacks('reconnect', event);
                }
            }else{
                if(this.websocket_callbacks != null) {
                    this.websocket_callbacks('open', event);
                }
            }
        });

        this.websocket.addEventListener("error", (event) => {
            if (this.websocket_callbacks != null) {
                this.websocket_callbacks('error', event);
            }
        });

        this.websocket.addEventListener("close", (event) => {
            this.connectionStatus = false;
            this.websocket = null;
            if (this.websocket_callbacks != null) {
                this.websocket_callbacks('close', event);
            }
            
            // Reconnect
            this.reconnect_timer = setTimeout(() => {
                this.init(this.websocket_callbacks);
            }, this.reconnect_timer_interval);
        });

        this.websocket.addEventListener("message", (event) => {
            let data = event.data;
            if(data.length > 0) {data = JSON.parse(data);}else{return;}
            switch (data.action) {
                case this.serverActions.RETURN_ALL_USERS:
                    if (this.returnAllUsers != null) {
                        this.returnAllUsers(data.all_users);
                    }
                    break;
                case this.serverActions.USER_ARRIVE:
                    if (this.websocket_callbacks != null) {
                        this.websocket_callbacks(this.serverActions.USER_ARRIVE, data.user);
                    }
                    break;
                case this.serverActions.USER_LEFT:
                    if (this.websocket_callbacks != null) {
                        this.websocket_callbacks(this.serverActions.USER_LEFT, data);
                    }
                    break;
                case this.serverActions.MSG_ARRIVE:
                    if (this.websocket_callbacks != null) {
                        this.websocket_callbacks(this.serverActions.MSG_ARRIVE, data.message);
                    }
                    break;
                case this.serverActions.RETURN_PUBLIC_DATA_OF_USER:
                    if (this.returnPublicDataOfUser != null) {
                        this.returnPublicDataOfUser(data.public_data);
                    }
                    break;
                default:
                    if(data.action.startsWith('db_action_')) {
                        this.db_instance.websocket_handleDBAction(data);
                    }
            }
        });

        // Init WebSocket bool
        this.init_websocket = true;
    }

    /**
     * The function creates a new instance of a database with the given name and callbacks.
     * @param db_name - The name of the database that you want to create.
     * @param db_callbacks - The db_callbacks parameter is an object that contains callback functions
     * for various database events. These callback functions are used to handle the response or perform
     * certain actions when these events occur.
     * @returns The `db_instance` object is being returned.
     */
    createDBInstance(db_name, db_callbacks) {
        this.db_instance = new JsonDBAdapter(db_name, this.websocket, db_callbacks);
        return this.db_instance;
    }

    /**
     * The function sends a message over a WebSocket connection with a specified UUID and message.
     * @param uuid - The `uuid` parameter is a unique identifier for the message recipient. It is used
     * to specify the recipient of the message.
     * @param msg - The `msg` parameter is a string that represents the message you want to send.
     */
    sendMsg(uuid, msg) {
        if (this.init_websocket) {
            this.websocket.send(JSON.stringify({
                action: this.serverActions.SEND_MSG,
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
        return this.public_data;
    }

    /**
     * The function getMyUUID returns the UUID of the current object.
     * @returns The UUID (Universally Unique Identifier) of the object.
     */
    getMyUUID() {
        return this.uuid;
    }

    /**
     * The function `getAllUsers` sends a request to the server to get all users and returns the result
     * through a callback function.
     * @param callback - The `callback` parameter is a function that will be called once the server
     * responds with the list of all users. It is used to handle the response and perform any necessary
     * actions with the data.
     */
    getAllUsers(callback) {
        if (this.init_websocket) {
            this.websocket.send(JSON.stringify({
                action: this.serverActions.GET_ALL_USERS,
            }));
            this.returnAllUsers = callback;
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
        if (this.init_websocket) {
            this.websocket.send(JSON.stringify({
                action: this.serverActions.GET_PUBLIC_DATA_OF_USER,
                data: {
                    uuid: uuid
                }
            }));
            this.returnPublicDataOfUser = callback;
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
        if(typeof data === 'object' && data !== null) {
            this.public_data = data;
            this.websocket.send(JSON.stringify({
                action: this.serverActions.UPDATE_USER,
                data: {
                    public_data: this.public_data
                }
            }));
        }else{
            throw new Error('Public data must be an object');
        }
    }
}

export default SharexSDK;