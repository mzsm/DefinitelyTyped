// Type definitions for EasyRTC 1.0.14
// Project: http://www.easyrtc.com/
// Definitions by: MIZUSHIMA Junki <https://github.com/mzsm>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path='../webrtc/MediaStream.d.ts'/>
/// <reference path='../socket.io-client/socket.io-client.d.ts'/>

interface Easyrtc {
    /**
     * Sets functions which filter sdp records before calling setLocalDescription or setRemoteDescription.
     * This is advanced functionality which can break things, easily. See the easyrtc_rates.js file for a
     * filter builder.
     * @param {Function} localFilter a function that takes an sdp string and returns an sdp string.
     * @param {Function} remoteFilter a function that takes an sdp string and returns an sdp string.
     */
    setSdpFilters(localFilter: Function, remoteFilter: Function): void;

   /**
    * Sets a function which filters IceCandidate records being sent or received.
    *
    * Candidate records can be received while they are being generated locally (before being
    * sent to a peer), and after they are received by the peer. The filter receives two arguments, the candidate record and a boolean
    * flag that is true for a candidate being received from another peer,
    * and false for a candidate that was generated locally. The candidate record has the form:
    *  {type: 'candidate', label: sdpMLineIndex, id: sdpMid, candidate: candidateString}
    * The function should return one of the following: the input candidate record, a modified candidate record, or null (indicating that the
    * candidate should be discarded).
    * @param {Function} filter
    */
    setIdeCandidateFilter(filter: Function): void;

    /**
     * Controls whether a default local media stream should be acquired automatically during calls and accepts
     * if a list of streamNames is not supplied. The default is true, which mimics the behaviour of earlier releases
     * that didn't support multiple streams. This function should be called before easyrtc.call or before entering an
     * accept  callback.
     * @param {Boolean} flag true to allocate a default local media stream.
     */
    setAutoInitUserMedia(flag: boolean): void;

    /**
     * This function performs a printf like formatting. It actually takes an unlimited
     * number of arguments, the declared arguments arg1, arg2, arg3 are present just for
     * documentation purposes.
     * @param {String} format A string like "abcd{1}efg{2}hij{1}."
     * @param {String} arg1 The value that replaces {1}
     * @param {String} arg2 The value that replaces {2}
     * @param {String} arg3 The value that replaces {3}
     * @returns {String} the formatted string.
     */
    format(format: string, arg1: string, arg2: string, arg3: string): string;

    /**
     * Adds an event listener for a particular type of event.
     * Currently the only eventName supported is "roomOccupant".
     * @param {String} eventName the type of the event
     * @param {Function} eventListener the function that expects the event.
     * The eventListener gets called with the eventName as it's first argument, and the event
     * data as it's second argument.
     * @returns {void}
     */
    addEventListener(eventName: string, eventListener: (eventName: string, eventData: any) => void): void;

    /**
     * Removes an event listener.
     * @param {String} eventName
     * @param {Function} eventListener
     */
    removeEventListener(eventName: string, eventListener: (eventName: string, eventData: any) => void): void;

    /**
     * Emits an event, or in otherwords, calls all the eventListeners for a
     * particular event.
     * @param {String} eventName
     * @param {Object} eventData
     */
    emitEvent(eventName: string, eventData: any): void;
    
    /** Error codes that the EasyRTC will use in the errorCode field of error object passed
     *  to error handler set by easyrtc.setOnError. The error codes are short printable strings.
     * @type Object
     */
    errCodes: {
        BAD_NAME: string;
        CALL_ERR: string;
        DEVELOPER_ERR: string;
        SYSTEM_ERR: string;
        CONNECT_ERR: string;
        MEDIA_ERR: string;
        MEDIA_WARNING: string;
        INTERNAL_ERR: string;
        PEER_GONE: string;
        ALREADY_CONNECTED: string;
        BAD_CREDENTIAL: string;
        ICECANDIDATE_ERR: string
    }
    apiVersion: string;
    /** Most basic message acknowledgment object */
    ackMessage: {
        msgType: string
    };
    /** Regular expression pattern for user ids. This will need modification to support non US character sets */
    usernameRegExp: RegExp;
    /** Default cookieId name */
    cookieId: string;
    /** Flag to indicate that user is currently logging out */
    loggingOut: boolean;

    /**
     * Control whether the client requests audio from a peer during a call.
     * Must be called before the call to have an effect.
     * @param value - true to receive audio, false otherwise. The default is true.
     */
    enableAudioReceive(value: boolean): void;
    /**
     * Control whether the client requests video from a peer during a call.
     * Must be called before the call to have an effect.
     * @param value - true to receive video, false otherwise. The default is true.
     */
    enableVideoReceive(value: boolean): void;

    /**
     * Gets a list of the available audio sources (ie, cameras)
     * @param {Function} callback receives list of {label:String, id:String, kind:"audio"}
     * Note: the label string always seems to be the empty string if you aren't using https.
     * Note: not supported by Firefox.
     * @example  easyrtc.getAudioSourceList( function(list) {
     *               var i;
     *               for( i = 0; i < list.length; i++ ) {
     *                   console.log("label=" + list[i].label + ", id= " + list[i].id);
     *               }
     *          });
     */
    getAudioSourceList(callback: (list: {label:string; id:string; kind:string}[]) => void): void;

    /**
     * Gets a list of the available video sources (ie, cameras)
     * @param {Function} callback receives list of {facing:String, label:String, id:String, kind:"video"}
     * Note: the label string always seems to be the empty string if you aren't using https.
     * Note: not supported by Firefox.
     * @example  easyrtc.getVideoSourceList( function(list) {
     *               var i;
     *               for( i = 0; i < list.length; i++ ) {
     *                   console.log("label=" + list[i].label + ", id= " + list[i].id);
     *               }
     *          });
     */
    getVideoSourceList(callback: (list: {label:string; id:string; kind:string}[]) => void): void;

    /** The height of the local media stream video in pixels. This field is set an indeterminate period
     * of time after easyrtc.initMediaSource succeeds. Note: in actuality, the dimensions of a video stream
     * change dynamically in response to external factors, you should check the videoWidth and videoHeight attributes
     * of your video objects before you use them for pixel specific operations.
     */
    nativeVideoHeight: number;
    /** The width of the local media stream video in pixels. This field is set an indeterminate period
     * of time after easyrtc.initMediaSource succeeds.  Note: in actuality, the dimensions of a video stream
     * change dynamically in response to external factors, you should check the videoWidth and videoHeight attributes
     * of your video objects before you use them for pixel specific operations.
     */
    nativeVideoWidth: number;

    /** The rooms the user is in. This only applies to room oriented applications and is set at the same
     * time a token is received.
     */
    roomJoin: {};

    /** Checks if the supplied string is a valid user name (standard identifier rules)
     * @param {String} name
     * @return {Boolean} true for a valid user name
     * @example
     *    var name = document.getElementById('nameField').value;
     *    if( !easyrtc.isNameValid(name)){
     *        console.error("Bad user name");
     *    }
     */
    isNameValid(name: string): boolean;

