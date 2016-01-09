// Type definitions for easyrtc
// Project: http://www.easyrtc.com/
// Definitions by: MIZUSHIMA Junki <https://github.com/mzsm>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path='../node/node.d.ts' />
/// <reference path='../express/express.d.ts'/>
/// <reference path='../socket.io/socket.io.d.ts'/>

declare module 'EasyRTC' {
    import http = require('http');

    interface IceServer {
        url: string;
        credential?: string;
        username?: string;
    }

    interface Options {
        /**
         * The default application a connection belongs to if it is not initially specified.
         */
        appDefaultName?: string;
        /**
         * Enables the creation of rooms from the API. Occurs when client joins a nonexistent room.
         */
        appAutoCreateEnable?: boolean;
        /**
         * Default fields which are set when an application is created. In form of {"fieldName":{fieldValue:<JsonObj>, fieldOption:{isShared:<boolean>}}[, ...]}
         */
        appDefaultFieldObj?: any; //stub
        /**
         * Array of STUN and TURN servers. By default there is only publicly available STUN servers.
         */
        appIceServers?: IceServer[]; //stub

        // Room Options
        /**
         * Enables connections joining a default room if it is not initially specified. If false, than a connection initially may be in no room.
         */
        roomDefaultEnable?: boolean;
        /**
         * The default room a connection joins if it is not initially specified.
         */
        roomDefaultName?: string;
        /**
         * Enables the creation of rooms from the API. Occurs when client joins a nonexistent room.
         */
        roomAutoCreateEnable?: boolean;
        /**
         * Default fields which are set when a room is created. In form of {"fieldName":{fieldValue:<JsonObj>, fieldOption:{isShared:<boolean>}}[, ...]}
         */
        roomDefaultFieldObj?: any;  //stub

        // Connection Options
        /**
         * Default fields which are set when a connection is created. In form of {"fieldName":{fieldValue:<JsonObj>, fieldOption:{isShared:<boolean>}}[, ...]}
         */
        connectionDefaultFieldObj?: any;    //stub

        // SessionOptions
        /**
         * Enable sessions. If sessions are disabled, each socket connection from the same user will be the same. Relies on Express session handling also being enabled.
         */
        sessionEnable?: boolean;
        /**
         * If enabled, the server will attempt to send a easyrtcsid cookie which matches the Express session id.
         */
        sessionCookieEnable?: boolean;

        // API Hosting Options
        /**
         * Enables hosting of the EasyRTC API files.
         */
        apiEnable?: boolean;
        /**
         * Api public folder without trailing slash. Note that the demos expect this to be '/easyrtc'
         */
        apiPublicFolder?: string;
        /**
         * Enables hosting of the EasyRTC experimental API files located in the 'labs' sub folder
         */
        apiLabsEnable?: boolean;
        /**
         * Listens for requests to core API files in old locations (in addition to the new standard locations)
         * @deprecated
         */
        apiOldLocationEnable?: boolean;

        // Demo Options
        demosEnable?: boolean;
        /**
         * Demos public folder without trailing slash. This sets the public URL where where demos are hosted, such as http://yourdomain/demos/
         */
        demosPublicFolder?: string;

        // Log options - Only apply if internal 'log' event is used
        /**
         * The minimum log level to show. (debug|info|warning|error|none)
         */
        logLevel?: string;
        /**
         * Display timestamp in each entry
         */
        logDateEnable?: boolean;
        /**
         * print the stack trace in logged errors when available
         */
        logErrorStackEnable?: boolean;
        /**
         * print the stack trace in logged warnings when available
         */
        logWarningStackEnable?: boolean;
        /**
         * include console colors. Disable if forwarding logs to files or databases
         */
        logColorEnable?: boolean;
        /**
         * When objects are included in the log, this is the max depth the log will display
         */
        logObjectDepth?: number;

        // Miscellaneous Server Options
        /**
         * Checks for updates
         */
        updateCheckEnable?: boolean;

