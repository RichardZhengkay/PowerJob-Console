<template>
  <div id="wf_instance_manager">
    <!-- 第一行，搜索区 -->
    <el-row>
      <el-col>
        <el-form :inline="true" :model="wfInstanceQueryContent" class="el-form--inline">

          <el-form-item :label="$t('message.wfId')">
            <el-input
                v-model="wfInstanceQueryContent.workflowId"
                @input="wfInstanceQueryContent.workflowId = wfInstanceQueryContent.workflowId.replace(/[^0-9]/g, '')"
                :placeholder="$t('message.wfId')"
            />
          </el-form-item>

          <el-form-item :label="$t('message.wfName')">
            <el-input
                v-model="wfInstanceQueryContent.workflowName"
                :placeholder="$t('message.wfName')"
            />
          </el-form-item>

          <el-form-item :label="$t('message.status')">
            <el-select v-model="wfInstanceQueryContent.status" :placeholder="$t('message.status')">
              <el-option
                  v-for="item in wfInstanceStatusOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('message.triggerTime')">
            <el-date-picker
                v-model="wfInstanceQueryContent.triggerTime"
                type="datetimerange"
                value-format="timestamp"
                :start-placeholder="$t('message.startTime')"
                :end-placeholder="$t('message.endTime')"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="queryListWfInstances">{{ $t('message.query') }}</el-button>
            <el-button @click="onClickRest">{{ $t('message.reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 第二行，表单 -->
    <el-row>
      <el-table :data="wfInstancePageResult.data" style="width: 100%" :row-class-name="wfInstanceTableRowClassName">
        <el-table-column :show-overflow-tooltip="true" prop="workflowId" :label="$t('message.wfId')" width="80"/>
        <el-table-column :show-overflow-tooltip="true" prop="workflowName" :label="$t('message.wfName')" width="300"/>
        <el-table-column :show-overflow-tooltip="true" prop="wfInstanceId" :label="$t('message.wfInstanceId')"/>
        <el-table-column :show-overflow-tooltip="true" prop="status" :label="$t('message.status')" width="110">
          <template slot-scope="scope">
            {{ fetchWFStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="actualTriggerTime" :label="$t('message.triggerTime')"/>
        <el-table-column :show-overflow-tooltip="true" prop="finishedTime" :label="$t('message.finishedTime')"/>

        <el-table-column :show-overflow-tooltip="true" :label="$t('message.operation')" width="225">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="onClickShowDetail(scope.row)">{{
                $t('message.detail')
              }}
            </el-button>
            <el-popconfirm title="您确定停止工作流实例吗？" @confirm="onClickStop(scope.row)">
              <el-button style="margin-left: 15px;" slot="reference" type="danger" size="mini">
                {{ $t('message.stop') }}
              </el-button>
            </el-popconfirm>

            <el-popconfirm title="您确定重试工作流实例吗？" @confirm="restart(scope.row)">
              <el-button style="margin-left: 15px;" slot="reference" type="warning" size="mini">
                {{ $t('message.reRun') }}
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 第三行，分页插件 -->
    <el-row>
      <el-col :span="24">
        <el-pagination background
                       :total="this.wfInstancePageResult.totalItems"
                       :current-page="this.wfInstancePageResult.index + 1"
                       :page-size="this.wfInstancePageResult.pageSize"
                       :page-sizes="[10, 20, 50, 100, 200]"
                       @size-change="handleSizeChange"
                       @current-change="onClickChangeInstancePage"
                       layout="total, prev, pager, next, sizes"
                       :hide-on-single-page="true"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'WFInstanceManager',
  data() {
    return {
      // 查询条件
      wfInstanceQueryContent: {
        appId: this.$store.state.appInfo.id,
        index: 0,
        pageSize: 10,
        wfInstanceId: undefined,
        workflowId: undefined,
        workflowName: undefined,
        status: '',
        triggerTime: undefined
      },
      // 查询结果
      wfInstancePageResult: {
        pageSize: 10,
        totalItems: 0,
        data: [],
      },
      // 工作流实例状态选择
      wfInstanceStatusOptions: [
        {key: '', label: this.$t('message.all')},
        {key: 'WAITING', label: this.$t('message.waitingDispatch')},
        {key: 'RUNNING', label: this.$t('message.running')},
        {key: 'FAILED', label: this.$t('message.failed')},
        {key: 'SUCCEED', label: this.$t('message.success')},
        {key: 'STOPPED', label: this.$t('message.stopped')}
      ]
    }
  },
  methods: {
    queryListWfInstances() {
      this.wfInstanceQueryContent.index = 0
      this.listWfInstances()
    },
    listWfInstances() {
      let that = this
      this.axios
          .post('/wfInstance/list', this.wfInstanceQueryContent)
          .then((res) => (that.wfInstancePageResult = res))
    },
    // 重置搜索条件
    onClickRest() {
      this.wfInstanceQueryContent.wfInstanceId = undefined
      this.wfInstanceQueryContent.workflowId = undefined
      this.wfInstanceQueryContent.workflowName = undefined
      this.wfInstanceQueryContent.status = ''
      this.wfInstanceQueryContent.triggerTime = undefined
      this.handleSizeChange(10)
    },
    // 查看工作流详情
    onClickShowDetail(data) {
      this.$router.push({
        name: 'WorkflowInstanceDetail',
        params: {
          wfInstanceId: data.wfInstanceId
        }
      })
    },

    // 停止工作流
    onClickStop(data) {
      let that = this
      let url = '/wfInstance/stop?wfInstanceId=' + data.wfInstanceId + '&appId=' + this.$store.state.appInfo.id
      this.axios.get(url).then(() => {
        that.$message.success(this.$t('message.success'))
        // 重新加载列表
        that.listInstanceInfos()
      })
    },
    // 换页
    onClickChangeInstancePage(index) {
      // 后端从0开始，前端从1开始
      this.wfInstanceQueryContent.index = index - 1
      this.listWfInstances()
    },
    handleSizeChange(pageSize) {
      this.wfInstanceQueryContent.index = 0
      this.wfInstanceQueryContent.pageSize = pageSize
      this.listWfInstances()
    },
    // 表单颜色
    wfInstanceTableRowClassName({row}) {
      switch (row.status) {
          // 失败
        case 3:
          return 'error-row'
          // 成功
        case 4:
          return 'success-row'
        case 10:
          return 'warning-row'
      }
    },
    fetchWFStatus(status) {
      return this.common.translateWfInstanceStatus(status)
    },
    // 重试
    async restart(row) {
      const data = {
        appId: this.wfInstanceQueryContent.appId,
        wfInstanceId: row.wfInstanceId,
      }
      await this.axios.get('/wfInstance/retry', {
        params: data
      })
      this.listWfInstances()
    },
  },
  mounted() {
    this.listWfInstances()
  },
}
</script>

<style>

svg {
  font-size: 10px;
  border: 1px solid red;
}

text {
  font-weight: 300;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

.node rect {
  stroke: #999;
  fill: #fff;
  stroke-width: 1.5px;
}

.edgePath path {
  stroke: #333;
  stroke-width: 1px;
}

</style>
