import { defineStore } from "pinia";
import { Component, h, ref } from "vue";
import { NIcon } from "naive-ui";
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    WineOutline as WineIcon
} from '../../../node_modules/vicons/ionicons-v5'
import { RouterLink } from "vue-router";


function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
export const sysStore = defineStore({
    id: "sys",
    state: () => {
        return {
            menuOptions: [
                {
                    label: () =>
                        h(
                            RouterLink,
                            {
                                to: {
                                    name: 'customer',
                                    path:'customer',
                                }
                            },
                            { default: () => '且听风吟' }
                        ),
                    key: 'hear-the-wind-sing',
                    icon: renderIcon(BookIcon)
                },
                {
                    label: '荒地升星',
                    key: 'pinball-1973',
                    icon: renderIcon(BookIcon),
                    children: [
                        {
                            label: () =>
                        h(
                            RouterLink,
                            {
                                to: {
                                    name: 'equipment',
                                    path:'/equipment',
                                }
                            },
                            { default: () => '璨如烈阳' }
                        ),
                            key: 'rat'
                        }
                    ]
                },
                
            ],
            activeKey: ref<string | null>(null),
            collapsed: ref(true)
        }
    }
})