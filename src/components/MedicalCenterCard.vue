<template>
  <div class="card">
    <div v-if="medicalCenter.image !== ''" class="card-image" :style="{ 'background-image': `url(${medicalCenter.image})` }"></div>
    <div v-else class="card-image" :style="{ 'background-image': `url(/img/no_med_img.png)` }"></div>
    <div class="card-content">
      <h3 class="card-title">{{ medicalCenter.title }}</h3>
      <p class="card-address">{{ medicalCenter.address }}</p>
      <div class="card-actions">
        <a title="Построить маршрут Yandex Maps" v-if="selectedControlPoint != undefined && selectedControlPoint.latitude != undefined && selectedControlPoint.longitude && medicalCenter.latitude != '' && medicalCenter.longitude != '' && medicalCenter.yandex_map != ''" :href="medicalCenter.yandex_map + `?rtext=${this.selectedControlPoint.latitude}%2C${this.selectedControlPoint.longitude}~${medicalCenter.latitude}%2C${medicalCenter.longitude}&rtt=auto&ruri=~&z=16`" target="_blank" class="card-action-button yandex_maps">
          <img src="./icons/Color_icon_color.svg" alt="Yandex Maps">
        </a>
        <a title="Построить маршрут Yandex Maps" v-else-if="medicalCenter.yandex_map != '' && medicalCenter.latitude != '' && medicalCenter.longitude != ''" :href="medicalCenter.yandex_map + `?rtext=~${medicalCenter.latitude}%2C${medicalCenter.longitude}&rtt=auto&ruri=~&z=16`" target="_blank" class="card-action-button yandex_maps">
          <img src="./icons/Color_icon_color.svg" alt="Yandex Maps">
        </a>
        <a title="Невозможно построить маршрут Yandex Maps" v-else class="card-action-button card-action-button-disable yandex_maps">
          <img src="./icons/Color_icon_color.svg" alt="Yandex Maps">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    medicalCenter: Object,
    controlPoints: Array,
    propSelectedControlPoint: String
  },
  mounted() {
    this.selectedControlPoint = this.controlPoints[this.propSelectedControlPoint];
  },
  data() {
    return {
      selectedControlPoint: "",
    }
  },
}
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  transition-duration: .3s;
  animation: card .3s linear forwards;
}

@keyframes card {
  0% {
    opacity: 0;
    scale: .7;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}

.card-image {
  width: 100%;
  min-height: 200px;
  border-radius: 10px 10px 0 0;
  display: block;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 600px) {
  .card-image {
    height: 100%;
    max-height: 250px;
  }
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-address {
  color: #666;
  flex: 1 0 auto;
}

@media (max-width: 720px) {
  .card-title {
    font-size: 20px;
  }
  .card-address {
    font-size: 14px;
  }
}

@media (max-width: 550px) {
  .card-title {
    font-size: 24px;
    line-height: 1.3;
    margin: 0 0 10px 0;
  }
  .card-address {
    font-size: 16px;
  }
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 10px;
  gap: 10px;
}

.card-action-button {
  padding: 10px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  min-height: 82px;
  max-height: 82px;
  display: flex;
  align-items: center;
  transition-duration: .3s;
}

.card-action-button:hover {
  border: 1px solid var(--color-border-hover);
  transform: scale(1.08);
}

.card-action-button img {
  max-height: 60px;
  width: 100%;
  display: block;
}

.card-action-button-disable {
  background-color: #ccc;
}

.card-action-button-disable img {
  filter: grayscale(1);
}

.card-action-button-disable:hover {
  border: 1px solid #ccc !important;
  transform: scale(1.0);
  cursor: not-allowed;
}

</style>