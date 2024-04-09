<template>
    <h1 class="text-center">Hello User,</h1>
    <div>
        <Greet :greetingMsg="greetingMsg" :content="content"></Greet>
    </div>
    
    </template>

<script setup lang="ts" >
    const route = useRoute()
    const username = route.params.username;
    
    // export {
        // data(){
        //     return{
        //         username : this.$router.params
        //     }
        // },
        // mounted(){
        //         console.log(this.$router.params);
        //     }
    // }
</script>

<script lang="ts">
import  Greet  from "../../components/greeting.vue";
// import { Greet } from "../../components/greeting.vue";

export default {
    data() {
        return {
            greetingMsg : 'hii there',
            content: 'this is content'
        }
        },
    // components: {
    //     // Greet
    //     Greet: {
    //         template: `
    //         <div>
    //             <h1>
    //                 Hello User,  greetingMsg 
    //             </h1>
    //             <p> content </p>
    //         </div>
    //             `,
    //     }
    // }
}
</script>


<!-- <script setup lang="ts">
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params)
</script> -->
























<!-- In Nuxt.js, routing is handled using the file-based routing system. This means that you organize your pages as Vue components in the pages directory, and Nuxt.js automatically generates routes based on the file structure.

Programmatic Navigation: You can also navigate programmatically using the
 $router object available in your Vue components. 

this.$router.push('/about');
-->