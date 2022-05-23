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
