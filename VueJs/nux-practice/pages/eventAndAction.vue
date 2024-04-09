<template>
    <div @click="changeColor" class="container border-2 m-2">
        {{clicked? 'You have Clicked' : 'Click me ;)'}}    
        <!-- {{ clickedContent }} -->
    </div>
    <hr>
    <button @click="this.clicked = false;">Reset</button>

<!-- @input: Listens to the input event on form input elements like text fields, 
    checkboxes, and radio buttons, and updates a data property as the input changes. -->
    <div>
        <input type="text" class="shadow-md bg-slate-300 border m-2 p-1" @input="showInputTxt">
        <p><strong>result Show here:</strong> {{ inputVal }}</p>
    </div>
    <hr>


    <div>
        <select @change="handleChange" class="border-black shadow-sm m-2 p-1 w-1/4">
        <option value="" selected></option>
        <option value="1">State 1</option>
        <option value="2">State 2</option>
        <option value="3">State 3</option>
        <option value="4">State 4</option>
        </select>
        <h3 class="text-center">You have selected {{  selectedValue }}</h3>
    </div>
    <hr>


    <div class="container my-2 flex justify-between">
        <form @submit="submitData" class="text-center">
            <input type="date" ref="dateInput">
            <button type="submit" class=" border-black border py-1 px-3 my-3">Submit</button>
        </form>
        <h3>Submitted Date: {{ submittedData }}</h3>
    </div>
    <hr>

    <div id="keyUpDownArea" class="w-full h-1/5 bg-slate-400 text-center p-2 my-1">
        Key Up Down Area: <input type="text" @keyup="handleKeyUp" @keydown="handleKeyDown" @focus="handleFocus" @blur="handleBlur">
    </div>
    <hr>
</template>


<script>
export default {
    data() {
        return {
            key: 'value',
            clicked : false,
            inputVal: '',
            selectedValue: '',
            submittedData: null,
        }
    },
    methods: {
        changeColor(){
            this.clicked = true;
            console.log('clicked..!!!',this.clicked)
        },
        showInputTxt(event){
            this.inputVal = event.target.value;
        },
        handleChange(event){
            console.log('selected value: ',event.target.value);
            this.selectedValue = event.target.value; 
        },
        submitData(event){
            event.preventDefault();
            // Certainly! In Vue.js and Nuxt.js, the ref attribute is used to register a reference to an element or a child component within a Vue component. It allows you to access the referenced element or component programmatically in your JavaScript code.
            console.log(this.$refs.dateInput);
            this.submittedData = this.$refs.dateInput.value;
            console.log(this.submittedData);
        },
        handleKeyUp(event) {console.log('key Released:', event.key)},
        handleKeyDown(event) {console.log('Key pressed:',event.key)},
        handleFocus() {console.log('focus on..!!!')},
        handleBlur() {console.log('focus out..!!!')}
    },
    // A computed property in Vue.js is a feature that allows you to define a property whose value is derived from other data properties. Computed properties are cached based on their reactive dependencies, meaning they will only recompute when one of those dependencies changes. This makes them useful for deriving values dynamically based on other data in your component.
    computed: {
        clickedContent(){ 
            return  this.clicked ? 'You have Clicked' : 'Click me ;)'
        },

        }
}
</script>

<style scoped>
    hr{
        /* height: 5px; */
        margin: 15px 0px;
        padding: 2px;
        color: black;
        background-color: black;
        box-shadow: 0px 0px 3px grey;
    }
</style>