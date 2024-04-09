<template>
  <!-- <template v-slot:header></template> -->
    <div>
    <h1 class="title">Here i will code everything of my nuxt pratice sets.</h1>

    <!-- directives if  -  else if  -  else  -->
    <div class="loginAreaDirectivesPractice flex gap-4">
        <!-- giving error so for mul class should use [] instead of {} -->
    <!-- <button class="py-1 px-3 text-center rounded-3xl" @click="isLoggedIn = !isLoggedIn" :class="{'shadow-md': !isLoggedIn , isLoggedIn? 'bg-yellow-500': 'bg-slate-300'}">{{isLoggedIn? 'Logout' :'Login'}}</button> -->

    <!-- <button class="py-1 px-3 text-center rounded-3xl" @click="isLoggedIn = !isLoggedIn" :class="{'shadow': !isLoggedIn , 'bg-yellow-500': isLoggedIn, 'bg-slate-300':!isLoggedIn}">{{isLoggedIn? 'Logout' :'Login'}}</button> -->

    <button class="py-1 px-3 mx-2 text-center rounded-3xl" @click="isLoggedIn = !isLoggedIn" :class="[isLoggedIn ? 'bg-yellow-500 shadowOn' :  'bg-slate-300 shadowLow']">{{isLoggedIn? 'Logout' :'Login'}}</button>
    
    <h2 v-if="isLoggedIn" style="color: green; font-weight: bold;">Hello {{ username }}</h2>
    <h2 v-else style="color: red; font-weight: bold;">Please Login first</h2>
  </div>
  
  
    <!-- Bindings {{  }}, v-model  -->
    <div id="vmodel" class="text-center">
        <input type="text" name="userName" id="userName" v-model="inputData" class=" shadow-sm border p-1 m-2">
        <h3 :class="classObj" class="py-2">The inputed text is: {{ inputData }}</h3>
    </div>
    <div class="counter flex justify-center my-5">
      <button class="py-1 px-5 text-center bg-orange-500 border rounded-full" @click="decrement">-</button>
        <p class="mx-3">{{ counter }}</p>
        <button class="py-1 px-5 text-center bg-orange-500 border rounded-full" @click="increment">+</button>
    </div>
    <hr>
    <p class="m-2">Select your Hobbies: </p>
    <div>
        <div id="checkboxArea">
          <label class="ms-4" v-for="(hobby,index) in hobbies" :key="index">
            <input type="checkbox" v-model="selectedCheckBox" :value="hobby">
            {{ hobby }}
          </label>
        </div>
        <hr>
        <p class="m-2">Select your Profession: </p>
        <div id="radioPractice" class=" w-3/4">
          <label v-for="(profesion, index) in profesions" :key="index">
            <input class="ms-3" type="radio" v-model="selectedProffesion" :value="profesion">
            {{ profesion }}
          </label>
        </div>
        <hr>
      </div>
      <div id="buttonArea" class="  w-2/4 mx-auto my-2">
        <button class="py-1 my-2 mx-5 px-5 text-center bg-green-500 border rounded-full" @click="showSelectedHobbies">Show Selected Hobies</button>
      <button class="py-1 my-2 mx-5 px-5 text-center bg-green-500 border rounded-full" @click="showSelectedProfesion">Show Selected Proffesion</button>
      </div>
    </div>
<p class="m-3 text-center bg-emerald-200" v-text="message"></p>
<div v-html="installedHtml"></div>
<div v-cloak>{{ rawTemplate }}</div>
<div v-pre>{{ rawTemplate }}</div>
<div v-once>{{ staticContent }}</div>
<h3 v-show="isLoggedIn">You are logged in</h3>
</template>
  
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      username : 'Hardik',
      counter: 0,
      message : 'this is message render from script',
      installedHtml : '<button class="flex justify-content-center py-1 px-3 rounded-full bg-red-700 my-2 mx-auto">Rendered Button<button>',
      rawTemplate: '<span>{{ message }}</span>',  
      staticContent: 'This will not changed.',
      classObj: {
        'bg-color' : true,
        'fontSize' : false
      },
      hobbies : ['Reading','Cooking','Gardening','Painting','Hiking','Photography','Fishing','Traveling','Writing'],
      selectedCheckBox : [],
      profesions : ['Doctor','Teacher','Engineer','Artist','Lawyer','Nurse','Software Developer','Chef','Musician','Writer','Designer','Student','Job-less'],
      selectedProffesion: null,

    };
  },
  methods: {
    increment(){
        this.counter++;
    },
    decrement(){
        this.counter--;
    },
    showSelectedHobbies(){
      console.log(this.selectedCheckBox);
      alert('selected hobbies are: '+ this.selectedCheckBox.join(','));
    },
    showSelectedProfesion(){
      console.log(this.selectedProffesion);
      alert('Your Profession is: '+ this.selectedProffesion);
    }
  },
  components: {
  MyComponent: {
    template: `
      <div>
        <header><slot name="header"></slot></header>
        <main><slot></slot></main>
      </div>
    `
  }
}
};
</script>

<script setup>
    const inputData = ref();
</script>

<style scoped>
  .title{
    text-align: center;
    color: green;
    /* background-color: lightgreen; */
  }
  
  body{
    background-color: lightgreen;
  }
  .shadowOn{
    box-shadow: 0px 0px 10px rgb(113, 21, 206);
  }
  .shadowLow{
    box-shadow: 0px 0px 10px rgb(0, 0, 0);
  }
  .fontSize{
    font-size: larger;
  }
  .bg-color{
    background-color: antiquewhite;
  }
</style>
  