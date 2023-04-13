import { ButtonProps } from "naive-ui";
import { VNodeChild } from "vue";

export interface DialogScheam {
    //标题，可以是字符串也可以是render函数 
    title: string | (() => VNodeChild)
    // 操作区的内容，需要时render函数
    action?: () => VNodeChild
    // 内容，可以是字符串也可以是render函数
    content: string | (() => VNodeChild)
    // 确认按钮对应的文字，不填写不会出现按钮
    positiveText?: string
    // 确认按钮的属性
    positiveButtonProps?: ButtonProps
    // 确认按钮点击的回调函数
    onPositiveClick?: Function
    // 取消按钮对应的文字，不填写不会出现按钮
    negativeText: string
    // 取消按钮的属性
    negativeButtonProps?: ButtonProps
    // 取消按钮点击的回调函数
    onNegativeClick?: Function
}
export interface DialogProps {
    // 类型对话框的类型  默认值：warning
    type?: 'error' | 'success' | 'warning'
    // 类名
    class?: any
    // 对话框动画出现的位置  默认值：mouse
    transformOrigin?: 'mouse' | 'center'
    // 是否显示border
    bordered?: boolean
    // 是否显示close图标
    closable?: boolean
    // 是否显示图标（dialog的类型图标）
    showIcon?: boolean
    // 图标放置的位置  默认值：left
    iconPlacement?: 'left' | 'top'
}
