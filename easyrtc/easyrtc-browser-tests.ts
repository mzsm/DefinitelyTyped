/// <reference path="easyrtc-browser.d.ts"/>

//From comments of source code.
var easyrtcid = "1234567890";

easyrtc.getAudioSourceList( function(list) {
    for(var i = 0; i < list.length; i++ ) {
        console.log("label=" + list[i].label + ", id= " + list[i].id);
    }
});
easyrtc.getVideoSourceList( function(list) {
    for(var i = 0; i < list.length; i++ ) {
        console.log("label=" + list[i].label + ", id= " + list[i].id);
    }
});

var name = (<HTMLInputElement>document.getElementById('nameField')).value;
if( !easyrtc.isNameValid(name)){
    console.error("Bad user name");
}

easyrtc.joinRoom("freds_room", null, function(roomName){ console.log("joined the room")},
                   function(errorCode, errorText, roomName){ console.log("joined the room")});

easyrtc.leaveRoom("freds_room");
easyrtc.leaveRoom("freds_room", function(roomName){ console.log("left the room")},
                   function(errorCode, errorText, roomName){ console.log("left the room")});

easyrtc.setVideoDims(1280,720);
easyrtc.setVideoDims();
easyrtc.setVideoDims(1280,720,30);

easyrtc.setScreenCapture();

easyrtc.setApplicationName('simpleAudioVideo');

easyrtc.enableDebug(true);

easyrtc.disconnect();

easyrtc.setRoomApiField("trekkieRoom",  "favorite_alien", "Mr Spock");
easyrtc.setRoomOccupantListener( function(roomName, list){
    for( var i in list ){
        console.log("easyrtcid=" + i + " favorite alien is " + list[i].apiFields.favorite_alien);
    }
});

console.log( easyrtc.cleanId('&hello'));

easyrtc.setRoomEntryListener(function(entry, roomName){
    if( entry ){
        console.log("entering room " + roomName);
    }
    else{
        console.log("leaving room " + roomName);
    }
});

easyrtc.setRoomOccupantListener( function(roomName, list, selfInfo){
    for( var i in list ){
        ("easyrtcid=" + i + " belongs to user " + list[i].username);
    }
});

easyrtc.setDataChannelOpenListener( function(easyrtcid){
    easyrtc.sendDataP2P(easyrtcid, "greeting", "hello");
});
easyrtc.setDataChannelCloseListener( function(easyrtcid){
    console.log("No longer connected to " + easyrtc.idToName(easyrtcid));
});

console.log("You have " + easyrtc.getConnectionCount() + " peer connections");

easyrtc.enableAudio(false);
easyrtc.enableVideo(false);
easyrtc.enableDataChannels(true);

(<HTMLVideoElement>document.getElementById("myVideo")).src = easyrtc.getLocalStreamAsUrl();

easyrtc.setVideoObjectSrc( <HTMLVideoElement>document.getElementById("myVideo"), easyrtc.getLocalStream());

easyrtc.clearMediaStream( <HTMLVideoElement>document.getElementById('selfVideo'));

easyrtc.setVideoObjectSrc( <HTMLVideoElement>document.getElementById("myVideo"), easyrtc.getLocalStream());

easyrtc.buildLocalMediaStream("myComposedStream",
         easyrtc.getLocalStream("camera1").getVideoTracks(),
         easyrtc.getLocalStream("camera2").getAudioTracks());

easyrtc.initMediaSource(
function(mediastream){
    easyrtc.setVideoObjectSrc( <HTMLVideoElement>document.getElementById("mirrorVideo"), mediastream);
},
function(errorCode, errorText){
     easyrtc.showError(errorCode, errorText);
});

easyrtc.setAcceptChecker( function(easyrtcid, acceptor){
    if( easyrtc.idToName(easyrtcid) === 'Fred' ){
        acceptor(true);
    }
    else if( easyrtc.idToName(easyrtcid) === 'Barney' ){
        setTimeout( function(){
            acceptor(true, ['myOtherCam']); // myOtherCam presumed to a streamName
        }, 10000);
    }
    else{
        acceptor(false);
    }
});

easyrtc.setStreamAcceptor(function(easyrtcid, stream, streamName){
    document.getElementById('callerName').innerHTML = easyrtc.idToName(easyrtcid);
    easyrtc.setVideoObjectSrc( <HTMLVideoElement>document.getElementById("callerVideo"), stream);
});

easyrtc.setOnError( function(errorObject){
    document.getElementById("errMessageDiv").innerHTML += errorObject.errorText;
});

easyrtc.setCallCancelled( function(easyrtcid, explicitlyCancelled){
    if( explicitlyCancelled ){
        console.log(easyrtc.idToName(easyrtcid) + " stopped trying to reach you");
    }
    else{
        console.log("Implicitly called "  + easyrtc.idToName(easyrtcid));
    }
});

