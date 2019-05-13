import Vue from 'vue'
import HttpResponse from 'vue'
import {Credentials} from '@/components/Credentials.ts'
import store from '../store'

export const LoginService = Vue.extend({
    methods: {
        getToken(credentials: Credentials): PromiseLike<HttpResponse> {
            return this.$http.post(this.$urlLogin, credentials, {
                headers: {
                    'content-type': 'application/json;charset=utf-8',
                    'authorization': 'Bearer ' + store.state.token,
                    'x-application-id': this.$appId,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-type, X-Application-Id, Authorization'
                }
            })
        }
    }
})