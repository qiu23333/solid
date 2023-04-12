<template>
    <n-form :inline="props.inline" :lable-width="props.lableWidth" :class="props.class">
        <n-form-item v-for="i in props.items" :lable="i.name" :path="i.path" :key="i.name">
            <n-input :placeholder='i.name'>
                
            </n-input>
        </n-form-item>
    </n-form>
</template>

<script setup lang="ts">

interface fromProp {
    class: string
    lableWidth: number
    inline?: boolean
    items: {}[]
}

const props = defineProps<fromProp>()
// let fromClass = props.class
// function getClass(p:string[]){
//     return p.join(" ")
// }
</script>

<style scoped></style>