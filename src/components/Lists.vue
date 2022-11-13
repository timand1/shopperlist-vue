<script lang="ts">
    import { defineComponent } from 'vue';
    import ShoppingList from '../components/ShoppingList.vue'
    import Favorites from '../components/Favorites.vue'
    export default defineComponent({
    name: 'Lists',
    components: {
      ShoppingList,
      Favorites
      },
      emits: ["updateLoading", "updateError", "logIn"],
      data() {
          let toggleList: boolean = false;
          return {
              toggleList
          }
      },
      beforeMount() {
          const username = localStorage.getItem('username')
          const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
          // const accountId = localStorage.getItem('accountKey')
          if(!username && !accountId) {
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
      }
    })
</script>
<template>
    <div class="toggle-container">
    <div class="toggle-list" :class="!toggleList && 'list-active'" @click="toggleLists(false)" >Shopperlist</div>
    <div class="toggle-list" :class="toggleList && 'list-active'" @click="toggleLists(true)" >Favorites</div>
  </div>
  <ShoppingList v-if="!toggleList" @updateLoading="updateLoading" @updateError="updateError"/>
  <Favorites v-else-if="toggleList" @updateLoading="updateLoading" @updateError="updateError"/>
</template>

<style scoped>
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