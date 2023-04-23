<template>
    <div class="h-screen">
        <n-space vertical class="h-screen">
            <n-layout has-sider class="h-screen">
                <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
                    show-trigger @collapse="collapsed = true" @expand="collapsed = false" class="h-full">
                    <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
                        :options="menuOptions" class="h-full"/>
                </n-layout-sider>
                
                <n-layout class="h-full">    
                    <div class="h-24">??</div>                
                    <router-view class="h-evo"></router-view>
                </n-layout>
            </n-layout>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { sysStore } from '../store/sys/sys'
import { storeToRefs } from 'pinia';
const sys = sysStore()
// console.log(attrs)
let { menuOptions, activeKey, collapsed } = storeToRefs(sys)

</script>

<style scoped></style>