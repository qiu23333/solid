import type { ComputedRef, Ref } from 'vue';
import type { FormProps, FormSchema, FormActionType } from '../types/form';
import { unref, toRaw } from 'vue';
// @ts-ignore
import { isFunction } from '/@/utils/is';

declare type EmitType = (event: string, ...args: any[]) => void;

interface UseFormActionContext {
  emit: EmitType;
  getProps: ComputedRef<FormProps>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  formElRef: Ref<FormActionType>;
  defaultFormModel: Recordable;
  loadingSub: Ref<boolean>;
  handleFormValues: Function;
}

export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  formElRef,
  defaultFormModel,
  loadingSub,
  handleFormValues,
}: UseFormActionContext) {
  // 验证
  async function validate() {
    return unref(formElRef)?.validate();
  }

  // 提交
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault();
    loadingSub.value = true;
    // 解构出submit函数
    const { submitFunc } = unref(getProps);
    // 判断不为空并且是一个函数
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    
    const formEl = unref(formElRef);
    if (!formEl) return;
    try {
      await validate();
      loadingSub.value = false;
      emit('submit', formModel);
      return;
    } catch (error) {
      loadingSub.value = false;
      return;
    }
  }

  //清空校验
  async function clearValidate() {
    // @ts-ignore
    await unref(formElRef)?.restoreValidation();
  }

  //重置
  async function resetFields(): Promise<void> {
    // 解构出重置函数和submit状态
    const { resetFunc, submitOnReset } = unref(getProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());

    const formEl = unref(formElRef);
    if (!formEl) return;
    // 遍历重置
    Object.keys(formModel).forEach((key) => {
      formModel[key] = unref(defaultFormModel)[key] || null;
    });
    // 清除校验
    await clearValidate();
    const fromValues = handleFormValues(toRaw(unref(formModel)));
    emit('reset', fromValues);
    submitOnReset && (await handleSubmit());
  }

  //获取表单值
  function getFieldsValue(): Recordable {

    const formEl = unref(formElRef);
    if (!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  }

  //设置表单字段值
  async function setFieldsValue(values: Recordable): Promise<void> {
    
    const fields = unref(getSchema)
      .map((item) => item.field)
      .filter(Boolean);

    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (fields.includes(key)) {
        formModel[key] = value;
      }
    });
  }

  return {
    handleSubmit,
    validate,
    resetFields,
    getFieldsValue,
    clearValidate,
    setFieldsValue,
  };
}