    /**
     * This function sets the name of the cookie that client side library will look for
     * and transmit back to the server as it's easyrtcsid in the first message.
     * @param {String} cookieId
     */
    setCookieId(cookieId : string): void;

    /**
     * This method allows you to join a single room. It may be called multiple times to be in
     * multiple rooms simultaneously. It may be called before or after connecting to the server.
     * Note: the successCB and failureDB will only be called if you are already connected to the server.
     * @param {String} roomName the room to be joined.
     * @param {String} roomParameters application specific parameters, can be null.
     * @param {Function} successCB called once, with a roomName as it's argument, once the room is joined.
     * @param {Function} failureCB called if the room can not be joined. The arguments of failureCB are errorCode, errorText, roomName.
     */
    joinRoom(roomName: string, roomParameters?: string, successCB?: (roomName: string) => void, failureCB?: (errorCode: string, errorText: string, roomName: string) => void): void;

    /**
     * This function allows you to leave a single room. Note: the successCB and failureDB
     *  arguments are optional and will only be called if you are already connected to the server.
     * @param {String} roomName
     * @param {Function} successCallback - A function which expects a roomName.
     * @param {Function} failureCallback - A function which expects the following arguments: errorCode, errorText, roomName.
     * @example
     *    easyrtc.leaveRoom("freds_room");
     *    easyrtc.leaveRoom("freds_room", function(roomName){ console.log("left the room")},
     *                       function(errorCode, errorText, roomName){ console.log("left the room")});
     */
    leaveRoom(roomName: string, successCallback?: (roomName: string) => void, failureCallback?: (errorCode: string, errorText: string, roomName: string) => void): void;

    /**
     * Specify particular video source. Call this before you call easyrtc.initMediaSource().
     * Note: this function isn't supported by Firefox.
     * @param {String} videoSrcId is a id value from one of the entries fetched by getVideoSourceList. null for default.
     * @example easyrtc.setVideoSrc( videoSrcId);
     */
    setVideoSource(videoSrcId: string): void;
    /**
     * Temporary alias for easyrtc.setVideoSource
     */
    setVideoSrc(videoSrcId: string): void;
    /** This function is used to set the dimensions of the local camera, usually to get HD.
     *  If called, it must be called before calling easyrtc.initMediaSource (explicitly or implicitly).
     *  assuming it is supported. If you don't pass any parameters, it will default to 720p dimensions.
     * @param {Number} width in pixels
     * @param {Number} height in pixels
     * @param {number} frameRate is optional
     * @example
     *    easyrtc.setVideoDims(1280,720);
     * @example
     *    easyrtc.setVideoDims();
     */
    setVideoDims(width?: number, height?: number, frameRate?: number): void;
    /** This function requests that screen capturing be used to provide the local media source
     * rather than a webcam. If you have multiple screens, they are composited side by side.
     * Note: this functionality is not supported by Firefox, has to be called before calling initMediaSource (or easyApp), we don't currently supply a way to
     * turn it off (once it's on), only works if the website is hosted SSL (https), and the image quality is rather
     * poor going across a network because it tries to transmit so much data. In short, screen sharing
     * through WebRTC isn't worth using at this point, but it is provided here so people can try it out.
     * @example
     *    easyrtc.setScreenCapture();
     * @deprecated: use easyrtc.initScreenCapture (same parameters as easyrtc.initMediaSource.
     */
    setScreenCapture(enableScreenCapture?: boolean): void;

    /**
     * Builds the constraint object passed to getUserMedia.
     * @returns {Object} mediaConstraints
     */
    getUserMediaConstraints(): MediaStreamConstraints;
    /** Set the application name. Applications can only communicate with other applications
     * that share the same API Key and application name. There is no predefined set of application
     * names. Maximum length is
     * @param {String} name
     * @example
     *    easyrtc.setApplicationName('simpleAudioVideo');
     */
    setApplicationName(name: string): void;
    /** Enable or disable logging to the console.
     * Note: if you want to control the printing of debug messages, override the
     *    easyrtc.debugPrinter variable with a function that takes a message string as it's argument.
     *    This is exactly what easyrtc.enableDebug does when it's enable argument is true.
     * @param {Boolean} enable - true to turn on debugging, false to turn off debugging. Default is false.
     * @example
     *    easyrtc.enableDebug(true);
     */
    enableDebug(enable?: boolean): void;
    /**
     * Determines if the local browser supports WebRTC GetUserMedia (access to camera and microphone).
     * @returns {Boolean} True getUserMedia is supported.
     */
    supportsGetUserMedia(): boolean;
    /**
     * Determines if the local browser supports WebRTC Peer connections to the extent of being able to do video chats.
     * @returns {Boolean} True if Peer connections are supported.
     */
    supportsPeerConnections(): boolean;

    getDatachannelConstraints(): {reliable: boolean};

    /**
     * Disconnect from the EasyRTC server.
     * @example
     *    easyrtc.disconnect();
     */
    disconnect(): void;

    /**
     * This function gets the statistics for a particular peer connection.
     * @param {String} easyrtcid
     * @param {Function} callback gets the easyrtcid for the peer and a map of {userDefinedKey: value}. If there is no peer connection to easyrtcid, then the map will
     *  have a value of {connected:false}.
     * @param {Object} filter depends on whether Chrome or Firefox is used. See the default filters for guidance.
     * It is still experimental.
     */
    getPeerStatistics(easyrtcid: string, callback: (easyrtcid: string, localStats: {connected: boolean; [key: string]: any}) => void, filter?: any): void;
    
    chromeStatsFilter: [
        {
            "googTransmitBitrate": string;
            "googActualEncBitrate": string;
            "googAvailableSendBandwidth": string;
        },
        {
            "googCodecName": string;
            "googTypingNoiseState": string;
            "packetsSent": string;
            "bytesSent": string;
        },
        {
            "googCodecName": string;
            "googFrameRateSent": string;
            "packetsSent": string;
            "bytesSent": string;
        },
        {
            "packetsLost": string;
            "packetsReceived": string;
            "bytesReceived": string;
            "googFrameRateOutput": string;
        },
        {
            "packetsLost": string;
            "packetsReceived": string;
            "bytesReceived": string;
            "audioOutputLevel": string;
        },
        {
            "googRemoteAddress": string;
            "googActiveConnection": string;
        },
        {
            "audioInputLevel": string;
        }
    ];
    firefoxStatsFilter: {
        "outboundrtp_audio.bytesSent": string;
        "outboundrtp_video.bytesSent": string;
        "inboundrtp_video.bytesReceived": string;
        "inboundrtp_audio.bytesReceived": string;
        "outboundrtp_audio.packetsSent": string;
        "outboundrtp_video.packetsSent": string;
        "inboundrtp_video.packetsReceived": string;
        "inboundrtp_audio.packetsReceived": string;
        "inboundrtp_video.packetsLost": string;
        "inboundrtp_audio.packetsLost": string;
        "firefoxRemoteAddress": string;
    };
    standardStatsFilter: any; // isFirefox ? self.firefoxStatsFilter : self.chromeStatsFilter;
    /** Provide a set of application defined fields that will be part of this instances
     * configuration information. This data will get sent to other peers via the websocket
     * path.
     * @param {String} roomName - the room the field is attached to.
     * @param {String} fieldName - the name of the field.
     * @param {Object} fieldValue - the value of the field.
     * @example
     *   easyrtc.setRoomApiField("trekkieRoom",  "favorite_alien", "Mr Spock");
     *   easyrtc.setRoomOccupantListener( function(roomName, list){
     *      for( var i in list ){
     *         console.log("easyrtcid=" + i + " favorite alien is " + list[i].apiFields.favorite_alien);
     *      }
     *   });
     */
    setRoomApiField(roomName: string, fieldName: string, fieldValue: any): void;

