<template>
  <div>
    <div :key="customer.customerID" v-for="customer in customers">
      <Customer
        @delete-task="$emit('delete-task', customer.customerID)"
        :customer="customer"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Customers",
  components: {
    Customer,
  },
  props: {
    customer: Array,
  },
  emits: ["delete-task"],
};
</script>