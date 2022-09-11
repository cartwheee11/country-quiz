<template>
  <section>
    <div v-if="isScoreShown" class="wrapper">
      Correct answers: {{ rights }} Wrong answers: {{ wrongs }}
      <button @click="restart">Restart</button>
    </div>
    <div v-else class="wrapper">
      <h3 v-if="questionType == 'capital'">
        {{ country.capital }} is the capial of
      </h3>

      <h3 v-else-if="questionType == 'flag'">
        <img :src="country.flags?.png" alt="" /><br />
        Which country does this flag belong to <br />
      </h3>

      <button
        @click="onOptionClick"
        v-for="option in options"
        :key="option"
        :class="{ result: isResultShown && option == country.name }"
      >
        {{ option }}
      </button>
      <p>Score: {{ rights }} / {{ wrongs }}</p>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { PropType } from "vue";
  import * as api from "../api";

  export default defineComponent({
    props: {
      region: {
        type: String,
        required: false,
        default: "",
      },

      optionsNumber: {
        type: Number,
        required: false,
        default: 4,
      },

      maxScore: {
        type: Number,
        required: false,
        default: 10,
      },
    },

    data() {
      return {
        rights: 0,
        wrongs: 0,
        isScoreShown: false,
        isResultShown: false as boolean,
        country: {} as api.country,
        questionType: "" as "flag" | "capital",
        options: [] as Array<string>,
      };
    },

    mounted() {
      this.rollQuestion();
    },

    methods: {
      restart() {
        this.rights = 0;
        this.wrongs = 0;
        this.isScoreShown = false;
      },

      onOptionClick(event: any) {
        let option = event.target.innerText;
        event.target.classList.add("wrong");

        if (option === this.country.name) {
          this.rights++;
        } else {
          this.wrongs++;
        }

        this.isResultShown = true;
        setTimeout(() => {
          if (this.rights + this.wrongs === this.maxScore) {
            this.isScoreShown = true;
          }
          this.isResultShown = false;
          this.rollQuestion();
        }, 1500);
      },

      async rollQuestion() {
        await this.rollCountry();
        this.rollQuestionType();
        await this.rollOptions();
      },

      async rollCountry() {
        api.getRandomCountry(this.region).then((country) => {
          this.country = country;
        });
      },

      rollQuestionType() {
        this.questionType = ["flag", "capital"][
          Math.floor(Math.random() * 2)
        ] as "flag" | "capital";
      },

      async rollOptions() {
        this.options = [];
        let array = await api.getRandomCountries(
          this.optionsNumber,
          this.region
        );
        this.options = array.map((country) => country.name);
        // while (this.options.length < this.optionsNumber) {
        //   console.log(this.options.length, this.optionsNumber);
        //   let country = await api.getRandomCountry(this.region);

        //   // console.log(this.options.indexOf(country.name));

        //   if (
        //     this.options.concat([this.country.name]).indexOf(country.name) ===
        //     -1
        //   ) {
        //     this.options.push(country.name);
        //   }
        // }

        let rand = Math.floor(Math.random() * this.options.length);
        if (
          this.options.length == this.optionsNumber &&
          this.options.indexOf(this.country.name) == -1
        ) {
          this.options[rand] = this.country.name;
        }
      },
    },

    watch: {
      region() {
        this.rollQuestion();
        this.rights = 0;
        this.wrongs = 0;
      },
    },

    components: {
      // ChoiceItem,
    },
  });
</script>

<style scoped>
  .wrapper {
    margin-top: 10px;
    padding: 20px;
    border-radius: 10px;
    background-color: var(--c-accent);
    border: 2px var(--c-border) solid;
  }

  hr {
    border-color: var(--c-border);
  }

  button {
    width: 100%;
    height: 40px;
    padding: 0;
    margin-top: 10px;
  }

  .result {
    background-color: rgb(33, 139, 79);
  }

  .wrong {
    background-color: rgb(162, 94, 94);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  img {
    width: 10%;
    margin-bottom: 10px;
  }
</style>