    /** Default error reporting function. The default implementation displays error messages
     *  in a programmatically created div with the id easyrtcErrorDialog. The div has title
     *  component with a class name of easyrtcErrorDialog_title. The error messages get added to a
     *  container with the id easyrtcErrorDialog_body. Each error message is a text node inside a div
     *  with a class of easyrtcErrorDialog_element. There is an "okay" button with the className of easyrtcErrorDialog_okayButton.
     *  @param {String} messageCode An error message code
     *  @param {String} message the error message text without any markup.
     *  @example
     *      easyrtc.showError("BAD_NAME", "Invalid username");
     */
    showError(messageCode: string, message: string): void;

    /**
     * A convenience function to ensure that a string doesn't have symbols that will be interpreted by HTML.
     * @param {String} idString
     * @return {String} The cleaned string.
     * @example
     *     console.log( easyrtc.cleanId('&hello'));
     */
    cleanId(idString: string): string;
    /** Set a callback that will be invoked when the application enters or leaves a room.
     *
     * @param {Function} handler - the first parameter is true for entering a room, false for leaving a room. The second parameter is the room name.
     * @example
     *   easyrtc.setRoomEntryListener(function(entry, roomName){
     *       if( entry ){
     *           console.log("entering room " + roomName);
     *       }
     *       else{
     *           console.log("leaving room " + roomName);
     *       }
     *   });
     */
    setRoomEntryListener(handler: (entry: boolean, roomName: string) => void): void;
    /** Set the callback that will be invoked when the list of people logged in changes.
     * The callback expects to receive a room name argument, and
     *  a map whose ideas are easyrtcids and whose values are in turn maps
     * supplying user specific information. The inner maps have the following keys:
     *  username, applicationName, browserFamily, browserMajor, osFamily, osMajor, deviceFamily.
     *  The third argument is the listener is the innerMap for the connections own data (not needed by most applications).
     * @param {Function} listener
     * @example
     *   easyrtc.setRoomOccupantListener( function(roomName, list, selfInfo){
     *      for( var i in list ){
     *         ("easyrtcid=" + i + " belongs to user " + list[i].username);
     *      }
     *   });
     */
    setRoomOccupantListener(listener: (roomName: string, list: any[], info: any) => void): void;    //stub
    /**
     * Sets a callback that is called when a data channel is open and ready to send data.
     * The callback will be called with an easyrtcid as it's sole argument.
     * @param {Function} listener
     * @example
     *    easyrtc.setDataChannelOpenListener( function(easyrtcid){
     *         easyrtc.sendDataP2P(easyrtcid, "greeting", "hello");
     *    });
     */
    setDataChannelOpenListener(listener: (easyrtcid: string) => void): void;
    /** Sets a callback that is called when a previously open data channel closes.
     * The callback will be called with an easyrtcid as it's sole argument.
     * @param {Function} listener
     * @example
     *    easyrtc.setDataChannelCloseListener( function(easyrtcid){
     *            ("No longer connected to " + easyrtc.idToName(easyrtcid));
     *    });
     */
    setDataChannelCloseListener(listener: (easyrtcid: string) => void): void;
    /** Returns the number of live peer connections the client has.
     * @return {Number}
     * @example
     *    ("You have " + easyrtc.getConnectionCount() + " peer connections");
     */
    getConnectionCount(): number;
    /** Sets whether audio is transmitted by the local user in any subsequent calls.
     * @param {Boolean} enabled true to include audio, false to exclude audio. The default is true.
     * @example
     *      easyrtc.enableAudio(false);
     */
    enableAudio(enabled: boolean): void;
    /**
     *Sets whether video is transmitted by the local user in any subsequent calls.
     * @param {Boolean} enabled - true to include video, false to exclude video. The default is true.
     * @example
     *      easyrtc.enableVideo(false);
     */
    enableVideo(enabled: boolean): void;
    /**
     * Sets whether WebRTC data channels are used to send inter-client messages.
     * This is only the messages that applications explicitly send to other applications, not the WebRTC signaling messages.
     * @param {Boolean} enabled  true to use data channels, false otherwise. The default is false.
     * @example
     *     easyrtc.enableDataChannels(true);
     */
    enableDataChannels(enabled: boolean): void;

    /**
     * Returns the user assigned id's of currently active local media streams.
     * @return {Array}
     */
    getLocalMediaIds(): string[];

    /**
      * Allow an externally created mediastream (ie, created by another
      * library) to be used within easyrtc. Tracking when it closes
      * must be done by the supplying party.
      */
    register3rdPartyLocalMediaStream(stream: MediaStream, streamName: string): void;

    getNameOfRemoteStream(easyrtcId: string, webrtcStream?: (string | {id: string})): MediaStream;

    /**
     * Close the local media stream. You usually need to close the existing media stream
     * of a camera before reacquiring it at a different resolution.
     * @param {String} streamName - an option stream name.
     */
    closeLocalMediaStream(streamName: string): void;

