<script setup lang='ts'>
import { ref } from 'vue';
const weekArr = ref(['日', '一', '二', '三', '四', '五', '六']);
//当前月的所有天数
let currentMonthArr = [];
//当前周的所有日期
let currentWeekArr = [];
const currentMonthDays = () => {
    const date = new Date();
    //获取当前月份,需要+1
    let currentMonth = date.getMonth();
    currentMonth < 10 ? currentMonth = 0 + currentMonth + 1 : currentMonth += 1;
    //获取当前月份的年
    const currentYear = date.getFullYear();
    //获取当前月份的天数
    let currentMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    console.log(currentMonthDays)
    //当天是几号
    let currentDate = date.getDate();
    //当天是周几
     const day = date.getDay();
    currentMonthArr = [];
    for (let i = 0; i < currentMonthDays; i++) {
        let tempTime = new Date( currentYear,currentMonth-1,currentDate-day+i);
        let tempYear = tempTime.getFullYear();
        let tempMonth = tempTime.getMonth();
        let tempDate = tempTime.getDate();
        let tempStr = tempYear+'-'+tempMonth+'-'+tempDate;
        // currentMonthArr.push(i);
        currentWeekArr.push(tempStr);
    }
}
currentMonthDays()
</script>
<template>
    <div class="week-top d-flex">
        <div class="week-item" v-for="item in weekArr">{{ item }}</div>
    </div>
    <div class="week-content d-flex">
        <div class="day-item" v-for="item in currentWeekArr">
            {{ item.split('-')[2] }}
        </div>

    </div>
</template>
<style scoped lang='scss'>    
.week-top {
    justify-content: space-around;
        width:50%;
    }
    
.week-content {
    justify-content: space-around;
    width: 50%;
    flex-wrap: wrap;
    .day-item {
    width: 14.28%;
}

    }
    
</style>
