<template>
    <div>
        这里是equipment
    </div>
    <div>
        <n-button @click="apitest" class="w-20 h-10 antialiased italic text-center bg-green-200 ">apitest</n-button>
    </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import request from '../../api'

    function apitest(){
        request.post('/login').then(res=>{
            console.log(res.data)
        })
    }
    // onMounted(() => {
    //     // apitest()
    // }),
</script>

<style scoped>

</style>