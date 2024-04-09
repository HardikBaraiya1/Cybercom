<template>
    <div>
      <header class="shadow-sm bg-slate-50 py-2">
        <nav class="flex justify-around container">
          <!-- <div>
            Vue dropdown
            <div class="dropdown inline-block relative">
              <button class="text-green-600">Vue</button>
              <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                Add your Vue routes here
                <li><router-link to="/vue/computedWatch">Computed & Watchers</router-link></li>
                <li><router-link to="/vue-route-2">Vue Route 2</router-link></li>
              </ul>
            </div>
          </div> -->
          <div>
            <!-- Nuxt dropdown -->
            <div class="dropdown inline-block relative">
              <button class="text-green-600">Vue</button>
              <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/myFirstPage">FirstPage</NuxtLink></li>
                <li><NuxtLink to="/eventAndAction">Events & Actions</NuxtLink></li>
                <li>
                  <form @submit.prevent="dynamicRoute">
                    <input type="text" v-model="username" placeholder="Enter your userName"/>
                    <button type="submit">Go</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <!-- Nuxt dropdown -->
            <div class="dropdown inline-block relative">
              <button class="text-green-600">Nuxt Practice</button>
              <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/myFirstPage">FirstPage</NuxtLink></li>
                <li><NuxtLink to="/eventAndAction">Events & Actions</NuxtLink></li>
                <li>
                  <form @submit.prevent="dynamicRoute">
                    <input type="text" v-model="username" placeholder="Enter your userName"/>
                    <button type="submit">Go</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
  
      <!-- main content -->
      <div>
        <slot />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
      }
    },
    methods: {
      dynamicRoute() {
        let data = '/users/' + this.username;
        console.log(data);
        this.$router.push(data);
      }
    }
  }
  </script>
  
  <style scoped>
  .router-link-exact-active {
    color: green;
  }
  
  /* Dropdown styles */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-menu {
    display: none;
    z-index: 1;
    padding: 0;
    background-color: #fff;
    padding: 10px 7px;
    /* border: solid 1px black; */
    box-shadow: 0px 0px 3px grey;
  }
  
  .dropdown:hover .dropdown-menu {
    display: block;
  }
  </style>
 