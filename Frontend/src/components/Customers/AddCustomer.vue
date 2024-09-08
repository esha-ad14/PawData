<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label class="text-large font-medium flex-inline text-brown-30"
        >Customer Type</label
      >
      <input
        type="text"
        v-model="customertype"
        name="customertype"
        placeholder="customer type"
      />
    </div>
    <div class="form-control">
      <label class="text-large font-medium flex-inline text-brown-30"
        >Customer Phone</label
      >
      <input
        type="text"
        v-model="customerphone"
        name="customerphone"
        placeholder="phone number"
      />
    </div>
    <div class="form-control">
      <label class="text-large font-medium text-brown-30 flex-inline"
        >Customer Email</label
      >
      <input
        type="text"
        v-model="customeremail"
        name="customeremail"
        placeholder="email"
      />
    </div>
    <div class="pt-5 py-1">
      <input class="py-1 px-1" type="submit" value="ADD CUSTOMER" />
    </div>
  </form>
</template>

<script>
export default {
  name: "AddCustomer",
  data() {
    return {
      customertype: "",
      customerphone: "",
      customeremail: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.customertype) {
        alert("Please add a customer type");
        return;
      }
      if (!this.customerphone) {
        alert("Please add a customer phone number");
        return;
      }
      if (!this.customeremail) {
        alert("Please add a customer email");
        return;
      }

      const newCustomer = {
        //customerid: Math.floor(Math.random() * 100000),
        customertype: this.customertype,
        customerphone: this.customerphone,
        customeremail: this.customeremail,
      };

      this.$emit("add-customer", newCustomer);

      (this.customertype = ""),
        (this.customerphone = ""),
        (this.customeremail = "");
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
  color: rgb(10, 160, 103);
}
</style>