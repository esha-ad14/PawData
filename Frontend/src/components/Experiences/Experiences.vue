<template>
  <div>
    <div :key="experience.exp_id" v-for="experience in experiences">
      <Experience
        @delete-task="$emit('delete-task', experience.exp_id)" 
        :experience="experience" 
        />
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Experiences",
    components: {
    Experience,
},
    props: {
      experiences: Array,
    },
    emits: ['delete-task']
  }
</script>