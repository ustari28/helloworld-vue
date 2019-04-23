<template>
    <div>
        <div>
            <input v-model="message" placeholder="New message">
            <button v-on:click="sendMessage">Send message</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr><td>Messages</td></tr>
                </thead>
                <tbody>
                    <tr v-for="m in messages" :key="m.idx">
                        <td>{{ m.title }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
var StompJs = require('@stomp/stompjs')
import * as SockJS from 'sockjs-client'

export default Vue.extend({
    name: 'websocket-component',
    data: () => ({
        message: '',
        messages: [],
        stompClient: Object
    }),
    methods: {
        sendMessage: function() {
            console.log('enviando mensaje=>' + this.message)
            const idx = Math.floor(Math.random() * 1000)
            this.stompClient.publish({destination:'/appws/chat.addUser', body: JSON.stringify({idx: idx, title: this.message})})
        },
        callbackSub: function(success) {
            console.log('Receiving->' + success.body)
            this.messages.push(JSON.parse(success.body))
        },
        connectedSocket: function(data) {
            console.log('Conectando->' + data)
            this.stompClient.subscribe('/topic/public', this.callbackSub)
        }
    },    
    created() {
        var stompConfig = {
            brokerURL: 'ws://127.0.0.1:8090/sockejs',
            debug: function (str) {
                console.log(str);
            },
            webSocketFactory: function () {
                // Note that the URL is different from the WebSocket URL 
                return new SockJS("http://127.0.0.1:8090/sockejs")
            },
            onConnect: this.connectedSocket,
            onDisconnect: function() {
                console.log("disconnecting")
            }
        } 
        this.stompClient = new StompJs.Client(stompConfig)
        this.stompClient.activate()
    }
})
</script>
