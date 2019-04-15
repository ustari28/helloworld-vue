<template>
    <div><EventListComponent/></div>
</template>

<script lang="ts">
import Vue from 'vue';
import EventListComponent from '@/components/EventListComponent.vue';
export default Vue.extend({
    name: 'view-eventlist',
    components: {
        EventListComponent
    }
})
</script>