    /**
     * Alias for closeLocalMediaStream
     */
    closeLocalStream(streamName: string): void;
    /**
     * This function is used to enable and disable the local camera. If you disable the
     * camera, video objects display it will "freeze" until the camera is re-enabled. *
     * By default, a camera is enabled.
     * @param {Boolean} enable - true to enable the camera, false to disable it.
     * @param {String} streamName - the name of the stream, optional.
     */
    enableCamera(enable: boolean, streamName: string): void;
    /**
     * This function is used to enable and disable the local microphone. If you disable
     * the microphone, sounds stops being transmitted to your peers. By default, the microphone
     * is enabled.
     * @param {Boolean} enable - true to enable the microphone, false to disable it.
     * @param {String} streamName - an optional streamName
     */
    enableMicrophone(enable: boolean, streamName: string): void;
    /**
     * Mute a video object.
     * @param {String} videoObjectName - A DOMObject or the id of the DOMObject.
     * @param {Boolean} mute - true to mute the video object, false to unmute it.
     */
    muteVideoObject(videoObjectName: string, mute: boolean): void;
    /**
     * Returns a URL for your local camera and microphone.
     *  It can be called only after easyrtc.initMediaSource has succeeded.
     *  It returns a url that can be used as a source by the Chrome video element or the &lt;canvas&gt; element.
     *  @param {String} streamName - an option stream name.
     *  @return {URL}
     *  @example
     *      document.getElementById("myVideo").src = easyrtc.getLocalStreamAsUrl();
     */
    getLocalStreamAsUrl(streamName?: string): string;
    /**
     * Returns a media stream for your local camera and microphone.
     *  It can be called only after easyrtc.initMediaSource has succeeded.
     *  It returns a stream that can be used as an argument to easyrtc.setVideoObjectSrc.
     *  Returns null if there is no local media stream acquired yet.
     * @return {?MediaStream}
     * @example
     *    easyrtc.setVideoObjectSrc( document.getElementById("myVideo"), easyrtc.getLocalStream());
     */
    getLocalStream(streamName?: string): MediaStream;
    /** Clears the media stream on a video object.
     *
     * @param {Object} element the video object.
     * @example
     *    easyrtc.clearMediaStream( document.getElementById('selfVideo'));
     *
     */
    clearMediaStream(element: HTMLMediaElement): void;
    /**
     *  Sets a video or audio object from a media stream.
     *  Chrome uses the src attribute and expects a URL, while firefox
     *  uses the mozSrcObject and expects a stream. This procedure hides
     *  that from you.
     *  If the media stream is from a local webcam, you may want to add the
     *  easyrtcMirror class to the video object so it looks like a proper mirror.
     *  The easyrtcMirror class is defined in this.css.
     *  Which is could be added using the same path of easyrtc.js file to an HTML file
     *  @param {Object} videoObject an HTML5 video object
     *  @param {MediaStream|String} stream a media stream as returned by easyrtc.getLocalStream or your stream acceptor.
     * @example
     *    easyrtc.setVideoObjectSrc( document.getElementById("myVideo"), easyrtc.getLocalStream());
     *
     */
    setVideoObjectSrc(videoObject: HTMLMediaElement, stream: (MediaStream | string)): void;

    /**
     * This function builds a new named local media stream from a set of existing audio and video tracks from other media streams.
     * @param {String} streamName is the name of the new media stream.
     * @param {Array} audioTracks is an array of MediaStreamTracks
     * @param {Array} videoTracks is an array of MediaStreamTracks
     * @returns {?MediaStream} the track created.
     * @example
     *    easyrtc.buildLocalMediaStream("myComposedStream",
     *             easyrtc.getLocalStream("camera1").getVideoTracks(),
     *             easyrtc.getLocalStream("camera2").getAudioTracks());
     */
    buildLocalMediaStream(streamName: string, audioTracks: MediaStreamTrack[], videoTracks: MediaStreamTrack[]): MediaStream;

