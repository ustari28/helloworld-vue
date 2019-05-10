import Vue from 'vue'
import {Credentials} from '@/components/Credentials.ts'
export default Vue.extend({
    methods: {
        getToken(credentials: Credentials) {
            return this.$http.post(this.$urlLogin, credentials, {
                headers: {
                    'content-type': 'application/json;charset=utf-8',
                    'authorization': 'Bearer ' + this.$storage.state.token,
                    'x-application-id': this.$appId
                }
            })
        }
    }
})