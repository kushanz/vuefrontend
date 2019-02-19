<template>
    <div>
        <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="users" :search="search" :loading="loading" :pagination.sync="pagination" >
            <template slot="no-data">
                <!-- <v-alert :value="true" color="error" icon="warning">
                    Sorry, nothing to display here :(
                </v-alert> -->
            </template>
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading:true,
            pagination: {
                rowsPerPage: 20
            },
            search:'',
            users:[],
            headers:[
                { text: 'ID',align: 'left', sortable: false,value: 'id'},
                { text: 'Name', value: 'name' },
                { text: 'Email', value: 'email' }
            ],
        }
    },
    methods: {
       
    },
    created(){
        axios.get('/users').then((res) =>{
        this.users = res.data;
        this.loading = false;
        }) 
    }
}
</script>
