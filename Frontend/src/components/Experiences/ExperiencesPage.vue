<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex-auto">
      <h1
        class="text-center text-2xl leading-8 font-regular tracking-tight sm:text-2xl"
      >
        Experience
      </h1>
      <div v-show="showAddExp">
        <AddExp @add-exp="AddExp" />
      </div>
      <ButtonEXP
        @btn-click="toggleAddExp"
        :text="showAddExp ? 'Close' : 'Add Experience'"
        :color="showAddExp ? 'red' : 'green'"
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
                    ExperienceID
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    ExperienceDate
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    ExperienceLevel
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    ExperienceNotes
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-red-500"
                  ></th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    ExperienceName
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  :key="experience.exp_id"
                  v-for="experience in this.experience"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-sm text-gray-900 sm:pl-6"
                  >
                    {{ experience.exp_id }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ experience.exp_date }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ experience.exp_level }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ experience.exp_notes }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ experience.exp_name }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-red-700 hover:text-red-500"
                  >
                  <button @Click="toggleUpdateExperience(experience.exp_id)">
                      Update
                    </button>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-red-700 hover:text-red-400"
                  >
                    <button @Click="deleteExp(experience.exp_id)">
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

    <div v-show="showUpdateExperience">
      <UpdateExperience
        @update-experience="updateExperience"
        :changeExperience="changeExperience"
        v-if="showUpdateExperience"
      />
    </div>
    <ButtonEXP
      v-show="showUpdateExperience"
      @btn-click="showUpdateExperience = false"
      :text="showUpdateExperience == true ? 'Close' : ''"
      :color="showUpdateExperience == true ? 'red' : ''"
    />

  </div>
</template>

<script>

import AddExp from './AddExperience.vue'
import ButtonEXP from './ButtonEXP.vue'
import UpdateExperience from './UpdateExperiences.vue'

export default {
    name: "Experience",
    props: {
      title: String,
    },
    components: { AddExp, ButtonEXP, UpdateExperience },
    data() {
        return {
            experience: [],
            showAddExp: false,
            showUpdateExperience: false,
            changeExperience: {
              exp_id: null,
              exp_date: "",
              exp_level: "",
              exp_notes: "",
              exp_name: "",
            }
        };
    },
    created() {
        this.getExp();
    },
    methods: {
        async getExp() {
            try {
                const response = await fetch("http://localhost:5000/experience");
                const data = await response.json();
                console.log(data);
                this.experience = data;
            }
            catch (err) {
                console.error(err.message);
            }
        },
        //getExperience from getCustomer with parameter id 
        // PROBABLY CHANGE IN server.js --> after check, don't think so
        async getExperience(exp_id) {
          try {
            const response = await fetch(
              `http://localhost:5000/experience/${exp_id}`
            );
            const data = await response.json();
            return data;
          } catch (err) {
            console.error(err.message);
          }
        },
        //end copy - paste - change

        async createExperience(exp_date, exp_level, exp_notes, exp_name) {
          try {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                exp_date,
                exp_level,
                exp_notes,
                exp_name,
              }),
            };
            const response = await fetch(
              "http://localhost:5000/experience",
              requestOptions
            );
            const data = await response.json();
            //works
            this.experience = [...this.experience, data];
          } catch (err) {
            console.error(err.message);
          }
        },

        //update function, Esha
          async updateExperience(
            exp_id,
            newexp_date,
            newexp_level,
            newexp_notes,
            newexp_name
          ) {
            try {
              const gottenExperience = await this.getExperience(exp_id);
              const retrieved_exp_date = gottenExperience.exp_date;
              const retrieved_exp_level = gottenExperience.exp_level;
              const retrieved_exp_notes = gottenExperience.exp_notes;
              const retrieved_exp_name = gottenExperience.exp_name;

              //copy 
              newexp_date =
                newexp_date == retrieved_exp_date
                  ? retrieved_exp_date
                  : newexp_date;
              newexp_level = 
                newexp_level == retrieved_exp_level
                  ? retrieved_exp_level
                  : newexp_level;
              newexp_notes =
                newexp_notes == retrieved_exp_notes
                  ? retrieved_exp_notes
                  : newexp_notes;
              newexp_name = 
                newexp_name == retrieved_exp_name
                  ? retrieved_exp_name
                  : newexp_name;

              console.log(
                "Experiences",
                newexp_date,
                newexp_level,
                newexp_notes,
                newexp_name
              );
              const response = await fetch(
                `http://localhost:5000/experience/${exp_id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    exp_date: newexp_date,
                    exp_level: newexp_level,
                    exp_notes: newexp_notes,
                    exp_name: newexp_name,
                  }),
                }
              );
              this.experience = this.experience.map((experience) =>
                experience.exp_id === exp_id
                  ? {
                      exp_id: exp_id,
                      exp_date: newexp_date,
                      exp_level: newexp_level,
                      exp_notes: newexp_notes,
                      exp_name: newexp_name,
                    }
                  : experience
              );
            } catch (err) {
              console.error(err.message);
            }
          },  

        //end copy - paste - change

        async deleteExp(exp_id) {
            try {
                if (confirm("Are you sure you want to delete this Experience?")) {
                    await fetch(`http://localhost:5000/experience/${exp_id}`, {
                        method: "DELETE",
                    });
                    this.experience = this.experience.filter((experience) => experience.exp_id != exp_id);
                }
            }
            catch (err) {
                console.error(err.message);
            }
        },

        //Stuff
        toggleAddExp() {
          this.showAddExp = !this.showAddExp;
        },
        toggleUpdateExperience(exp_id) {
          this.showUpdateExperience = !this.showUpdateExperience;
          this.changeExperience.exp_id = exp_id;
        },
        AddExp(newExp) {
          this.createExperience(
            newExp.exp_date,
            newExp.exp_level,
            newExp.exp_notes,
            newExp.exp_name
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