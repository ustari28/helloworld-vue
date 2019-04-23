<template>
    <div>
        <table>
            <tr>
                <td><EventListComponent/></td><td><WebsocketComponent /></td>
            </tr>
        </table>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EventListComponent from '@/components/EventListComponent.vue';
import WebsocketComponent from '@/components/WebsocketEventComponent.vue';

export default Vue.extend({
    name: 'view-eventlist',
    components: {
        EventListComponent,
        WebsocketComponent
    }
})
</script>