        // Regular expressions for validating names and other input
        /**
         * API Version
         */
        apiVersionRegExp?: RegExp;
        /**
         * Application name
         */
        appNameRegExp?: RegExp;
        /**
         * EasyRTC socket id (easyrtcid)
         */
        easyrtcidRegExp?: RegExp;
        /**
         * EasyRTC session id (easyrtcsid)
         */
        easyrtcsidRegExp?: RegExp;
        /**
         * Group name
         */
        groupNameRegExp?: RegExp;
        /**
         * Field names (for defining app and room custom fields)
         */
        fieldNameRegExp?: RegExp;
        /**
         * Option names (for defining server options)
         */
        optionNameRegExp?: RegExp;
        /**
         * Allowed presence "show" values (for setPresence command)
         */
        presenceShowRegExp?: RegExp;
        /**
         * Allowed presence "status" value
         */
        presenceStatusRegExp?: RegExp;
        /**
         * Room name
         */
        roomNameRegExp?: RegExp;
        /**
         * Username
         */
        usernameRegExp?: RegExp;
    }

    interface AppObject {
        ///**
        // * Expose all event functions
        // *
        // * @memberof    pub.appObj
        // */
        //events: pub.events;
        //
        ///**
        // * Expose all utility functions
        // *
        // * @memberof    pub.appObj
        // */
        //util: pub.util;
         /**
         * Returns the application name for the application. Note that unlike most EasyRTC functions, this returns a value and does not use a callback.
         *
         * @memberof    pub.appObj
         * @return      {string}    The application name.
         */
        getAppName(): string;
    }
    interface ConnectionObject {
        /**
         * Expose all event functions
         *
         * @memberof    pub.appObj.connectionObj
         */
        events: PublicEvents;
        /**
         * Expose all utility functions
         *
         * @memberof    pub.appObj.connectionObj
         */
        util: PublicUtil;
        /**
         * Reference to connection's socket.io object. See http://socket.io/ for more information.
         *
         * @memberof    pub.appObj.connectionObj
         */
        socket: SocketIO.Socket;
        /**
         * Returns the application object to which the connection belongs. Note that unlike most EasyRTC functions, this returns a value and does not use a callback.
         *
         * @memberof    pub.appObj.connectionObj
         * @return      {Object}    The application object
         */
        getApp(): AppObject;
        /**
         * Returns the application name for the application to which the connection belongs. Note that unlike most EasyRTC functions, this returns a value and does not use a callback.
         *
         * @memberof    pub.appObj.connectionObj
         * @return      {string}    The application name
         */
        getAppName(): string;
        /**
         * Returns the easyrtcid for the connection.  Note that unlike most EasyRTC functions, this returns a value and does not use a callback.
         *
         * @memberof    pub.appObj.connectionObj
         * @return      {string}    Returns the connection's easyrtcid, which is the EasyRTC unique identifier for a socket connection.
         */
        getEasyrtcid(): string;
        /**
         * Returns connection level field object for a given field name to a provided callback.
         *
         * @memberof    pub.appObj.connectionObj
         * @param       {string}    fieldName       Field name
         * @param       {function(?Error, Object=)} callback Callback with error and field object (any type)
         */
        getField(fieldName: string, callback: (error: Error, value: any) => void): void;
        /**
         * Returns connection level field object for a given field name. If the field is not set, it will return a field object will a null field value.  This is a synchronous function, thus may not be available in custom cases where state is not kept in memory.
         *
         * @memberof    pub.appObj.connectionObj
         * @param       {string}    fieldName       Field name
         * @returns     {Object}    Field object
         */
        getFieldSync(fieldName: string): {fieldName: string; fieldOption?: any; fieldValue: any};
        /**
         * Returns connection level field value for a given field name. If the field is not set, it will return a null field value.  This is a synchronous function, thus may not be available in custom cases where state is not kept in memory.
         *
         * @memberof    pub.appObj.connectionObj
         * @param       {string}    fieldName       Field name
         * @returns     {?*}        Field value
         */
        getFieldValueSync(fieldName: string): any;
        /**
         * Returns an object containing all field names and values within the connection to a provided callback. Can be limited to fields with isShared option set to true.
         *
         * @memberof    pub.appObj.connectionObj
         * @param       {boolean}   limitToIsShared Limits returned fields to those which have the isShared option set to true.
         * @param       {function(?Error, Object=)} callback Callback with error and object containing field names and values.
         */
        getFields(limitToIsShared: boolean, callback: (error: Error, fields: {[key: string]: {fieldName: string; fieldValue: any}}) => void): void;
    }
    
