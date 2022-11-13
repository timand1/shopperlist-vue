<script lang="ts">
type ShopItem = {
    item: string,
    amount: number,
    id: string,
    comment?: string,
    favorite?: boolean,
    itemIsDone: boolean
}

type FavoriteItem = {
    item: string;
    id: string;
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
            let deleteOverlay: boolean = false;
            let deleteArr: ShopItem[] = [];

            return {
                shoppingList,
                toggleAddItem,
                deleteOverlay,
                deleteArr
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
                        const favorites: FavoriteItem[] | null  =  JSON.parse(localStorage.getItem('favorites') || "") 
                        if(favorites) {
                            this.shoppingList.forEach(item => {
                            const filteredLocal = favorites.filter(e => e.item === item.item)
                            if(filteredLocal.length === 1) {
                                item.favorite = true
                            };
                            })
                        }
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
          async deleteAll() {

            this.$emit('updateLoading')
                const username = localStorage.getItem('username')
                const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
                // const accountId = localStorage.getItem('accountKey')
                if(!username && !accountId) {

                } else {

                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'accountid': accountId, 'Content-Type': 'application/json' }
                };
                const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/shoppinglist/all`, requestOptions)
                if(response.ok) {

                    const data = await response.json();
                    if(data.success) {
                        this.$emit('updateLoading')
                    }
    
                    else {
                        this.$emit('updateError')
                    }
                } else {
                    this.$emit('updateLoading')
                    this.$emit('updateError')
                }
            }
          },
          deleteMode() {
            this.deleteOverlay = true
          },
          cancelDeleteMode() {
            this.deleteOverlay = false
          },
          addToDelete(e: any, item:ShopItem) {
              console.log(this.deleteArr);
            if(e.target.checked) {
                this.deleteArr.push(item)
                
            } else {
                this.deleteArr = this.deleteArr.filter(x => x.id !== item.id)
            }
          },
          filterList(item:string) {
            this.shoppingList = this.shoppingList.filter(x => x.item !== item)
          }

        }
    })
</script>

<template>
    <div>
        <div class="list-header">
            <h2>Shopperlist</h2>
            <img src="../assets/down-dark.svg" @click="toggleShowAdd" :class="{ 'toggle-up': toggleAddItem}" alt="">
        </div>
        <div class="delete-container">
            <p @click="deleteMode">Delete</p>
        </div>
    <AddItem @getList="getList" :toggleAddItem="toggleAddItem" @updateLoading="updateLoading" @updateError="updateError"/>
        <div v-if="shoppingList.length > 0">
            <div v-for="item in shoppingList" :key="item.id"> 
                <ListItem :listItem="item" :deleteOverlay="deleteOverlay" @filterList="filterList" @getList="getList" @updateLoading="updateLoading" @updateError="updateError" @addToDelete="addToDelete"  />
            </div>
        </div>
        <p v-else>Empty list</p>      
    </div>
    <div v-if="deleteOverlay" class="delete-overlay">
        <button @click="cancelDeleteMode">Cancel</button>
        <button>Delete {{deleteArr.length}} items</button>
        <button @click="deleteAll">Delete All</button>
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

    .delete-container {
        display: flex;
        justify-content: flex-end;
        gap: 0.8em;
    }

    .delete-container p {
        font-size: 0.8em;
        cursor: pointer;
    }

    .delete-overlay {
        padding: 1em;
        position: fixed;
        display: flex;
        justify-content: space-evenly;
        bottom: 0;
        left: 0; 
        background: #4c7972;
        width: 100%;
    }
</style>