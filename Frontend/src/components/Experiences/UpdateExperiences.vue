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

    <input type="submit" value="Update Experience" />
  </form>
</template>

<script>
export default {
  name: "UpdateExperience",
  props: {
    changeExperience: Object,
  },
  data() {
    return {
      exp_date: this.changeExperience.exp_date,
      exp_level: this.changeExperience.exp_level,
      exp_notes: this.changeExperience.exp_notes,
      exp_name: this.changeExperience.exp_name,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      const exp_id = this.changeExperience.exp_id;
      const newexp_date =
        this.exp_date == ""
          ? this.changeExperience.exp_date
          : this.exp_date;
      const newexp_level =
        this.exp_level == ""
          ? this.changeExperience.exp_level
          : this.exp_level;
      const newexp_notes =
        this.exp_notes == ""
          ? this.changeExperience.exp_notes
          : this.exp_notes;
    const newexp_name =
        this.exp_name == ""
          ? this.changeExperience.exp_name
          : this.exp_name;

      console.log(
        exp_id,
        newexp_date,
        newexp_level,
        newexp_notes,
        newexp_name
      );

      this.$emit(
        "update-experience",
        exp_id,
        newexp_date,
        newexp_level,
        newexp_notes,
        newexp_name
      );
    },
  },
};
</script>

<style scoped></style>