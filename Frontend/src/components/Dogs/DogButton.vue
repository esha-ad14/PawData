<template>
  <button @click="onClick" class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: "DogButton",
  props: {
    text: String,
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>

<style scoped></style>
