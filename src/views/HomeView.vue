<script setup lang="ts">
import { ref } from 'vue';
let month = ref(0);
let year = ref(0);
const getCurrentYearMonth = () => {
  const tempTime = new Date();
  month.value = tempTime.getMonth();
  year.value = tempTime.getFullYear();
}
getCurrentYearMonth();

const handelChangeMonth = (direction: string) => {
  if (direction === 'left') {
    month.value===0?month.value=11:month.value--;
  } else {
    month.value===11?month.value=0:month.value++;
  }
}


import calenderHeader from '@/components/calender/calenderHeader.vue';
import calenderContent from '@/components/calender/calenderContent.vue';
</script>

<template>
  <main class="main">
    <calenderHeader :currentYearMonth="{ year, month }" />
    <calenderContent :currentYearMonth="{ year, month }" @touchEnd="handelChangeMonth" />
  </main>
</template>
<style scoped lang="scss">
.main {
  width: 90%;
  margin: 0 auto;
}
</style>
