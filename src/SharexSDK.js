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

        // List of private variables
        #preserve_session_id = false; // Default preserve_session_id
        #socket_url = null;
        #has_connected = false;
        #stopped = false;
        #package_name = null; // Default package name
        #uuid = null; // Default uuid

        #connectionStatus = false; // Default connection status
        #websocket_callbacks = null; // Default websocket callbacks
        #reconnect_timer = null; // Default reconnect timer
        #reconnect_timer_interval = 3000; // Default reconnect timer interval

        #db_instance = null; // Default db instance
        #development = false;
        #development_package = null;
        #development_control = null;

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
                this.#preserve_session_id = options.preserve_session_id;
            }
    
            const connection = utils.connectionOptions(options, typeof window === 'undefined' ? null : window.location);
            this.#socket_url = connection.socketUrl;
            this.#package_name = connection.packageName;
            this.#development = options.development !== undefined;
            this.#development_package = this.#development ? (options.development.package_name || options.package_name) : null;
            
            if(!this.#preserve_session_id) {
                // UUID for session
                this.#uuid = uuid.v4();
            }else{
                // Preserve identity across refreshes, without sharing it between browser tabs.
                if(!uuid.validate(sessionStorage.getItem(connection.sessionKey))) {
                    sessionStorage.setItem(connection.sessionKey, uuid.v4());
                }
                this.#uuid = sessionStorage.getItem(connection.sessionKey);
            }
    
            if(options.hasOwnProperty('reconnect_interval')) {
                if(!Number.isFinite(options.reconnect_interval) || options.reconnect_interval <= 0) {
                    throw new Error('reconnect_interval must be a positive finite number');
                }
                this.#reconnect_timer_interval = options.reconnect_interval;
            }
    
            // Public Init Data
            const publicData = options.public_data ?? options.publicData;
            if(publicData !== undefined) {
                if(typeof publicData !== 'object' || publicData === null || Array.isArray(publicData)) {
                    throw new Error('public_data must be an object');
                }
                this.#public_data = publicData;
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
            if (websocket_callbacks !== null && typeof websocket_callbacks !== 'function') throw new Error('websocket_callbacks must be a function');
            this.#websocket_callbacks = websocket_callbacks;
            if (this.#websocket !== null) return;
            if (this.#development) this.#mountDevelopmentControl();
            if (!this.#socket_url) {
                this.#setDevelopmentStatus('Paste connection copied from ShareX settings');
                return;
            }
            this.#stopped = false;
            if (this.#reconnect_timer !== null) {
                clearTimeout(this.#reconnect_timer);
                this.#reconnect_timer = null;
            }
            
            // WebSocket Init
            const socket = new WebSocket(this.#socket_url);
            this.#websocket = socket;
            this.#websocket.addEventListener("open", (event) => {
                if (this.#websocket !== socket || this.#stopped) return;
                this.#connectionStatus = true;
                this.#setDevelopmentStatus('Connected to ShareX', 'online');
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.INIT_USER,
                    package_name: this.#package_name,
                    data: {
                        uuid: this.#uuid,
                        public_data: this.#public_data
                    }
                }));
    
                if(this.#has_connected) {
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
                this.#has_connected = true;
            });
    
            this.#websocket.addEventListener("error", (event) => {
                if (this.#websocket !== socket) return;
                this.#setDevelopmentStatus('Connection failed. Check sharing, connection string, and network.', 'error');
                if (this.#websocket_callbacks != null) {
                    this.#websocket_callbacks('error', event);
                }
            });
    
            this.#websocket.addEventListener("close", (event) => {
                if (this.#websocket !== socket) return;
                this.#connectionStatus = false;
                this.#setDevelopmentStatus('Disconnected. Retrying…');
                this.#init_websocket = false;
                this.#websocket = null;
                if (this.#websocket_callbacks != null) {
                    this.#websocket_callbacks('close', event);
                }
                
                // Reconnect
                if (!this.#stopped) this.#reconnect_timer = setTimeout(() => {
                    if (!this.#stopped) this.init(this.#websocket_callbacks);
                }, this.#reconnect_timer_interval);
            });
    
            this.#websocket.addEventListener("message", (event) => {
                if (this.#websocket !== socket) return;
                let data = event.data;
                try { data = JSON.parse(data); } catch { return; }
                if (!data || typeof data.action !== 'string') return;
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
                        if(data.action.startsWith('db_action_') && this.#db_instance !== null) {
                            this.#db_instance.websocket_handleDBAction(data);
                        }
                }
            });
    
            // Init WebSocket bool
            this.#init_websocket = true;
        }

        /** Close the connection and cancel retries, including React effect cleanup. */
        disconnect() {
            this.#stopped = true;
            clearTimeout(this.#reconnect_timer);
            this.#reconnect_timer = null;
            const socket = this.#websocket;
            this.#websocket = null;
            this.#connectionStatus = false;
            this.#init_websocket = false;
            if (socket) socket.close();
            this.#has_connected = false;
            this.#db_instance = null;
            this.#development_control?.host.remove();
            this.#development_control = null;
        }

        #setDevelopmentStatus(message, state = 'idle') {
            if (!this.#development_control) return;
            this.#development_control.status.textContent = message;
            this.#development_control.status.dataset.state = state;
        }

        #mountDevelopmentControl() {
            if (this.#development_control || typeof document === 'undefined' || !document.body) return;
            const host = document.createElement('div');
            host.style.cssText = 'position:fixed;z-index:2147483647;left:18px;bottom:18px;font:14px/1.4 system-ui,sans-serif;color:#17212b';
            const root = host.attachShadow({ mode: 'open' });
            root.innerHTML = `<style>
                *{box-sizing:border-box} .bubble{width:54px;height:54px;border:0;border-radius:18px;background:linear-gradient(145deg,#137f78,#075a65);color:white;font-weight:800;font-size:18px;box-shadow:0 8px 28px #061b2d55;cursor:grab;touch-action:none}
                .panel{position:absolute;left:0;bottom:66px;width:min(340px,calc(100vw - 32px));padding:18px;border:1px solid #dce4eb;border-radius:18px;background:#fff;box-shadow:0 18px 55px #061b2d33;display:none;color:#17212b}
                .panel[open]{display:block}.top{display:flex;align-items:center;gap:10px;margin-bottom:14px}.badge{width:34px;height:34px;border-radius:11px;background:#e5f5f2;color:#08766b;display:grid;place-items:center;font-weight:800}.title{font-weight:750;font-size:15px}.sub{font-size:12px;color:#647482;margin-top:2px}label{display:block;font-size:12px;font-weight:650;margin:14px 0 6px}input{width:100%;padding:11px 12px;border:1px solid #ccd7df;border-radius:10px;font:13px system-ui;color:#17212b;background:#fff}button.connect{width:100%;margin-top:9px;padding:11px;border:0;border-radius:10px;background:#08766b;color:#fff;font-weight:700;cursor:pointer}.status{font-size:12px;color:#566773;background:#f3f6f8;padding:10px 11px;border-radius:10px;margin-top:12px;overflow-wrap:anywhere}.status[data-state=online]{color:#087255;background:#e8f7ef}.status[data-state=error]{color:#a83232;background:#fff0f0}.provided{display:none;font-size:12px;color:#647482;margin-top:11px}.provided[hidden]{display:none}.provided:not([hidden]){display:block}.close{position:absolute;right:13px;top:12px;border:0;background:none;font-size:20px;color:#71818d;cursor:pointer}
            </style><button class="bubble" aria-label="ShareX development" title="ShareX development">S</button><section class="panel" aria-label="ShareX development connection"><button class="close" aria-label="Close">×</button><div class="top"><div class="badge">S</div><div><div class="title">ShareX development</div><div class="sub">Connect this browser to your phone</div></div></div><form><label for="connection">Development connection</label><input id="connection" type="password" autocomplete="off" spellcheck="false" placeholder="Paste connection from ShareX" required><button class="connect" type="submit">Connect</button></form><div class="provided" hidden>Connection string provided in code</div><div class="status" role="status">Waiting for connection</div></section>`;
            const bubble = root.querySelector('.bubble'), panel = root.querySelector('.panel'), form = root.querySelector('form'), input = root.querySelector('input');
            const status = root.querySelector('.status');
            const provided = root.querySelector('.provided');
            const close = root.querySelector('.close');
            const hasConnection = Boolean(this.#socket_url);
            form.hidden = hasConnection;
            provided.hidden = !hasConnection;
            bubble.addEventListener('click', () => { if (!host.dataset.dragged) panel.toggleAttribute('open'); host.dataset.dragged = ''; });
            close.addEventListener('click', () => panel.removeAttribute('open'));
            let drag;
            bubble.addEventListener('pointerdown', event => { drag = { x: event.clientX, y: event.clientY, left: host.offsetLeft, top: host.offsetTop }; bubble.setPointerCapture(event.pointerId); });
            bubble.addEventListener('pointermove', event => { if (!drag) return; const dx = event.clientX - drag.x, dy = event.clientY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 4) host.dataset.dragged = 'yes'; host.style.left = `${Math.max(0, Math.min(innerWidth - 54, drag.left + dx))}px`; host.style.top = `${Math.max(0, Math.min(innerHeight - 54, drag.top + dy))}px`; host.style.bottom = 'auto'; });
            bubble.addEventListener('pointerup', () => { drag = null; });
            form.addEventListener('submit', event => {
                event.preventDefault();
                try {
                    const parsed = new URL(input.value.trim());
                    const config = utils.connectionOptions({ development: { server_url: parsed.href, package_name: this.#development_package } });
                    this.#socket_url = config.socketUrl;
                    this.#package_name = config.packageName;
                    form.hidden = true; provided.hidden = false;
                    this.#setDevelopmentStatus('Connecting to ShareX…');
                    this.init(this.#websocket_callbacks);
                } catch (error) { this.#setDevelopmentStatus(error.message, 'error'); }
            });
            document.body.appendChild(host);
            this.#development_control = { host, status };
            if (hasConnection) this.#setDevelopmentStatus('Connection string provided in code');
        }

        get connectionStatus() { return this.#connectionStatus; }
    
        /**
         * The function creates a new instance of a database with the given name and callbacks.
         * @param db_name - The name of the database that you want to create.
         * @param db_callbacks - The db_callbacks parameter is an object that contains callback functions
         * for various database events. These callback functions are used to handle the response or perform
         * certain actions when these events occur.
         * @returns {JsonDBAdapter} db_instance - An instance of JsonDBAdapter.
        */
        createDBInstance(db_name, db_callbacks) {
            if (!this.#connectionStatus) throw new Error('WebSocket not connected');
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
            if (this.#connectionStatus) {
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
            if (this.#connectionStatus) {
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
            if (this.#connectionStatus) {
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
