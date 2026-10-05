# SharexSDK Documentation

The SharexSDK library is a JavaScript library that facilitates communication between clients and servers using WebSocket technology. It provides an abstraction for handling common actions in a WebSocket-based application. It also provides the functionality to access JSON based DB functions out of the box that is designed to work with sharex only. This library is designed to develop the ShareX app plugins only.

## Live plugin development (1.2.1)

Run ShareX on your phone and start sharing. In Settings, enable **Plugin development** and run your plugin's dev server. Initialize the SDK in development mode; it adds a draggable ShareX logo bubble to the page. The bubble snaps with a short bounce into one of the four corners. Its popup opens inward from that corner and closes while the bubble moves. Open it, paste the connection copied from ShareX Settings, and connect. The popup shows connection and reconnect state. Its styles stay inside the SDK's Shadow DOM and do not affect the plugin UI.

```js
const sdk = new SharexSDK({
    development: { package_name: 'sharex.starter.plugin' },
    public_data: { name: 'My browser' }
});
sdk.init((action, data) => {
    if (action === 'open') {
        sdk.getAllUsers(console.log);
    }
});
// On component cleanup or when changing the connection:
sdk.disconnect();
```

The SDK bubble keeps the connection key out of plugin source. To supply a connection in code, set `development.server_url` and `development.package_name`. The bubble then shows that the connection was provided in code and reports status without an input field. Never commit a real development key.

The HTTP server uses the app's configured port; WebSocket uses that port plus one. HTTP selects `ws://`, HTTPS selects `wss://`. The development key permits the `/__sharex_dev` socket endpoint only and is rechecked on every message. The app binds each development connection to `dev.<package_name>` to keep messaging and database data separate from installed plugins. Disable development or reset the key to revoke clients. Do not embed this key in a static build.

Installed plugins should create `new SharexSDK({ public_data: {...} })` inside browser code. The SDK infers the ShareX host, protocol, port, and plugin package from `/SharexApp/<plugin-uid>/`. These connections retain normal browser approval and password checks. Create database instances only after `open`; database connections are reinitialized on reconnect. `publicData` is accepted as an alias for `public_data`. `connectionStatus` and `getConnectionStatus()` both report whether the socket is open.

`preserve_session_id: true` uses a host/package-scoped sessionStorage key. Refreshing a tab preserves its identity; independent tabs do not share one UUID.

The legacy `debug: { host, port }` option remains supported for authorized same-origin clients. For development from another origin, use `development` or include `token` and `package_name` in `debug`. Add `secure: true` to legacy debug options for HTTPS. HTTP ports must be between 1 and 65534 because the next port is reserved for WebSocket.

