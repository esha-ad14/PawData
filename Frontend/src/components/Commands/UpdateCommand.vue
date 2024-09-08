<template>
  <div>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Command: </label>
        <input type="text" v-model="command" name="command" placeholder="Update Command" />
      </div>  
      <div class="form-control">
        <label>Time Spent: </label>
        <input type="text" v-model="time_spent" name="time_spent" placeholder="Update Time Spent" />
      </div>  
      <div class="form-control form-control-check">
        <label>Learned: </label>
        <input type="checkbox" v-model="learned" name="learned" />
      </div>  

      <input type="submit" value="Update Command" />
    </form>
  </div>
</template>

<script>
  export default {
    name: 'UpdateCommand',
    props: {
      aCommand: Object
    },
    data() {
      return {
        command: this.aCommand.command,
        time_spent: this.aCommand.time_spent,
        learned: this.aCommand.learned
      }
    },
    methods: {
      /*
      When the form is submitted, will emit the command id, the updated command,
      the udpated time spent, and the updated learned to CommandsPage
      */
      onSubmit(e) {
        e.preventDefault()

        const command_id = this.aCommand.command_id
        const newCommand = (this.command == '' ? this.aCommand.command : this.command)
        const newTimespent = (this.time_spent == '' ? this.aCommand.time_spent : this.time_spent)
        const newLearned = (this.learned == this.aCommand.learned ? this.aCommand.learned : this.learned)

        this.$emit('update-command', command_id, newCommand, newTimespent, newLearned)
      }
    }
  }
</script>

<style scoped>

</style>