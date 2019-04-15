<template>    
    <table>
        <thead>
            <tr>
                <th>
                    <form id="f_search">
                        <input name="in_search" v-model="search">
                    </form>              
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="heroe in filteredHeroes" :key="heroe.name">
                <td  v-for="(col, idx) in columns" :key="idx">
                    {{heroe[col.toLowerCase()]}}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'grid-heroes',
     created: function() {
    // imagine getDataFor calls some API via AJAX
    console.log('creando componentes')
    },
    props: {
        heroes: {
            type: Array as () => Array<any>,
            default: function() {
             return  [
            {'name': 's0', 'rating': 10},
            {'name': 's1', 'rating': 12},
            {'name': 's2', 'rating': 13}]
            }
        },
        columns: {
            type: Array as () => Array<any>,
            default: function() {
                return ['Name', 'Rating']
            }
        }
    },
    data: () => ({        
        search: ''
        }),
    computed: {
        filteredHeroes: function() {
            var v_search = this.search.toLowerCase();
            var searchHeroes = this.heroes;
            if (v_search) {
                console.log('filtrando');
                searchHeroes = searchHeroes.filter(r => {
                    if (r.name.toLowerCase().indexOf(v_search) >= 0) {
                        console.log('encontrado:' + r.name)
                        return r
                    }});
            }
            return searchHeroes;
        }
    }
})
</script>
