<script lang="ts">
    export default {
        name: 'Nav',
        emits: ["updateLoading", "updateError", "logIn"],
        data() {
            let openMenu: boolean = false;
            // const username: string | null = localStorage.getItem('username')
            const username = 'timelie'
            return {
                openMenu,
                username
            }
        },
        methods: {
            toggleMenu() {
                this.openMenu = !this.openMenu
            },
            logOut() {
                localStorage.removeItem('username')
                localStorage.removeItem('accountKey')
                localStorage.removeItem('shopperList')
                localStorage.removeItem('favoritesList')
                this.$router.push('/')
            }
        }
    }
</script>
<template>
    <header>
        <div class="header-container">
            <h2 class="log-out" @click="logOut">Log Out</h2>
            <!-- <nav class="nav-button-container">
                <div class='burger' :class="{'open' : openMenu}" @click="toggleMenu" >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav> -->
        </div>
        <!-- <div :class="{'nav-open' : openMenu, 'nav-dropdown' : !openMenu}">
            <h2 class="user">{{username}}'s shopper</h2>
            <h2>Delete Items</h2>
            <h2 @click="logOut">Log out</h2>
        </div> -->
    </header>
</template>

<style scoped>

    header {
        position: sticky;
        top: 0;
        z-index: 3;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        background: #4c7972;
    }
    .log-out {
        /* display: none; */
        cursor: pointer;
    }
    .header-container {
        min-height: 5rem;
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    img {
        justify-self: center;
        margin-right: 10rem;
    }
    .user {
        font-size: 2.2em;
        color: rgba(255, 255, 255, 0.493);
    }

    .nav-dropdown {
    display: flex;
    margin-left: 2rem;
    flex-direction: column;
    justify-content: space-between;
    height: 0;
    opacity: 0;
    transition: 0.35s;
    }

    .nav-open {
    display: flex;
    margin-left: 2rem;
    margin-top: 4em;
    flex-direction: column;
    /* justify-content: cer; */
    align-items: flex-start;
    z-index: 3;
    position: relative;
    top: 0;
    bottom: 0;
    height: calc(100vh - 5rem);
    transition: 3.35s;
    }
    .nav-button-container {
    height: 100%;
    display: flex;
    align-items: center;
    }
    .burger {
      height: 2rem;
      width: 2rem;
      position: relative;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.5s ease-in-out;
      -moz-transition: 0.5s ease-in-out;
      -o-transition: 0.5s ease-in-out;
      transition: 0.5s ease-in-out;
      cursor: pointer;
    }
      span {
        display: block;
        position: absolute;
        height: 0.25rem;
        width: 100%;
        background: #f8f8f8;
        border-radius: 1rem;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.25s ease-in-out;
        -moz-transition: 0.25s ease-in-out;
        -o-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;
      }

      span:nth-child(1) {
        top: 0rem;
      }

      span:nth-child(2),
      span:nth-child(3) {
        top: 0.6rem;
      }

      span:nth-child(4) {
        top: 1.2rem;
      }
    

    .open span:nth-child(1) {
      top: 18px;
      width: 0%;
      left: 50%;
    }

    .open span:nth-child(2) {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .open span:nth-child(3) {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    .open span:nth-child(4) {
      top: 18px;
      width: 0%;
      left: 50%;
    }

    @media screen and (min-width: 786px) {
        .nav-button-container {
            display: none;
        }
        .nav-dropdown {
            display: none;
        }
        .log-out {
            display: block;
        }
  }
  
</style>