    interface SetOption {
        (optionName: "appDefaultName", optionValue: string): boolean;
        (optionName: "appAutoCreateEnable", optionValue: boolean): boolean;
        (optionName: "appDefaultFieldObj", optionValue: any): boolean;
        (optionName: "appIceServers", optionValue: IceServer[]): boolean;
        (optionName: "roomDefaultEnable", optionValue: boolean): boolean;
        (optionName: "roomDefaultName", optionValue: string): boolean;
        (optionName: "roomAutoCreateEnable", optionValue: boolean): boolean;
        (optionName: "roomDefaultFieldObj", optionValue: any): boolean;    //stub
        (optionName: "connectionDefaultFieldObj", optionValue: any): boolean;    //stub
        (optionName: "sessionEnable", optionValue: boolean): boolean;
        (optionName: "sessionCookieEnable", optionValue: boolean): boolean;
        (optionName: "apiEnable", optionValue: boolean): boolean;
        (optionName: "apiPublicFolder", optionValue: string): boolean;
        (optionName: "apiLabsEnable", optionValue: boolean): boolean;
        (optionName: "apiOldLocationEnable", optionValue: boolean): boolean;
        (optionName: "demosEnable", optionValue: boolean): boolean;
        (optionName: "demosPublicFolder", optionValue: string): boolean;
        (optionName: "logLevel", optionValue: "debug"): boolean;
        (optionName: "logLevel", optionValue: "info"): boolean;
        (optionName: "logLevel", optionValue: "warning"): boolean;
        (optionName: "logLevel", optionValue: "error"): boolean;
        (optionName: "logLevel", optionValue: "none"): boolean;
        (optionName: "logDateEnable", optionValue: boolean): boolean;
        (optionName: "logErrorStackEnable", optionValue: boolean): boolean;
        (optionName: "logWarningStackEnable", optionValue: boolean): boolean;
        (optionName: "logColorEnable", optionValue: boolean): boolean;
        (optionName: "logObjectDepth", optionValue: number): boolean;
        (optionName: "updateCheckEnable", optionValue: boolean): boolean;
        (optionName: "apiVersionRegExp", optionValue: RegExp): boolean;
        (optionName: "appNameRegExp", optionValue: RegExp): boolean;
        (optionName: "easyrtcidRegExp", optionValue: RegExp): boolean;
        (optionName: "easyrtcsidRegExp", optionValue: RegExp): boolean;
        (optionName: "groupNameRegExp", optionValue: RegExp): boolean;
        (optionName: "fieldNameRegExp", optionValue: RegExp): boolean;
        (optionName: "easyrtcsidRegExp", optionValue: RegExp): boolean;
        (optionName: "optionNameRegExp", optionValue: RegExp): boolean;
        (optionName: "presenceShowRegExp", optionValue: RegExp): boolean;
        (optionName: "presenceStatusRegExp", optionValue: RegExp): boolean;
        (optionName: "roomNameRegExp", optionValue: RegExp): boolean;
        (optionName: "usernameRegExp", optionValue: RegExp): boolean;
        /**
         * Sets individual option. The option value set is for the server level.
         *
         * Note that some options can be set at the application or room level. If an option has not been set at the room level, it will check to see if it has been set at the application level, if not it will revert to the server level.
         *
         * @param       {Object} optionName     Option name
         * @param       {Object} optionValue    Option value
         * @return      {Boolean}               true on success, false on failure
         */
        (optionName: string, optionValue: any): boolean;
    }

