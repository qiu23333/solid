import { PropType } from "vue";

export const btnProps = {
    // // 按钮颜色
    // color:{type:String,default:undefined},
    // // 按钮样式
    // type:{type:String, validator: (v: string) => ['error', 'warning', 'success', 'tertiary', 'primary', 'info', ''].includes(v)},
    // // 是否显示border
    // birdered:{type:Boolean,default:true},
    // // 按钮是否为圆形
    // circle:{type:Boolean,default:false},
    // // 按钮是否可以被聚焦,默认true
    // focusable:{type:Boolean,default:false},
    // // 按钮是否透明
    // ghost:{type:Boolean,default:false},
    // // 是否加载中
    // loading:{type:Boolean, default:false},
    // // 禁用
    // disabled:{type:Boolean, default:false},
    // 文本前icon
    preIcon:{type:String, default:null},
    // 文本后icon
    postIcon:{type:String, default:null},
    /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
    iconSize: { type: Number, default: 14 },
    // 点击事件
    onClick: { type: Function as PropType<(...args: any) => any>, default: null },
}