<template>
    <div>
        <h2>Hi this is dasgboard</h2>
        <button @click="userdata">usrdata</button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        userdata(){
            axios.get('/users').then(function(res) {
            console.table(res.data);
        })
        }
    },
    created(){
        
    }
}
</script>
