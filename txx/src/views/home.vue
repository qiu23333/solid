<template>
    <div>
        <n-space vertical>
            <n-layout has-sider>
                <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
                    show-trigger @collapse="collapsed = true" @expand="collapsed = false">
                    <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
                        :options="menuOptions" />
                </n-layout-sider>
                <n-layout>                    
                    <router-view></router-view>
                </n-layout>
            </n-layout>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { sysStore } from '../store/sys/sys'
import { storeToRefs } from 'pinia';
const sys = sysStore()

let { menuOptions, activeKey, collapsed } = storeToRefs(sys)

</script>

<style scoped></style>