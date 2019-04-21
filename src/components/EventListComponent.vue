<template>
    <table>
        <thead>
            <th>
                News
            </th>
        </thead>
        <tbody>
            <tr v-for="piece in news" :key="piece.idx">
                <td>{{ piece.idx }} / </td>
                <td>{{ piece.title }} / </td>
                <td>{{ piece.date | formatDate }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'evet-list-component',
  data: () => ({
      counter: 1,
      news: []
  }),
  computed: {
      // la agrego a la vista para que sea reactiva y verifique su cambio
      searchNews: function() {
          console.log('searching news')
          this.$http.get('http://127.0.0.1:8090/vue/v1/events').then(response => {
            this.news = response.body
          }, error => {
              console.log('error')
          })
          //this.news.push({idx: this.counter, title: 'Date ' + new Date})
          return this.news
      }
  },
  mounted() {
      //this.searchNews
      console.log('creating event-list-component')
      /**setInterval(function() {
          // modifico esta propiedad para que se evalue searchNews
          this.counter+=1
          this.searchNews
      }.bind(this), 10000)*/
  }
});
</script>