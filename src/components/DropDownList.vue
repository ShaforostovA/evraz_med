<script setup>

</script>

<template>
  <div id="v-model-select" class="drop-down-list">
    <select @change="onControlPointChange" v-model="selectedControlPoint" class="bg-gray-50 duration-300 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-[var(--color-border-hover)] focus:border-[var(--color-border-hover)] block w-full p-2.5">
      <option class="font-bold" value="">АКПП не выбран</option>
      <option v-for="controlPoint in controlPoints" :value="controlPoint.id">АКПП: {{ controlPoint.title }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    controlPoints: Array,
    propSelectedControlPoint: String
  },
  data() {
    return {
      selectedControlPoint: this.propSelectedControlPoint == null ? "" : this.propSelectedControlPoint,
    };
  },
  methods: {
    onControlPointChange() {
      this.$emit("controlPointSelected", this.selectedControlPoint);
    }
  }
}
</script>

<style scoped>
  @media (max-width: 720px) or (max-height: 670px) {
    .drop-down-list select {
      font-size: 1.175rem !important;
    }
  }
</style>