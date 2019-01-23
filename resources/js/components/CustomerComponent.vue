<template>
    <div id="customer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">Customers</div>

                    <div class="card-body">
                        <div class="table-responsible">
                            <table class="table table-sm table-bordered">
                                <thead>
                                    <tr>
                                        <th width="5%">SL</th>
                                        <th width="20%">Name</th>
                                        <th width="10%">Phone</th>
                                        <th width="25%">Email</th>
                                        <th width="25%">Address</th>
                                        <th class="text-center" width="15%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(customer, n) in customers" :key="customer.id">
                                        <td>{{n + 1}}</td>
                                        <td>{{customer.name}}</td>
                                        <td>{{customer.phone}}</td>
                                        <td>{{customer.email}}</td>
                                        <td>{{customer.address}}</td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
                                            <button type="button" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></button>
                                            <button type="button" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination v-if="pagination.last_page > 1" :pagination="pagination" :offset="5" @paginate="getCustomer()"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                customers: [],
                pagination: {
                    current_page : 1,
                }
            }
        },
        mounted() {
            console.log('Component mounted.')
            this.getCustomer();
        },

        methods: {
            getCustomer(){
                this.$Progress.start()
                axios.get('/api/customers?page='+this.pagination.current_page)
                .then( response => {
                    this.customers = response.data.data
                    this.pagination = response.data.meta
                    this.$Progress.finish()
                })
                .catch( e => {
                    console.log(e)
                    this.$Progress.fail()
                })
            }
        }
    }
</script>
