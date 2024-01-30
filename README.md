# SharexSDK Documentation

The SharexSDK library is a JavaScript library that facilitates communication between clients and servers using WebSocket technology. It provides an abstraction for handling common actions in a WebSocket-based application. It also provides the functionality to access JSON based DB functions out of the box that is designed to work with sharex only. This library is designed to develop the ShareX app plugins only.

## Installation

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
    publicData: { username: 'JohnDoe' } // optional
    preserve_session_id: true|false, // optional
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
- The `debug` option can be used to enable debugging mode. If this option is set to true, the SDK will use the host and port specified in the `debug` object to connect to the server. If this option is set to false, the SDK will use the default host and port to connect to the server. The default host and port will picked from the URL of the app.<br><b>You should enable debugging mode if you are running the plugin on PC IDE, otherwise the SDK will not be able to connect to the server. You can disable debugging mode when you are running the plugin on the ShareX app.</b>
- The `reconnect_interval` option can be used to set the interval between reconnection attempts. The default value is 3000 milliseconds.


### Basic SDK Methods

#### 1. Initialization:

```js
init(websocket_callbacks)
```

Initializes a WebSocket connection and sets up event listeners for various WebSocket events.

<b>Parameters:-</b>

websocket_callbacks (optional): A callback function to handle different WebSocket events including `onopen`, `onclose`, `onerror`, and `onmessage`. The callback function will be passed a single argument, which is the event object.

List of WebSocket events:
```
// Special events
'user_left': Called when a user leaves the server.
'user_arrive': Called when a user joins the server.
'msg_arrive': Called when a message is received from the server.

// WebSocket events
'open': Called when the WebSocket connection is established.
'error': Called when the WebSocket connection is closed.
'close': Called when an error occurs in the WebSocket connection.
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
    //   publicData: { username: 'JohnDoe' }
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
const sdk = new SharexSDK(publicData);

sdk.init((eventType, event) => {
  console.log(`WebSocket event: ${eventType}`, event);
});

sdk.getAllUsers((allUsers) => {
  console.log('All users:', allUsers);
});

const recipientUUID = 'abcd-1234'; // Replace with the actual UUID
const message = 'Hello, world!';
sdk.sendMsg(recipientUUID, message);
```


### USAGE EXAMPLE 2

```js
let all_users = []; 

const sdk = new SharexSDK({
    name: "Test User"
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
--------------------------------------------