    /** Initializes your access to a local camera and microphone.
     *  Failure could be caused a browser that didn't support WebRTC, or by the user
     * not granting permission.
     * If you are going to call easyrtc.enableAudio or easyrtc.enableVideo, you need to do it before
     * calling easyrtc.initMediaSource.
     * @param {function(Object)} successCallback - will be called with localmedia stream on success.
     * @param {function(String,String)} errorCallback - is called with an error code and error description.
     * @param {String} streamName - an optional name for the media source so you can use multiple cameras and screen share simultaneously.
     * @example
     *       easyrtc.initMediaSource(
     *          function(mediastream){
     *              easyrtc.setVideoObjectSrc( document.getElementById("mirrorVideo"), mediastream);
     *          },
     *          function(errorCode, errorText){
     *               easyrtc.showError(errorCode, errorText);
     *          });
     *
     */
    initMediaSource(successCallback: (mediastream: MediaStream) => void, errorCallback?: (errorCode: string, errorText: string) => void, streamName?: string): void;
    /**
     * Sets the callback used to decide whether to accept or reject an incoming call.
     * @param {Function} acceptCheck takes the arguments (callerEasyrtcid, acceptor).
     * The acceptCheck callback is passed an easyrtcid and an acceptor function. The acceptor function should be called with either
     * a true value (accept the call) or false value( reject the call) as it's first argument, and optionally,
     * an array of local media streamNames as a second argument.
     * @example
     *      easyrtc.setAcceptChecker( function(easyrtcid, acceptor){
     *           if( easyrtc.idToName(easyrtcid) === 'Fred' ){
     *              acceptor(true);
     *           }
     *           else if( easyrtc.idToName(easyrtcid) === 'Barney' ){
     *              setTimeout( function(){
     acceptor(true, ['myOtherCam']); // myOtherCam presumed to a streamName
     }, 10000);
     *           }
     *           else{
     *              acceptor(false);
     *           }
     *      });
     */
    setAcceptChecker(acceptCheck: (callerEasyrtcid: string, acceptor: (wasAccepted: boolean, streamNames?: (string[] | string)) => void) => void): void;
    /**
     * easyrtc.setStreamAcceptor sets a callback to receive media streams from other peers, independent
     * of where the call was initiated (caller or callee).
     * @param {Function} acceptor takes arguments (caller, mediaStream, mediaStreamName)
     * @example
     *  easyrtc.setStreamAcceptor(function(easyrtcid, stream, streamName){
     *     document.getElementById('callerName').innerHTML = easyrtc.idToName(easyrtcid);
     *     easyrtc.setVideoObjectSrc( document.getElementById("callerVideo"), stream);
     *  });
     */
    setStreamAcceptor(acceptor: (callerEasyrtcid: string, mediaStream: MediaStream, mediaStreamName: string) => void): void;
    /** Sets the easyrtc.onError field to a user specified function.
     * @param {Function} errListener takes an object of the form {errorCode: String, errorText: String}
     * @example
     *    easyrtc.setOnError( function(errorObject){
     *        document.getElementById("errMessageDiv").innerHTML += errorObject.errorText;
     *    });
     */
    setOnError(errListener: (errorObject: {errorCode: string; errorText: string}) => void): void;
    /**
     * Sets the callCancelled callback. This will be called when a remote user
     * initiates a call to you, but does a "hangup" before you have a chance to get his video stream.
     * @param {Function} callCancelled takes an easyrtcid as an argument and a boolean that indicates whether
     *  the call was explicitly cancelled remotely (true), or actually accepted by the user attempting a call to
     *  the same party.
     * @example
     *     easyrtc.setCallCancelled( function(easyrtcid, explicitlyCancelled){
     *        if( explicitlyCancelled ){
     *            console.log(easyrtc.idToName(easyrtcid) + " stopped trying to reach you");
     *         }
     *         else{
     *            console.log("Implicitly called "  + easyrtc.idToName(easyrtcid));
     *         }
     *     });
     */
    setCallCancelled(callCancelled: (easyrtcid: string, explicitlyCancelled: boolean) => void): void;
    /**  Sets a callback to receive notification of a media stream closing. The usual
     *  use of this is to clear the source of your video object so you aren't left with
     *  the last frame of the video displayed on it.
     *  @param {Function} onStreamClosed takes an easyrtcid as it's first parameter, the stream as it's second argument, and name of the video stream as it's third.
     *  @example
     *     easyrtc.setOnStreamClosed( function(easyrtcid, stream, streamName){
     *         easyrtc.setVideoObjectSrc( document.getElementById("callerVideo"), "");
     *         ( easyrtc.idToName(easyrtcid) + " closed stream " + stream.id + " " + streamName);
     *     });
     */
    setOnStreamClosed(onStreamClosed: (easyrtcid: string, stream: MediaStream, streamName: string) => void): void;
    /** @deprecated No longer supported by Google.
     * Sets the bandwidth for sending video data.
     * Setting the rate too low will cause connection attempts to fail. 40 is probably good lower limit.
     * The default is 50. A value of zero will remove bandwidth limits.
     * @param {Number} kbitsPerSecond is rate in kilobits per second.
     * @example
     *    easyrtc.setVideoBandwidth( 40);
     */
    setVideoBandwidth(kbitsPerSecond: number): void;
    /** Determines whether the current browser supports the new data channels.
     * EasyRTC will not open up connections with the old data channels.
     * @returns {Boolean}
     */
    supportsDataChannels(): boolean;
    /**
     * Sets a listener for data sent from another client (either peer to peer or via websockets).
     * If no msgType or source is provided, the listener applies to all events that aren't otherwise handled.
     * If a msgType but no source is provided, the listener applies to all messages of that msgType that aren't otherwise handled.
     * If a msgType and a source is provided, the listener applies to only message of the specified type coming from the specified peer.
     * The most specific case takes priority over the more general.
     * @param {Function} listener has the signature (easyrtcid, msgType, msgData, targeting).
     *   msgType is a string. targeting is null if the message was received using WebRTC data channels, otherwise it
     *   is an object that contains one or more of the following string valued elements {targetEasyrtcid, targetGroup, targetRoom}.
     * @param {String} msgType - a string, optional.
     * @param {String} source - the sender's easyrtcid, optional.
     * @example
     *     easyrtc.setPeerListener( function(easyrtcid, msgType, msgData, targeting){
     *         console.log("From " + easyrtc.idToName(easyrtcid) +
     *             " sent the following data " + JSON.stringify(msgData));
     *     });
     *     easyrtc.setPeerListener( function(easyrtcid, msgType, msgData, targeting){
     *         console.log("From " + easyrtc.idToName(easyrtcid) +
     *             " sent the following data " + JSON.stringify(msgData));
     *     }, 'food', 'dkdjdekj44--');
     *     easyrtc.setPeerListener( function(easyrtcid, msgType, msgData, targeting){
     *         console.log("From " + easyrtcid +
     *             " sent the following data " + JSON.stringify(msgData));
     *     }, 'drink');
     *
     *
     */
    setPeerListener(listener: (easyrtcid: string, msgType: string, msgData: any, targeting: {targetEasyrtcid?: string; targetGroup?: string; targetRoom?: string}) => void, msgType?: string, source?: string): void;
    /**
     * Sets a listener for messages from the server.
     * @param {Function} listener has the signature (msgType, msgData, targeting)
     * @example
     *     easyrtc.setServerListener( function(msgType, msgData, targeting){
     *         ("The Server sent the following message " + JSON.stringify(msgData));
     *     });
     */
    setServerListener(listener: (msgType: string, msgData: any, targeting: {targetEasyrtcid?: string; targetGroup?: string; targetRoom?: string}) => void): void;
    /**
     * Sets the url of the Socket server.
     * The node.js server is great as a socket server, but it doesn't have
     * all the hooks you'd like in a general web server, like PHP or Python
     * plug-ins. By setting the serverPath your application can get it's regular
     * pages from a regular web server, but the EasyRTC library can still reach the
     * socket server.
     * @param {String} socketUrl
     * @param {Object} options an optional dictionary of options for socket.io's connect method.
     * The default is {'connect timeout': 10000,'force new connection': true }
     * @example
     *     easyrtc.setSocketUrl(":8080", options);
     */
    setSocketUrl(socketUrl: string, options?: {'connect timeout'?: number; 'force new connection'?: boolean}): void;    //stub
    /**
     * Sets the user name associated with the connection.
     * @param {String} username must obey standard identifier conventions.
     * @returns {Boolean} true if the call succeeded, false if the username was invalid.
     * @example
     *    if( !easyrtc.setUsername("JohnSmith") ){
     *        console.error("bad user name);
     *
     */
    setUsername(username: string): void;
    /**
     * Get an array of easyrtcids that are using a particular username
     * @param {String} username - the username of interest.
     * @param {String} room - an optional room name argument limiting results to a particular room.
     * @returns {Array} an array of {easyrtcid:id, roomName: roomName}.
     */
    usernameToIds(username: string, room?: string): {easyrtcid: string; roomName: string}[];
    /**
     * Returns another peers API field, if it exists.
     * @param {type} roomName
     * @param {type} easyrtcid
     * @param {type} fieldName
     * @returns {Object}  Undefined if the attribute does not exist, its value otherwise.
     */
    getRoomApiField(roomName: string, easyrtcid: string, fieldName: string): any;
    /**
     * Set the authentication credential if needed.
     * @param {Object} credentialParm - a JSONable object.
     */
    setCredential(credentialParm: any): boolean;    //stub
    /**
     * Sets the listener for socket disconnection by external (to the API) reasons.
     * @param {Function} disconnectListener takes no arguments and is not called as a result of calling easyrtc.disconnect.
     * @example
     *    easyrtc.setDisconnectListener(function(){
     *        easyrtc.showError("SYSTEM-ERROR", "Lost our connection to the socket server");
     *    });
     */
    setDisconnectListener(disconnectListener: () => void): void;
    /**
     * Convert an easyrtcid to a user name. This is useful for labeling buttons and messages
     * regarding peers.
     * @param {String} easyrtcid
     * @return {String} the username associated with the easyrtcid, or the easyrtcid if there is
     * no associated username.
     * @example
     *    console.log(easyrtcid + " is actually " + easyrtc.idToName(easyrtcid));
     */
    idToName(easyrtcid: string): string;
    /**
     * Determines whether fresh ice server configuration should be requested from the server for each peer connection.
     * @param {Boolean} value the default is false.
     */
    setUseFreshIceEachPeerConnection(value: boolean): void;
    /**
     * Returns the last ice config supplied by the EasyRTC server. This function is not normally used, it is provided
     * for people who want to try filtering ice server configuration on the client.
     * @return {Object} which has the form {iceServers:[ice_server_entry, ice_server_entry, ...]}
     */
    getServerIce(): {iceServers?: {url: string; credential?: string; username?: string}[]};
    /**
     * Sets the ice server configuration that will be used in subsequent calls. You only need this function if you are filtering
     * the ice server configuration on the client or if you are using TURN certificates that have a very short lifespan.
     * @param {Object} ice An object with iceServers element containing an array of ice server entries.
     * @example
     *     easyrtc.setIceUsedInCalls( {"iceServers": [
     *      {
     *			"url": "stun:stun.sipgate.net"
     *		},
     *      {
     *         "url": "stun:217.10.68.152"
     *      },
     *      {
     *         "url": "stun:stun.sipgate.net:10000"
     *      }
     *      ]});
     *      easyrtc.call(...);
     */
    setIceUsedInCalls(ice: {iceServers?: {url: string; credential?: string; username?: string}[]}): void;
    /** Determines if a particular peer2peer connection has an audio track.
     * @param {String} easyrtcid - the id of the other caller in the connection. If easyrtcid is not supplied, checks the local media.
     * @param {String} streamName - an optional stream id.
     * @return {Boolean} true if there is an audio track or the browser can't tell us.
     */
    haveAudioTrack(easyrtcid: string, streamName?: string): boolean;
    /** Determines if a particular peer2peer connection has a video track.
     * @param {String} easyrtcid - the id of the other caller in the connection. If easyrtcid is not supplied, checks the local media.
     * @param {String} streamName - an optional stream id.     *
     * @return {Boolean} true if there is an video track or the browser can't tell us.
     */
    haveVideoTrack(easyrtcid: string, streamName?: string): boolean;
    /**
     * Gets a data field associated with a room.
     * @param {String} roomName - the name of the room.
     * @param {String} fieldName - the name of the field.
     * @return {Object} dataValue - the value of the field if present, undefined if not present.
     */
    getRoomField(roomName: string, fieldName: string): any;

