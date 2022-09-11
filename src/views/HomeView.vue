<template>
  <section>
    <div class="container main-container">
      <div class="title-section">
        <h3 class="title">Country Quiz</h3>
        <div class="select-container">
          <select-item
            class="select-region"
            v-model="region"
            :options="['All Regions', ...regions, ...subregions]"
          />
        </div>
      </div>
      <question-item :region="region" />
    </div>

    <div class="container"></div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import QuestionItem from "@/components/QuestionItem.vue";
  import * as api from "../api";
  import SelectItem from "../components/SelectItem.vue";

  export default defineComponent({
    name: "HomeView",
    components: {
      SelectItem,
      QuestionItem,
    },

    data() {
      return {
        region: "All Regions",
        country: {},
        regions: [] as Array<string>,
        subregions: [] as Array<string>,
      };
    },

    mounted() {
      Promise.all([api.getRegions(), api.getSubregions()]).then(
        ([regions, subregions]) => {
          this.regions = regions;
          this.subregions = subregions;
        }
      );
      // this.regions = [...api.getRegions(), ...api.getSubregions()];
    },
  });
</script>

<style>
  .select-container {
    flex-grow: 1;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .title-section {
    display: flex;
    column-gap: 50px;
    align-items: center;
  }

  .title-section h3 {
    margin: 0;
  }

  .main-container {
    margin-top: 50px;
  }

  .select-region {
    /* flex-grow: 1; */
    max-width: 200px;
    float: right;
  }

  @media screen and (max-width: 600px) {
    .select-container {
      width: 100%;
    }

    .main-container {
      margin-top: 0;
      padding: 15px;
    }

    .title {
      /* display: none; */
      padding-bottom: 10px;
    }

    .select-region {
      max-width: 100%;
    }

    .title-section {
      flex-wrap: wrap;
    }
  }
</style>
