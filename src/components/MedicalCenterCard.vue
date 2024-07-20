<template>
  <div class="card">
    <img :src="medicalCenter.image" alt="Изображение" class="card-image">
    <div class="card-content">
      <h3 class="card-title">{{ medicalCenter.title }}</h3>
      <p class="card-address">{{ medicalCenter.address }}</p>
      <div class="card-actions">
        <a title="Построить маршрут 2gis" v-if="medicalCenter.two_gis != ''" :href="medicalCenter.two_gis" target="_blank" class="card-action-button two_gis">
          <img src="./icons/2GIS_logo.svg" alt="2gis">
        </a>
        <a title="Построить маршрут Yandex Maps" v-if="medicalCenter.yandex_map != ''" :href="medicalCenter.yandex_map" target="_blank" class="card-action-button yandex_maps">
          <img src="./icons/Color_icon_color.svg" alt="Yandex Maps">
        </a>
        <a title="Построить маршрут Google Maps" v-if="medicalCenter.google_map != ''" :href="medicalCenter.google_map" target="_blank" class="card-action-button google_maps">
          <img src="./icons/Google_Maps_Logo_2020.svg" alt="Google Maps">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    medicalCenter: Object,
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
}

.card-image {
  width: 100%;
  min-height: 150px;
  height: 40%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  display: block;
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
  grid-template-columns: 1fr 1fr 1fr;
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
  transform: scale(1.1);
}

.card-action-button img {
  max-height: 60px;
  width: 100%;
  display: block;
}

</style>