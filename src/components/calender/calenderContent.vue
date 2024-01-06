<script setup lang='ts'>
import { ref,onMounted } from 'vue';
import {getLunar } from 'chinese-lunar-calendar';
console.log(getLunar(2024,1,1))
const weekArr = ref(['日', '一', '二', '三', '四', '五', '六']);
//当前月的所有天数
let currentMonthArr = [];
//当前周的所有日期
interface lunarObj {
    dateStr: string,
    isLeap: boolean,
    lunarDate: number,
    lunarMonth: number,
    lunarYear: string,
    solarTerm: null,
    zodiac: string,
}
interface weekObj {
    solarDateStr:string,
    lunar:lunarObj
}
let currentWeekArr:weekObj[] = [];
let todayDate:string;
//生成一个月的数据
const createMonthData = () => {
    const date = new Date();
    //获取当前月份
    let currentMonth = date.getMonth();
    //currentMonth < 10 ? currentMonth = 0 + currentMonth + 1 : currentMonth += 1;
    //获取当前月份的年
    const currentYear = date.getFullYear();
    //获取当前月份的天数
    let currentMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    console.log(currentMonthDays)
    //当天是几号
    let currentDate = date.getDate();
    //当天是周几
    const currentDay = date.getDay();
    //当月最后一天是周几
    const lastDay = new Date(currentYear,currentMonth,currentMonthDays).getDay();
    todayDate =currentYear+'-'+currentMonth+'-'+currentDate;
    currentMonthArr = [];
    for (let i = 0; i < currentMonthDays+7-lastDay; i++) {
        let tempTime = new Date( currentYear,currentMonth,currentDate-currentDay+i);
        let tempYear = tempTime.getFullYear();
        let tempMonth = tempTime.getMonth();
        let tempDate = tempTime.getDate();
        let tempStr = tempYear+'-'+tempMonth+'-'+tempDate;
        let tempObj = {
            solarDateStr:tempStr,
            lunar:getLunar(tempYear,tempMonth+1,tempDate)
        }
        currentWeekArr.push(tempObj);
    }
}

createMonthData();
onMounted(()=>{
})
</script>
<template>
    <div class="week-top d-flex">
        <div class="week-item" v-for="item in weekArr">{{ item }}</div>
    </div>
    <div class="week-content d-flex">
        <div class="day-item" v-for="item in currentWeekArr">
            <div class="solar-item" :class="{current:todayDate===item.solarDateStr,opacity:todayDate.split('-')[0]!=item.solarDateStr.split('-')[0]||todayDate.split('-')[1]!=item.solarDateStr.split('-')[1]}">{{ item.solarDateStr.split('-')[2] }}</div>
            <div class="lunar-item">{{ item.lunar.dateStr.slice(2) }}</div>
        </div>

    </div>
</template>
<style scoped lang='scss'>    
.week-top {
    justify-content: space-around;
    width: 50%;
    width: 210px;
    .week-item {
    width: 30px;
}
}
    
.week-content {
    justify-content: space-around;
    width: 210px;
    flex-wrap: wrap;
    .day-item {
    text-align: center;
    line-height: 30px;
  
    .solar-item{
        width: 30px;
    height: 30px;
    font-size:.24rem;
    &.current{
        background:rgb(34, 19, 238);
        border-radius: 50%;
    }
    &.opacity{
        color:#696363;
    }
    }
    .lunar-item{
        font-size:.2rem; 
    }
}

    }
    
</style>
