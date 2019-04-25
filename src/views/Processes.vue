<template>
    <div>
        <b-card v-if="logged === false"
            header-tag="header" v-bind:style="{display: 'inline-block'}">
            <h6 slot="header" class="mb-0">Sign in <font-awesome-icon icon="user-tie" size="lg"/></h6>
            <b-container fluid>
                <b-row>
                    <b-col>
                    <b-form-input v-model="user" placeholder="Type your user name"></b-form-input>
                    </b-col>
                    <b-col>
                    <b-button v-on:click="login">Sign in</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
        <b-card v-else v-bind:style="{display: 'inline-block'}" header-tag="header">
            <h6 slot="header" class="mb-0">New task <font-awesome-icon icon="cogs" size="lg"/></h6>
            <b-container fluid>
                <b-row class="mb-3">
                    <b-col>
                    <b-form-input v-model="title" placeholder="Title task"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mb-3">
                    <b-col>
                    <b-form-input v-model="description" placeholder="Short description"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button v-on:click="newTask">Send</b-button>
                    </b-col>
                    <b-col>
                        <b-button v-on:click="logout">Logout</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
        <b-card v-if="logged === true" v-bind:style="{display: 'inline-block'}" header-tag="header">
            <h6 slot="header" class="mb-0">Progress tasks<font-awesome-icon icon="tasks" size="lg"/></h6>
            <b-container fluid>
                <b-row v-for="t in copyTasks" :key="t.uuid">
                    <b-col>
                        <b-card header-tag="head">
                            <h6 slot="header" class="mb-0">{{t.title}}</h6>
                            <b-container>
                            <b-row><b-col>UUDI: {{t.uuid}}</b-col></b-row>
                            <b-row><b-col>Description: {{t.description}}</b-col></b-row>
                            <b-row><b-col>Start: {{t.start | formatDate}}</b-col></b-row>
                            <b-row><b-col>Percentage: {{t.progress}}</b-col></b-row>
                            </b-container>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
var StompJs = require('@stomp/stompjs')
import * as SockJS from 'sockjs-client'
export default Vue.extend({
    name: 't-processes',
    data: () => ({
        user: '',
        title: '',
        description: '',
        logged: false,
        subscription: Object,
        tasks: new Map([]),
        copyTasks: Array()
    }),
    methods: {
        newTask: function() {
            console.log('new task')
            this.stompClient.publish({destination:'/appws/process/new',
                body: JSON.stringify({title: this.title, description: this.description}),
                headers: {username: this.user}})
        },
        login: function() {
            var stompConfig = {
                //brokerURL: 'ws://127.0.0.1:8090/sockejs',
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
            this.logged = true
        },
        logout: function() {
            this.subscription.unsubscribe()
            this.logged = false
        },
        fallbackTasks: function(success) {
            var task = JSON.parse(success.body)
            this.tasks.set(task.uuid, task)
            this.copyTasks = this.tasks.values()
            console.log('new task')
        },
        connectedSocket: function(data) {
            this.subscription = this.stompClient.subscribe('/user/queue/tasks', this.fallbackTasks)
        }
    }
})
</script>
