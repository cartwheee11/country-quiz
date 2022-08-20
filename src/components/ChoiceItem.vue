<template>
  <section style="width: 100%">
    <div class="wrapper">
      <span>{{ word }}</span>
      <span>{{ value }}</span>
      <span v-if="isAnswerShown">
        <span v-if="isAnswer">yes</span>
        <span v-else>no</span>
      </span>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      value: {
        type: String,
        required: true,
      },

      word: {
        type: String,
        required: true,
      },

      isAnswer: {
        type: Boolean,
        required: true,
      },

      isAnswerShown: {
        type: Boolean,
        required: false,
      },
    },
  });
</script>

<style scoped>
  .wrapper {
    display: flex;
  }
</style>
