<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Command:</label>
      <input type="text" v-model="command" name="command" placeholder="Add Command" />
    </div>  
    <div class="form-control">
      <label>Time Spent:</label>
      <input type="text" v-model="time_spent" name="time_spent" placeholder="Add Time Spent" />
    </div>  
    <div class="form-control form-control-check">
      <label>Learned:</label>
      <input type="checkbox" v-model="learned" name="learned" />
    </div>  

    <input type="submit" value="Add Command" />
  </form>
</template>

<script>
  export default {
    name: 'AddTask',
    data() {
      return {
        command: '',
        time_spent: '',
        learned: false
      }
    },
    methods: {
      /*
      When the form is submitted, the new command, new time spent, and
      new learned will be emitted to CommandsPage
      */
      onSubmit(e) {
        e.preventDefault()

        if (!this.command) {
          alert('Please add a command.')
          return
        } 
        if (!this.time_spent) {
          alert('Please add time spent on command.')
          return
        }

      
        const newCommand = this.command
        const newTimespent = this.time_spent
        const newLearned = this.learned

        this.$emit('add-command', newCommand, newTimespent, newLearned)

        this.command = '',
        this.time_spent = '',
        this.learned = false
      }
    }
  }
</script>

<style scoped>
.add-form{
  max-width: 100px;
  margin-top: 100px;
  padding: 3px auto;
  font-size: 20px;
}
.form-control input{
  border: 1px black;
}

</style>