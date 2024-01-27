# SharexSDK Documentation

The SharexSDK library is a JavaScript library that facilitates communication between clients and servers using WebSocket technology. It provides an abstraction for handling common actions in a WebSocket-based application. It also provides the functionality to access Json based DB functions that is designed to work with sharex only. This library is designed to develop the ShareX app plugins only.

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
const publicData = { /* your public data here */ };
const sdk = new SharexSDK(publicData);
```

The `publicData` object can be used to store any data, it will be stored on the server for as long as the connection is active and will be accessible to every other client connected to the server for the same plugin.

### Methods

#### 1. Initialization:

```js
init(websocket_callbacks)
```

Initializes a WebSocket connection and sets up event listeners for various WebSocket events.

Parameters:-

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
```

#### 2. Send Message:

```js
sendMsg(uuid, msg)
```

Sends a message over the WebSocket connection with a specified UUID and message. The UUID is used to send the message to a specific client, while the message is the data that will be sent to the client.

Parameters:-

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

Parameters

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

Parameters

```
data: The new public data to be updated.
```

#### 7. Request public data of user

```js
requestPublicData(uuid, callback)
```

Sends a request to the server to get the public data of a specific user and returns the result through a callback function.

Parameters

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