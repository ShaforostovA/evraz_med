<script setup>

</script>

<template>
  <header>
    <div class="container">
      <a class="logo" href="/">
        <img src="./icons/logo.svg" width="32" height="32" alt="Evraz logo">
        <h2 class="logo-text">Медпункты</h2>
      </a>
      <div class="search flex align-middle gap-1">
        <input placeholder="Поиск" autocomplete="off" type="text" maxlength="255" name="search" id="search" v-model="searchQuery" @input="updateSearch">
        <div class="clear-search px-2.5 flex align-middle rounded-lg cursor-pointer duration-300 hover:bg-orange-300" @click="clearSearch">
          <img class="block" src="../../public/close.svg" alt="">
        </div>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  data() {
    return {
      searchQuery: this.searchQuery,
      filteredMedicalCenters: this.filteredMedicalCenters,
    };
  },
  props: {

  },
  methods: {
    updateSearch() {
      this.$emit('search', this.searchQuery.trim());
      this.$emit('update', this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = "";
      this.updateSearch();
    }
  },
};
</script>

<style scoped>
  header {
    background: var(--color-background-2);
    margin: 0 0 2rem 0;
    position: sticky;
    top: 0;
  }
  .logo {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    margin: 0 0 20px 0;
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
    box-shadow: none !important;
    border: 1px solid var(--color-border-hover) !important;
  }

  .search input  {
    border: 1px solid rgba(0,0,0,.2)!important;
    box-shadow: inset 0 0 0 1px var(--color-border)!important;
    padding: 10px 20px!important;
    border-radius: 10px!important;
    align-items: center!important;
    justify-content: space-between!important;
    transition-duration: .3s!important;
    background: var(--vt-c-white)!important;
  }

  .search input:focus  {
    box-shadow: none!important;
    padding: 10px 20px!important;
    border: 1px solid var(--color-border-hover)!important;
  }

  .search input {
    font-size: 20px!important;
    width: 100%!important;
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