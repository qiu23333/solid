<template>
    <n-button v-bind="getBindValue" :class="getButtonClass" @click="onClick">我直接热烈的🐎
        <template>
            <!-- <Icon :icon="preIcon" v-if="preIcon" :size="iconSize" /> -->
            <!-- <slot v-bind="data || {}"></slot> -->
            <!-- <Icon :icon="postIcon" v-if="postIcon" :size="iconSize" /> -->
        </template>

    </n-button>
</template>

<script lang="ts">
    
  import { computed, defineComponent,unref } from 'vue';
  export default defineComponent({
    name: 'AButton',
    // 防止
    inheritAttrs: false,
  });

</script>

<script lang="ts" setup>
    import { NButton } from 'naive-ui';
    import { btnProps } from './props';
    import { buttonProps } from 'naive-ui';
    import { defineProps } from 'vue'
    // let props = {...defineProps(btnProps), ...defineProps(buttonProps)} 不需要传这么多参数，就不用全声明辣，在项目初期就要想好要传什么参数嗷
    import { useAttrs } from '../../../hooks/core/useAttrs';
    const props = {...defineProps(btnProps),...defineProps(buttonProps)}
    
    const getButtonClass = computed(()=>{
        const { color, disabled } = props
        return [
        {
            [`color`]:color,
            [`is-disabled`]:disabled
        }    
    ]
    })    
    const attrs = useAttrs({ excludeDefaultKeys: false });
    const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
</script>

<style scoped>

</style>