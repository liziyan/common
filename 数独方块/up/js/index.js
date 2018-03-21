var app = {
    fontsLoaded: false,
    deviceReady: false,
    started: false,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        setTimeout(function(){navigator.splashscreen.hide();}, 100);
        app.deviceReady = true;
        app.startTheGameIfWeCan();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //console.log('Received Event: ' + id);
    },
    fontsLoaded: function() {
        app.fontsLoaded = true;
        app.startTheGameIfWeCan();
    },
    startTheGameIfWeCan: function() {
        if (app.started) return false;
        app.started = true;
        Game.init();
        Game.start();
    }
};

app.initialize();