<template>
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="large"
    >
      <n-form-item label="Input" path="inputValue">
        <n-input v-model:value="model.inputValue" placeholder="Input" />
      </n-form-item>
      <n-form-item label="设备类型" path="selectValue">
        <n-select
          v-model:value="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
        />
      </n-form-item>
      <n-form-item label="Multiple Select" path="multipleSelectValue">
        <n-select
          v-model:value="model.multipleSelectValue"
          placeholder="Select"
          :options="generalOptions"
          multiple
        />
      </n-form-item>
      <n-form-item label="Datetime" path="datetimeValue">
        <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
      </n-form-item>
      <n-form-item label="Input Number" path="inputNumberValue">
        <n-input-number v-model:value="model.inputNumberValue" />
      </n-form-item>
      <n-form-item label="Time Picker" path="timePickerValue">
        <n-time-picker v-model:value="model.timePickerValue" />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="handleValidateButtonClick">
          验证
        </n-button>
      </div>
    </n-form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { FormInst, FormItemRule } from 'naive-ui'
  import { message } from '/@/components/Dialog'
  export default defineComponent({
    setup () {
      const formRef = ref<FormInst | null>(null)
      
      return {
        formRef,
        size: ref('medium'),
        model: ref({
          inputValue: null,
          textareaValue: null,
          selectValue: null,
          multipleSelectValue: null,
          datetimeValue: null,
          nestedValue: {
            path1: null,
            path2: null
          },
          switchValue: false,
          checkboxGroupValue: null,
          radioGroupValue: null,
          radioButtonGroupValue: null,
          inputNumberValue: null,
          timePickerValue: null,
          sliderValue: 0,
          transferValue: null
        }),
        generalOptions: ['TCU', 'NUC'].map(
          (v) => ({
            label: v,
            value: v
          })
        ),
        rules: {
          inputValue: {
            required: true,
            trigger: ['blur', 'input'],
            message: '请输入 inputValue'
          },
          textareaValue: {
            required: true,
            trigger: ['blur', 'input'],
            message: '请输入 textareaValue'
          },
          selectValue: {
            required: true,
            trigger: ['blur', 'change'],
            message: '请选择设备类型'
          },
          multipleSelectValue: {
            type: 'array',
            required: true,
            trigger: ['blur', 'change'],
            message: '请选择 multipleSelectValue'
          },
          datetimeValue: {
            type: 'number',
            required: true,
            trigger: ['blur', 'change'],
            message: '请输入 datetimeValue'
          },
          nestedValue: {
            path1: {
              required: true,
              trigger: ['blur', 'input'],
              message: '请输入 nestedValue.path1'
            },
            path2: {
              required: true,
              trigger: ['blur', 'change'],
              message: '请输入 nestedValue.path2'
            }
          },
          checkboxGroupValue: {
            type: 'array',
            required: true,
            trigger: 'change',
            message: '请选择 checkboxGroupValue'
          },
          radioGroupValue: {
            required: true,
            trigger: 'change',
            message: '请选择 radioGroupValue'
          },
          radioButtonGroupValue: {
            required: true,
            trigger: 'change',
            message: '请选择 radioButtonGroupValue'
          },
          inputNumberValue: {
            type: 'number',
            required: true,
            trigger: ['blur', 'change'],
            message: '请输入 inputNumberValue'
          },
          timePickerValue: {
            type: 'number',
            required: true,
            trigger: ['blur', 'change'],
            message: '请输入 timePickerValue'
          },
          sliderValue: {
            validator (rule: FormItemRule, value: number) {
              return value > 50
            },
            trigger: ['blur', 'change'],
            message: 'sliderValue 需要大于 50'
          },
          transferValue: {
            type: 'array',
            required: true,
            trigger: 'change',
            message: '请输入 transferValue'
          }
        },
        handleValidateButtonClick (e: MouseEvent) {
          e.preventDefault()
          formRef.value?.validate((errors) => {
            if (!errors) {
              message.success('验证成功')
            } else {
              console.log(errors)
              message.error('验证失败')
            }
          })
        }
      }
    }
  })
  </script>