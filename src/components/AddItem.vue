<script lang="ts">
import { uid } from 'uid';

type ShopItem = {
    item: string,
    amount: number,
    comment: string,
    id: string
}
    export default {
        emits: ["updateLoading", "updateError", "getList"],
        props: ['toggleAddItem'],
        data () {
            let alreadyExist: boolean = false;
            return {
                itemName: '',
                amount: 1,
                comment: '',
                alreadyExist
            }
        },
        methods: {
            checkIfExist() {
                const shopperList: ShopItem[] | null  =  JSON.parse(localStorage.getItem('shopperList') || "") 
                this.alreadyExist = false
                if(shopperList) {
                    const filteredLocal = shopperList.filter(e => e.item === this.itemName)
                if(filteredLocal.length === 1) {
                    this.alreadyExist = true
                } else {
                    this.addItem ()
                }
            }
            },
            async addItem () {

                this.$emit('updateLoading')
                
                const newItem: ShopItem = {
                    item: this.itemName,
                    amount: this.amount,
                    id: uid(),
                    comment: this.comment
                }
                const username = localStorage.getItem('username')
                const accountId = localStorage.getItem('accountKey')
                if(username && accountId) {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'accountid': accountId, 'Content-Type': 'application/json' },
                        body: JSON.stringify(newItem)
                    };
                    const response = await fetch(`https://dramatic-bottlenose-hallway.glitch.me/api/shoppinglist`, requestOptions)
                    if(response.ok) {
    
                        const data = await response.json();
                        if(data.success) {
                                this.$emit('updateLoading')
                                this.$emit('getList')
                            }
        
                        else {
                            this.$emit('updateError')
                        }
                    } else {
                        this.$emit('updateLoading')
                        this.$emit('updateError')
                    }

                } else {
                    this.$router.push('/')
                }
                
            }
        }
    }
</script>
<template>
    <form action="" class="add-item" :class="{ 'hide-add': toggleAddItem}">
        <article class="form-container">
            <label htmlFor="addItem" class='add-label'>Item *</label>
            <input type="text" name="addItem" id="addItem" class='form-input' maxLength="22" placeholder=' ' required v-model="itemName"  />
        </article>
        <article class="form-container">
            <label htmlFor="addItem" class='add-label'>Amount</label>
            <input type="number" name="addAmount" id="addAmount" class='form-input' placeholder=' ' v-model="amount" />
        </article>
        <article class="form-container">
            <label htmlFor="itemComment" class='add-label'>Comment</label>
            <input type="text" name="itemComment" id="itemComment" class='form-input' placeholder=' ' v-model="comment"  />
        </article>

        <input type="button" class='btn btn-add--form' value="Add" @click="checkIfExist" /> 
        <p class="item-exist" v-if="alreadyExist">Item already exist in your list</p>
    </form>
</template>

<style scoped>
    .hide-add {
        display: none;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin-bottom: 4em;
        position: relative;
    }

    .item-exist {
        position: absolute;
        bottom: 0;
        left: 0;
        color: #976262;
    }

    .form-container {
        display: flex;
        gap: 1em;
        align-items: center;
        justify-content: center;
    }

    input, label {
        flex: 1;
        font-size: 1.2em;
    }
    input[type='button'] {
        font-size: 1em;
        margin-left: auto;
        border: none;
        padding: 1em 1.5em;
        box-shadow: 2px 2px 4px black;
        transition: all 300ms;
    }
    input[type='button']:active {
        box-shadow: 1px 0px 1px black;
    }

    @media screen and (min-width: 786px) {
        form {
            max-width: 30vw;
            margin: 0 auto;
            margin-bottom: 4em;
        }
        input {
            max-width: 20vw;
        }
  }
</style>