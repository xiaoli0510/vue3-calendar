<script setup lang="ts">
import calenderHeader from '@/components/calender/calenderHeader.vue';
import calenderContent from '@/components/calender/calenderContent.vue';
</script>

<template>
  <main class="main">
    <calenderHeader/>
    <calenderContent/>
  </main>
</template>
<style scoped lang="scss">
.main {
    width: 210px;
    margin: 0 auto;
}
</style>
