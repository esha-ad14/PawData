<template>
  <div>
    <div :key="trainer.TrainerID" v-for="trainer in trainers">
      <Trainer
        @delete-task="$emit('delete-task', trainer.TrainerID)"
        :trainer="trainer"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Trainers",
  components: {
    Trainer,
  },
  props: {
    trainer: Array,
  },
  emits: ["delete-task"],
};
</script>
