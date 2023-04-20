import { NModal } from 'naive-ui';

export const basicProps = {
  ...NModal.props,
  // 确认按钮文字
  subBtuText: {
    type: String,
    default: '确认',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 892,
  },
  title: {
    type: String,
    default: '',
  },
  maskClosable: {
    type: Boolean,
    default: false,
  },
  preset: {
    type: String,
    default: 'dialog',
  },
};
