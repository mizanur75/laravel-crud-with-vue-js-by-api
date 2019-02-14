<template>
<div id="customer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-6">Customers</div>
                            <div class="col-md-6 text-right">
                                <button class="btn btn-sm btn-info" @click="createCustomerModal"><i class="fa fa-plus"></i><i class="fa fa-user"></i> Add Customer</button>
                            </div>
                        </div>

                    </div>

                    <div class="card-body">
                            <div class="row card-body">
                                <div class="col-md-2">
                                    <strong>Search By :</strong>
                                </div>
                                <div class="col-md-4">
                                    <select v-model="field" id="" class="form-control form-control-sm">
                                        <option value="name">Name</option>
                                        <option value="phone">Phone</option>
                                        <option value="email">Email</option>
                                        <option value="address">Address</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <input v-model="query" type="search" placeholder="Search" class="form-control form-control-sm">
                                </div>
                            </div>
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
                                    <tr v-show="customers.length" v-for="(customer, n) in customers" :key="customer.id">
                                        <td>{{n + 1}}</td>
                                        <td>{{customer.name}}</td>
                                        <td>{{customer.phone}}</td>
                                        <td>{{customer.email}}</td>
                                        <td>{{customer.address}}</td>
                                        <td class="text-center">
                                            <button type="button" @click="customerDetails" class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
                                            <button type="button" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></button>
                                            <button type="button" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                    <tr v-show="!customers.length">
                                        <td colspan="7">
                                            <div class="alert alert-danger text-center">
                                                <strong>Sorry No Data Found</strong>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination v-if="pagination.last_page > 1" :pagination="pagination" :offset="5" @paginate="query ==='' ? getCustomer() : serachCustomer()"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<!--Start Add Customer Modal -->

        <div class="modal fade" id="customerModal" tabindex="-1" role="dialog" aria-labelledby="customerModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="customerModalLabel">Add New Customer</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="storeCustomer" @keydown="form.onKeydown($event)">
                        <div class="modal-body">
                            <alert-error :form="form"></alert-error>
                            <div class="form-group">
                                <label>Name</label>
                                <input v-model="form.name" type="text" name="name"
                                    class="form-control form-control-sm" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input v-model="form.phone" type="phone" name="phone"
                                    class="form-control form-control-sm" :class="{ 'is-invalid': form.errors.has('phone') }">
                                <has-error :form="form" field="phone"></has-error>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="form.email" type="email" name="email"
                                    class="form-control form-control-sm" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input v-model="form.address" type="text" name="address"
                                    class="form-control form-control-sm" :class="{ 'is-invalid': form.errors.has('address') }">
                                <has-error :form="form" field="address"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                            <button :disabled="form.busy" type="submit" class="btn btn-sm btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
<!--End Add Customer Modal -->

<!--Start Customer Details Modal -->
        <div class="modal fade" id="customerModal" tabindex="-1" role="dialog" aria-labelledby="customerModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="customerModalLabel">Add New Customer</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <h1>This Customer Details Modal</h1>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                        <button :disabled="form.busy" type="submit" class="btn btn-sm btn-primary">Save changes</button>
                    </div>

                </div>
            </div>
        </div>
<!--End Customer Details Modal -->

    <vue-progress-bar></vue-progress-bar>
    <vue-snotify></vue-snotify>
</div>
</template>

<script>
    export default {
        data(){
            return {                
                query: '',
                field: 'name',
                customers: [],
                form : new Form({
                    id :'',
                    name: '',
                    phone: '',
                    email: '',
                    address:''
                }),
                pagination: {
                    current_page : 1,
                }
            }
        },

        watch: {
            query:function (newData, oldData){ 
                if(newData === ''){
                    this.getCustomer();
                }else{
                    this.serachCustomer();
                }
            }
        },
        mounted() {
            // console.log('Component mounted.')
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
            },

            createCustomerModal(){
                this.form.reset()
                this.form.clear()
                $('#customerModal').modal('show')
                // this.$snotify.success("Success")
            },
            storeCustomer(){
                this.$Progress.start()
                this.form.busy =true
                this.form.post('/api/customers')
                .then(response => {
                    
                    $('#customerModal').modal('hide')
                    this.getCustomer()
                    if(this.form.successful){
                        this.$Progress.finish()
                        this.$snotify.success('Customer Added Successfully!','Success')
                    }else{
                        this.$Progress.fail()
                        this.$snotify.error('Something Went Wrong!','Error')
                    }
                }).catch(e=>{
                    this.$Progress.fail()
                    console.log(e)
                })
            },

            customerDetails(){
                this.$snotify.success('Success!')
            },

            serachCustomer(){
                this.$Progress.start()
                axios.get('/api/search/customers/'+this.field+'/'+this.query+'?page='+this.pagination.current_page)
                .then( response => {
                    this.customers = response.data.data
                    this.pagination = response.data.meta
                    this.$Progress.finish()
                    // this.$snotify.success("Data Search")
                })
                .catch( e => {
                    console.log(e)
                    this.$Progress.fail()
                })
            }
        }
    }
</script>
