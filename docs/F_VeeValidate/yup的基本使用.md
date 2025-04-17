## `yup`的基本使用

`yup`包提供了更加丰富的验证规则，可以进行链式的操作，更加的灵活：

```vue
<template>
    <form @submit="onSubmit">
        <section>
            <input type="text" v-model="usernameValue" />
            <p class="error" v-if="errors.username">{{ errors.username }}</p>
        </section>
        <section>
            <input type="text" v-model="passwordValue" />
            <p class="error" v-if="errors.password">{{ errors.password }}</p>
        </section>
        <button>表单提交</button>
    </form>
</template>

<script setup lang="ts">
import { configure, defineRule, useField, useForm } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';
import * as yup from 'yup';

// 声明系统提供的验证规则
defineRule('email', email);
defineRule('required', required);

// 中文语言配置
configure({
    generateMessage: localize('zh_CN', zh_CN)
})

// 定义验证函数中间件拦截，处理验证操作，防止表单为空点击提交可以进行内容的提交操作
const { handleSubmit, errors } = useForm({
    // 在这里进行统一的初始值和验证数据结构的定义
    // 定义字段的初始值
    initialValues: {
        username: 'jlc',
        password: ''
    },
    // 定义验证数据结构
    validationSchema: {
        // 使用yup对用户名进行验证，验证内容为字符串，且必须输入，且格式为邮箱，同时可以自定义错误信息
        username: yup.string().required('用户名不能为空').email('邮箱格式错误'),   
        password: { required: true }
    }
});
// 定义验证，得到数据
const { value: usernameValue } = useField('username', {}, { label: '用户名' });
const { value: passwordValue } = useField('password', {}, { label: '密码' });

// 表单提交
const onSubmit = handleSubmit((values: any) => {
    // values是表单项数据
    console.log(values);
    alert('验证通过')
})
</script>

<style lang="scss" scoped>
div {
    @apply flex w-screen h-screen justify-center items-center;

    input {
        @apply border-2 p-2 rounded-md border-violet-950 outline-none;
    };

    .error {
        @apply bg-red-600 border border-gray-800 text-white;
    }
}
</style>
```

