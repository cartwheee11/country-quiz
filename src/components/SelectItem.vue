<template>
  <section>
    <details @focusout="onDetailsUnfocuse" ref="details">
      <summary ref="summary">
        <input
          placeholder="Choose a region"
          v-model="input"
          @keyup="onInputKeyUp"
          @mouseup="onInputClick"
          @focusout="onInputUnfocus"
          @focus="onInputFocus"
          @input="onInputChange"
          type="text"
        />
      </summary>
      <div ref="dropDown" class="drop-down">
        <p
          @mousedown.stop="onOptionClick"
          v-for="option in filteredOptions"
          :key="option"
          class="option"
          :class="{
            selected: option == selectedOption,
          }"
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
        selectedOption: "" as string,
        input: "",
        isOnlySearchedOptionsShown: false,
        filteredOptions: [] as Array<string>,
      };
    },

    mounted() {
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
      selectOption(option: string) {
        this.selectedOption = option;

        this.$nextTick(() => {
          const dd = this.$refs.dropDown as HTMLElement;
          const ddh = parseInt(window.getComputedStyle(dd).height);

          let selectedOptionDom: HTMLElement = (
            this.$refs.dropDown as any
          ).querySelector(".selected");

          const soh = parseInt(
            window.getComputedStyle(selectedOptionDom).height
          );
          const offset = selectedOptionDom.offsetTop;

          console.log(offset, ddh, dd.scrollTop);

          if (offset + soh > ddh + dd.scrollTop || offset < dd.scrollTop) {
            dd.scrollTo(0, offset - 20);
          }
        });
      },

      onInputKeyUp(event: any) {
        console.log(event.key);
        let arr = this.filteredOptions;
        let input = this.input;
        let index = arr.indexOf(input);

        if (event.key === "ArrowDown") {
          this.input = arr[(index + 1) % arr.length];
          this.selectOption(this.input);
        } else if (event.key == "ArrowUp") {
          let newIndex = index - 1 >= 0 ? index - 1 : arr.length - 1;
          this.input = arr[newIndex];
          this.selectOption(this.input);
        } else if (event.key == "Enter") {
          this.chooseOption(this.input);
          this.$nextTick(() => {
            event.target.blur();
          });
        }
      },

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

      chooseOption(option: string) {
        this.onInputUnfocus();

        this.$emit("update:modelValue", option);
        this.input = option;
        this.isOnlySearchedOptionsShown = false;
      },

      onOptionClick(e: any) {
        let text = e.target.innerText;
        this.chooseOption(text);
        // this.$emit("update:modelValue", text);
        // this.input = text;
        // this.isOnlySearchedOptionsShown = false;
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
    background-color: var(--c-base);
    border: 1px solid var(--c-border);
    position: absolute;
    top: 38px;
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
  }

  input {
    background-color: var(--c-base);
    border: none;
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

  .selected {
    background-color: var(--c-border);
  }
  .option:hover {
    background-color: var(--c-border);
  }
</style>
