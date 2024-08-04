<script setup>

</script>

<template>
  <footer class="flex">
    <div class="footer-content container flex justify-center w-full">
      <div>© 2024{{todayYear > 2024 ? `—${todayYear}` : ""}} ООО «ЕВРАЗ»</div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      todayYear: new Date().getFullYear()
    }
  }
}
</script>
<style scoped>
  footer {
    flex: 0 0 auto;
    background: var(--color-background-2);
    min-height: 70px;
    animation: footer .3s linear forwards;
  }
  .footer-content {
    flex: 1 1 auto;
    align-items: center;
  }

  @keyframes footer {
    0% {
      opacity: 0;
      scale: .7;
      translate: 0 100%;
    }
    100% {
      opacity: 1;
      scale: 1;
      translate: 0 0;
    }
  }
</style>