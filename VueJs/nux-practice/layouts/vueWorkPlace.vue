<template>
    <div>
        <header class="shadow-sm bg-slate-50 py-2">
            <nav class="flex justify-between container">
                <NuxtLink class=" text-green-600" to="/">Nuxt Practice</NuxtLink>

                <ul class="flex gap-3">
                    <li><NuxtLink to="/vue/vueHomePage">Home</NuxtLink></li>
                    <li><NuxtLink to="/vue/computedWatch">Computed & Watchers</NuxtLink></li>
                    <li><NuxtLink to="/eventAndAction">events-Actions</NuxtLink></li>
                    <li>
                        <form @submit="dynamicRoute">
                        <input type="text" v-model="username" placeholder="Enter your userName"/>
                        <button type="submit">Go</button>
                        </form>
                    </li>
                </ul>
            </nav>
        </header>

        <!-- main content -->
        <div>
            <slot />
            <!-- it will replace all the pages call and it's default.vue so by default apply on all pages -->
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username : '',
        }
    },
    methods: {
        dynamicRoute(event){
            event.preventDefault();
            let data = '/users/' + this.username;
            console.log(data);
            this.$router.push(data);
        }
    }
}
</script>

<style scoped>
.router-link-exact-active{
    color: green;
}
</style>



