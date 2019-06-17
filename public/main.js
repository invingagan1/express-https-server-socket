/**
 * main.js
 */
var main = {
    socket: null,
    button: null,
    input: null,
    init: function () {

        this.button = $("#send");
        this.input = $("#msg");
        this.button.click(this.sendMessageToServer.bind(this));
        this.createSocket();
        this.listenFromServer();
    },
    createSocket: function () {
        this.socket = io();
    },
    listenFromServer: function (msg) {
        this.socket.on("message", (function(msg){
            this.updateList(msg);
        }).bind(this))
    },
    sendMessageToServer: function () {
        this.updateList('client: ' + this.input.val())
        this.socket.emit("message", this.input.val());
    },
    updateList: function (msg) {
        $("#panel").append(`<p>${msg}</p>`)
    }
}

$(document).ready(function () {
    main.init();
});