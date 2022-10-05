<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="addRole">添加角色</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="roleId" label="ID" width="180" />
            <el-table-column prop="roleName" label="角色名称" width="180" />
            <el-table-column prop="authority" label="操作">
                <template #default="scope">
                    <el-button @click="changeRole(scope.row)" link size="small">
                        修改权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from "../request/api";
import { RoleList } from "../type/role";
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
export default defineComponent({
    setup() {
        let data = reactive(new RoleList());
        onMounted(() => {
            getRole();
        })
        const getRole = () => {
            getRoleList().then((res) => {
                data.list = res.data;
            });
        }
        const changeRole = (row: any) => {
            console.log(row);
        }
        const addRole = () => {
            ElMessageBox.prompt('请输入角色名称', '添加', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            }).then(({ value }) => {
                if (value) {
                    data.list.push({
                        roleId: data.list.length + 1,
                        roleName: value,
                        authority: []
                    });
                }
                ElMessage({
                    type: 'success',
                    message: `添加成功:${value}`,
                });
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消操作',
                });
            })
        };
        return { ...toRefs(data), changeRole, addRole }
    }
})
</script>

<style scoped>

</style>