<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Experience Date</label>
      <input
        type="text"
        v-model="exp_date"
        name="exp_date"
        placeholder="enter date of experience"
      />
    </div>
    <div class="form-control">
      <label>Experience Level</label>
      <input
        type="text"
        v-model="exp_level"
        name="exp_level"
        placeholder="enter level of experience (A - F)"
      />
    </div>
    <div class="form-control">
      <label>Experience Notes</label>
      <input
        type="text"
        v-model="exp_notes"
        name="exp_notes"
        placeholder="enter any notes about experience"
      />
    </div>
    <div class="form-control">
      <label>Experience Name</label>
      <input
        type="text"
        v-model="exp_name"
        name="exp_name"
        placeholder="enter one word name for experience"
      />
    </div>

    <input type="submit" value="Add Experience" />
  </form>
</template>

<script>
export default {
  name: "AddExp",
  data() {
    return {
      exp_date: "",
      exp_level: "",
      exp_notes: "",
      exp_name: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.exp_date) {
        alert("Please add Date of Experience:");
        return;
      }
      
      if (!this.exp_level) {
        alert("Please add Level of Experience (A, B, C, D or F):");
        return;
      }

      if (!this.exp_notes) {
        alert("Please add any other important Notes:");
        return;
      } 
      
      if (!this.exp_name) {
        alert("Please add name of experience:");
        return;
      }

      
      const newExp = {
        exp_date: this.exp_date,
        exp_level: this.exp_level,
        exp_notes: this.exp_notes,
        exp_name: this.exp_name,
      };

      this.$emit("add-exp", newExp);

        (this.exp_date = ""),
        (this.exp_level = ""),
        (this.exp_notes = "");
        (this.exp_name = "");
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