    interface pub {
        /**
         * Alias for Socket.io server object. Set during Listen().
         *
         * @member  {Object}    pub.socketServer
         * @example             <caption>Dump of all Socket.IO clients to server console</caption>
         * console.log(pub.socketServer.connected);
         */
        socketServer: SocketIO.Server;
        /**
         * Alias for Express app object. Set during Listen()
         *
         * @member  {Object}    pub.httpApp
         */
        httpApp: http.Server;
        /**
         * Sends an array of all application names to a callback.
         *
         * @param   {function(Error, Array.<string>)} callback Callback with error and array containing all application names.
         */
        getAppNames(callback: (error: any, appNames: string[]) => void): void;
        /**
         * Gets app object for application which has an authenticated client with a given easyrtcid
         *
         * @param       {String} easyrtcid      Unique identifier for an EasyRTC connection.
         * @param       {function(?Error, Object=)} callback Callback with error and application object
         */
        getAppWithEasyrtcid(easyrtcid: string, callback:(error: Error, appObject?: AppObject) => void): void;
        /**
         * Sends the count of the number of connections to the server to a provided callback.
         *
         * @param       {function(?Error, Integer)} callback Callback with error and array containing all easyrtcids.
         */
        getConnectionCount(callback: (error: Error, count: number) => void): void;
        /**
         * Sends the count of the number of connections to the server to a provided callback.
         *
         * @returns     {Integer} The current number of connections in a room.
         */
        getConnectionCountSync(): number;
        /**
         * Gets connection object for connection which has an authenticated client with a given easyrtcid
         *
         * @param       {string} easyrtcid      EasyRTC unique identifier for a socket connection.
         * @param       {function(?Error, Object=)} callback Callback with error and connection object
         */
        getConnectionWithEasyrtcid(easyrtcid: string, callback:(error: Error, appObject?: AppObject) => void): void;
        /**
         * Gets individual option value. The option value returned is for the server level.
         *
         * Note that some options can be set at the application or room level. If an option has not been set at the room level, it will check to see if it has been set at the application level, if not it will revert to the server level.
         *
         * @param       {String}    optionName  Option name
         * @return      {*}                     Option value (can be any JSON type)
         */
        getOption(optionName: string): any;
        /**
         * Gets EasyRTC Version. The format is in a major.minor.patch format with an optional letter following denoting alpha or beta status. The version is retrieved from the package.json file located in the EasyRTC project root folder.
         *
         * @return      {string}                EasyRTC Version
         */
        getVersion(): string;
        /**
         * Sets individual option. The option value set is for the server level.
         *
         * Note that some options can be set at the application or room level. If an option has not been set at the room level, it will check to see if it has been set at the application level, if not it will revert to the server level.
         *
         * @param       {Object} optionName     Option name
         * @param       {Object} optionValue    Option value
         * @return      {Boolean}               true on success, false on failure
         */
        setOption: SetOption;
        events: PublicEvents;
        util: PublicUtil;
    }

