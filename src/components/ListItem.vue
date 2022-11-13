<script lang="ts">
type ShopItem = {
    item: string,
    amount: number,
    id: string,
    comment?: string,
    favorite?: boolean,
    itemIsDone: boolean
}

    export default {
        props: ["listItem", "deleteOverlay"],
        emits: ["updateLoading", "updateError", "getList", "addToDelete", "filterList"],
        methods: {
            async updateAmount (item: any, add: boolean) {
                const username = localStorage.getItem('username')
                const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
                // const accountId = localStorage.getItem('accountKey')
                if(item.amount == 1 && !add) {
                    this.removeItem(this.listItem)
                    return
                }
                this.$emit('updateLoading')
                if(!username && !accountId) {

                } else {
                let updatedItem: ShopItem = {
                    item: item.item,
                    amount: add ? item.amount + 1 : item.amount - 1,
                    id: item.id,
                    comment: item.comment  ,
                    itemIsDone: item.itemIsDone                  
                }

                const requestOptions = {
                    method: 'POST',
                    headers: { 'accountid': accountId, 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedItem)
                };
                const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/shoppinglist/${item.id}`, requestOptions)
                if(response.ok) {

                    const data = await response.json();
                    if(data.success) {
                            this.$emit('updateLoading')
                            this.$emit('getList')
                            this.listItem.amount = add ? this.listItem.amount + 1 : this.listItem.amount - 1
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
            },
            async removeItem (item: ShopItem) {
                this.$emit('updateLoading')
                const username = localStorage.getItem('username')
                const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
                // const accountId = localStorage.getItem('accountKey')
                if(!username && !accountId) {

                } else {

                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'accountid': accountId, 'Content-Type': 'application/json' },
                    body: JSON.stringify([item])
                };
                const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/shoppinglist/`, requestOptions)
                if(response.ok) {
                    console.log(response);
                    
                    const data = await response.json();
                    console.log(data);
                    if(data.success) {
                        this.$emit('updateLoading')
                        this.$emit('getList')
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
            },
            itemIsDone() {
                this.listItem.itemIsDone = !this.listItem.itemIsDone                
            },
            async addFavorite() {
                this.$emit('updateLoading')
                const body = JSON.stringify(this.listItem)
                const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
                // const accountId = localStorage.getItem('accountKey')
                const requestOptions = {
                    method: 'POST',
                    headers: { 'accountid': accountId, 'Content-Type': 'application/json' },
                    body: body
                };
                const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/favorites`, requestOptions)
                if(response.ok) {                    
                    const data = await response.json();
                    if(data.success) {
                        this.$emit('updateLoading')
                        this.listItem.favorite = true
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
                const body = JSON.stringify(this.listItem)
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
                    if(data.success) {
                        this.$emit('updateLoading')
                        this.listItem.favorite = false
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
    <div class="item-container" :class="{'item-done' : listItem.itemIsDone}">
        <div class="top-container">
            <img @click="removeFavorite" v-if="listItem.favorite" src="../assets/favorite-fill.svg" alt="">
            <img @click="addFavorite" v-else src="../assets/favorite-empty.svg" alt="">
            <p class="item-name" @click="itemIsDone">{{listItem.item}}</p>
            <div class="amount-container">
                <img src="../assets/minus.svg" @click="updateAmount(listItem, false)" alt="">
                <p>{{listItem.amount}} </p>
                <img src="../assets/plus.svg" @click="updateAmount(listItem, true)" alt="">
            </div>
            <input v-if="deleteOverlay" @click="$emit('addToDelete', $event, listItem)" type="checkbox" name="" id="">
            <img v-else src="../assets/cross.svg" @click="removeItem(listItem)" alt="">
        </div>
        <p v-if="listItem.comment" class="item-comment">{{listItem.comment}}</p>
    </div>
</template>

<style scoped>
.item-container {
    display: flex;
    flex-direction: column;
    padding: 0 1em;
    border-bottom: 0.4px solid #4c7972;
}

.item-name {
    cursor: pointer;
}
.top-container, .amount-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1em;
    font-weight: 700;
}

.top-container p {
    margin: 0.8em 0;
}

.amount-container {
    margin-left: auto;
}

.item-done {
    background: rgba(49, 73, 12, 0.473);
    color: rgba(255, 255, 255, 0.87);
}

img {
    cursor: pointer;
}

.item-comment {
    margin: 0;
    font-size: 0.8em;
}
</style>