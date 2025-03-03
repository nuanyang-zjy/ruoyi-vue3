<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" :rules="rules" label-width="100px"
      :item-style="{width: '80px'}">
      <el-form-item label="工程名称" prop="projectName">
        <el-input v-model="queryParams.projectName" placeholder="请输入工程名称" clearable
          style="width: 250px; border-radius: 16px;" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="井巷工程费" prop="tunnelCost">
        <el-input v-model="queryParams.beginTunnelCost" placeholder="请输入最小值" clearable
          style="width: 120px; border-radius: 16px; display: inline-block;" @keyup.enter="handleQuery" />
        --
        <el-input v-model="queryParams.endTunnelCost" placeholder="请输入最大值" clearable
          style="width: 120px; border-radius: 16px; display: inline-block;" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="建筑工程费" prop="buildingCost">
        <el-input v-model="queryParams.beginBuildingCost" placeholder="请输入最小值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
        --
        <el-input v-model="queryParams.endBuildingCost" placeholder="请输入最大值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="安装工程费" prop="installationCost">
        <el-input v-model="queryParams.beginInstallationCost" placeholder="请输入最小值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
        --
        <el-input v-model="queryParams.endInstallationCost" placeholder="请输入最大值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="设备购置费" prop="equipmentCost">
        <el-input v-model="queryParams.beginEquipmentCost" placeholder="请输入最小值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
        --
        <el-input v-model="queryParams.endEquipmentCost" placeholder="请输入最大值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="其他费用" prop="otherCost">
        <el-input v-model="queryParams.beginOtherCost" placeholder="请输入最小值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
        --
        <el-input v-model="queryParams.endOtherCost" placeholder="请输入最大值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="合计" prop="totalCost">
        <el-input v-model="queryParams.beginTotalCost" placeholder="请输入最小值" clearable style="width: 120px;"
          @keyup.enter="handleQuery" />
        --
        <el-input v-model="queryParams.endTotalCost" placeholder="请输入最大值" clearable
          style="width: 120px; border-radius: 20%; display: inline-block;" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="工程状态" prop="projectStatus">
        <el-select v-model="queryParams.projectStatus" placeholder="请选择工程状态" clearable
          style="width: 250px ;margin-right: 30px;">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="10" class="button-row">

          <el-button type="primary" plain icon="Plus" @click="handleAdd" style="margin-left: 8px;"
            v-hasPermi="['engineeringBudget:engineeringBudget:add']">新增</el-button>

          <el-col :span="1">
            <el-button type="info" plain icon="Sort" @click="toggleExpandAll"
              style="margin-right: 1100px;">展开/折叠</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-button type="primary" icon="Search" @click="handleQuery" style="margin-right: 20px;">搜索</el-button>
        </el-col>
        <el-col :span="6">
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-col>
      </el-form-item>
    </el-form>


    <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>


    <el-table v-if="refreshTable" v-loading="loading" :data="engineeringBudgetList" row-key="budgetId"
      :default-expand-all="isExpandAll" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column label="工程名称" align="center" prop="projectName" />
      <el-table-column label="井巷工程费" align="center" prop="tunnelCost" />
      <el-table-column label="建筑工程费" align="center" prop="buildingCost" />
      <el-table-column label="安装工程费" align="center" prop="installationCost" />
      <el-table-column label="设备购置费" align="center" prop="equipmentCost" />
      <el-table-column label="其他费用" align="center" prop="otherCost" />
      <el-table-column label="合计" align="center" prop="totalCost" />
      <el-table-column label="工程状态" align="center" prop="projectStatus">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.projectStatus" />
        </template>
      </el-table-column>
      <el-table-column label="描述信息" align="center" prop="description" />
      <el-table-column label="创建时间" align="center" prop="createdTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createdTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updatedTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.updatedTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['engineeringBudget:engineeringBudget:edit']">修改</el-button>
          <!--<el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)" v-hasPermi="['engineeringBudget:engineeringBudget:add']">新增</el-button>-->
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
            v-hasPermi="['engineeringBudget:engineeringBudget:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改工程概算对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="engineeringBudgetRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父级工程" prop="parentId"  >
          <el-input v-model="form.parentName"  placeholder="请选择父级工程" readonly ></el-input>
          <el-tree ref="treeRef" :data="engineeringBudgetOptions"
            :props="{ value: 'budgetId', label: 'projectName', children: 'children' }" node-key="budgetId" :expand-on-click-node="false"
           :check-on-click-node="true" highlight-current :current-node-key="form.parentId" :check-strictly="true" @current-change="handleCurrentChange"  />
        </el-form-item>
        <el-form-item label="工程名字" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入工程名字" />
        </el-form-item>
        <!-- <el-form-item label="父级工程" prop="parentId">
          <el-cascader v-model="form.parentId" :options="engineeringBudgetOptions"
            :props="{ value: 'budgetId', label: 'projectName', children: 'children' }" :collapse-tags="false" :check-strictly="true" placeholder="请选择父级工程"
            clearable />
        </el-form-item> -->
        <el-form-item label="井巷工程费" prop="tunnelCost">
          <el-input v-model.number="form.tunnelCost" placeholder="请输入井巷工程费" :disabled="isLevelValid" @input="calculateTotalCost" />
        </el-form-item>
        <el-form-item label="建筑工程费" prop="buildingCost">
          <el-input v-model.number="form.buildingCost" placeholder="请输入建筑工程费" :disabled="isLevelValid" @input="calculateTotalCost"/>
        </el-form-item>
        <el-form-item label="安装工程费" prop="installationCost">
          <el-input v-model.number="form.installationCost" placeholder="请输入安装工程费" :disabled="isLevelValid" @input="calculateTotalCost"/>
        </el-form-item>
        <el-form-item label="设备购置费" prop="equipmentCost">
          <el-input v-model.number="form.equipmentCost" placeholder="请输入设备购置费" :disabled="isLevelValid" @input="calculateTotalCost"/>
        </el-form-item>
        <el-form-item label="其他费用" prop="otherCost">
          <el-input v-model.number="form.otherCost" placeholder="请输入其他费用" :disabled="isLevelValid" @input="calculateTotalCost"/>
        </el-form-item>
        <el-form-item label="合计" prop="totalCost">
          <el-input v-model.number="form.totalCost"  readonly/>
        </el-form-item>
        <el-form-item label="工程状态" prop="projectStatus">
          <el-radio-group v-model="form.projectStatus">
            <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :value="dict.value">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述信息" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="EngineeringBudget">