    interface NextCallback {
        (error: Error): void;
    }
    interface SocketCallback {
        (msg: any): void;
    }
    module DefaultEventListeners {
        interface onAuthenticate {
            /**
             * Default listener for event "authenticate". This event is called as part of the authentication process. To deny authentication, call the next() with an Error. By default everyone gets in!
             *
             * @param       {Object} socket         Socket.io socket object. References the individual connection socket.
             * @param       {String} easyrtcid      Unique identifier for an EasyRTC connection.
             * @param       {string} appName        Application name which uniquely identifies it on the server.
             * @param       {?String} username      Username to assign to the connection.
             * @param       {?*} credential         Credential for the connection. Can be any JSONable object.
             * @param       {Object} easyrtcAuthMessage Message object containing the complete authentication message sent by the connection.
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (socket: SocketIO.Socket, easyrtcid: string, appName: string, username: string, credential: any, easyrtcAuthMessage: any, next: NextCallback): void;
        }
        interface onAuthenticated {
            /**
             * Default listener for event "authenticated". This event is called after a connection is authenticated and the connection object is generated and requested rooms are joined. Call next(err) to continue the connection procedure.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, next: NextCallback): void;    //stub
        }
        interface onConnection {
            /**
             * Default listener for event "connection". This event is called when socket.io accepts a new connection.
             *
             * @param       {Object} socket         Socket.io socket object. References the individual connection socket.
             * @param       {String} easyrtcid      Unique identifier for an EasyRTC connection.
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (socket: SocketIO.Socket, easyrtcid: string, next: NextCallback): void;
        }
        interface onDisconnect {
            /**
             * Default listener for event "disconnect". This event is called when socket.io detects a disconnection. Disconnections can occur due to either side purposefully dropping a connection, network disconnection, or time out.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, next: NextCallback): void;
        }
        interface onEasyrtcAuth {
            /**
             * Default listener for event "easyrtcAuth". This event is fired when an incoming 'easyrtcAuth' message is received from a client.
             *
             * @param       {Object}    socket         Socket.io socket object. References the individual connection socket.
             * @param       {String}    easyrtcid      Unique identifier for an EasyRTC connection.
             * @param       {Object}    msg            Message object which contains the full message from a client; this can include the standard msgType and msgData fields.
             * @param       {Function}  socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {Function}  callback       Callback to call upon completion. Delivers parameter (err, connectionObj).
             */
            (socket: SocketIO.Socket, easyrtcid: string, msg: any, socketCallback: SocketCallback, callback: (error:Error, connectionObj: ConnectionObject) => void): void;
        }
        interface onEasyrtcCmd {
            /**
             * Default listener for event "easyrtcCmd". This event is fired when an incoming 'easyrtcCmd' message is received from a client.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Object} msg            Message object which contains the full message from a client; this can include the standard msgType and msgData fields.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, msg: any, socketCallback: SocketCallback , next: NextCallback): void;
        }
        interface onEasyrtcMsg {
            /**
             * Default listener for event "easyrtcMsg". This event is fired when an incoming 'easyrtcMsg' message is received from a client.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Object} msg            Message object which contains the full message from a client; this can include the standard msgType and msgData fields.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, msg: any, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onEmitEasyrtcCmd {
            /**
             * Default listener for event "emitEasyrtcCmd". This event is fired when the server should emit an EasyRTC command to a client.
             *
             * The easyrtcid and serverTime fields will be added to the msg automatically.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {String} msgType        Message type of the message.
             * @param       {Object} msg            Message object which contains the full message to a client; this can include the standard msgData field.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, msgType: any, msg: any, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onEmitEasyrtcMsg {
            /**
             * Default listener for event "emitEasyrtcMsg". This event is fired when the server should emit an EasyRTC message to a client.
             *
             * The easyrtcid and serverTime fields will be added to the msg automatically.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {String} msgType        Message type of the message.
             * @param       {Object} msg            Message object which contains the full message to a client; this can include the standard msgData field.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, msgType: string, msg: any, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onEmitError {
            /**
             * Default listener for event "emitError". This event is fired when the server should emit an EasyRTC error to a client.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {String} errorCode      EasyRTC error code associated with an error.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, errorCode: string, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onEmitReturnAck {
            /**
             * Default listener for event "emitReturnAck". This event is fired when the server should return an Ack to a client via an acknowledgment message.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onEmitReturnError {
            /**
             * Default listener for event "emitReturnError". This event is fired when the server should return an Error to a client via an acknowledgment message.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {String} errorCode      EasyRTC error code associated with an error.
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, socketCallback: SocketCallback, errorCode: string, next: NextCallback): void;
        }
        interface onEmitReturnToken {
            /**
             * Default listener for event "emitReturnToken". This event is fired when the server should return a token to a client via an acknowledgment message.
             *
             * This is done after a client has been authenticated and the connection has been established.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onLog {
            (level: "debug", logText: string, logFields?: any, next?: NextCallback): void;
            (level: "info", logText: string, logFields?: any, next?: NextCallback): void;
            (level: "warning", logText: string, logFields?: any, next?: NextCallback): void;
            (level: "error", logText: string, logFields?: any, next?: NextCallback): void;
            /**
             * Default listener for event "log". This event is fired when ever a loggable item is observed.
             *
             * @param       {string} level          Log severity level. Can be ("debug"|"info"|"warning"|"error")
             * @param       {string} logText        Text for log.
             * @param       {?*} [logFields]        Simple JSON object which contains extra fields to be logged.
             * @param       {?NextCallback} next    A success callback of form next(err).
             */
            (level: string, logText: string, logFields?: any, next?: NextCallback): void;
        }
        interface onMsgTypeRoomJoin {
            /**
             * Default listener for event "msgTypeRoomJoin". This event is fired when an easyrtcCmd message with msgType of "roomJoin" is received from a client.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Object} rooms          A room object containing a map of room names and room parameters.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, rooms: any, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onMsgTypeRoomLeave {
            /**
             * Default listener for event "msgTypeRoomLeave". This event is fired when an easyrtcCmd message with msgType of "roomLeave" is received from a client.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Object} rooms          A room object containing a map of room names.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, rooms: any, socketCallback: SocketCallback, next: NextCallback): void;  //stub
        }
        interface onMsgTypeGetIceConfig {
            /**
             * Default listener for event "msgTypeGetIceConfig". This event is fired when an easyrtcCmd message with msgType of "getIceConfig" is received from a client.
             *
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onMsgTypeGetRoomList {
            /**
             * Default listener for event "msgTypeGetRoomList". This event is fired when an easyrtcCmd message with msgType of "getRoomList" is received from a client. 
             * 
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, socketCallback: SocketCallback, next: NextCallback): void;
        }
        interface onMsgTypeSetPresence {
            /**
             * Default listener for event "msgTypeSetPresence". This event is fired when an easyrtcCmd message with msgType of "setPresence" is received from a client. 
             * 
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Object} presenceObj    Presence object which contains all the fields for setting a presence for a connection.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, presenceObj: any, socketCallback: SocketCallback, next: NextCallback): void;   //stub
        }
        interface onMsgTypeSetRoomApiField {
            /**
             * Default listener for event "msgTypeSetRoomApiField". This event is fired when an easyrtcCmd message with msgType of "setRoomApiField" is received from a client. 
             * 
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Object} roomApiFieldObj Api Field object which contains all the fields for setting a presence for a connection.
             * @param       {Function} socketCallback Socket.io callback function which delivers a response to a socket. Expects a single parameter (msg).
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, roomApiFieldObj: any, socketCallback: SocketCallback, next:NextCallback): void;   //stub
        }
        interface onGetIceConfig {
            /**
             * Default listener for event "getIceConfig". Returns an ICE configuration object to the callback.
             * 
             * The ICE configuration object will hold the array of STUN and TURN servers the connection should use when forming a peer connection. This default listener uses the "appIceServers" configuration option at the application level.
             * 
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {Function} callback     Callback of form (err, iceConfigArray)
             */
            (connectionObj: ConnectionObject, callback: (err: Error, iceConfigArray: IceServer[]) => void): void;
        }
        interface onRoomCreate {
            /**
             * Default listener for event "roomCreate". Creates a room attached to an application with a specified room name. The optional creatorConnectionObj is provided to provide context; joining the room is done separately. If successful, the callback returns a roomObj.
             * 
             * @param       {Object} appObj         EasyRTC application object. Contains methods used for identifying and managing an application.
             * @param       {?Object} creatorConnectionObj EasyRTC connection object belonging to the creator of the room. Contains methods used for identifying and managing a connection.
             * @param       {string} roomName       Room name which uniquely identifies a room within an EasyRTC application.
             * @param       {?Object} roomOptions   Sets room level options. May be null or map of key/value pairs.
             * @param       {Function} callback     Callback of form (err, roomObj)
             */
            (appObj: AppObject, creatorConnectionObj: ConnectionObject, roomName: string, roomOptions: {[key: string]: any}, callback: (err: Error, roomObj: any) => void): void;
        }
        interface onRoomJoin {
            /**
             * Default listener for event "roomJoin". Joins a connection to a a specified room. If successful, the callback will return a connectionRoomObj.
             * 
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {string} roomName       Room name which uniquely identifies a room within an EasyRTC application.
             * @param       {?Object} roomParameter A map(dictionary) object with key/value pairs. The values can be any JSONable object. This field is not currently looked at by EasyRTC, however it is available for custom server applications. May be used for room options or authentication needs.
             * @param       {Function} callback     Callback of form (err, connectionRoomObj)
             */
            (connectionObj: ConnectionObject, roomName, roomParameter, callback): void;
        }
        interface onRoomLeave {
            /**
             * Default listener for event "roomLeave". Run upon a connection leaving a room.
             * 
             * @param       {Object} connectionObj  EasyRTC connection object. Contains methods used for identifying and managing a connection.
             * @param       {string} roomName       Room name which uniquely identifies a room within an EasyRTC application.
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (connectionObj: ConnectionObject, roomName: string, next: NextCallback): void;
        }
        interface onShutdown {
            /**
             * Default listener for event "shutdown". This event is fired when the server is being shutdown.
             * 
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (next: NextCallback): void;
        }
        interface onStartup {
            /**
             * Default listener for event "startup". This event initializes EasyRTC server so it is ready for connections.
             *
             * @param       {NextCallback} next     A success callback of form next(err).
             */
            (next: NextCallback): void;
        }
    }
    interface PublicEvents {
        /**
         * Expose event listener's emit function.
         *
         * @param       {string} eventName      EasyRTC event name.
         * @param       {...*} eventParam       The event parameters
         */
        emit(eventName: string, ...eventParam: any[]): void;
        /**
         * Resets the listener for a given event to the default listener. Removes other listeners.
         *
         * @param       {string} eventName      EasyRTC event name.
         */
        emitDefault(eventName: string): void;
        /**
         * Resets the listener for all EasyRTC events to the default listeners. Removes all other listeners.
         */
        setDefaultListeners(): void;

