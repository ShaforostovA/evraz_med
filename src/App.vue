<script setup>

</script>

<template>
  <Header @filteredMedicalCenters="updateMedicalCenters" @search="searchQuery => this.searchQuery = searchQuery"/>
  <main>
    <div class="container">
      <div class="search-result">
        По запросу "<span>{{this.searchQuery}}</span>" результатов: <span>{{this.medicalCenters.length}}</span>
      </div>
    </div>
    <div class="container">
      <medical-center-card v-for="medicalCenter in medicalCenters" :key="medicalCenter.id" :medical-center="medicalCenter"></medical-center-card>
    </div>
  </main>
  <Footer/>
</template>

<script>
import MedicalCenterCard from './components/MedicalCenterCard.vue';

import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    MedicalCenterCard,
  },
  data() {
    return {
      medicalCenters: [],
      searchQuery: "",
    };
  },
  mounted() {
    axios.get('../public/data.json')
        .then(response => {
          this.medicalCenters = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  },
  methods: {
    updateMedicalCenters(filteredMedicalCenters) {
      console.log(this.searchQuery)
      this.medicalCenters = filteredMedicalCenters; // Update the filteredMedicalCenters property in App.vue
    },
  },
};
</script>

<style scoped>

  .search-result {
    font-size: 20px;
    margin: 0 0 10px 0;
  }

  .search-result span:first-child {
    font-weight: bold;
    font-style: italic;
  }

  .search-result span:last-child {
    font-weight: bold;
  }

  .container {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
  main {
    margin: 0 0 30px 0;
  }

  @media (max-width: 1024px) {
    .container {
      grid-template-columns: 1fr 1fr;
    }
    header {
      margin: 0 0 2rem 0;
    }
  }

  @media (max-width: 720px) {
    header {
      padding: 1rem 0;
    }

    .container {
      padding: 0 1rem;
    }
  }

  @media (max-width: 600px) {
    .container {
      grid-template-columns: 1fr;
      grid-auto-rows: 0fr;
      padding: 0 .5rem;
      display: flex;
      flex-direction: column;
    }
  }
</style>