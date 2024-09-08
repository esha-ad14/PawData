<template>
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
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Command
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Time Spent
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Learned
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-red-500"
                  ></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  :key="command.command_id"
                  v-for="command in commands"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-sm text-gray-900 sm:pl-6"
                  >
                    {{ command.command }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ command.time_spent }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ command.learned }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-orange-700 hover:text-orange-500"
                  >
                    <button @click="$emit('update-command', command.command_id)">
                      Update
                    </button>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-red-700 hover:text-red-500"
                  >
                    <button @click="$emit('delete-command', command.command_id)">
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
</template>

<script>

  export default {
    name: 'Commands',
    props: {
      commands: Array
    },
  }
</script>