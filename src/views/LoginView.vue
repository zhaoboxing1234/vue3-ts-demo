<template>
    <div class="login-box">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px"
            class="demo-ruleForm">
            <h2>后台管理系统</h2>
            <el-form-item label="账号:" prop="username">
                <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">Login</el-button>
                <el-button class="loginBtn" @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import { FormInstance } from "element-plus";
import {login} from "../request/api";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        //实例化
        const data = reactive(new LoginData());
        const ruleFormRef = ref<FormInstance>();
        const router = useRouter();
        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入账号",
                    trigger: "blur",
                },
                {
                    min: 3,
                    max: 10,
                    message: "账号长度在3到10之间",
                    trigger: "blur",
                },
            ],
            password: [
                {
                    required: true,
                    message: "请输入密码",
                    trigger: "blur",
                },
                {
                    min: 3,
                    max: 10,
                    message: "账号长度在3到10之间",
                    trigger: "blur",
                },
            ]
        };
        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    login(data.ruleForm).then((res)=>{
                      localStorage.setItem("token",res.data.token);
                      router.push("/");                  
                    });
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }
        const resetForm = function (formEl:FormInstance | undefined) {
          if(formEl){
            formEl.resetFields();
          }
        };
        return { ...toRefs(data), submitForm, resetForm,ruleFormRef, rules };
    },
});
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg");
    padding: 1px;
    text-align: center;

    .demo-ruleForm {
        width: 500px;
        margin: 200px auto;
        background-color: #fff;
        padding: 40px;
        border-radius: 20px;

        .loginBtn {
            width: 48%;
        }

        h2 {
            margin-bottom: 10px;
        }
    }
}
</style>