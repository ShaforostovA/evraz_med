<script setup>

import {Document} from "postcss";
</script>

<template>
  <Loader v-if="loading" :loading="loading"></Loader>
  <div id="back-to-top" class="back-to-top btn-up-hide" title="Вернуться наверх"></div>
  <Header @update="search" @search="searchQuery => this.searchQuery = searchQuery"/>
  <main>
    <div class="container">
      <div class="search-result animation-default">
        По запросу "<span>{{searchQuery}}</span>" результатов: <span>{{filteredMedicalCenters.length}}</span>
      </div>
    </div>
    <div class="container !mb-5 !grid-cols-2 !flex !justify-between !flex-nowrap !flex-row animation-default" :class="{'!gap-0': selectedControlPoint === '', '!gap-2': selectedControlPoint !== ''}">
      <drop-down-list class="w-11/12 duration-300" :class="{'!w-full': selectedControlPoint === ''}" :propSelectedControlPoint="selectedControlPoint.toString()" :controlPoints="controlPoints" @controlPointSelected="onControlPointSelected"></drop-down-list>
      <a title="QR-code АКПП для печати" class="qr-code w-1/12 duration-300" :class="{'!w-0 !p-0': selectedControlPoint === ''}" target="_blank" :href="`http://qrcoder.ru/code/?http%3A%2F%2F${'clinic.ural.evraz.com%2F%3FcontrolPoint%3D' + selectedControlPoint}&10&0`"></a>
    </div>
    <div class="container card-container" style="flex: 1 1 auto; align-items: flex-start;">
      <medical-center-card v-if="renderComponent" :propSelectedControlPoint="selectedControlPoint.toString()" :controlPoints="controlPoints" v-for="medicalCenter in filteredMedicalCenters" :key="medicalCenter.id" :medical-center="medicalCenter"></medical-center-card>
    </div>
    <div class="container" style="grid-template-columns: 1fr;">
      <div id="map" style="width: 100%; height:400px; border-radius: 10px; margin: 30px 0 30px 0;"></div>
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
      loading: true,
      markers: [],
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
        center: [57.938242, 60.020569],
        zoom: 12
      });
    });

    axios.get('../controlPointsData.json')
        .then(response => {
          this.controlPoints = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    axios.get('../data.json')
        .then(response => {
          this.medicalCenters = response.data;
          this.filteredMedicalCenters = response.data;

          for(const medicalCenter of this.medicalCenters) {
            if (medicalCenter.latitude && medicalCenter.longitude) {
              DG.marker([medicalCenter.latitude, medicalCenter.longitude]).addTo(map).bindPopup(medicalCenter.title/* + ' (' + medicalCenter.address + ')'*/);
            }
          }

          this.onControlPointSelected(this.selectedControlPoint);
        })
        .catch(error => {
          console.error(error);
        });
    this.loading = false;
    document.body.style.overflow = 'auto';
    const btnUp = {
      el: document.querySelector('.back-to-top'),
      show() {
        this.el.classList.remove('btn-up-hide');
      },
      hide() {
        this.el.classList.add('btn-up-hide');
      },
      addEventListener() {
        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          scrollY > 400 ? this.show() : this.hide();
        });
        document.querySelector('.back-to-top').onclick = () => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    }

    btnUp.addEventListener();
  },
  methods: {
    onControlPointSelected(selectedControlPoint) {
      this.selectedControlPoint = selectedControlPoint;
      this.search(this.searchQuery);
    },
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    search(searchQuery) {
      let validMedCenters = this.selectedControlPoint === "" ? [] : this.controlPoints[this.selectedControlPoint].medList;
      const lowerCaseQuery = searchQuery.toLowerCase().trim();

      this.markers = map.querySelector('.leaflet-marker-pane').children;

      this.filteredMedicalCenters = this.medicalCenters.filter(medicalCenter => {
        const lowerCaseTitle = medicalCenter.title.toLowerCase();
        const lowerCaseAddress = medicalCenter.address.toLowerCase();
        this.markers[medicalCenter.id - 1].style.display = (lowerCaseTitle.includes(lowerCaseQuery) || lowerCaseAddress.includes(lowerCaseQuery)) && (validMedCenters.length === 0 || validMedCenters.includes(medicalCenter.id)) ? "block" : "none";
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
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1440px) {
    .back-to-top {
      bottom: 50px !important;
    }
  }

  @media (max-width: 1024px) {
    .container {
      grid-template-columns: 1fr 1fr;
    }
    header {
      margin: 0 0 2rem 0;
    }
    .back-to-top {
      padding: 35px 35px 35px 35px !important;
    }
  }

  @media (max-width: 720px) or (max-height: 670px) {

    .container {
      padding: 0 1rem;
    }

    .search-result {
      font-size: 18px !important;
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

    .card-container {
      align-items: normal !important;
    }
  }

  .qr-code {
    display: block;
    background-image: url("./components/icons/qr-code-icon.svg");
    padding: 10px;
    background-position: center center;
    background-repeat: no-repeat;
  }

  #map {
    animation: map .3s linear;
  }

  @keyframes map {
    0% {
      opacity: 0;
      scale: .7;
      translate: 0 100%;
    }
    50% {
      opacity: 0;
      scale: .7;
      translate: 0 100%;
    }
    100% {
      scale: 1;
      opacity: 1;
      translate: 0 0;
    }
  }

  .back-to-top {
    position: fixed;
    bottom: 80px;
    right: 20px;
    display: block;
    background: white url("./components/icons/arrow-up.svg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    padding: 45px 45px 45px 45px;
    border-radius: 100%;
    cursor: pointer;
    z-index: 1000;
    transition-duration: .3s;
    animation: arrow-up .3s linear;
  }

  .btn-up-hide {
    display: none;
  }
  
  @keyframes arrow-up {
    0% {
      opacity: 0;
      translate: 0 150%;
    }
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }

  .animation-default {
    animation: animation-default .3s linear forwards;
  }

  @keyframes animation-default {
    0% {
      opacity: 0;
      scale: .7;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }

</style>