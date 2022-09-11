<template>
  <section>
    <details @focusout="onDetailsUnfocuse" ref="details">
      <summary ref="summary">
        <input
          placeholder="Choose a region"
          v-model="input"
          @mouseup="onInputClick"
          @focusout="onInputUnfocus"
          @focus="onInputFocus"
          @input="onInputChange"
          type="text"
        />
      </summary>
      <div class="drop-down">
        <p
          @mousedown.stop="onOptionClick"
          v-for="option in filteredOptions"
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
        type: String as PropType<string>,
      },

      modelValue: String as PropType<string>,
    },

    data() {
      return {
        input: "",
        isOnlySearchedOptionsShown: false,
        filteredOptions: [] as Array<string>,
      };
    },

    mounted() {
      // console.log(this.$refs.summary);
      // if (this.default) {
      //   this.input = this.default;
      // }

      if (this.modelValue) this.input = this.modelValue;

      this.filteredOptions = this.options.slice();
    },

    watch: {
      options() {
        if (!this.isOnlySearchedOptionsShown) {
          this.filteredOptions = this.options;
        } else {
          this.filteredOptions = this.options.filter((s) =>
            s.toLowerCase().includes(this.input.toLowerCase())
          );
        }
      },

      isOnlySearchedOptionsShown() {
        if (!this.isOnlySearchedOptionsShown) {
          this.filteredOptions = this.options;
        }
      },
    },

    methods: {
      onInputChange() {
        this.isOnlySearchedOptionsShown = true;
        // this.filteredOptions = [];
        this.filteredOptions = this.options.filter((s) =>
          s.toLowerCase().includes(this.input.toLowerCase())
        );
      },

      onInputClick(e: any) {
        this.$nextTick(() => {
          e.target.select();
        });
      },

      onOptionClick(e: any) {
        let text = e.target.innerText;
        this.$emit("update:modelValue", text);
        this.input = text;
        this.isOnlySearchedOptionsShown = false;
      },

      onInputFocus(e: any) {
        // this.$emit("update:modelValue", "");
        if (!(this.$refs.details as any).hasAttribute("open")) {
          (this.$refs.summary as any).click();
        }
      },

      onInputUnfocus() {
        if ((this.$refs.details as any).hasAttribute("open")) {
          (this.$refs.summary as any).click();
        }

        this.input = this.modelValue as string;
      },

      onDetailsUnfocuse() {
        this.onInputUnfocus();
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
    max-height: 300px;
    overflow-y: scroll;
  }

  .drop-down::-webkit-scrollbar {
    display: none;
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
