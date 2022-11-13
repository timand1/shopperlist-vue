<script lang="ts">
type ShopItem = {
    item: string,
    amount: number,
    id: string,
    comment?: string,
    favorite?: boolean,
    itemIsDone: boolean
}
import AddItem from './AddItem.vue'
import ListItem from './ListItem.vue'
import { defineComponent } from 'vue';

export default  defineComponent({
    name: 'ShoppingList',
    components: {
      AddItem,
      ListItem
    },
        emits: ["updateLoading", "updateError"],
        data() {
            let shoppingList: ShopItem[] = [];
            let toggleAddItem: boolean = true;
            return {
                shoppingList,
                toggleAddItem
            }
        },
        created() {
            this.getList()
        },
        methods: {
            async getList () {
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
                const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/shoppinglist`, requestOptions)

                const data = await response.json();
                if(data.success) {
                    this.$emit('updateLoading')
                        this.shoppingList = data.list
                        localStorage.setItem('shopperList', JSON.stringify(data.list))
                    }

                else {
                    this.$emit('updateError')
                }
            }
            },
           toggleShowAdd() {
            this.toggleAddItem = !this.toggleAddItem
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
    <div>
        <div class="list-header">
            <h2>Shopperlist</h2>
            <img src="../assets/down-dark.svg" @click="toggleShowAdd" :class="{ 'toggle-up': toggleAddItem}" alt="">
        </div>
        <AddItem @getList="getList" :toggleAddItem="toggleAddItem" @updateLoading="updateLoading" @updateError="updateError" />
        <div v-if="shoppingList.length > 0">
            <div v-for="item in shoppingList" :key="item.id"> 
                <ListItem :listItem="item" @getList="getList" @updateLoading="updateLoading" @updateError="updateError" />
            </div>
        </div>
        <p v-else>Empty list</p>      
    </div>
</template>

<style scoped>
    .list-header {
        display: flex;
        justify-content: center;
    }

    img {
        width: 2.5em;
        transform: rotateZ(180deg);
        filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(28deg) brightness(106%) contrast(101%);
    }

    .toggle-up {
        transform: rotateZ(0);
        filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(28deg) brightness(106%) contrast(101%);

    }
</style>