import { listEngineeringBudget, listEngineeringBudgetBy, getEngineeringBudget, delEngineeringBudget, addEngineeringBudget, updateEngineeringBudget, getEngineeringBudgetTree } from "@/api/engineeringBudget/engineeringBudget";

import { ref, reactive, getCurrentInstance, onMounted } from "vue";


const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict('sys_normal_disable');
const isAdding = ref(true); // 控制新增和修改状态
const engineeringBudgetList = ref([]);
const engineeringBudgetOptions = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const isExpandAll = ref(true);
const refreshTable = ref(true);
const treeRef = ref(null);
const leafLevel = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    projectName: null,
    projectStatus: null,
    beginTunnelCost:null,
    endTunnelCost:null,
    beginBuildingCost:null,
    endBuildingCost:null,
    beginInstallationCost:null,
    endInstallationCost:null,
    beginEquipmentCost:null,
    endEquipmentCost:null,
    beginOtherCost:null,
    endOtherCost:null,
    beginTotalCost:null,
    endTotalCost:null,
  },
  rules: {
    projectName: [
      { required: true, message: "工程名称不能为空", trigger: "blur" }
    ],
    // projectStatus: [
    //   { required: true, message: "工程状态不能为空", trigger: "change" }
    // ],
    parentId: [
    { required: true, message: '请选择父级工程', trigger: 'change' }
  ],
    tunnelCost: [
      { type: 'number' , message: "请输入数字", trigger: "blur" }
    ],
    buildingCost: [
      { type: 'number' , message: "请输入数字", trigger: "blur" }
    ],
    installationCost: [
      { type: 'number' , message: "请输入数字", trigger: "blur" }
    ],
    equipmentCost: [
      { type: 'number' , message: "请输入数字", trigger: "blur" }
    ],
    otherCost: [
      { type: 'number' , message: "请输入数字", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);
// 处理当前选中的节点变化
const handleCurrentChange = (currentNode) => {
  if (currentNode) {
    form.value.parentId = currentNode.budgetId;
    form.value.parentName = currentNode.projectName;
    form.value.level= currentNode.level+1;
  }
  //  if(isLevelValid){
  //    form.value.tunnelCost = form.value.buildingCost = form.value.installationCost = form.value.equipmentCost = form.value.otherCost = form.value.totalCost = 0;
  //  }
  // console.log('Selected Node:', currentNode);
  // console.log('Selected Parent ID:', form.value.parentId);
  // console.log('form.level:', form.value.level);
};

// 计算合计值
const calculateTotalCost = () => {
  form.value.totalCost = form.value.tunnelCost + form.value.buildingCost + form.value.installationCost + form.value.equipmentCost + form.value.otherCost;
};

// 监听 cost1, cost2, cost3 的变化，自动计算合计值
watch([() => form.value.tunnelCost, () => form.value.buildingCost, () => form.value.installationCost, () => form.value.equipmentCost, () => form.value.otherCost], () => {
  calculateTotalCost();
});

//计算属性，判断 level 是否有效
const isLevelValid = computed(() => {
  if(isAdding.value){
  return false;
  }
  else{
    // console.log('form.level:',form.value.level)
  return !leafLevel.value.includes(form.value.budgetId) ;
  }
});

/** 查询工程概算列表 */
function getList() {
  listEngineeringBudget().then(response => {
    engineeringBudgetList.value = proxy.handleTree(response.data, "budgetId", "parentId");
    loading.value = false;
  });
}

/** 查询工程概算下拉树结构 */
function getTreeselect() {
  getEngineeringBudgetTree().then(response => {
    engineeringBudgetOptions.value = [];
    const data = { budgetId: null, projectName: '', children: [] };
    data.children = proxy.handleTree(response.data, "budgetId", "parentId");
    engineeringBudgetOptions.value.push(data);
    leafLevel.value= getLeafNodeProperties(data, "budgetId", []);
    console.log('leafLevel:', leafLevel.value);
  });
}

// //寻找叶子节点所在leavl
 function getLeafNodeProperties(node, property) {
   const result = [];
  function traverse(node) {
   // 如果当前节点没有子节点，则它是叶节点
   if (!node.children || node.children.length === 0) {
     if(!result.includes(node[property])){
     result.push(node[property]);
    //  result.push(node[property]+1);
         }
   } else {
     // 递归遍历子节点
     for (let child of node.children) {
       traverse(child);
     }
   }
   }
  
   // 开始遍历树结构
   traverse(node);
  // 打印结果
  //  console.log('result:', result);
   return result;
 }


// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    budgetId: null,
    parentId: null,
    level: null,
    projectName: null,
    tunnelCost: 0,
    buildingCost: 0,
    installationCost: 0,
    equipmentCost: 0,
    otherCost: 0,
    totalCost: 0,
    projectStatus: '0',
    description: null,
    createdTime: null,
    updatedTime: null
  };
  proxy.resetForm("engineeringBudgetRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  proxy.$refs["queryRef"].validate(valid => {
  if (valid) {
  loading.value = true;
  console.log(queryParams.value); 
  listEngineeringBudgetBy(queryParams.value).then(response => {
    engineeringBudgetList.value = proxy.handleTree(response.data, "budgetId", "parentId");
    loading.value = false;
  });
}
});
}

