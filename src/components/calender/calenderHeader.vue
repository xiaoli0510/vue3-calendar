<script setup lang='ts'>
const props = defineProps(['currentYearMonth'])
</script>
<template>
    <div class="month">{{ currentYearMonth.month+1 }}月</div>
    <div class="year">{{ currentYearMonth.year }}年</div>
</template>
<style scoped lang='scss'>
month {
    font-size: 40px;
}

.year {
    font-size: 20px;
    color: #ccc;
}
</style>
