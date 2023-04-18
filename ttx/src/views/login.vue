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
    <div>
      验证码
      <n-input
        type="text"
        placeholder="可以清除"
        clearable
        v-model:value="loginInfo.user.captcha"
        class="w-20"
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
let imgSrc = ref<string>('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAIAAACHGsgUAAABSElEQVR4Xu3WsW3DQAyFYS2SMsN4ggyQFbJAhknnSVKkzhRZgS5kGMK9I3XvzAAU9IC/ImkXHwxZi9mfGmzBkfISFpGwiIRFJCwiYREJi0hYRMIiEhaRsIgysX4ub3PhV9XsdFjf15dteBBUHev99WsNV3NVwfIaQfESFlEu1jNSJiwqYREJy93iQYv1+/GJNTdsuViPyYRgYLErZQ0WMqV4ZWFtmSbIAosRKdtiBS7d4XgpWOjSHQZ5HN4cu2MFUs+XhTW+6oYozSSWsgNh4Wp324Q0lJQh1n+QHQIL77E+Vq5acSy89Oo84NO9KmCh0YRX+55lPTW8oSqI1Z3s1sFaOxvWiJeLZXl/kTWxcLjrdWqsYN5t8TiypKwAVvALClbYHcsLPzBRNax4iwePovcsvJ7rcFh4sxY9s1STsIiERSQsImER3QCy7sCEY5Di8wAAAABJRU5ErkJggg==');
const verification = ref<string>();
let { loginInfo } = storeToRefs(user);

async function login() {
  await user.login(verification);
  if (user.userInfo.isLogin == true) {
    router.push({
      name: "customer",
      path: "/cuntomer",
    });
  } else {
  }
}
async function refreshCaptch() {
  const res = await getCaptchImage();
  const { imgId, img } = res.data;
  imgSrc.value = img;
  verification.value = imgId;
}
onMountedOrActivated(async () => {
  await refreshCaptch();
});
</script>

<style scoped></style>