        on(eventName: "authenticate", listener: DefaultEventListeners.onAuthenticate): void;
        on(eventName: "authenticated", listener: DefaultEventListeners.onAuthenticated): void;
        on(eventName: "connection", listener: DefaultEventListeners.onConnection): void;
        on(eventName: "disconnect", listener: DefaultEventListeners.onDisconnect): void;
        on(eventName: "getIceConfig", listener: DefaultEventListeners.onGetIceConfig): void;
        on(eventName: "roomCreate", listener: DefaultEventListeners.onRoomCreate): void;
        on(eventName: "roomJoin", listener: DefaultEventListeners.onRoomJoin): void;
        on(eventName: "roomLeave", listener: DefaultEventListeners.onRoomLeave): void;
        on(eventName: "log", listener: DefaultEventListeners.onLog): void;
        on(eventName: "shutdown", listener: DefaultEventListeners.onShutdown): void;
        on(eventName: "startup", listener: DefaultEventListeners.onStartup): void;
        on(eventName: "easyrtcAuth", listener: DefaultEventListeners.onEasyrtcAuth): void;
        on(eventName: "easyrtcCmd", listener: DefaultEventListeners.onEasyrtcCmd): void;
        on(eventName: "easyrtcMsg", listener: DefaultEventListeners.onEasyrtcMsg): void;
        on(eventName: "emitEasyrtcCmd", listener: DefaultEventListeners.onEmitEasyrtcCmd): void;
        on(eventName: "emitEasyrtcMsg", listener: DefaultEventListeners.onEmitEasyrtcMsg): void;
        on(eventName: "emitError", listener: DefaultEventListeners.onEmitError): void;
        on(eventName: "emitReturnAck", listener: DefaultEventListeners.onEmitReturnAck): void;
        on(eventName: "emitReturnError", listener: DefaultEventListeners.onEmitReturnError): void;
        on(eventName: "emitReturnToken", listener: DefaultEventListeners.onEmitReturnToken): void;
        on(eventName: "msgTypeGetIceConfig", listener: DefaultEventListeners.onMsgTypeGetIceConfig): void;
        on(eventName: "msgTypeGetRoomList", listener: DefaultEventListeners.onMsgTypeGetRoomList): void;
        on(eventName: "msgTypeRoomJoin", listener: DefaultEventListeners.onMsgTypeRoomJoin): void;
        on(eventName: "msgTypeRoomLeave", listener: DefaultEventListeners.onMsgTypeRoomLeave): void;
        on(eventName: "msgTypeSetPresence", listener: DefaultEventListeners.onMsgTypeSetPresence): void;
        on(eventName: "msgTypeSetRoomApiField", listener: DefaultEventListeners.onMsgTypeSetRoomApiField): void;
        /**
         * Sets listener for a given EasyRTC event. Only one listener is allowed per event. Any other listeners for an event are removed before adding the new one. See the events documentation for expected listener parameters.
         *
         * @param       {string} eventName      Listener name.
         * @param       {function} listener     Function to be called when listener is fired
         */
        on(eventName: string, listener: Function): void;
        
