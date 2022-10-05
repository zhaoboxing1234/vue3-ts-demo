<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="selectData.title" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Query</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList.comList" border style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="title" label="title" width="180" />
            <el-table-column prop="introduce" label="introduce" />
        </el-table>
        <el-pagination @size-change="sizeChange" @current-change="currentChange" layout="prev, pager, next"
            :total="selectData.count*2" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getGoodsList } from "../request/api";
import { InitData, IGoodsList} from "../type/goods";
export default defineComponent({
    setup() {
        const data = reactive(new InitData());
        onMounted(() => {
            getGoods();
        });
        const getGoods = () => {
            getGoodsList().then((res) => {
                data.list  = res.data;
                data.selectData.count = res.data.length;
            });
        }
        const sizeChange = (pagesize: number) => {
            data.selectData.pageSize = pagesize;
        }
        const currentChange = (page: number) => {
            data.selectData.page = page;
        }
        const dataList = reactive({
            comList: computed(() => {
                let start = (data.selectData.page - 1) * data.selectData.pageSize;
                let end = data.selectData.page * data.selectData.pageSize;
                return data.list.slice(start, end);
            })
        });
        const onSubmit = function () {
            let arr: IGoodsList[] = [];
            if (data.selectData.title) {
                arr = data.list.filter((value) => {
                    return value.title.indexOf(data.selectData.title) !== -1;
                });
            }
            if (data.selectData.introduce) {
                arr = data.list.filter((value) => {
                    return value.introduce.indexOf(data.selectData.introduce) !== -1;
                });
            }
            if (!data.selectData.title && !data.selectData.introduce) {
                arr = data.list;
            }
            data.selectData.count = arr.length;
            data.list = arr;
        };
        watch([() => { return data.selectData.title }, () => { return data.selectData.introduce }], () => {
            if (data.selectData.title === "" && data.selectData.introduce === "") {
                getGoods();
            }
        })
        return { ...toRefs(data), onSubmit, sizeChange, currentChange, dataList }
    }
})
</script>

<style scoped>

</style>