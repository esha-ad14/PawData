<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex-auto">
      <h1
        class="text-center text-2xl leading-8 font-regular tracking-tight sm:text-2xl"
      >
        Customers
      </h1>
      <div v-show="showAddCustomer">
        <AddCustomer @add-customer="addCustomer" />
      </div>
      <CustomerButton
        @btn-click="toggleAddCustomer"
        :text="showAddCustomer ? 'Close' : 'Add Customer'"
      />
    </div>

    <div class="mt-10 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    CustomerID
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    CustomerType
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    CustomerPhone
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    CustomerEmail
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-red-500"
                  ></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  :key="customer.customerid"
                  v-for="customer in this.customers"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-sm text-gray-900 sm:pl-6"
                  >
                    {{ customer.customerid }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ customer.customertype }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ customer.customerphone }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ customer.customeremail }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-blue-700 hover:text-blue-400"
                  >
                    <button @Click="toggleUpdateCustomer(customer.customerid)">
                      Update
                    </button>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-red-700 hover:text-red-400"
                  >
                    <button @Click="deleteCustomers(customer.customerid)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-show="showUpdateCustomer">
      <UpdateCustomers
        @update-customer="updateCustomer"
        :changeCustomer="changeCustomer"
        v-if="showUpdateCustomer"
      />
    </div>
    <CustomerButton
      v-show="showUpdateCustomer"
      @btn-click="showUpdateCustomer = false"
      :text="showUpdateCustomer == true ? 'Close' : ''"
    />
  </div>
</template>

<script>
import AddCustomer from "./AddCustomer.vue";
import CustomerButton from "./CustomerButton.vue";
import UpdateCustomers from "./UpdateCustomers.vue";

export default {
  name: "Customers",
  props: {
    title: String,
  },
  components: { AddCustomer, CustomerButton, UpdateCustomers },
  data() {
    return {
      customers: [],
      showAddCustomer: false,
      showUpdateCustomer: false,
      changeCustomer: {
        customerid: null,
        customertype: "",
        customerphone: "",
        customeremail: "",
      },
    };
  },
  created() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      try {
        const response = await fetch("http://localhost:5000/customers");
        const data = await response.json();
        console.log(data);
        this.customers = data;
      } catch (err) {
        console.error(err.message);
      }
    },
    async getCustomer(customerid) {
      try {
        const response = await fetch(
          `http://localhost:5000/customers/${customerid}`
        );
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err.message);
      }
    },

    async createCustomer(customertype, customerphone, customeremail) {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customertype,
            customerphone,
            customeremail,
          }),
        };
        const response = await fetch(
          "http://localhost:5000/customers",
          requestOptions
        );
        const data = await response.json();
        this.customers = [...this.customers, data];
      } catch (err) {
        console.error(err.message);
      }
    },

    async updateCustomer(
      customerid,
      newCustomerType,
      newCustomerPhone,
      newCustomerEmail
    ) {
      try {
        const gottenCustomer = await this.getCustomer(customerid);
        const retrieved_customertype = gottenCustomer.customertype;
        const retrieved_customerphone = gottenCustomer.customerphone;
        const retrieved_customeremail = gottenCustomer.customeremail;
        newCustomerType =
          newCustomerType == retrieved_customertype
            ? retrieved_customertype
            : newCustomerType;
        newCustomerPhone =
          newCustomerPhone == retrieved_customerphone
            ? retrieved_customerphone
            : newCustomerPhone;
        newCustomerEmail =
          newCustomerEmail == retrieved_customeremail
            ? retrieved_customeremail
            : newCustomerEmail;

        console.log(
          "Customers",
          newCustomerType,
          newCustomerPhone,
          newCustomerEmail
        );
        const response = await fetch(
          `http://localhost:5000/customers/${customerid}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customertype: newCustomerType,
              customerphone: newCustomerPhone,
              customeremail: newCustomerEmail,
            }),
          }
        );
        this.customers = this.customers.map((customers) =>
          customers.customerid === customerid
            ? {
                customerid: customerid,
                customertype: newCustomerType,
                customerphone: newCustomerPhone,
                customeremail: newCustomerEmail,
              }
            : customers
        );
      } catch (err) {
        console.error(err.message);
      }
    },

    async deleteCustomers(customerid) {
      try {
        if (confirm("Are you sure you want to delete this ID?")) {
          await fetch(`http://localhost:5000/customers/${customerid}`, {
            method: "DELETE",
          });
          this.customers = this.customers.filter(
            (customer) => customer.customerid != customerid
          );
        }
      } catch (err) {
        console.error(err.message);
      }
    },
    toggleAddCustomer() {
      this.showAddCustomer = !this.showAddCustomer;
    },
    toggleUpdateCustomer(customerid) {
      this.showUpdateCustomer = !this.showUpdateCustomer;
      this.changeCustomer.customerid = customerid;
    },
    addCustomer(newCustomer) {
      this.createCustomer(
        newCustomer.customertype,
        newCustomer.customerphone,
        newCustomer.customeremail
      );
    },
  },
};
</script>

<style scoped>
.btn {
  background-color: #5f4828; /* Green */
  border: #5f4828 solid;
  color: white;
  padding: 5px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
}
.btn:hover {
  border: #9a805a solid;
  background-color: #9a805a;
  color: white;
}
</style>