        removeAllListeners(eventName: "authenticate"): void;
        removeAllListeners(eventName: "authenticated"): void;
        removeAllListeners(eventName: "connection"): void;
        removeAllListeners(eventName: "disconnect"): void;
        removeAllListeners(eventName: "getIceConfig"): void;
        removeAllListeners(eventName: "roomCreate"): void;
        removeAllListeners(eventName: "roomJoin"): void;
        removeAllListeners(eventName: "roomLeave"): void;
        removeAllListeners(eventName: "log"): void;
        removeAllListeners(eventName: "shutdown"): void;
        removeAllListeners(eventName: "startup"): void;
        removeAllListeners(eventName: "easyrtcAuth"): void;
        removeAllListeners(eventName: "easyrtcCmd"): void;
        removeAllListeners(eventName: "easyrtcMsg"): void;
        removeAllListeners(eventName: "emitEasyrtcCmd"): void;
        removeAllListeners(eventName: "emitEasyrtcMsg"): void;
        removeAllListeners(eventName: "emitError"): void;
        removeAllListeners(eventName: "emitReturnAck"): void;
        removeAllListeners(eventName: "emitReturnError"): void;
        removeAllListeners(eventName: "emitReturnToken"): void;
        removeAllListeners(eventName: "msgTypeGetIceConfig"): void;
        removeAllListeners(eventName: "msgTypeGetRoomList"): void;
        removeAllListeners(eventName: "msgTypeRoomJoin"): void;
        removeAllListeners(eventName: "msgTypeRoomLeave"): void;
        removeAllListeners(eventName: "msgTypeSetPresence"): void;
        removeAllListeners(eventName: "msgTypeSetRoomApiField"): void;
        /**
         * Removes all listeners for an event. If there is a default EasyRTC listener, it will be added. If eventName is `null`, all events will be removed than the defaults will be restored.
         *
         * @param       {?string} eventName     Listener name. If `null`, then all events will be removed.
         */
        removeAllListeners(eventName: string): void;
    }
    interface PublicUtil {
        /**
         * Performs a deep copy of an object, returning the duplicate.
         * Do not use on objects with circular references.
         *
         * @function
         * @param       {Object} input          Input variable (or object) to be copied.
         * @returns     {Object}                New copy of variable.
         */
        deepCopy<T>(input: T): T;
        /**
         * An empty dummy function, which is designed to be used as a default callback in functions when none has been provided.
         *
         * @param       {Error} err             Error object
         */
        nextToNowhere(err: Error): void;
        /**
         * Determines if an Error object is an instance of ApplicationError, ConnectionError, or ServerError. If it is, it will return true.
         *
         * @function
         * @param       {*|Error}               Will accept any value, but will only return true for appropriate error objects.
         * @return      {Boolean}
         */
        isError(err: any): boolean;
        /**
         * Determines if an Error object is an instance of ApplicationWarning, ConnectionWarning, or ServerWarning. If it is, it will return true.
         *
         * @function
         * @param       {*|Error}               Will accept any value, but will only return true for appropriate error objects.
         * @return      {Boolean}
         */
        isWarning(err: any): boolean;
    }

