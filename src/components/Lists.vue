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

    import { defineComponent } from 'vue';
    import ShoppingList from '../components/ShoppingList.vue'
    import Favorites from '../components/Favorites.vue'
    import Nav from '../components/Nav.vue'
    export default defineComponent({
    name: 'Lists',
    components: {
      ShoppingList,
      Favorites,
      Nav
      },
      emits: ["updateLoading", "updateError", "logIn"],
      data() {
          let toggleList: boolean = false;
          let shoppingList: ShopItem[] = []
          let favorites: FavoriteItem[] = []
          return {
              toggleList,
              shoppingList,
              favorites
          }
      },
      beforeMount() {
          const username = localStorage.getItem('username')
          const accountId = localStorage.getItem('accountKey')
          if(username && accountId) {
            this.getList()
            this.getFavorites()
          } else {
            this.$router.push('/')
          }
          
      },
      methods: {
          toggleLists (favorite: boolean) {
          this.toggleList = favorite
          },
          updateLoading () {        
            this.$emit('updateLoading')
          },
          updateError () {
            this.$emit('updateError')
          },
          async getList () {
                this.$emit('updateLoading')
                const username = localStorage.getItem('username')
                const accountId = localStorage.getItem('accountKey')
                if(username && accountId) {
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
                } else {
                  this.$router.push('/')
            }
            },
            async getFavorites () {
                this.$emit('updateLoading')
                const username = localStorage.getItem('username')
                const accountId = localStorage.getItem('accountKey')
                if(username && accountId) {
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
                      }
  
                  else {
                      this.$emit('updateError')
                  }
                  
                } else {
                  this.$router.push('/')
            }
            },
      }
    })
</script>
<template>
  <Nav />
      <div class="list-container">
            <div class="toggle-container">
            <div class="toggle-list" :class="!toggleList && 'list-active'" @click="toggleLists(false)" >Shopperlist</div>
            <div class="toggle-list" :class="toggleList && 'list-active'" @click="toggleLists(true)" >Favorites</div>
          </div>
          <ShoppingList v-if="!toggleList" @updateLoading="updateLoading" @updateError="updateError"/>
          <Favorites v-else-if="toggleList" @updateLoading="updateLoading" @updateError="updateError"/>
      </div>
</template>

<style scoped>
.list-container {
  max-width: 1280px;
  margin: 2em auto 4em auto;
  padding: 1rem;
}
.toggle-container {
  display: flex;
  flex-direction: row;
  width: 90vw;
  margin: 0 auto;
  justify-content: space-between;
  cursor: pointer;
  text-align: center;
  font-weight: 700;
}
.toggle-list {
  padding: 1em 0;
  flex: 1;
  background: #303030;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  transition: all 300ms;
}

.toggle-list:hover {
  background: #4e4e4e;
}
  .list-active {
    background: #3b3b3b;
  }

  @media screen and (min-width: 786px) {
    .toggle-container {
      width: 100%;
    }
  }
</style>