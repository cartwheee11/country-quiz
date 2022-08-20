<template>
  <section>
    <details @focusout="onDetailsUnfocuse" ref="details">
      <summary ref="summary">
        <input
          :value="modelValue"
          @focusout="onInputUnclick"
          @focus="onInputClick"
          type="text"
        />
      </summary>
      <div class="drop-down">
        <p
          @mousedown.stop="onOptionClick"
          v-for="option in options"
          :key="option"
          class="option"
        >
          {{ option }}
        </p>
      </div>
    </details>
  </section>
</template>

<script lang="ts">
  import { PropType, defineComponent } from "vue";

  export default defineComponent({
    props: {
      options: {
        type: Array as PropType<Array<string>>,
        required: true,
      },

      default: {
        required: false,
        type: String as PropType<string | undefined>,
      },

      modelValue: String as PropType<string>,
    },

    mounted() {
      // console.log(this.$refs.summary);
    },

    methods: {
      onOptionClick(e: any) {
        let text = e.target.innerText;
        this.$emit("update:modelValue", text);
      },

      onInputClick() {
        if (!(this.$refs.details as any).hasAttribute("open")) {
          (this.$refs.summary as any).click();
        }
      },

      onInputUnclick() {
        if ((this.$refs.details as any).hasAttribute("open")) {
          (this.$refs.summary as any).click();
        }
      },

      onDetailsUnfocuse() {
        this.onInputUnclick();
      },
    },
  });
</script>

<style scoped>
  section {
    width: 100%;
  }
  details {
    position: relative;
  }
  .drop-down {
    overflow: hidden;
    border-radius: 10px;
    background-color: var(--c-accent);
    border: 2px solid var(--c-border);
    position: absolute;
    top: 38px;
    width: 100%;
  }
  .option {
    margin: 0;
    padding: 10px;
    color: #c9cbd0;
    margin: 0;
  }
  .option:hover {
    background-color: var(--c-border);
  }
</style>
