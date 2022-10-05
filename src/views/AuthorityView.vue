<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      :check-strictly="true"
      node-key="roleId"
      :default-checked-keys="authority"
      :props="defaultProps"
    />
    <el-button @click="changeAuthority" type="primary">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { Authority } from "../type/authority";
import { getAuthorityList } from "../request/api";
export default defineComponent({
  setup() {
    const route = useRoute();
    const params: any = route.params;
    console.log(route);
    const data = reactive(new Authority(params.id, params.authority));
    const defaultProps = {
      children: "roleList",
      label: "name",
    };
    onMounted(() => {
      getAuthority();
    });
    const getAuthority = () => {
      getAuthorityList().then((res) => {
        data.list = res.data;
      });
    };
    const changeAuthority =()=>{
        console.log();
        let keys = data.treeRef.getCheckedKeys().sort((a:number,b:number)=>{return a-b});
    }
    return { ...toRefs(data), defaultProps ,changeAuthority};
  },
});
</script>

<style scoped>
</style>