/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.projectName = '';
  queryParams.value.projectStatus = '';
  queryParams.value.beginTunnelCost = ''; 
  queryParams.value.endTunnelCost = '';
  queryParams.value.beginBuildingCost = '';
  queryParams.value.endBuildingCost = '';
  queryParams.value.beginInstallationCost = '';
  queryParams.value.endInstallationCost = '';
  queryParams.value.beginEquipmentCost = '';
  queryParams.value.endEquipmentCost = '';
  queryParams.value.beginOtherCost = '';
  queryParams.value.endOtherCost = '';
  queryParams.value.beginTotalCost = '';
  queryParams.value.endTotalCost = '';
  proxy.resetForm("queryRef");
}

/** 新增按钮操作 */
function handleAdd() {
  isAdding.value = true;
  reset();
  /*
  if (row != null && row.budgetId) {
    form.value.parentId = row.budgetId;
  } else {
    form.value.parentId = 0;
  }
    */
   // 初始计算合计值
  calculateTotalCost();
  getTreeselect();
  open.value = true;
  title.value = "添加工程概算";
}

/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  isAdding.value = false;
  reset();
  //await getTreeselect();
  if (row != null) {
    form.value.parentId = row.parentId;
  }
  getEngineeringBudget(row.budgetId).then(response => {
    calculateTotalCost();
    getTreeselect();
    form.value = response.data;
    getEngineeringBudget(form.value.parentId).then(response => {
      form.value.parentName = response.data.projectName;
})
    open.value = true;
    title.value = "修改工程概算";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["engineeringBudgetRef"].validate(valid => {
    if (valid) {
      if (form.value.budgetId != null) {
        console.log(form.value);
        updateEngineeringBudget(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addEngineeringBudget(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.confirm('是否确认删除工程概算编号为"' + row.budgetId + '"的数据项？').then(function() {
    return delEngineeringBudget(row.budgetId);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

onMounted(() => {
  getList();
  console.log('collapse-tags:',false);
  console.log('check-strictly:',true);
})
</script>


