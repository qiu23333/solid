import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/login",
    method: "get",
    response: () => {
      return '6'
    },
  },
] as MockMethod[];
