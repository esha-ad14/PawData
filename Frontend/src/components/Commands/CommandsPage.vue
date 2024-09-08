<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex-auto">
        <h1
            class="text-center text-2xl leading-8 font-regular tracking-tight sm:text-2xl"
        >
            Commands
        </h1>
        <Commands 
            @delete-command="deleteCommand" 
            @update-command="toggleUpdateCommand"
            :commands="commands" 
        />

        <div v-show="showAddCommand">
            <AddCommand @add-command="createCommand" />
        </div>
        <Button 
            @btn-click="toggleAddCommand" 
            :text="showAddCommand ? 'Close' : 'Add Command'"
            :color="showAddCommand ? 'red' : 'green'"
        />

        <div v-show="showUpdateCommand">
             <UpdateCommand 
                @update-command="updateCommand"
                :aCommand="aCommand" 
                v-if="showUpdateCommand" 
            />
        </div>
        <Button 
            v-show="showUpdateCommand"
            @btn-click="showUpdateCommand = false"
            :text="showUpdateCommand == true ? 'Close' : ''"
            :color="showUpdateCommand == true ? 'red' : ''"
        />
        </div>
    </div>
</template>

<script>
    import Commands from './Commands.vue'
    import Button from './Button.vue'
    import AddCommand from './AddCommand.vue'
    import UpdateCommand from './UpdateCommand.vue'

    export default {
        name: 'CommandsPage',
        props: {
            title: String,
        },
        components: {
            Commands,
            Button,
            AddCommand,
            UpdateCommand
        },
        data() {
            return {
                commands: [],
                showAddCommand: false,
                showUpdateCommand: false,
                aCommand: { 
                    command_id: null,
                    command: '',
                    time_spent: '',
                    learned: false
                },
            }
        },
        created() {
            this.getCommands()
            // this.createCommand('Eat', '00:05:00', true)
            // this.deleteCommand(10)
            // this.updateCommand(29, 'test1', '00:00:00', true)
        },
        methods: {
            /*
            Creates an HTTP request to the REST API to get all commands

            @returns all commands
            */
            async getCommands() {
                try {
                    const response = await fetch('http://localhost:5000/commands')
                    const data = await response.json()

                    this.commands = data
                } catch (err) {
                    console.error(err.message)
                }
            },
            
            /*
            Creates a HTTP request to the REST API to get a single command

            @param (command_id) The id of the command that is being requested
            @returns (data) Returns all commands
            */
            async getCommand(command_id) {
                try {
                    const response = await fetch(`http://localhost:5000/commands/${command_id}`)
                    const data = await response.json()

                    return data
                } catch (err) {
                    console.error(err.message)
                }
            },

            /*
            Creates a HTTP request to create a command

            @param (command, time_spent, learned)   The command, the time spent on the command, 
                                                    and if the dog has learned the command which
                                                    will be recieved from AddCommand
            @returns (this.commands)                Returns an updated array of command objects
            */
            async createCommand(command, time_spent, learned) {
                try {
                    const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({command, time_spent, learned})
                    }
                    const response = await fetch('http://localhost:5000/commands', requestOptions)
                    const data = await response.json()

                    this.commands = [...this.commands, data]
                } catch (err) {
                    console.error(err.message)
                }
                
            },

            /*
            Creates a HTTP request to update the command, time spent, and if the dog has learned the command

            @param (command_id, newCommand, newTimespent, newLearned) The updated command, updated time spent, and updated learned
            */
            async updateCommand(command_id, newCommand, newTimespent, newLearned) {
                try {
                    const gottenCommand = await this.getCommand(command_id)
                    const retrieved_command = gottenCommand.command
                    const retrieved_timespent = gottenCommand.time_spent
                    const retrieved_learned = gottenCommand.learned
                    newCommand = (newCommand == retrieved_command ? retrieved_command : newCommand)
                    newTimespent = (newTimespent == retrieved_timespent ? retrieved_timespent : newTimespent)
                    newLearned = (newLearned == true ? true : false)

                    console.log("CommandsPage",newCommand, newTimespent, newLearned)

                    const response = await fetch(`http://localhost:5000/commands/${command_id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({ command: newCommand, time_spent: newTimespent, learned: newLearned })
                    })

                    this.commands = this.commands.map((command) => 
                        command.command_id === command_id ? { command: newCommand, time_spent: newTimespent, learned: newLearned } : command
                    )
                } catch (err) {
                    console.errror(err.message)
                }
            },

            /*
            Creates an HTTP request to delete the command

            @param (command_id) The id of the command that is to be deleted
            */
            async deleteCommand(command_id) {
                try {
                    if (confirm('Are you sure?')) {
                        await fetch(`http://localhost:5000/commands/${command_id}`, { method: 'DELETE' })

                        this.commands = this.commands.filter((command) => command.command_id != command_id)
                    }
                } catch (err) {
                    console.error(err.message)
                }
            },

            /*
            Sets the variable showUpdateCommand to 'true' so that the form to update is shown
            Sets the variable aCommand to the command that the update button is pressed on using getCommand()

            @param (command_id) The id of the command that was sent from UpdateCommand.vue
            */
            async toggleUpdateCommand(command_id) {
                this.showUpdateCommand = true
                this.aCommand = await this.getCommand(command_id)
            },

            /*
            Toggles the add command form so that the form is not always showing
            */
            toggleAddCommand() {
                this.showAddCommand = !this.showAddCommand
            },
        }
    }
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