    /**
     * Experimental function to determine if statistics gathering is supported.
     */
    supportsStatistics(): boolean;

    /**
     * easyrtc.disconnect performs a clean disconnection of the client from the server.
     */
    disconnect(): void;

    /**
     *Sends data to another user using previously established data channel. This method will
     * fail if no data channel has been established yet. Unlike the easyrtc.sendWS method,
     * you can't send a dictionary, convert dictionaries to strings using JSON.stringify first.
     * What data types you can send, and how large a data type depends on your browser.
     * @param {String} destEasyrtcid (an easyrtcid)
     * @param {String} msgType - the type of message being sent (application specific).
     * @param {Object} msgData - a JSONable object.
     * @example
     *     easyrtc.sendDataP2P(someEasyrtcid, "roomData", {room:499, bldgNum:'asd'});
     */
    sendDataP2P(destEasyrtcid: string, msgType: string, msgData: any): void;
    /** Sends data to another user using websockets. The easyrtc.sendServerMessage or easyrtc.sendPeerMessage methods
     * are wrappers for this method; application code should use them instead.
     * @param {String} destEasyrtcid - either a string containing the easyrtcId of the other user, or an object containing some subset of the following fields: targetEasyrtcid, targetGroup, targetRoom.
     * Specifying multiple fields restricts the scope of the destination (operates as a logical AND, not a logical OR).
     * @param {String} msgType -the type of message being sent (application specific).
     * @param {Object} msgData - a JSONable object.
     * @param {Function} ackhandler - by default, the ackhandler handles acknowledgments from the server that your message was delivered to it's destination.
     * However, application logic in the server can over-ride this. If you leave this null, a stub ackHandler will be used. The ackHandler
     * gets passed a message with the same msgType as your outgoing message, or a message type of "error" in which case
     * msgData will contain a errorCode and errorText fields.
     * @example
     *    easyrtc.sendDataWS(someEasyrtcid, "setPostalAddress", {room:499, bldgNum:'asd'},
     *      function(ackMsg){
     *          console.log("saw the following acknowledgment " + JSON.stringify(ackMsg));
     *      }
     *    );
     */
    sendDataWS(destEasyrtcid: string, msgType: string, msgData: any, ackhandler?: (msg: any, ...args: any[]) => void): void;
    /** Sends data to another user. This method uses data channels if one has been set up, or websockets otherwise.
     * @param {String} destEasyrtcid - a string containing the easyrtcId of the other user.
     * Specifying multiple fields restricts the scope of the destination (operates as a logical AND, not a logical OR).
     * @param {String} msgType -the type of message being sent (application specific).
     * @param {Object} msgData - a JSONable object.
     * @param {Function} ackhandler - a function which receives acknowledgments. May only be invoked in
     *  the websocket case.
     * @example
     *    easyrtc.sendData(someEasyrtcid, "roomData",  {room:499, bldgNum:'asd'},
     *       function ackHandler(msgType, msgData);
     *    );
     */
    sendData(destEasyrtcid: string, msgType: string, msgData: any, ackhandler?: (msg: any, ...args: any[]) => void): void;
    /**
     * Sends a message to another peer on the easyrtcMsg channel.
     * @param {String} destEasyrtcid - either a string containing the easyrtcId of the other user, or an object containing some subset of the following fields: targetEasyrtcid, targetGroup, targetRoom.
     * Specifying multiple fields restricts the scope of the destination (operates as a logical AND, not a logical OR).
     * @param {String} msgType - the type of message being sent (application specific).
     * @param {Object} msgData - a JSONable object with the message contents.
     * @param {function(String, Object)} successCB - a callback function with results from the server.
     * @param {function(String, String)} failureCB - a callback function to handle errors.
     * @example
     *     easyrtc.sendPeerMessage(otherUser, 'offer_candy', {candy_name:'mars'},
     *             function(msgType, msgBody ){
     *                console.log("message was sent");
     *             },
     *             function(errorCode, errorText){
     *                console.log("error was " + errorText);
     *             });
     */
    sendPeerMessage(destEasyrtcid: string, msgType: string, msgData: any, successCB?: (msgType: string, msgBody: any) => void, failureCB?: (errorCode: string, errorText: string) => void): void;
    /**
     * Sends a message to the application code in the server (ie, on the easyrtcMsg channel).
     * @param {String} msgType - the type of message being sent (application specific).
     * @param {Object} msgData - a JSONable object with the message contents.
     * @param {function(String, Object)} successCB - a callback function with results from the server.
     * @param {function(String, String)} failureCB - a callback function to handle errors.
     * @example
     *     easyrtc.sendServerMessage('get_candy', {candy_name:'mars'},
     *             function(msgType, msgData ){
     *                console.log("got candy count of " + msgData.barCount);
     *             },
     *             function(errorCode, errorText){
     *                console.log("error was " + errorText);
     *             });
     */
    sendServerMessage(msgType: string, msgData: any, successCB?: (msgType: string, msgBody: any) => void, failureCB?: (errorCode: string, errorText: string) => void): void;
    /** Sends the server a request for the list of rooms the user can see.
     * You must have already be connected to use this function.
     * @param {function(Object)} callback - on success, this function is called with a map of the form  { roomName:{"roomName":String, "numberClients": Number}}.
     * The roomName appears as both the key to the map, and as the value of the "roomName" field.
     * @param {function(String, String)} errorCallback   is called on failure. It gets an errorCode and errorText as it's too arguments.
     * @example
     *    easyrtc.getRoomList(
     *        function(roomList){
     *           for(roomName in roomList){
     *              console.log("saw room " + roomName);
     *           }
     *         },
     *         function(errorCode, errorText){
     *            easyrtc.showError(errorCode, errorText);
     *         }
     *    );
     */
    getRoomList(callback: (roomList: {[roomName: string]: {roomName: string; numberClients: number}}) => void, errorCallback?: (errorCode: string, errorText: string) => void): void;
    /** Value returned by easyrtc.getConnectStatus if the other user isn't connected to us. */
    NOT_CONNECTED: string;
    /** Value returned by easyrtc.getConnectStatus if the other user is in the process of getting connected */
    BECOMING_CONNECTED: string;
    /** Value returned by easyrtc.getConnectStatus if the other user is connected to us. */
    IS_CONNECTED: string;
    /**
     * Check if the client has a peer-2-peer connection to another user.
     * The return values are text strings so you can use them in debugging output.
     *  @param {String} otherUserEasyrtcid - the easyrtcid of the other user.
     *  @return {String} one of the following values: easyrtc.NOT_CONNECTED, easyrtc.BECOMING_CONNECTED, easyrtc.IS_CONNECTED
     *  @example
     *     if( easyrtc.getConnectStatus(otherEasyrtcid) == easyrtc.NOT_CONNECTED ){
     *         easyrtc.call(otherEasyrtcid,
     *                  function(){ console.log("success"); },
     *                  function(){ console.log("failure"); });
     *     }
     */
    getConnectStatus(otherUserEasyrtcid: string): string;

