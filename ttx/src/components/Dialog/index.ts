import { createDiscreteApi } from "naive-ui";

export const { dialog, message, notification, loadingBar } = createDiscreteApi(["dialog", "message", 'notification', "loadingBar"]);