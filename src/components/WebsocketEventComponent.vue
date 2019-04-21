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
                        <td>{{ m.tittle }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
//import SockJS from 'sockjs';
//import Stomp from 'stomp';
//var SockJS = require('sockjs')
export default Vue.extend({
    name: 'websocket-component',
    data: () => ({
        message: '',
        messages: Array()
    }),
    methods: {
        sendMessage: function() {
            const idx = Math.floor(Math.random() * 1000)
            this.$socket.emit('SEND_MESSAGE', {idx: idx, title: this.message})
            //this.stompClient.send("/app/hello", {}, 
            //      JSON.stringify({idx: idx, title: this.message}));
            /** this.$http.post('http://localhost:8090/app/hello', {idx: idx, title: this.message})
            .then(success => {
                console.log('éxito')
            }
            , error => {
                console.log('Error')
            })*/
        },
        responseCallback(data, headers){
            console.log("responseCallback msg=>" + data.body)
        },
        onFailed(frame){
            console.log('Failed: ' + frame)
        }
    },
    created() {
        //var socket = new SockJS('http://localhost:8090/gs-guide-websocket')
        /** this.stompClient = Stomp.over(socket)
        this.stompClient.connect({}, function(data) {
            //setConnected(true);
            console.log('Connected: ' + data);
            this.stompClient.subscribe('/topic/greetings', function(res) {
                console.log('Subs -> ' + res)
            })
        })*/
        console.log('creating websocket event')
        this.sockets.subscribe('/topic/greetings', (data) => {
            console.log('events->' + data.message)
        })
    }
})
</script>
