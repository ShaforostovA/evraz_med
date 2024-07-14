<script setup>

</script>

<template>
  <header>
    <div class="container">
      <a class="logo" href="/">
        <img src="./icons/logo.svg" width="32" height="32" alt="Evraz logo">
        <h2 class="logo-text">Медпункты</h2>
      </a>
      <div class="search">
        <input placeholder="Поиск" autocomplete="off" type="text" maxlength="255" name="search" id="search" v-model="searchQuery" @input="search">
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: this.searchQuery,
      medicalCenters: [],
      filteredMedicalCenters: this.filteredMedicalCenters,
    };
  },
  props: {

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
    search() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      this.filteredMedicalCenters = this.medicalCenters.filter(medicalCenter => {
        const lowerCaseTitle = medicalCenter.title.toLowerCase();
        const lowerCaseAddress = medicalCenter.address.toLowerCase();
        return lowerCaseTitle.includes(lowerCaseQuery) || lowerCaseAddress.includes(lowerCaseQuery);
      });
      this.$emit('filteredMedicalCenters', this.filteredMedicalCenters);
      this.$emit('search', this.searchQuery.trim());
    },
  },
};
</script>

<style scoped>
  header {
    background: var(--color-background-2);
    margin: 0 0 3rem 0;
    position: sticky;
    top: 0;
  }
  .logo {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    margin: 0 0 30px 0;
  }
  .logo img {
    font-weight: 600;
  }

  .search {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
  }

  .search label:hover  {
    box-shadow: none;
    border: 1px solid var(--color-border-hover);
  }

  .search input  {
    border: 1px solid rgba(0,0,0,.2);
    box-shadow: inset 0 0 0 1px var(--color-border);
    padding: 15px 25px;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    transition-duration: .3s;
    background: var(--vt-c-white);
  }

  .search input:focus  {
    box-shadow: none;
    padding: 15px 25px;
    border: 1px solid var(--color-border-hover);
  }

  .search input {
    font-size: 20px;
    width: 100%;
  }

  @media (max-width: 720px) {

    .logo {
      margin: 0 0 20px 0;
    }

    .logo h2 {
      font-size: 26px;
    }

    .container {
      padding: 0 1rem;
    }

    .search input {
      padding: 15px 20px;
    }
  }

  @media (max-width: 550px) {
    .container {
      padding: 0 .5rem;
    }
  }
</style>