easyrtc.setOnStreamClosed( function(easyrtcid, stream, streamName){
    easyrtc.setVideoObjectSrc( <HTMLVideoElement>document.getElementById("callerVideo"), "");
    console.log( easyrtc.idToName(easyrtcid) + " closed stream " + stream.id + " " + streamName);
});

easyrtc.setVideoBandwidth(40);

easyrtc.setPeerListener( function(easyrtcid, msgType, msgData, targeting){
    console.log("From " + easyrtc.idToName(easyrtcid) +
        " sent the following data " + JSON.stringify(msgData));
});
easyrtc.setPeerListener( function(easyrtcid, msgType, msgData, targeting){
    console.log("From " + easyrtc.idToName(easyrtcid) +
        " sent the following data " + JSON.stringify(msgData));
}, 'food', 'dkdjdekj44--');
easyrtc.setPeerListener( function(easyrtcid, msgType, msgData, targeting){
    console.log("From " + easyrtcid +
        " sent the following data " + JSON.stringify(msgData));
}, 'drink');

easyrtc.setServerListener( function(msgType, msgData, targeting){
    console.log("The Server sent the following message " + JSON.stringify(msgData));
});

var options = {};
easyrtc.setSocketUrl(":8080", options);

if( !easyrtc.setUsername("JohnSmith") ){
    console.error("bad user name");
}

console.log(easyrtcid + " is actually " + easyrtc.idToName(easyrtcid));

easyrtc.setIceUsedInCalls( {"iceServers": [
    {
        "url": "stun:stun.sipgate.net"
    },
    {
        "url": "stun:217.10.68.152"
    },
    {
        "url": "stun:stun.sipgate.net:10000"
    }
]});

easyrtc.sendDataP2P(easyrtcid, "roomData", {room:499, bldgNum:'asd'});

easyrtc.sendDataWS(easyrtcid, "setPostalAddress", {room:499, bldgNum:'asd'},
    function(ackMsg){
        console.log("saw the following acknowledgment " + JSON.stringify(ackMsg));
    }
);

easyrtc.sendData(easyrtcid, "roomData",  {room:499, bldgNum:'asd'},
    function(msgType, msgData){}
);

easyrtc.sendPeerMessage(easyrtcid, 'offer_candy', {candy_name:'mars'},
    function(msgType, msgBody ){
        console.log("message was sent");
    },
    function(errorCode, errorText){
        console.log("error was " + errorText);
    });

easyrtc.sendServerMessage('get_candy', {candy_name:'mars'},
    function(msgType, msgData ){
        console.log("got candy count of " + msgData.barCount);
    },
    function(errorCode, errorText){
        console.log("error was " + errorText);
    });

easyrtc.getRoomList(
    function(roomList){
        for(var roomName in roomList){
            console.log("saw room " + roomName);
        }
    },
    function(errorCode, errorText){
        easyrtc.showError(errorCode, errorText);
    }
);

if( easyrtc.getConnectStatus(easyrtcid) == easyrtc.NOT_CONNECTED ){
    easyrtc.call(easyrtcid,
        function(){ console.log("success"); },
        function(){ console.log("failure"); });
}

easyrtc.call( easyrtcid,
   function(easyrtcid, mediaType) {
      console.log("Got mediatype " + mediaType + " from " + easyrtc.idToName(easyrtcid));
   },
   function(errorCode, errMessage) {
      console.log("call to  " + easyrtc.idToName(easyrtcid) + " failed:" + errMessage);
   },
   function(wasAccepted, easyrtcid) {
       if( wasAccepted ){
          console.log("call accepted by " + easyrtc.idToName(easyrtcid));
       }
       else {
           console.log("call rejected" + easyrtc.idToName(easyrtcid));
       }
   });

easyrtc.hangup(easyrtcid);

easyrtc.hangupAll();

easyrtc.makeLocalStreamFromRemoteStream(easyrtcid, "default", "forwardedStream");

easyrtc.updatePresence('dnd', 'sleeping');

var occupants = easyrtc.getRoomOccupantsAsArray("default");
for(var i = 0; i < occupants.length; i++ ) {
    console.log( occupants[i] + " is in the room");
}

if( easyrtc.getRoomOccupantsAsMap("default")[easyrtcid]) {
    console.log("yep, " + easyrtcid + " is in the room");
}

easyrtc.dontAddCloseButtons();
easyrtc.easyApp('multiChat', 'selfVideo', ['remote1', 'remote2', 'remote3'],
    function(easyrtcId){
        console.log("successfully connected, I am " + easyrtcId);
    },
    function(errorCode, errorText) {
        console.log(errorText);
    });

easyrtc.connect("my_chat_app",
                function(easyrtcid, roomOwner){
                    if( roomOwner){ console.log("I'm the room owner"); }
                    console.log("my id is " + easyrtcid);
                },
                function(errorText){
                    console.log("failed to connect ", errorText);
                });