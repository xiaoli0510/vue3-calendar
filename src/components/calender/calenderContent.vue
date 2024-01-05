<script setup lang='ts'>
import { ref } from 'vue';
const weekArr = ref(['日', '一', '二', '三', '四', '五', '六']);
</script>
<template>
    <div class="week-top">
        <div class="week-item" v-for="(item, index) in weekArr">{{ item }}</div>
    </div>
    <div class="week-content">
       
    </div>
</template>
<style scoped lang='scss'></style>
