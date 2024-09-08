<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex-auto">
      <h1
        class="text-center text-2xl leading-8 font-regular tracking-tight sm:text-2xl"
      >
        Trainers
      </h1>
    </div>
    <div v-show="showAddTrainer">
        <AddTrainer @add-trainer="addTrainer" />
    </div>
    <div v-show="showUpdateTrainer">
        <UpdateTrainer @update-trainer="updateTrainer"
        :changeTrainer="changeTrainer"
        v-if="showUpdateTrainer"/>
    </div>
    <br>
    <TrainerButton 
        @btn-click="toggleAddButton" 
        :text="showAddTrainer ? 'Close' : 'Add Trainer'" 
        :color="showAddTrainer ? 'red' : 'green'" 
    />

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
                    TrainerID
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Trainer First Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Trainer Last Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Trainer Phone
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-red-500"
                  ></th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-red-500"
                  ></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  :key="trainer.TrainerID"
                  v-for="trainer in this.trainers"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-sm text-gray-900 sm:pl-6"
                  >
                    {{ trainer.TrainerID }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ trainer.TrainerFName }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ trainer.TrainerLName }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ trainer.TrainerPhone }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-red-700 hover:text-red-500"
                  >
                    <button @Click="deleteTrainers(trainer.TrainerID)">
                      Delete
                    </button>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-blue-700 hover:text-blue-500"
                  >
                    <button @Click=toggleUpdateButton(trainer.TrainerID)>
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrainerButton from './TrainerButton.vue';
import AddTrainer from './AddTrainer.vue';
import UpdateTrainer from './UpdateTrainer.vue';
export default {
    name: "Trainers",
    data() {
        return {
            trainers: [],
            showAddTrainer: false,
            showUpdateTrainer: false,
            changeTrainer: {
              TrainerID: null,
              TrainerFName: '',
              TrainerLName: '',
              TrainerPhone: '',
            },
        };
    },
    created() {
        this.getTrainers();
    },
    methods: {
        async getTrainers() {
            try {
                const response = await fetch("http://localhost:5000/trainers");
                const data = await response.json();
                console.log(data);
                this.trainers = data;
            }
            catch (err) {
                console.error(err.message);
            }
        },
        async getTrainer(TrainerID){
          try{
            const response = await fetch(`http://localhost:5000/trainers/${TrainerID}`);
            const data = await response.json();
            return data;
          } catch(err) {
            console.log(err.message);
          }
        },

        async createTrainer(TrainerID, TrainerFName, TrainerLName, TrainerPhone) {
                try {
                    const requestOptions = {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({TrainerID, TrainerFName, TrainerLName, TrainerPhone})
                    }
                    const response = await fetch('http://localhost:5000/trainers', requestOptions)
                    const data = await response.json()

                    this.trainers = [...this.trainers, data]
                } catch (err) {
                    console.error(err.message)
                }
            },
        async updateTrainer(TrainerID, newTrainerFName, newTrainerLName, newTrainerPhone) {
          try{
            const gottenTrainer = await this.getTrainer(TrainerID)
            const gottenTrainerFName = gottenTrainer.TrainerFName
            const gottenTrainerLName = gottenTrainer.TrainerLName
            const gottenTrainerPhone = gottenTrainer.TrainerPhone
            newTrainerFName = newTrainerFName == gottenTrainerFName ? gottenTrainerFName : newTrainerFName;
            newTrainerLName = newTrainerLName == gottenTrainerLName ? gottenTrainerLName : newTrainerLName;
            newTrainerPhone = newTrainerPhone == gottenTrainerPhone ? gottenTrainerPhone : newTrainerPhone;

            const response = await fetch(`http://localhost:5000/trainers/${TrainerID}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                TrainerFName: newTrainerFName,
                TrainerLName: newTrainerLName,
                TrainerPhone: newTrainerPhone,
              })
            });
            this.trainers = this.trainers.map((trainers) => 
              trainers.TrainerID === TrainerID
              ? {
                TrainerID: TrainerID,
                TrainerFName: newTrainerFName,
                TrainerLName: newTrainerLName,
                TrainerPhone: newTrainerPhone,
              } : trainers
            );
          } catch {
            console.log(err.message)
          }
        },
        async deleteTrainers(TrainerID) {
            try {
                if (confirm("Are you sure you want to delete this ID?")) {
                    await fetch(`http://localhost:5000/trainers/${TrainerID}`, {
                        method: "DELETE",
                    });
                    this.trainers = this.trainers.filter((trainer) => trainer.TrainerID != TrainerID);
                }
            }
            catch (err) {
                console.error(err.message);
            }
        },
        toggleAddButton() {
            this.showAddTrainer = !this.showAddTrainer
        },
        toggleUpdateButton(TrainerID) {
            console.log(TrainerID)
            this.showUpdateTrainer = !this.showUpdateTrainer
            this.changeTrainer.TrainerID = TrainerID
        },
        addTrainer(newTrainer) {
          this.createTrainer(
            newTrainer.TrainerID,
            newTrainer.TrainerFName,
            newTrainer.TrainerLName,
            newTrainer.TrainerPhone
          );
        }
    },
    components: { TrainerButton, AddTrainer, UpdateTrainer }
};
</script>
