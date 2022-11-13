<script lang="ts">
import FavoriteItem from './FavoriteItem.vue';
type FavoriteItem = {
    item: string;
    id: string;
}

import { defineComponent } from 'vue';

export default  defineComponent({
    name: 'Favorites',
    components: {
        FavoriteItem
    },
        emits: ["updateLoading", "updateError"],
        data () {
            let favorites:FavoriteItem[] = []
            return {
                favorites,
                newFavorite: ''
            }
        },
        created() {
            const shopperList = localStorage.getItem('shopperList')

        },
        beforeMount() {
            this.getFavorites()            
        },
        methods: {
            async getFavorites () {
                this.$emit('updateLoading')
                const username = localStorage.getItem('username')
                const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
                // const accountId = localStorage.getItem('accountKey')
                if(!username && !accountId) {

                } else {

                const requestOptions = {
                    method: 'GET',
                    headers: { 'accountid': accountId, 'Content-Type': 'application/json' }
                };
                const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/favorites`, requestOptions)

                const data = await response.json();
                if(data.success) {
                    this.$emit('updateLoading')                    
                    this.favorites = data.favorites
                    }

                else {
                    this.$emit('updateError')
                }
            }
            },
            async addFavorite() {
                console.log(this.newFavorite);
                
            },
            updateLoading () {        
            this.$emit('updateLoading')
          },
          updateError () {
            this.$emit('updateError')
          },
        }

    })
</script>
<template>
    <h2>Favorites</h2>
    <div class="add-favorite">
        <input type="text" v-model="newFavorite" >
        <button @click="addFavorite">Add</button>
    </div>
    <div v-for="favorite in favorites" :key="favorite.id">
        <FavoriteItem :favorite="favorite" @updateLoading="updateLoading" @updateError="updateError" />

    </div>
</template>

<style scoped>
    .add-favorite {
        display:flex;
    }
    input {
        flex: 6;
        outline: none;
        border: none;
    }
    button {
        border-radius: 0;
        border: none;
    }

    @media screen and (min-width: 786px) {
    .add-favorite {
      max-width: 30vw;
      margin: 0 auto;
    }
  }
</style>