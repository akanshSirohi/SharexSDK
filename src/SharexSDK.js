import { v4 as uuidv4 } from 'uuid';
import { extractPluginUID } from './utils.js';

class SharexSDK {

    /**
     * This is a constructor function that initializes a WebSocket connection and sets up various
     * properties and methods for managing the connection and handling server actions.
     * @param [public_data] - An object that contains public data for the constructor.
     */
    constructor(public_data = {}) {

        if(typeof public_data !== 'object' || public_data === null) {
            throw new Error('Public data must be an object');
        }

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
        
        // UUID for session
        Object.defineProperty(this, 'uuid', {
            value: uuidv4(),
            writable: false
        });

        // Connection Status Bool
        this.connectionStatus = false;

        // Public Init Data
        this.public_data = public_data;

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

        // Package Name
        Object.defineProperty(this, 'package_name', {
            value: extractPluginUID(window.location.pathname).replaceAll('-', '.'),
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

            if (websocket_callbacks != null) {
                websocket_callbacks('open', event);
            }
        });

        this.websocket.addEventListener("error", (event) => {
            if (websocket_callbacks != null) {
                websocket_callbacks('error', event);
            }
        });

        this.websocket.addEventListener("close", (event) => {
            this.connectionStatus = false;

            if (websocket_callbacks != null) {
                websocket_callbacks('close', event);
            }
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
                    if (websocket_callbacks != null) {
                        websocket_callbacks(this.serverActions.USER_ARRIVE, data.user);
                    }
                    break;
                case this.serverActions.USER_LEFT:
                    if (websocket_callbacks != null) {
                        websocket_callbacks(this.serverActions.USER_LEFT, data);
                    }
                    break;
                case this.serverActions.MSG_ARRIVE:
                    if (websocket_callbacks != null) {
                        websocket_callbacks(this.serverActions.MSG_ARRIVE, data.message);
                    }
                    break;
                case this.serverActions.RETURN_PUBLIC_DATA_OF_USER:
                    if (this.returnPublicDataOfUser != null) {
                        this.returnPublicDataOfUser(data.public_data);
                    }
                    break;
            }
        });

        // Init WebSocket bool
        this.init_websocket = true;
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