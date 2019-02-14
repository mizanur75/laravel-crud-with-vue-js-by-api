<template>
    <div>
        <form @submit.prevent="saveInvoice">
            <div class="table-responsive">
                <table class="table table-sm" style="border: none;">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Line Total</th>
                            <th class="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(invoice_product, k) in invoice_products" :key="k">
                            <td>
                                <input class="form-control form-control-sm" type="text" v-model="invoice_product.product_no" name="code[]" />
                            </td>
                            <td>
                                <input class="form-control form-control-sm" type="text" v-model="invoice_product.product_name" name="name[]"/>
                            </td>
                            <td>
                                <input class="form-control form-control-sm text-right" type="number" min="0" step=".01" v-model="invoice_product.product_price" @change="calculateLineTotal(invoice_product)"  name="price[]"
                                />
                            </td>
                            <td>
                                <input class="form-control form-control-sm text-right" type="number" min="0" step=".01" v-model="invoice_product.product_qty" @change="calculateLineTotal(invoice_product)"  name="qty[]"
                                />
                            </td>
                            <td>
                                <input readonly class="form-control form-control-sm text-right" type="number" min="0" step=".01" v-model="invoice_product.line_total" />
                            </td>
                            <td class="text-right">
                                <button type="button" class="btn btn-sm btn-danger" @click="deleteRow(k, invoice_product)"><i class="far fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot style="border:none;">
                        <tr>
                            <td colspan="4" class="text-right">Subtotal</td>
                            <td class="text-right">{{invoice_subtotal}}/=</td>
                            <td class="text-right">
                                <button type='button' style="color:white" class="btn btn-sm btn-success" @click="addNewRow">
                                    <i class="fas fa-plus-circle"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-right">Tax</td>
                            <td class="text-right">{{invoice_tax}}%</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-right">Total</td>
                            <td class="text-right">{{invoice_total}}/=</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="text-right">
                <button type="submit" class="btn btn-sm btn-primary">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return{
            invoice_subtotal: 0,
            invoice_total: 0,
            invoice_tax: 5,
            invoice_products: [{
                product_no: '',
                product_name: '',
                product_price: '',
                product_qty: '',
                line_total: 0
            }]
        }
    },
    
    methods: {
        saveInvoice() {
            this.$http.post('/api/invoice')
            .then(response => {
                console.log('OK')
            })
            .catch(e => {
                console.log('Error')
            })
        },
        calculateTotal() {
            var subtotal;
            var total;
            subtotal = this.invoice_products.reduce(function (sum, product) {
                var lineTotal = parseFloat(product.line_total);
                if (!isNaN(lineTotal)) {
                    return sum + lineTotal;
                }
            }, 0);

            this.invoice_subtotal = subtotal.toFixed(2);

            total = (subtotal * (this.invoice_tax / 100)) + subtotal;
            total = parseFloat(total);
            if (!isNaN(total)) {
                this.invoice_total = total.toFixed(2);
            } else {
                this.invoice_total = '0.00'
            }
        },
        calculateLineTotal(invoice_product) {
            var total = parseFloat(invoice_product.product_price) * parseFloat(invoice_product.product_qty);
            if (!isNaN(total)) {
                invoice_product.line_total = total.toFixed(2);
            }
            this.calculateTotal();
        },
        deleteRow(index, invoice_product) {
            var idx = this.invoice_products.indexOf(invoice_product);
            if (idx > -1) {
                this.invoice_products.splice(idx, 1);
            }
            this.calculateTotal();
        },
        addNewRow() {
            this.invoice_products.push({
                product_no: '',
                product_name: '',
                product_price: '',
                product_qty: '',
                line_total: 0
            });
        }
    }
}
</script>

<style>

</style>