    /**
     *  Initiates a call to another user. If it succeeds, the streamAcceptor callback will be called.
     * @param {String} otherUserEasyrtcid - the easyrtcid of the peer being called.
     * @param {Function} callSuccessCB (otherCaller, mediaType) - is called when the datachannel is established or the MediaStream is established. mediaType will have a value of "audiovideo" or "datachannel"
     * @param {Function} callFailureCB (errorCode, errMessage) - is called if there was a system error interfering with the call.
     * @param {Function} wasAcceptedCB (wasAccepted:boolean,otherUser:string) - is called when a call is accepted or rejected by another party. It can be left null.
     * @param {Array} streamNames - optional array of streamNames.
     * @example
     *    easyrtc.call( otherEasyrtcid,
     *        function(easyrtcid, mediaType){
     *           console.log("Got mediaType " + mediaType + " from " + easyrtc.idToName(easyrtcid));
     *        },
     *        function(errorCode, errMessage){
     *           console.log("call to  " + easyrtc.idToName(otherEasyrtcid) + " failed:" + errMessage);
     *        },
     *        function(wasAccepted, easyrtcid){
     *            if( wasAccepted ){
     *               console.log("call accepted by " + easyrtc.idToName(easyrtcid));
     *            }
     *            else{
     *                console.log("call rejected" + easyrtc.idToName(easyrtcid));
     *            }
     *        });
     */
    call(otherUserEasyrtcid: string, callSuccessCB: (otherCaller: string, mediaType: string) => void, callFailureCB: (errorCode: string, errMessage: string) => void, wasAcceptedCB?: (wasAccepted: boolean, otherUser: string) => void, streamNames?: string[] | string): void;

    /**
     * Hang up on a particular user or all users.
     *  @param {String} otherUserEasyrtcid - the easyrtcid of the person to hang up on.
     *  @example
     *     easyrtc.hangup(someEasyrtcid);
     */
    hangup(otherUserEasyrtcid: string): void;
        /**
     * Hangs up on all current connections.
     * @example
     *    easyrtc.hangupAll();
     */
    hangupAll(): void;
    /** Checks to see if data channels work between two peers.
     * @param {String} otherUserEasyrtcid - the other peer.
     * @returns {Boolean} true if data channels work and are ready to be used
     *   between the two peers.
     */
    doesDataChannelWork(otherUserEasyrtcid: string): boolean;
    /**
     * Return the media stream shared by a particular peer. This is needed when you
     * add a stream in the middle of a call.
     * @param {String} easyrtcid the peer.
     * @param {String} remoteStreamName an optional argument supplying the streamName.
     * @returns {Object} A mediaStream.
     */
    getRemoteStream(easyrtcid: string, remoteStreamName?: string): MediaStream;
    /**
     * Assign a local streamName to a remote stream so that it can be forwarded to other callers.
     * @param {String} easyrtcid the peer supplying the remote stream
     * @param {String} remoteStreamName the streamName supplied by the peer.
     * @param {String} localStreamName streamName used when passing the stream to other peers.
     * @example
     *    easyrtc.makeLocalStreamFromRemoteStream(sourcePeer, "default", "forwardedStream");
     *    easyrtc.call(nextPeer, callSuccessCB, callFailureCB, wasAcceptedCB, ["forwardedStream"]);
     */
    makeLocalStreamFromRemoteStream(easyrtcid: string, remoteStreamName?: string, localStreamName?: string): void;

    /**
     * Add a named local stream to a call.
     * @param {String} easyrtcid The id of client receiving the stream.
     * @param {String} streamName The name of the stream.
     * @param {Function} receiptHandler is a function that gets called when the other side sends a message
     *   that the stream has been received. The receiptHandler gets called with an easyrtcid and a stream name. This
     *   argument is optional.
     */
    addStreamToCall(easyrtcid: string, streamName?: string, receiptHandler?: (easyrtcid: string, streamName: string) => void): void;

    dumpPeerConnectionInfo(): void;

    /**
      * Checks to see if a particular peer is present in any room.
      * If it isn't, we assume it's logged out.
      * @param easyrtcid the easyrtcId of the peer.
      */
    isPeerInAnyRoom(easyrtcid: string): boolean;

    /**
     * Sets the presence state on the server.
     * @param {String} state - one of 'away','chat','dnd','xa'
     * @param {String} statusText - User configurable status string. May be length limited.
     * @example   easyrtc.
     * sence('dnd', 'sleeping');
     */
    updatePresence(state: string, statusText: string): void;    //stub
//    updatePresence(state: ('away'|'chat'|'dnd'|'xa'), statusText: string): void;
    /**
     * Fetch the collection of session fields as a map. The map has the structure:
     *  {key1: {"fieldName": key1, "fieldValue": value1}, ...,
     *   key2: {"fieldName": key2, "fieldValue": value2}
     *  }
     * @returns {Object}
     */
    getSessionFields(): {[fieldName: string]: {fieldName: string; fieldValue: any}};
    /**
     * Fetch the value of a session field by name.
     * @param {String} name - name of the session field to be fetched.
     * @returns the field value (which can be anything). Returns undefined if the field does not exist.
     */
    getSessionField(name: string): any;

