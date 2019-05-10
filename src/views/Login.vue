<template>
    <div  v-bind:style="{display: 'inline-block'}" class="my-5">
        <b-container>
        <b-card header-tag="header" class="mx-3">
            <h3 slot="header">{{ $t('loginTitle') }}</h3>
            <b-container>
                <b-row class="my-3">
                    <b-col>
                        <b-form-input v-model="username" :placeholder="$t('logingUsernamePH')"/>
                    </b-col>
                </b-row>
                <b-row class="my-3">
                    <b-col>
                        <b-form-input v-model="password" :placeholder="$t('logingPasswordPH')"/>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button v-on:click="login">{{$t('loginButtonSend')}}</b-button>
                    </b-col>
                    <b-col>
                        <b-button v-on:click="cancel">{{$t('loginButtonCancel')}}</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
        </b-container>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Login from '@/components/Login.ts'
import {Credentials} from '@/components/Credentials.ts'
export default Vue.extend({
    name: 'view-login',
    data: () => ({
        username: '',
        password: '',
        authenticated: false,
        toUrl: ''
    }),
    methods: {
        login: function() {
            var credentials = new Credentials(this.username, this.password)
            new Login().getToken(credentials).then(success => {
                this.$store.commit('renewToken', success.body.token)
                this.$store.commit('signin', true)
                this.$router.replace({ path: '/home' })
            }, error => {
                console.log('Bad credential')
            })
        },
        cancel: function() {
            console.log('cancel')
        }
    }
})
</script>
