<template>
    <!-- the benifit of computed attributes is we can reuse them, 
        when data changes it will trigger and automatically changes accordingly,
        also a slight speedy as it calculate in cache

        also recommended as {{  }} is for binding puprpose specifically , not for computing.
     -->
    <div id="computedPractice">
        <div class="text-center flex justify-around my-2 bg-orange-300 py-2">
            <h3>Hello user, {{ fullname }}</h3>
            <p>(generated using computed attribute)</p>
        </div>
        <div class="mt-3 text-center flex-col">
            <h2>Your cart</h2>
            <div>
                <!-- we can take data by using v-model , ref , event.target.value -->
                Add new item: <input ref="amount" type="number" style="color: grey;background-color: antiquewhite;" placeholder="Enter Amount"><button class="border rounded-sm m-2 shadow-sm bg-red-50 px-3" v-on:click="addData">Add</button>
            </div>
            <!-- <table>
                <thead>
                    <th>No.</th>
                    <th>Price</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in cart" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.price }}</td>
                    </tr>
                </tbody>
            </table> -->
            <h3>Total payment: {{ total }}</h3>
        </div>
    </div>
</template>


<script setup>

definePageMeta({
    layout: 'vue-work-place'
})
</script>

<script>
export default {
    data() {
        return {
            firstName: 'Hardik',
            lastName: 'Baraiya',
            cart: [
                {
                    id: 1,
                    price: 300
                },
                {
                    id: 2,
                    price: 400
                },
                {
                    id: 3,
                    price: 200
                },
                {
                    id: 4,
                    price: 500
                },
                {
                    id: 5,
                    price: 600
                },
                {
                    id: 6,
                    price: 800
                },
            ],
            change: 0
        }
    },
    methods: {
        addData(){
            const amount = this.$refs.amount.value;
            if(amount == '') return 
            const Newid = this.cart.length + 1;
            const data ={
                id: Newid,
                price: Number(amount)
            }
            // console.log(data);
            this.cart.push(data);
            this.change +=1;
            // console.log(this.cart)
        }
    },
    computed: {
        fullname() {
            return `${this.firstName} ${this.lastName}`
        },
        total(){
            return this.cart.reduce((total, item) => total += item.price, 0 )
        }
    },
    watch: {
        change(newVal, oldVal){
            console.log('watcher capture the change it is from: ',oldVal,' to :',newVal)
            // alert('cart');
        }
    }
}
</script>


<style scoped>
table{
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid grey;
    
}
thead,tbody,tr,td,th{
    padding: 1px 20px;
    text-align: center;
}
</style>