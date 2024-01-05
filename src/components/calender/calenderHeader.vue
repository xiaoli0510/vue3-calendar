<script setup lang='ts'>
    import {ref} from 'vue';
    let curMonth = ref(1);
    let curYear = ref(2024);
</script>
<template>
    <div>{{curMonth}}月</div>
    <div class="year">{{curYear}}年</div>
</template>
<style scoped lang='scss'>
</style>
