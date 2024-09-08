<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex-auto">
      <h1
        class="text-center text-2xl leading-8 font-regular tracking-tight sm:text-2xl"
      >
        Dogs
      </h1>
      <div v-show="showAddDog">
        <AddDog @add-dog="addDog" />
      </div>
      <DogButton
        @btn-click="toggleAddDog"
        :text="showAddDog ? 'Close' : 'Add Dog'"
        :color="showAddDog ? 'red' : 'green'"
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
                        DogID
                    </th>
                    <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                        Dog Name
                    </th>
                    <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                        Dog DOB
                    </th>
                    <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                        Weight
                    </th>
                    <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                        Breed
                    </th>
                    <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                        Gender
                    </th>
                    <th
                        scope="col"
                        class="px-3 py-3.5 text-lefttext-sm font-semibold text-gray-900"
                    >
                        Last Visit
                    </th>
                    <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                        Vaccine Current
                    </th>
                    <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-red-500"
                    ></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  :key="dog.DogID"
                  v-for="dog in this.dogs"
                >
                    <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-sm text-gray-900 sm:pl-6"
                    >
                        {{ dog.DogID }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {{ dog.dogname }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {{ dog.dogdob }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {{ dog.dogweight }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {{ dog.dogbreed }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {{ dog.doggender }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {{ dog.datelastvisit }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {{ dog.vaxcurrent }}
                    </td>

                    <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-blue-700 hover:text-blue-400"
                    >
                    <button @Click="toggleUpdateDog(dog.DogID)">
                      Update
                    </button>
                    </td>
                    <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-red-700 hover:text-red-500"
                    >
                    <button @Click="deletedog(dog.DogID)">
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
        <div v-show="showUpdateDog">
        <UpdateDog
            @update-dog="updateDog"
            :changeDog="changeDog"
            v-if="showUpdateDog"
        />
    </div>
    <DogButton
      v-show="showUpdateDog"
      @btn-click="showUpdateDog= false"
      :text="showUpdateDog == true ? 'Close' : ''"
      :color="showUpdateDog == true ? 'red' : ''"
    />
  </div>

</template>

<script>
import AddDog from "./AddDog.vue";
import DogButton from "./DogButton.vue";
import UpdateDog from "./UpdateDog.vue";

export default {
    name: "Dogs",
    props: {
        title: String,
    },
    components: {AddDog, DogButton, UpdateDog},
    data() {
        return {
            dogs: [],
            showAddDog: false,
            showUpdateDog: false,
            changeDog: {
            DogID: null,
            dogname: "",
            dogdob: "",
            dogweight: null,
            dogbreed: "", 
            doggender: "", 
            datelastvisit: "", 
            vaxcurrent: "",
            },
        };
    },
  created() {
    this.getdog();
  },
  methods: {
    async getdog() {
      try {
        const response = await fetch("http://localhost:5000/Dog");
        const data = await response.json();
        
        this.dogs = data;
      } catch (err) {
        console.error(err.message);
      }
    },
    async getadog(dogid) {
      try {
        const response = await fetch(`http://localhost:5000/Dog/${dogid}`)
        const data = await response.json()

        return data
      } catch (err) {
        console.error(err.message)
      }
    },
    async createdog(dogname, dogdob, dogweight, dogbreed, doggender, datelastvisit, vaxcurrent) {
        try {
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({dogname, dogdob, dogweight, dogbreed, doggender, datelastvisit, vaxcurrent})
            }
            const response = await fetch('http://localhost:5000/Dog', requestOptions)
            const data = await response.json()

            this.dogs = [...this.dogs, data]
        } catch (err) {
            console.error(err.message)
        }  
    }, 
    async updateDog(
        DogID,
        newdogname,
        newdogdob,
        newdogweight,
        newdogbreed,
        newdoggender,
        newdatelastvisit,
        newvaxcurrent,
    ) {
      try {
        const gottenDog = await this.getadog(DogID);
        const retrieved_dogname = gottenDog.dogname;
        const retrieved_dogdob = gottenDog.dogdob;
        const retrieved_dogweight = gottenDog.dogweight;
        const retrieved_dogbreed = gottenDog.dogbreed;
        const retrieved_doggender = gottenDog.doggender;
        const retrieved_datelastvisit = gottenDog.datelastvisit;
        const retrieved_vaxcurrent = gottenDog.vaxcurrent;
        newdogname =
            newdogname == retrieved_dogname
                ? retrieved_dogname
                : newdogname;
        newdogdob =
            newdogdob == retrieved_dogdob
                ? retrieved_dogdob
                : newdogdob;
        newdogweight =
            newdogweight == retrieved_dogweight
                ? retrieved_dogweight
                : newdogweight;
        newdogbreed =
            newdogbreed == retrieved_dogbreed
                ? retrieved_dogbreed
                : newdogbreed;
        newdoggender =
            newdoggender == retrieved_doggender
                ? retrieved_doggender
                : newdoggender;
        newdatelastvisit =
            newdatelastvisit == retrieved_datelastvisit
                ? retrieved_datelastvisit
                : newdatelastvisit;
        newvaxcurrent =
            newvaxcurrent == retrieved_vaxcurrent
                ? retrieved_vaxcurrent
                : newvaxcurrent;

        console.log(
            "Dog",
            newdogname,
            newdogdob,
            newdogweight,
            newdogbreed,
            newdoggender,
            newdatelastvisit,
            newvaxcurrent
        );

        const response = await fetch(
          `http://localhost:5000/Dog/${DogID}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dogname: newdogname,
                dogdob: newdogdob,
                dogweight: newdogweight,
                dogbreed: newdogbreed, 
                doggender: newdoggender, 
                datelastvisit: newdatelastvisit, 
                vaxcurrent: newvaxcurrent
            }),
          }
        );
        this.dogs = this.dogs.map((dogs) =>
            dogs.DogID === DogID
            ? {
                DogID: DogID,
                dogname: newdogname,
                dogdob: newdogdob,
                dogweight: newdogweight,
                dogbreed: newdogbreed, 
                doggender: newdoggender, 
                datelastvisit: newdatelastvisit, 
                vaxcurrent: newvaxcurrent,
              }
            : dogs
        );
      } catch (err) {
        console.error(err.message);
      }
    },
    async deletedog(DogID) {
        try {
            if (confirm("Are you sure you want to delete this ID?")) {
            await fetch(`http://localhost:5000/Dog/${DogID}`, {
                method: "DELETE",
            });
            this.dogs = this.dogs.filter(
                (dog) => dog.DogID != DogID
            );
            }
        } catch (err) {
            console.error(err.message);
        }
    },
    toggleAddDog() {
      this.showAddDog = !this.showAddDog;
    },
    toggleUpdateDog(DogID) {
      this.showUpdateDog = !this.showUpdateDog;
      this.changeDog.DogID = DogID;
    },
    addDog(newdog) {
      this.createdog(
        newdog.dogname,
        newdog.dogdob,
        newdog.dogweight,
        newdog.dogbreed, 
        newdog.doggender, 
        newdog.datelastvisit, 
        newdog.vaxcurrent
      );
    },
  },
};
</script>

<style scoped>
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
</style>
