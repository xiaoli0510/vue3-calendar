<script setup lang='ts'>
import { ref, toRefs, defineEmits, onMounted, watch } from 'vue';
import { getLunar } from 'chinese-lunar-calendar';
const props = defineProps({'currentYearMonth':{
    type:Object,
    default:()=>({year:0,month:0})
}})
//获取当前月份
let currentMonth = props.currentYearMonth.month;
console.log(props)
const weekArr = ref(['日', '一', '二', '三', '四', '五', '六']);
//当前周的所有日期
interface lunarObj {
    dateStr: string,
    isLeap: boolean,
    lunarDate: number,
    lunarMonth: number,
    lunarYear: string,
    solarTerm: null
}
interface weekObj {
    solarDateStr: string,
    lunar: lunarObj
}
let currentWeekArr: weekObj[] = [];
let todayDate: string;

//生成一个月的数据
const createMonthData = () => {
    currentWeekArr=[];
    const date = new Date();
    
    //currentMonth < 10 ? currentMonth = 0 + currentMonth + 1 : currentMonth += 1;
    //获取当前月份的年
    const currentYear = props.currentYearMonth.year;
    //获取当前月份的天数
    let currentMonthDays = new Date(currentYear, currentMonth+1, 0).getDate();
    //当天是几号     
    let currentDate = date.getDate();
    //当月第一天是周几
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    //当月最后一天是周几
    const lastDay = new Date(currentYear, currentMonth, currentMonthDays).getDay();
    todayDate = currentYear + '-' + currentMonth + '-' + currentDate;
    const startDate = -firstDay+1;
    for (let i = startDate; i < currentMonthDays + 7 - lastDay; i++) {
        let tempTime = new Date(currentYear, currentMonth, i);
        let tempYear = tempTime.getFullYear();
        let tempMonth = tempTime.getMonth();
        let tempDate = tempTime.getDate();
        let tempStr = tempYear + '-' + tempMonth + '-' + tempDate;
        let tempObj = {
            solarDateStr: tempStr,
            lunar: getLunar(tempYear, tempMonth + 1, tempDate)
        }
        currentWeekArr.push(tempObj);
    }
}
createMonthData();

const { currentYearMonth } = toRefs(props);
watch(() => currentYearMonth.value,
    (newVal, oldVal) => {
        currentMonth = newVal.month;
        newVal ? createMonthData() : ''
    },
    { deep: true }
)

let startX = ref(0);
let moveX = ref(0);
const emits = defineEmits(['touchEnd']);
//手指开始滑动
const handleTouchStart = (e: any) => {
    startX.value = e.changedTouches[0].clientX;
}

//手指滑动的位置
const handleTouchEnd = (e: any) => {
    moveX.value = e.changedTouches[0].clientX;
    startX.value - moveX.value < 0 ? emits('touchEnd', 'left') : emits('touchEnd', 'right');
}


onMounted(() => {
})
</script>
<template>
    <div class="week-top d-flex">
        <div class="week-item" v-for="item in weekArr">{{ item }}</div>
    </div>
    <div class="week-content d-flex" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <div class="day-item" v-for="item in currentWeekArr">
            <div class="solar-item"
                :class="{ current: todayDate === item.solarDateStr, opacity: todayDate.split('-')[0] !== item.solarDateStr.split('-')[0] || todayDate.split('-')[1] != item.solarDateStr.split('-')[1] }">
                {{ item.solarDateStr.split('-')[2] }}</div>
            <div class="lunar-item"
                :class="{ opacity: todayDate.split('-')[0] !== item.solarDateStr.split('-')[0] || todayDate.split('-')[1] != item.solarDateStr.split('-')[1] }">
                {{ item.lunar.dateStr.slice(2) }}</div>
        </div>

    </div>
</template>
<style scoped lang='scss'>    .week-top {
        justify-content: space-around;
        font-size: 20px;
        text-align: center;
        margin-top: 4%;

        .week-item {
            width: 14.28%;
        }
    }

    .week-content {
        justify-content: space-around;
        flex-wrap: wrap;

        .day-item {
            text-align: center;
            margin-bottom: 4px;
            width: 14.28%;

            .solar-item {
                width: 40px;
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                margin: 0 auto;

                &.current {
                    background: rgb(34, 19, 238);
                    border-radius: 50%;
                }

                &.opacity {
                    color: $notCurrentMonthColor;
                }
            }

            .lunar-item {
                font-size: 18px;
                color: $lunarColor;

                &.opacity {
                    color: $notCurrentMonthColor;
                }
            }
        }

    }</style>
