<script lang="ts">
import { uid } from 'uid';

type ShopItem = {
    item: string,
    amount: number,
    id: string,
    comment?: string,
    favorite?: boolean,
    itemIsDone?: boolean
}
    export default {
        props: ["favorite"],
        // data() {

        // },

        methods: {
            async addToList() {
                this.$emit('updateLoading')
                const newItem: ShopItem = {
                    item: this.favorite.item,
                    amount: 1,
                    comment: '',
                    id: uid()  
                }
                const username = localStorage.getItem('username')
                const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
                // const accountId = localStorage.getItem('accountKey')

                const body = JSON.stringify(newItem)
                const requestOptions = {
                    method: 'POST',
                    headers: { 'accountid': accountId, 'Content-Type': 'application/json' },
                    body: body
                };
                const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/shoppinglist/`, requestOptions)
                    if(response.ok) {
                        console.log(response);
                        
                        const data = await response.json();
                        if(data.success) {
                            this.$emit('updateLoading')
                            this.$emit('getList')
                            this.favorite.added = true
                        }    
                        else {
                            this.$emit('updateLoading')
                            this.$emit('updateError')
                        }
                    } else {
                        this.$emit('updateLoading')
                        this.$emit('updateError')
                    }
            },
            async removeFavorite() {
                this.$emit('updateLoading')
                const body = JSON.stringify(this.favorite)
                const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
                // const accountId = localStorage.getItem('accountKey')
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'accountid': accountId, 'Content-Type': 'application/json' },
                    body: body
                };
                const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/favorites`, requestOptions)
                if(response.ok) {                    
                    const data = await response.json();
                    console.log(data);
                    
                    if(data.success) {
                        this.$emit('updateLoading')
                        this.$emit('getFavorites')
                    }    
                    else {
                        this.$emit('updateLoading')
                        this.$emit('updateError')
                    }
                } else {
                    this.$emit('updateLoading')
                    this.$emit('updateError')
                }
            }
        }
    }
</script>
<template>
    <section :class="favorite.added && 'added'" class="favorite-item">
        <div class="container-left">
            <img @click="removeFavorite" src="../assets/cross.svg" alt="">
            <p>{{favorite.item}}</p>
        </div>
        <img v-if="favorite.added" src="../assets/added.svg" alt="">
        <img v-else class="add-favorite" src="../assets/add.svg" alt="" @click="addToList">
    </section>
</template>

<style scoped>
.favorite-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    font-weight: 700;
    border-bottom: 0.4px solid #4c7972;
}

.container-left {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
}

.container-left img {
    cursor: pointer;
}

.added {
    background: rgba(49, 73, 12, 0.473);
    color: rgba(255, 255, 255, 0.87);
}

.add-favorite {
    cursor: pointer;
}

img {
    max-width: 1.5em;
    max-height: 1.5em;
}

</style>