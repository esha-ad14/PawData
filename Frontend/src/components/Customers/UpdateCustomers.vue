<template>
  <div>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Customer Type</label>
        <input
          type="text"
          v-model="customertype"
          name="customertype"
          placeholder="enter customer type"
        />
      </div>
      <div class="form-control">
        <label>Customer Phone</label>
        <input
          type="text"
          v-model="customerphone"
          name="customerphone"
          placeholder="enter phone number"
        />
      </div>
      <div class="form-control">
        <label>Customer Email</label>
        <input
          type="text"
          v-model="customeremail"
          name="customeremail"
          placeholder="enter email"
        />
      </div>
      <div class="pt-5 py-1">
        <input class="py-1 px-1" type="submit" value="Update Customer" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UpdateCustomer",
  props: {
    changeCustomer: Object,
  },
  data() {
    return {
      customertype: this.changeCustomer.customertype,
      customerphone: this.changeCustomer.customerphone,
      customeremail: this.changeCustomer.customeremail,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      const customerid = this.changeCustomer.customerid;
      const newCustomerType =
        this.customertype == ""
          ? this.changeCustomer.customertype
          : this.customertype;
      const newCustomerPhone =
        this.customerphone == ""
          ? this.changeCustomer.customerphone
          : this.customerphone;
      const newCustomerEmail =
        this.customeremail == ""
          ? this.changeCustomer.customeremail
          : this.customeremail;

      console.log(
        customerid,
        newCustomerType,
        newCustomerPhone,
        newCustomerEmail
      );

      this.$emit(
        "update-customer",
        customerid,
        newCustomerType,
        newCustomerPhone,
        newCustomerEmail
      );
    },
  },
};
</script>

<style scoped>
.add-form {
  max-width: 150px;
  margin-top: 25px;
  padding: 3px auto;
  font-size: large;
  justify-content: space-between;
}
.form-control input {
  border: 1.5px solid #131514;
  background-color: #ffffff;
}
.add-form input {
  border: 1.5px solid #131514;
  color: #523a10;
  font-weight: 00;
}
input:hover {
  color: rgb(34, 20, 221);
}
</style>
