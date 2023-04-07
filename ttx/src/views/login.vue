<template>
  <n-space>
    <div>
      账号
      <n-input
        type="text"
        placeholder="可以清除"
        clearable
        v-model:value="loginInfo.user.id"
        class="w-20"
      />
    </div>
    <div>
      密码
      <n-input
        type="password"
        placeholder="可以清除"
        clearable
        v-model:value="loginInfo.user.pwd"
      />
    </div>
    <div class="w-16 mt-4" @click="refreshCaptch">
      <img :src="imgSrc" alt="" />
      <img src="../assets/02.jpg" alt="">
    </div>
  </n-space>
  <n-button
    @click="login"
    class="w-20 h-10 antialiased italic text-center bg-green-200"
    >login</n-button
  >
</template>

<script setup lang="ts">
import { NInput, NButton } from "naive-ui";
import { storeToRefs } from "pinia";
import { userStore } from "../store/sys/user";
import { useRouter } from "vue-router";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import { getCaptchImage } from "../api/index";
const user = userStore();
const router = useRouter();
const imgSrc = ref<string>();
const verification = ref<string>();
let { loginInfo } = storeToRefs(user);

async function login() {
  await user.login();
  if (user.userInfo.isLogin) {
    router.push({
      name: "customer",
      path: "/cuntomer",
    });
  } else {
    console.log(user.userInfo.isLogin);
    alert("过不去嗷，傻杯");
  }
}
async function refreshCaptch() {
    // console.log("@@@@@")
  const res = await getCaptchImage();
  const { imgId, img } = res;
  imgSrc.value = img;
  verification.value = imgId;
}
onMountedOrActivated(async () => {
  await refreshCaptch();
});
</script>

<style scoped></style>
