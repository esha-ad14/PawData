<template>
  <div>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Trainer First Name: </label>
        <input type="text" v-model="TrainerFName" name="TrainerFName" placeholder="Update First Name" />
      </div>  
      <div class="form-control">
        <label>Trainer Last Name: </label>
        <input type="text" v-model="TrainerLName" name="TrainerLName" placeholder="Update Last Name" />
      </div>  
      <div class="form-control">
        <label>Trainer Phone: </label>
        <input type="text" v-model="TrainerPhone" name="TrainerPhone" placeholder="Update Phone Number" />
      </div>  

      <input type="submit" value="Update Trainer" />
    </form>
  </div>
</template>

<script>
  export default {
    name: 'UpdateTrainer',
    props: {
        changeTrainer: Object,
    },
    data() {
      return {
        //TrainerID: null,
        //TrainerFName: "",
        //TrainerLName: "",
        //TrainerPhone: "",
        TrainerFName: this.changeTrainer.TrainerFName,
        TrainerLName: this.changeTrainer.TrainerLName,
        TrainerPhone: this.changeTrainer.TrainerPhone,
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault()
        const TrainerID = (this.TrainerID == null ? this.changeTrainer.TrainerID : this.TrainerID)
        const newTrainerFName = (this.TrainerFName == '' ? this.changeTrainer.TrainerFName : this.TrainerFName)
        const newTrainerLName = (this.TrainerLName == '' ? this.changeTrainer.TrainerLName : this.TrainerLName)
        const newTrainerPhone = (this.TrainerPhone == '' ? this.changeTrainer.TrainerPhone : this.TrainerPhone)
        console.log(TrainerID, newTrainerFName, newTrainerLName, newTrainerPhone)
        this.$emit('update-trainer', TrainerID, newTrainerFName, newTrainerLName, newTrainerPhone)
      }
    }
  }
</script>

<style scoped>
</style>