In Next.js, initialize inside an effect and call `sdk.disconnect()` in its cleanup. This prevents duplicate connections and retry timers during Fast Refresh or React Strict Mode. The [Next.js starter](https://github.com/akanshSirohi/ShareX-Plugins/tree/master/sharex.starter.plugin) includes live messaging, persistent notes, and a static ZIP build.

For local SDK development, the plugins starter aliases `sharex-sdk` to `../../SharexSDK/src/SharexSDK.js` only in its Next.js dev server. Its production build and package metadata continue to use the published npm version. The SDK package entry points at `src/SharexSDK.js`; `npm run build` produces the UMD browser bundle with the `SharexSDK` global and a source map. `npm pack` builds that bundle before packaging.

### Install the SDK

To use the SharexSDK library, you need to include it in your project. You can install it using npm or yarn:

```bash
npm install sharex-sdk
# or
yarn add sharex-sdk
```

or can be used directly from CDN

```html
<script src="https://cdn.jsdelivr.net/npm/sharex-sdk/dist/sharex-sdk.min.js"></script>
```

After installation, you can import the library into your project:

```js
import SharexSDK from 'sharex-sdk';
```

## Usage

The `SharexSDK` class can be used to create a new client instance. The constructor takes a single argument, which is an object containing the public data that will be sent to the server when the connection is established.

```js
const options = { 
    public_data: { username: 'JohnDoe' }, // optional
    preserve_session_id: true, // optional
    debug: {
        host: 'IP from ShareX app',
        port: 'Port from ShareX app',
    }, // optional
    reconnect_interval: 3000, // optional
 };
const sdk = new SharexSDK(options);
```


- The `publicData` object can be used to store any data, it will be stored on the server for as long as the connection is active and will be accessible to every other client connected to the server for the same plugin.
- The `preserve_session_id` option can be used to preserve the session id of the user. If this option is set to true, the session id will be preserved and the user will be able to reconnect to the server using the same session id. If this option is set to false, the session id will be regenerated every time the user reconnects to the server.
- Omit `debug` for installed plugins. Use `development: { package_name }` when running a plugin from a PC dev server; enter copied connection in the SDK bubble. Legacy `debug` is an object, not a boolean; include a token for cross-origin development.
- The `reconnect_interval` option can be used to set the interval between reconnection attempts. The default value is 3000 milliseconds.


### Basic SDK Methods

#### 1. Initialization:

```js
init(websocket_callbacks)
```

Initializes a WebSocket connection and sets up event listeners for various WebSocket events.

<b>Parameters:-</b>

websocket_callbacks (optional): A function called with `(action, data)`. `msg_arrive` passes the message itself; `user_arrive` passes the user object; `user_left` passes an object with a `uuid` field. `open`, `close`, `error`, and `reconnect` pass the browser event.

List of WebSocket events:
```
// Special events
'user_left': Called when a user leaves the server.
'user_arrive': Called when a user joins the server.
'msg_arrive': Called when a message is received from the server.

// WebSocket events
'open': Called when the WebSocket connection is established.
'error': Called when the WebSocket connection encounters an error.
'close': Called when the WebSocket connection is closed.
'reconnect': Called when the WebSocket connection is reconnected.
```

#### 2. Send Message:

```js
sendMsg(uuid, msg)
```

Sends a message over the WebSocket connection with a specified UUID and message. The UUID is used to send the message to a specific client, while the message is the data that will be sent to the client.

<b>Parameters:-</b>

```
uuid: A unique identifier for the message recipient.
msg: The message to be sent.
```

#### 3. Get list of connected clients:

```js
getAllUsers(callback)
```

Sends a request to the server to get all users and returns the result through a callback function.

Sample usage:-
```js
sdk.getAllUsers((allUsers) => {
  console.log('All users:', allUsers);
  // Do something with the list of all users
  // allUsers is an array of objects with the following structure:
    // {
    //   uuid: 'abcd-1234',
    //   public_data: { username: 'JohnDoe' }
    // }
});
```

<b>Parameters:-</b>

```
callback: A function to handle the response and perform actions with the list of all users.
```

#### 4. Get public data

```js
getMyPublicData()
```

Returns the public data associated with the current session.

#### 5. Get UUID
    
```js
getMyUUID()
```

Returns the UUID (Universally Unique Identifier) of the current session.

#### 6. Update public data

```js
updateMyPublicData(data)
```

Updates the public data and sends it to the server via WebSocket.

<b>Parameters:-</b>

```
data: The new public data to be updated.
```

#### 7. Request public data of user

```js
requestPublicData(uuid, callback)
```

Sends a request to the server to get the public data of a specific user and returns the result through a callback function.

<b>Parameters:-</b>

```
uuid: The UUID of the user whose public data is to be requested.
callback: A function to handle the response and perform actions with the public data.
```

Sample usage:-

```js
const recipientUUID = 'abcd-1234'; // Replace with the actual UUID
sdk.requestPublicData(recipientUUID, (publicData) => {
  console.log('Public data:', publicData);
  // Do something with the public data
});
```

### USAGE EXAMPLE 1

```js
import SharexSDK from 'sharex-sdk';

const publicData = { username: 'JohnDoe' };
const sdk = new SharexSDK({ public_data: publicData });

sdk.init((eventType, event) => {
  console.log(`WebSocket event: ${eventType}`, event);
  if (eventType === 'open' || eventType === 'reconnect') {
    sdk.getAllUsers((allUsers) => {
      console.log('All users:', allUsers);
      allUsers.filter((user) => user.uuid !== sdk.getMyUUID())
        .forEach((user) => sdk.sendMsg(user.uuid, 'Hello, world!'));
    });
  }
});
```


### USAGE EXAMPLE 2

```js
let all_users = []; 

const sdk = new SharexSDK({
    public_data: { name: "Test User" }
});

sdk.init((action, data)=>{
    if(action == 'user_left') {
        console.log("A User Left:", data);
    }else if(action == 'msg_arrive') {
        console.log("A Message Arrived:", data);
    }else if(action == 'user_arrive') {
        console.log("A User Arrived:", data);
    }
});

// Get all users
function getAllUsers() {
    if(sdk.connectionStatus) {
        sdk.getAllUsers((users)=>{
            all_users = users;
        });
    }
}

// Send a message to all users except the sender
function sendAll() {
    if(sdk.connectionStatus) {
        const msg = "Hello, world!";
        const my_uuid = sdk.getMyUUID();
        all_users.forEach((user)=>{
            if(user.uuid != my_uuid) {
                sdk.sendMsg(user.uuid, msg);
            }
        });
    }
}
```

### JSON Based DB Methods

JSON DB works by storing multiple objects in an array and then performing operations on it. The DB is stored in the following format:-
    
```json
{
    "collection_name": [
        {
            "key": "value"
        },
        {
            "key": "value"
        },
        ...other documents (objects)
    ],
    "collection_name_2": [
        ...other documents (objects)
    ]
}
```

#### 1. Create a new database instance


```js
sdk.createDBInstance(db_name, callback)
```

Creates a new database instance and returns the result through a callback function. The single database instance can only be created once per session. Use this method once the sdk is initialized, not before.

<b>Parameters:-</b>

```
db_name: The name of the database instance.
callback: A function to handle the response and perform actions after the DB get initiated.
```

Exapmle usage:-

```js
const my_db_instance = sdk.createDBInstance('my_db', (action, data) => {
    console.log(`Database event: ${action}`, data);
    // Now you can perform actions with the database instance
});
```

#### 2. Insert one or many docs in DB

```js
my_db_instance.insert(collection_name, docs, options, callback)
```

Inserts one or many documents in the specified collection of the database instance and returns the result through a callback function. If the collection does not exist, it will be created automatically.

<b>Parameters:-</b>

`docs`: The document(s) to be inserted in the collection. It can be a single object or an array of objects.<br>

`options`: An object containing the following options:
```
{
    "uuid": true|false, // optional
}
```

If the `uuid` option is set to true, a UUID will be generated for each document and will be stored in the `_uuid` field. If the `uuid` option is set to false, the `_uuid` field will be omitted from the document(s).<br>

`callback`: A function to handle the response and perform actions after the document(s) are inserted in the collection. It also returns the UUID(s) of the inserted document(s) if the `uuid` option is set to true.

#### 3. Find one or many docs in DB

```js
my_db_instance.find(collection_name, query, callback)
```

Finds one or many documents in the specified collection of the database instance and returns the result through a callback function.

<b>Parameters:-</b>

`collection_name`: The name of the collection in which the documents are to be found.<br>

`query`: This is a query string that have predefined operators to find the documents. JSONPath is used to query the documents. You can find the documentation of JSONPath [here](https://github.com/json-path/JsonPath).<br>
Please note that the query will be applied on an array so it should be written accordingly. 
For example, if you want to find a document with `some_key` field equal to `abcd-1234`, you can write the query as `$[?(@.some_key == 'abcd-1234')]`.<br>

`callback`: A function to handle the response and perform actions after the document(s) are found in the collection.

Example usage:-

```js
const query = "$[?(@.some_key == 'abcd-1234')]";
my_db_instance.find('my_collection', query, (response) => {
    console.log('Found document(s):', response);
    // Now you can perform actions with the found document(s)
});
```

#### 4. Find document by UUID

```js
my_db_instance.findById(collection_name, uuid, callback)
```

Finds a document in the specified collection of the database instance by its UUID and returns the result through a callback function. Can only be used if the `uuid` option is set to true while inserting the document.

<b>Parameters:-</b>

`collection_name`: The name of the collection in which the document is to be found.<br>
`uuid`: The UUID of the document to be found.<br>
`callback`: A function to handle the response and perform actions after the document is found in the collection.

Example usage:-

```js
const uuid = 'abcd-1234'; // Replace with the actual UUID
my_db_instance.findById('my_collection', uuid, (response) => {
    console.log('Found document:', response);
    // Now you can perform actions with the found document
});
```

#### 5. Update one or many docs in DB

```js
my_db_instance.update(collection_name, query, updated_doc, callback)
```

Updates one or many documents in the specified collection of the database instance and returns the result through a callback function.

<b>Parameters:-</b>

`collection_name`: The name of the collection in which the documents are to be updated.<br>
`query`: This is a query string that have predefined operators to find the documents. JSONPath is used to query the documents.<br>
`updated_doc`: The updated document(s) to be inserted in the collection. It should be a single object.<br>
`callback`: A function to handle the response and perform actions after the document(s) are updated in the collection.

Example usage:-

```js
const query = "$[?(@.some_key == 'abcd-1234')]";
const updated_doc = { 
    some_obj: {
        some_key: 'abc',
        some_other_key: 'def'
    } 
};
my_db_instance.update('my_collection', query, updated_doc, (response) => {
    console.log('Updated document(s) response:', response);
});
```

#### 6. Update document by UUID

```js
my_db_instance.updateById(collection_name, uuid, updated_doc, callback)
```

Updates a document in the specified collection of the database instance by its UUID and returns the result through a callback function. Can only be used if the `uuid` option is set to true while inserting the document.

<b>Parameters:-</b>

`collection_name`: The name of the collection in which the document is to be updated.<br>
`uuid`: The UUID of the document to be updated.<br>
`updated_doc`: The updated document to be inserted in the collection. It should be a single object.<br>
`callback`: A function to handle the response and perform actions after the document is updated in the collection.

Example usage:-

```js
const uuid = 'abcd-1234'; // Replace with the actual UUID
const updated_doc = { 
    some_obj: {
        some_key: 'abc',
        some_other_key: 'def'
    } 
};
my_db_instance.updateById('my_collection', uuid, updated_doc, (response) => {
    console.log('Updated document response:', response);
});
```

#### 7. Delete one or many docs in DB

```js
my_db_instance.delete(collection_name, query, callback)
```

Deletes one or many documents in the specified collection of the database instance and returns the result through a callback function.

<b>Parameters:-</b>

`collection_name`: The name of the collection in which the documents are to be deleted.<br>
`query`: This is a query string that have predefined operators to find the documents. JSONPath is used to query the documents.<br>
`callback`: A function to handle the response and perform actions after the document(s) are deleted from the collection.

Example usage:-

```js
const query = "$[?(@.some_key == 'abcd-1234')]";
my_db_instance.delete('my_collection', query, (response) => {
    console.log('Deleted document(s) response:', response);
});
```

#### 8. Delete document by UUID

```js
my_db_instance.deleteById(collection_name, uuid, callback)
```

Deletes a document in the specified collection of the database instance by its UUID and returns the result through a callback function. Can only be used if the `uuid` option is set to true while inserting the document.

<b>Parameters:-</b>

`collection_name`: The name of the collection in which the document is to be deleted.<br>
`uuid`: The UUID of the document to be deleted.<br>
`callback`: A function to handle the response and perform actions after the document is deleted from the collection.

Example usage:-

```js
const uuid = 'abcd-1234'; // Replace with the actual UUID
my_db_instance.deleteById('my_collection', uuid, (response) => {
    console.log('Deleted document response:', response);
});
```

--------------------------------------------
<b>⚠️ IMPORTANT</b>
1. This library is designed to develop the ShareX app plugins only.
2. This library is not designed to work with the ShareX app directly. It is designed to work with the ShareX app plugins only.
3. This library is still in development and in beta version, there may be some bugs. If you find any bug, please create an issue on the GitHub repository.
4. This library might still have some functionality missing. If you want to request a feature, please create an issue on the GitHub repository.
5. There is a minor issue in `update` function in this library, if key doesn't exist in the document, it will not be added to the document on update. This issue is there because of the JSONPath library, which is used to query the documents. I will try to fix this issue in the later versions.
6. There might be some documentation errors. If you find any error, please create an issue on the GitHub repository or you can also create a pull request to fix the error.
--------------------------------------------
