<template>
  <n-message-provider>
    <!-- <Buttons @change-placement="changePlacement" /> -->
  </n-message-provider>
</template>

<script  lang="ts">
const message = useMessage();

function error(text:string) {
  message.error(text);
}
function warning(text:string) {
  message.warning(text);
}
function success(text:string) {
  message.success(text);
}
function loading(text:string) {
  message.loading(text);
}
export const uMessage = function(type:string, text:string){
    if(type === 'success'){
        success(text)
    }else if(type==='error'){
        error(text)
    }else if(type==='warning'){
        warning(text)
    }else{
        loading(text)
    }
}
</script>

<style scoped></style>
