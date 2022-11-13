<script lang="ts">

export default {
  name: 'App',
    data() {
      let darkMode: boolean = true;
      let loading: boolean = false;
      let error: boolean = false;
      return {
        loading,
        error,
        darkMode
        
      }
    },
    beforeMount() {
      // const username = localStorage.getItem('username')
      // const accountId = localStorage.getItem('accountKey')
      const username = 'timelie'
      const accountId = 'd498cbb6-3396-442c-bcd8-fcf15e2c4756'
      if(username && accountId) {
        this.$router.push('/lists')
      }
    },
    methods: {
      setDarkMode() { 
        this.darkMode = !this.darkMode
          const root = document.querySelector('html')       
          root?.classList.toggle('light')
      },
      updateLoading () {        
        this.loading = !this.loading
      },
      updateError () {
        this.error = !this.error
      },
            
    }
  }
</script>

<template>
  <div v-if="loading" class="loading"></div>
  <!-- <div class="switch"> -->
      <label class="theme-switch" for="checkbox">
          <input type="checkbox" id="checkbox"  @click="setDarkMode"  />
          <div class="slider round"></div>
      </label>
  <!-- </div> -->
  <router-view  @updateLoading="updateLoading" @updateError="updateError"/>
</template>

<style scoped>
.loading {
    position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 80px;
      height: 80px;
      z-index: 1000;
    }
    .loading:after {
    content: " ";
    position: absolute;
    top: -0.5em;
    left: -0.5em;
    bottom: -0.5em;
    right: -0.5em;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid steelblue;
    border-color: steelblue transparent steelblue transparent;
    animation: lds-dual-ring 1.2s linear infinite;
    }
      @keyframes lds-dual-ring {
        0% {
        transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
/* .switch {
    text-align: end;
    height: 100px;
} */
    
.theme-switch {
  /* display: inline-block; */
  height: 34px;
  /* position: relative; */
  width: 60px;
  position: fixed;
  right: 1em;
  top: 1em;
  z-index: 999;
}

.theme-switch input {
  display:none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
  z-index: 999;
}

.slider:before {
  background-color: #fff;
  bottom: 4px;
  content: "";
  height: 26px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 26px;
}

input:checked + .slider {
  background-color: #2b2b2b;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
