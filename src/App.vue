<script setup>

</script>

<template>
  <Loader v-if="loading" :loading="loading"></Loader>
  <Header @update="search" @search="searchQuery => this.searchQuery = searchQuery"/>
  <main>
    <div class="container">
      <div class="search-result">
        По запросу "<span>{{searchQuery}}</span>" результатов: <span>{{filteredMedicalCenters.length}}</span>
      </div>
    </div>
    <div class="container !mb-5 !grid-cols-1">
      <drop-down-list :propSelectedControlPoint="selectedControlPoint" :controlPoints="controlPoints" @controlPointSelected="onControlPointSelected"></drop-down-list>
    </div>
    <div class="container">
      <medical-center-card v-if="renderComponent" :propSelectedControlPoint="selectedControlPoint" :controlPoints="controlPoints" v-for="medicalCenter in filteredMedicalCenters" :key="medicalCenter.id" :medical-center="medicalCenter"></medical-center-card>
    </div>
    <div class="container" style="grid-template-columns: 1fr;">
      <div id="map" style="width: 100%; height:500px; border-radius: 10px; margin: 30px 0 30px 0;"></div>
    </div>
  </main>
  <Footer/>
</template>

<script>
import MedicalCenterCard from './components/MedicalCenterCard.vue';

import axios from "axios";
import DG from "2gis-maps"
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import DropDownList from "@/components/DropDownList.vue";
import Loader from "@/components/Loader.vue"

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    MedicalCenterCard,
    DropDownList,
    Loader
  },
  data() {
    return {
      medicalCenters: [],
      controlPoints: [],
      searchQuery: "",
      selectedControlPoint: "",
      filteredMedicalCenters: [],
      queryString: new URLSearchParams(window.location.search),
      renderComponent: true,
      loading: true
    };
  },
  beforeMount() {
    if (this.queryString.get('controlPoint') !== null) {
      this.selectedControlPoint = this.queryString.get('controlPoint');
    }
  },
  mounted() {
    if (this.loading) {
      document.body.style.overflow = 'hidden';
    }
    var map;
    DG.then(function () {
      map = DG.map('map', {
        center: [57.927242, 60.020569],
        zoom: 13
      });
    });

    axios.get('../public/controlPointsData.json')
        .then(response => {
          this.controlPoints = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    axios.get('../public/data.json')
        .then(response => {
          this.medicalCenters = response.data;
          this.filteredMedicalCenters = response.data;

          for(const medicalCenter of this.medicalCenters) {
            if (medicalCenter.latitude && medicalCenter.longitude) {
              DG.marker([medicalCenter.latitude, medicalCenter.longitude]).addTo(map).bindPopup(medicalCenter.title + ' (' + medicalCenter.address + ')');
            }
          }

          this.onControlPointSelected(this.selectedControlPoint);
        })
        .catch(error => {
          console.error(error);
        });
    this.loading = false;
    document.body.style.overflow = 'auto';
  },
  methods: {
    onControlPointSelected(selectedControlPoint) {
      this.selectedControlPoint = selectedControlPoint;
      this.search(this.searchQuery);
    },
    forceRerender() {
      // Сначала скроем компонент
      this.renderComponent = false;

      this.$nextTick(() => {
        // А потом покажем снова
        this.renderComponent = true;
      });
    },
    search(searchQuery) {
      let validMedCenters = this.selectedControlPoint === "" ? [] : this.controlPoints[this.selectedControlPoint].medList;
      const lowerCaseQuery = searchQuery.toLowerCase().trim();
      this.filteredMedicalCenters = this.medicalCenters.filter(medicalCenter => {
        const lowerCaseTitle = medicalCenter.title.toLowerCase();
        const lowerCaseAddress = medicalCenter.address.toLowerCase();
        return (lowerCaseTitle.includes(lowerCaseQuery) || lowerCaseAddress.includes(lowerCaseQuery)) && (validMedCenters.length === 0 || validMedCenters.includes(medicalCenter.id));
      });
      this.forceRerender();
    }
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