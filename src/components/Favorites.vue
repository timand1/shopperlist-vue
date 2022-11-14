<script lang="ts">
import FavoriteItem from './FavoriteItem.vue';
import { uid } from 'uid';
type FavoriteItem = {
    item: string;
    id: string;
    added?: boolean;
}

type ShopItem = {
    item: string,
    amount: number,
    id: string,
    comment?: string,
    favorite?: boolean,
    itemIsDone: boolean
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
                    localStorage.setItem('favorites', JSON.stringify(data.favorites))


                    const shopList: ShopItem[] | null  =  JSON.parse(localStorage.getItem('shopperList') || "") 
                        if(shopList) {
                            this.favorites.forEach(item => {
                            const filteredLocal = shopList.filter(e => e.item === item.item)
                            if(filteredLocal.length === 1) {
                                item.added = true
                            };
                            })
                        }
                    }

                else {
                    this.$emit('updateError')
                }
            }
            },
            async addFavorite() {
                if(this.newFavorite.length > 0) {
                    this.$emit('updateLoading')  
                    const addedFavorite: FavoriteItem = {
                        item: this.newFavorite,
                        id: uid()
                    }
                
                    const accountId = localStorage.getItem('accountKey')
                    if(accountId) {
                        const body = JSON.stringify(addedFavorite)
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'accountid': accountId, 'Content-Type': 'application/json' },
                            body: body
                        };
                        const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/favorites`, requestOptions)
                        const data = await response.json();
                        if(data.success) {
                            this.$emit('updateLoading')                    
                            this.getFavorites()
                        }
    
                    else {
                        this.$emit('updateError')
                    }
                    } else {
                        this.$router.push('/')
                    }
                }
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
        <FavoriteItem :favorite="favorite" @getFavorites="getFavorites" @updateLoading="updateLoading" @updateError="updateError" />

    </div>
</template>

<style scoped>
    .add-favorite {
        display:flex;
    }
    input {
        flex: 6;
        border: none;
        outline: 1px solid black;
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