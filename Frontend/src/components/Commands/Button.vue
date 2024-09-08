<template>
  <button @click="onClick" class="btn">{{ text }}</button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      text: String,
    },
    methods: {
      /*
      Emits a button click to whever the button is being used
      */
      onClick() {
        this.$emit('btn-click')
      }
    }
  }
</script>

<style scoped>

</style>