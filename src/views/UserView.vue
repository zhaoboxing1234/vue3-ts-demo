<template>
    <div class="select-box">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="详情">
                <el-select v-model="selectData.role" class="m-2" placeholder="Place Select" size="large">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="nickName" label="姓名" width="180" />
        <el-table-column prop="userName" label="角色">
            <template #default="scope">
                <el-button v-for="item in scope.row.role" :key="item.role" link size="small">
                    {{item.roleName}}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="userName" label="操作">
            <template #default="scope">
                <el-button type="primary" @click="changeUser(scope.row)" link size="small">
                    编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="isShow" title="编辑信息">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="50px">
                <el-input v-model="active.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色" label-width="50px">
                <el-select multiple v-model="active.role" placeholder="Please select Role">
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShow = false">Cancel</el-button>
                <el-button type="primary" @click="updataInfo">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getRoleList, getUserList } from '@/request/api';
import { UserList, IUserList } from "../type/user";
export default defineComponent({
    setup() {
        const data = reactive(new UserList());
        onMounted(() => {
            getUser();
            getRole();
        });
        const getUser = () => {
            getUserList().then((res) => {
                data.list = res.data;
            })
        };
        const getRole = () => {
            getRoleList().then((res) => {
                data.roleList = res.data;
            })
        }
        const onSubmit = () => {
            let arr: IUserList[] = [];
            if (data.selectData.nickName) {
                arr = data.list.filter((value) => {
                    return value.nickName.indexOf(data.selectData.nickName) !== -1;
                });
            }
            if (data.selectData.role) {
                arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
                    return value.role.find((item) => {
                        return data.selectData.role === item.role;
                    });
                });
            }
            if (!data.selectData.nickName && !data.selectData.role) {
                arr = data.list;
            }
            data.list = arr;
        }
        watch([() => { return data.selectData.nickName }, () => { return data.selectData.role }], () => {
            if (data.selectData.nickName === "" || data.selectData.role === 0) {
                getUser();
            }
        })
        const changeUser = (row: IUserList) => {
            data.active = {
                id: row.id,
                nickName: row.nickName,
                role: row.role.map((value:any) => value.role || value.roleId),
                userName: row.userName
            };
            data.isShow = true;
        }
        const updataInfo = ()=>{
            let obj:any = data.list.find((value)=>{
                return value.id = data.active.id;
            })
            obj.nickName = data.active.nickName;
            obj.role = data.roleList.filter(value => data.active.role.indexOf(value.roleId) !==-1);
            data.list.forEach((item,i)=>{
                if(item.id === obj.id){
                    data.list[i] = obj;
                 }
            });
            data.isShow = false;
        }
        return { ...toRefs(data), onSubmit, changeUser,updataInfo }
    }
})
</script>

<style scoped>

</style>