    module EasyRTC {
        /**
         * Listener for starting the EasyRTC server. The successCallback can be used to determine when EasyRTC is fully running.
         *
         * @param       {Object} httpApp        express http object. Allows EasyRTC to interact with the http server.
         * @param       {Object} socketServer   socket.io server object. Allows EasyRTC to interact with the socket server.
         * @param       {Object} options        EasyRTC options object. Sets configurable options. If null, than defaults will be used.
         * @param       {function(Error, Object)} listenCallback Called when the start up routines are complete. In form of successCallback(err, pub). The parameter 'err' will null unless an error occurs and 'pub' is the EasyRTC public object for interacting with the server.
         */
        export function listen(httpApp: http.Server, socketServer: SocketIO.Server, options: Options, listenCallback: (error: Error, pub: pub) => void): void;
        /**
         * Returns an EasyRTC options object with a copy of the default options.
         *
         * @returns     {Object}                EasyRTC options object
         */
        export function getDefaultOptions(): Options;
        /**
         * Expose all event functions
         */
        export var events: PublicEvents;
        /**
         * Expose public utility functions
         */
        export var util: PublicUtil;
        /**
         * Sets individual option.
         *
         * @param       {Object} option Option name
         * @param       {Object} value  Option value
         * @returns     {Boolean} true on success, false on failure
         */
        export var setOption: SetOption;
    }

    export = EasyRTC;
}