<template>
  <div id="workflow_manager">

    <!--第一行，条件搜索栏-->
    <el-row :gutter="20">

      <!-- 左侧搜索栏，占地面积 20/24 -->
      <el-col :span="20">
        <el-form :inline="true" :model="workflowQueryContent" class="el-form--inline">
          <el-form-item :label="$t('message.wfId')">
            <el-input v-model="workflowQueryContent.workflowId" :placeholder="$t('message.wfId')"
                      @input="workflowQueryContent.workflowId = workflowQueryContent.workflowId.replace(/[^0-9]/g, '')"/>
          </el-form-item>
          <el-form-item :label="$t('message.wfName')">
            <el-input v-model="workflowQueryContent.keyword" :placeholder="$t('message.wfName')"/>
          </el-form-item>
          <el-form-item :label="$t('message.status')">
            <el-select v-model="workflowQueryContent.status" :placeholder="$t('message.status')">
              <el-option
                  v-for="item in workflowStatusOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryListWorkflow">{{ $t('message.query') }}</el-button>
            <el-button @click="onClickReset">{{ $t('message.reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 右侧新增任务按钮，占地面积 4/24 -->
      <el-col :span="4" v-if="!isWorkflow">
        <div style="float:right;padding-right:10px">
          <el-button type="primary" @click="onClickNewWorkflow">{{ $t('message.newWorkflow') }}</el-button>
        </div>
      </el-col>
    </el-row>

    <!--第二行，工作流数据表格-->
    <el-row>
      <el-table :data="workflowPageResult.data" style="width: 100%" :type="isWorkflow ? 'selection' : null">
        <el-table-column :show-overflow-tooltip="true" prop="id" :label="$t('message.wfId')" width="100"/>
        <el-table-column :show-overflow-tooltip="true" prop="wfName" :label="$t('message.wfName')" width="350"/>
        <el-table-column :show-overflow-tooltip="true" :label="$t('message.scheduleInfo')" width="200">
          <template slot-scope="scope">
            {{ scope.row.timeExpressionType }}
            <span v-if="['CRON'].includes(scope.row.timeExpressionType)">
                {{ scope.row.timeExpression }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="notifyUserNames" :label="$t('message.alarmPerson')"/>
        <el-table-column :show-overflow-tooltip="true" :label="$t('message.status')" width="100" v-if="!isWorkflow">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ff4949"
                       @change="switchWorkflow(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" :label="$t('message.operation')" :width="isWorkflow ? 100 : 240">
          <template slot-scope="scope">
            <div v-if="!isWorkflow">
              <el-button size="mini" @click="onClickModifyWorkflow(scope.row)">{{ $t('message.edit') }}</el-button>
              <el-dropdown>
                <el-popconfirm width="200" title="确定运行该工作流吗？" @confirm="onClickRunWorkflow(scope.row)">
                  <el-button slot="reference" style="margin-left: 15px;" size="mini">{{ $t('message.run') }}</el-button>
                </el-popconfirm>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button size="mini" type="text" @click="onClickRunByParameter(scope.row)">
                      {{ $t('message.runByParameter') }}
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-popconfirm title="确定删除该工作流吗？" @confirm="onClickDeleteWorkflow(scope.row)">
                <el-button size="mini" style="margin-left: 15px;" type="danger" slot="reference">
                  {{ $t('message.delete') }}
                </el-button>
              </el-popconfirm>
            </div>
            <div v-if="isWorkflow">
              <el-button size="mini" @click="onImportNode(scope.row)">引入</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 第三行，分页插件 -->
    <el-row>
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.workflowPageResult.totalItems"
                     :current-page="this.workflowPageResult.index + 1"
                     :page-size="this.workflowPageResult.pageSize"
                     :page-sizes="[10, 20, 50, 100, 200]"
                     @size-change="handleSizeChange"
                     @current-change="onClickChangePage"
                     :hide-on-single-page="true"
      />
    </el-row>
    <el-dialog :title="$t('message.runByParameter')" :visible="!!temporaryRowData" width="50%">
      <el-input type="textarea" :rows="4" :placeholder="$t('message.enteringParameter')" v-model="runParameter">
      </el-input>
      <span slot="footer" class="dialog-footer">
                <el-button @click="onClickRunCancel">{{ $t('message.cancel') }}</el-button>
                <el-button type="primary" @click="onClickRunWorkflow(temporaryRowData)"
                           :loading="runLoading">{{ $t('message.run') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WorkflowManager',
  props: ['isWorkflow'],
  data() {
    return {
      // 查询条件
      workflowQueryContent: {
        appId: this.$store.state.appInfo.id,
        index: 0,
        pageSize: 10,
        workflowId: undefined,
        keyword: undefined,
        status: undefined
      },
      // 工作流查询结果
      workflowPageResult: {
        pageSize: 10,
        totalItems: 0,
        data: []
      },
      // 工作流状态选择
      workflowStatusOptions: [
        {key: undefined, label: this.$t('message.all')},
        {key: 1, label: this.$t('message.enable1')},
        {key: 2, label: this.$t('message.disable')}
      ],
      // 复制loading
      copyLoading: false,
      // 新建工作流对象
      workflowObj: {},
      temporaryRowData: null,
      // 运行参数
      runParameter: null,
      // 运行loading
      runLoading: false
    }
  },
  methods: {
    queryListWorkflow() {
      this.workflowQueryContent.index = 0
      this.listWorkflow()
    },
    // 查询工作流
    listWorkflow() {
      const that = this
      this.axios.post('/workflow/list', this.workflowQueryContent).then((res) => {
        that.workflowPageResult = res
      })
    },
    /** 引入嵌套工作流节点 */
    onImportNode(data) {
      this.$emit('onImportNode', data)
    },
    // 点击重置
    onClickReset() {
      this.workflowQueryContent.workflowId = undefined
      this.workflowQueryContent.keyword = undefined
      this.workflowQueryContent.status = undefined
      this.handleSizeChange(10)
    },
    // 开关工作流
    switchWorkflow(data) {
      let that = this
      let path = data.enable ? 'enable' : 'disable'
      let url = '/workflow/' + path + '?appId=' + this.$store.state.appInfo.id + '&workflowId=' + data.id
      this.axios.get(url, res => {
        console.log(res)
        that.listWorkflow()
      })
    },
    // 编辑工作流
    onClickModifyWorkflow(data) {
      this.$router.push({
        name: 'workflowEditor',
        params: {
          modify: true,
          workflowInfo: data
        }
      })
    },
    // 立即运行工作流
    onClickRunWorkflow(data) {
      let that = this
      let url = '/workflow/run?appId=' + this.$store.state.appInfo.id + '&workflowId=' + data.id
      if (this.temporaryRowData && this.runParameter) {
        url += `&initParams=${encodeURIComponent(this.runParameter)}`
      }
      this.runLoading = true
      this.axios.get(url).then(() => {
        that.$message.success(this.$t('message.success'))
        this.temporaryRowData = null
        this.runLoading = false
      }).catch(() => {
        this.runLoading = false
      })
    },
    // 参数运行
    onClickRunByParameter(data) {
      this.temporaryRowData = data
    },
    // 取消参数运行
    onClickRunCancel() {
      this.temporaryRowData = null
      this.runParameter = null
    },
    // 删除工作流
    onClickDeleteWorkflow(data) {
      let that = this
      let url = '/workflow/delete?appId=' + this.$store.state.appInfo.id + '&workflowId=' + data.id
      this.axios.get(url).then(() => {
        that.$message.success(this.$t('message.success'))
        that.listWorkflow()
      })
    },
    // 新建工作流
    onClickNewWorkflow() {
      this.$router.push({
        name: 'workflowEditor',
        params: {
          modify: false
        }
      })
    },
    // 点击换页
    onClickChangePage(index) {
      // 后端从0开始，前端从1开始
      this.workflowQueryContent.index = index - 1
      this.listWorkflow()
    },
    handleSizeChange(pageSize) {
      this.workflowQueryContent.index = 0
      this.workflowQueryContent.pageSize = pageSize
      this.listWorkflow()
    },
    /** 复制工作流 */
    onClickCopy(data) {
      this.copyLoading = true
      this.axios.post(`/workflow/copy?workflowId=${data.id}&appId=${this.workflowQueryContent.appId}`).then(res => {
        this.$router.push({
          name: 'workflowEditor',
          params: {
            modify: true,
            workflowInfo: {
              ...data,
              id: res
            }
          }
        })
        this.copyLoading = false
        this.$message.success(this.$t('message.success'))
      }).catch(() => {
        this.copyLoading = false
      })
    }
  },
  mounted() {
    this.listWorkflow()
  }
}
</script>

<style scoped>

</style>