    /**
     * Returns an array of easyrtcid's of peers in a particular room.
     * @param roomName
     * @returns {Array} of easyrtcids or null if the client is not in the room.
     * @example
     *     var occupants = easyrtc.getRoomOccupants("default");
     *     var i;
     *     for( i = 0; i < occupants.length; i++ ) {
     *         console.log( occupants[i] + " is in the room");
     *     }
     */
    getRoomOccupantsAsArray(roomName: string): string[];

    /**
     * Returns a map of easyrtcid's of peers in a particular room. You should only test elements in the map to see if they are
     * null; their actual values are not guaranteed to be the same in different releases.
     * @param roomName
     * @returns {Object} of easyrtcids or null if the client is not in the room.
     * @example
     *      if( easyrtc.getRoomOccupantsAsMap("default")[some_easyrtcid]) {
     *          console.log("yep, " + some_easyrtcid + " is in the room");
     *      }
     */
    getRoomOccupantsAsMap(roomName: string): {[easyrtcid: string]: any}; //stub

    /**
     * Returns true if the ipAddress parameter was the address of a turn server. This is done by checking against information
     * collected during peer to peer calls. Don't expect it to work before the first call, or to identify turn servers that aren't
     * in the ice config.
     * @param ipAddress
     * @returns {boolean} true if ip address is known to be that of a turn server, false otherwise.
     */
    isTurnServer(ipAddress: string): boolean;

    /**
     * Request fresh ice config information from the server.
     * This should be done periodically by long running applications.
     * @param {Function} callback is called with a value of true on success, false on failure.
     */
    getFreshIceConfig(callback?: (status: boolean) => void): void;

    /** Get a list of the rooms you are in. You must be connected to call this function.
     * @returns {Object} A map whose keys are the room names
     */
    getRoomsJoined(): {[roomName: string]: boolean};
    /** Get server defined fields associated with a particular room. Only valid
     * after a connection has been made.
     * @param {String} roomName - the name of the room you want the fields for.
     * @returns {Object} A dictionary containing entries of the form {key:{'fieldName':key, 'fieldValue':value1}} or undefined
     * if you are not connected to the room.
     */
    getRoomFields(roomName: string): {[fieldName: string]: {fieldName: string; fieldValue: any}};
    /** Get server defined fields associated with the current application. Only valid
     * after a connection has been made.
     * @returns {Object} A dictionary containing entries of the form {key:{'fieldName':key, 'fieldValue':value1}}
     */
    getApplicationFields(): {[fieldName: string]: {fieldName: string; fieldValue: any}};
    /** Get server defined fields associated with the connection. Only valid
     * after a connection has been made.
     * @returns {Object} A dictionary containing entries of the form {key:{'fieldName':key, 'fieldValue':value1}}
     */
    getConnectionFields(): {[fieldName: string]: {fieldName: string; fieldValue: any}};

    /** By default, the easyApp routine sticks a "close" button on top of each caller
     * video object that it manages. Call this function(before calling easyApp) to disable that particular feature.
     * @example
     *    easyrtc.dontAddCloseButtons();
     */
    dontAddCloseButtons(): void;
    /**
     * Provides a layer on top of the easyrtc.initMediaSource and easyrtc.connect, assign the local media stream to
     * the video object identified by monitorVideoId, assign remote video streams to
     * the video objects identified by videoIds, and then call onReady. One of it's
     * side effects is to add hangup buttons to the remote video objects, buttons
     * that only appear when you hover over them with the mouse cursor. This method will also add the
     * easyrtcMirror class to the monitor video object so that it behaves like a mirror.
     *  @param {String} applicationName - name of the application.
     *  @param {String} monitorVideoId - the id of the video object used for monitoring the local stream.
     *  @param {Array} videoIds - an array of video object ids (strings)
     *  @param {Function} onReady - a callback function used on success. It is called with the easyrtcId this peer is known to the server as.
     *  @param {Function} onFailure - a callback function used on failure (failed to get local media or a connection of the signaling server).
     *  @example
     *     easyrtc.easyApp('multiChat', 'selfVideo', ['remote1', 'remote2', 'remote3'],
     *              function(easyrtcId){
     *                  console.log("successfully connected, I am " + easyrtcId);
     *              },
     *              function(errorCode, errorText){
     *                  console.log(errorText);
     *              );
     */
    easyApp(applicationName: string, monitorVideoId: string, videoIds: string[], onReady: (easyrtcid: string) => void, onFailure?: (errorCode: string, errorText: string) => void): void;
     /**
     *
     * @deprecated now called easyrtc.easyApp.
     */
    initManaged(applicationName: string, monitorVideoId: string, videoIds: string[], onReady: (easyrtcid: string) => void, onFailure?: (errorCode: string, errorText: string) => void): void;

    /**
     * Supply a socket.io connection that will be used instead of allocating a new socket.
     * The expected usage is that you allocate a websocket, assign options to it, call
     * easyrtc.useThisSocketConnection, followed by easyrtc.connect or easyrtc.easyApp. Easyrtc will not attempt to
     * close sockets that were supplied with easyrtc.useThisSocketConnection.
     * @param {Object} alreadyAllocatedSocketIo A value allocated with the connect method of socket.io.
     */
    useThisSocketConnection(alreadyAllocatedSocketIo: SocketIOClient.Socket): void;

    /**
     * Connect to the easyrtc signaling server.
     * @param applicationName
     * @param successCallback
     * @param errorCallback
     */
    /**
     * Connects to the EasyRTC signaling server. You must connect before trying to
     * call other users.
     * @param {String} applicationName is a string that identifies the application so that different applications can have different
     *        lists of users. Note that the server configuration specifies a regular expression that is used to check application names
     *        for validity. The default pattern is that of an identifier, spaces are not allowed.
     * @param {Function} successCallback (easyrtcId, roomOwner) - is called on successful connect. easyrtcId is the
     *   unique name that the client is known to the server by. A client usually only needs it's own easyrtcId for debugging purposes.
     *       roomOwner is true if the user is the owner of a room. It's value is random if the user is in multiple rooms.
     * @param {Function} errorCallback (errorCode, errorText) - is called on unsuccessful connect. if null, an alert is called instead.
     *  The errorCode takes it's value from easyrtc.errCodes.
     * @example
     *   easyrtc.connect("my_chat_app",
     *                   function(easyrtcid, roomOwner){
     *                       if( roomOwner){ console.log("I'm the room owner"); }
     *                       console.log("my id is " + easyrtcid);
     *                   },
     *                   function(errorText){
     *                       console.log("failed to connect ", erFrText);
     *                   });
     */
    connect(applicationName: string, successCallback?: (easyrtcid: string, roomOwner: boolean) => void, errorCallback?: (errorText: string) => void): void;
}

declare var easyrtc: Easyrtc;