<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Trainer First Name:</label>
      <input
        type="text"
        v-model="TrainerFName"
        name="TrainerFName"
        placeholder="enter trainer first name"
      />
    </div>
    <div class="form-control">
      <label>Trainer Last Name:</label>
      <input
        type="text"
        v-model="TrainerLName"
        name="TrainerLName"
        placeholder="enter trainer last name"
      />
    </div>
    <div class="form-control">
      <label>Trainer Phone:</label>
      <input
        type="text"
        v-model="TrainerPhone"
        name="TrainerPhone"
        placeholder="enter trainer phone number"
      />
    </div>

    <input type="submit" value="Add Trainer" />
  </form>
</template>

<script>
export default {
  name: "AddTrainer",
  data() {
    return {
      TrainerFName: "",
      TrainerLName: "",
      TrainerPhone: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.TrainerFName) {
        alert("Please add a first name");
        return;
      }
      if (!this.TrainerLName) {
        alert("Please add a last name");
        return;
      }
      if (!this.TrainerPhone) {
        alert("Please add a phone");
        return;
      }

      const newTrainer = {
        TrainerID: Math.floor(Math.random() * 100000),
        TrainerFName: this.TrainerFName,
        TrainerLName: this.TrainerLName,
        TrainerPhone: this.TrainerPhone,
      };

      this.$emit("add-trainer", newTrainer);

      (this.TrainerFName = ""),
      (this.TrainerLName = ""),
      (this.TrainerPhone = "");
    },
  },
};
</script>

<style scoped>
.add-form {
  max-width: 100px;
  margin-top: 100px;
  padding: 3px auto;
  font-size: 20px;
}
.form-control input {
  border: 1px black;
}
</style>