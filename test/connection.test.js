const { test } = require('node:test');
const assert = require('node:assert/strict');
const { connectionOptions } = require('../src/utils');
const SharexSDK = require('../src/SharexSDK');

const token = 'a'.repeat(64);
const development = { server_url: `http://192.168.1.4:6060#sharex-dev-token=${token}`, package_name: 'sharex.starter.plugin' };

class Socket {
    static instances = [];
    constructor(url) { this.url = url; this.listeners = {}; this.sent = []; Socket.instances.push(this); }
    addEventListener(type, callback) { this.listeners[type] = callback; }
    send(data) { this.sent.push(JSON.parse(data)); }
    close() { this.closed = true; this.emit('close'); }
    emit(type, value = {}) { this.listeners[type]?.(value); }
}

test('development key, isolated package and secure/nonsecure socket ports', () => {
    const connection = connectionOptions({ development });
    const url = new URL(connection.socketUrl);
    assert.equal(url.origin, 'ws://192.168.1.4:6061');
    assert.equal(url.pathname, '/__sharex_dev');
    assert.equal(url.searchParams.get('token'), token);
    assert.equal(url.searchParams.get('package'), 'sharex.starter.plugin');
    assert.equal(connection.packageName, 'dev.sharex.starter.plugin');
    assert.equal(connectionOptions({ development: { ...development, server_url: `https://[::1]#sharex-dev-token=${token}` } }).socketUrl.startsWith('wss://[::1]:444/'), true);
    assert.equal(connectionOptions({}, { href: 'https://host/SharexApp/my-plugin/', pathname: '/SharexApp/my-plugin/' }).socketUrl, 'wss://host:444/');
});

test('rejects malformed keys, package traversal, unsupported schemes and overflow ports', () => {
    for (const fields of [{ server_url: 'http://host:6060' }, { package_name: '../other' }, { server_url: `ftp://host#sharex-dev-token=${token}` }, { server_url: `http://host:65535#sharex-dev-token=${token}` }]) {
        assert.throws(() => connectionOptions({ development: { ...development, ...fields } }));
    }
    assert.equal(connectionOptions({ debug: { host: 'localhost', port: '6060' } }).packageName, 'debug');
    assert.throws(() => new SharexSDK({ development, reconnect_interval: NaN }));
});

test('installed plugins use their URL package and publicData alias', () => {
    const originalWindow = global.window, originalSocket = global.WebSocket;
    global.window = { location: { href: 'http://host:6060/SharexApp/sharex-starter-plugin/', pathname: '/SharexApp/sharex-starter-plugin/' } };
    global.WebSocket = Socket;
    try {
        const sdk = new SharexSDK({ publicData: { name: 'Browser' } });
        sdk.init();
        const socket = Socket.instances.at(-1);
        assert.throws(() => sdk.getAllUsers(() => {}), /not initialized/);
        socket.emit('open');
        assert.equal(socket.sent[0].package_name, 'sharex.starter.plugin');
        assert.deepEqual(socket.sent[0].data.public_data, { name: 'Browser' });
        sdk.disconnect();
    } finally { global.window = originalWindow; global.WebSocket = originalSocket; }
});

test('initialization, messaging, reconnect, database reinitialization and cleanup', async () => {
    const originalSocket = global.WebSocket;
    global.WebSocket = Socket;
    let sdk;
    try {
        sdk = new SharexSDK({ development, reconnect_interval: 10 });
        const events = [];
        let received;
        const callback = (action, data) => { events.push(action); if (action === 'msg_arrive') received = data; };
        sdk.init(callback);
        const first = Socket.instances.at(-1);
        const count = Socket.instances.length;
        sdk.init(callback);
        assert.equal(Socket.instances.length, count);
        first.emit('open');
        assert.equal(sdk.connectionStatus, true);
        assert.equal(first.sent[0].package_name, 'dev.sharex.starter.plugin');
        let peers;
        sdk.getAllUsers((data) => { peers = data; });
        first.emit('message', { data: JSON.stringify({ action: 'return_all_users', all_users: [{ uuid: 'peer' }] }) });
        assert.deepEqual(peers, [{ uuid: 'peer' }]);
        sdk.sendMsg('peer', 'Hello');
        assert.deepEqual(first.sent.at(-1), { action: 'send_msg', data: { uuid: 'peer', msg: 'Hello' } });
        sdk.createDBInstance('notes', () => {});
        assert.equal(first.sent.at(-1).action, 'db_action_init_db');
        first.emit('close');
        assert.equal(sdk.getConnectionStatus(), false);
        await new Promise((resolve) => setTimeout(resolve, 30));
        const second = Socket.instances.at(-1);
        assert.notEqual(first, second);
        second.emit('open');
        assert.equal(second.sent[0].action, 'init_user');
        assert.equal(second.sent[1].action, 'db_action_init_db');
        assert.ok(events.includes('reconnect'));
        first.emit('close');
        assert.equal(sdk.connectionStatus, true);
        second.emit('message', { data: 'invalid JSON' });
        second.emit('message', { data: '{"action":"msg_arrive","message":"Hi"}' });
        assert.ok(events.includes('msg_arrive'));
        assert.equal(received, 'Hi');
        const before = Socket.instances.length;
        sdk.disconnect();
        await new Promise((resolve) => setTimeout(resolve, 30));
        assert.equal(Socket.instances.length, before);
        assert.equal(sdk.connectionStatus, false);
    } finally { sdk?.disconnect(); global.WebSocket = originalSocket; }
});

test('disconnect cancels an already pending retry', async () => {
    const originalSocket = global.WebSocket;
    global.WebSocket = Socket;
    const sdk = new SharexSDK({ development, reconnect_interval: 10 });
    try {
        sdk.init();
        Socket.instances.at(-1).emit('close');
        sdk.disconnect();
        const count = Socket.instances.length;
        await new Promise((resolve) => setTimeout(resolve, 30));
        assert.equal(Socket.instances.length, count);
    } finally { sdk.disconnect(); global.WebSocket = originalSocket; }
});
