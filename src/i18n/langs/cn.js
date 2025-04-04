import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
    message: {

        // common
        'save': '保存',
        'cancel': '取消',
        'confirm': '确定',
        'refresh': '刷新',
        'query': '查询',
        'reset': '重置',
        'bulkImport': '批量导入',
        'keyword': '关键字',
        'run': '运行',
        'edit': '编辑',
        'delete': '删除',
        'success': '成功',
        'failed': '失败',
        'detail': '详情',
        'download': '下载',
        'stop': '停止',
        'back': '返回',
        'all': '全部',
        'more': '| 更多',

        // 欢迎界面
        'appRegister': '执行应用注册',
        'userRegister': '报警用户录入',
        'appNameInputPLH': '请输入应用名称',
        'appName': '应用名称',
        'appPassword': '密码',
        'register': '注册',
        'name': '姓名',
        'phone': '手机号',
        'email': '邮箱地址',
        'webhook': 'WebHook',
        'welcomeTitle': '欢迎使用数据中台调度系统!',
        'login': '登陆',
        'logout': '退出',
        'changeAppInfo': '修改应用信息',
        'newPassword': '新密码',
        'newPassword2': '确认密码',
        'stayLogged': '保持登录状态',


        // 左侧tab栏
        'tabHome': '系统首页',
        'tabJobManage': '任务管理',
        'tabJobInstance': '任务实例',
        'tabWorkflowManage': '工作流管理',
        'tabWfInstance': '工作流实例',
        'tabContainerOps': '容器',
        'tabTemplate': '模版生成',
        'tabContainerManager': '容器运维',

        // 系统首页
        'omsServerTime': '调度服务器时间',
        'omsServerTimezone': '调度服务器时区',
        'localBrowserTime': '本地时间',
        'localBrowserTimezone': '本地时区',
        'githubURL': '项目地址',
        'docURL': '文档地址',
        'totalJobNum': '任务总数',
        'runningInstanceNum': '当前运行实例数',
        'recentFailedInstanceNum': '近期失败任务数',
        'workerNum': '集群机器数',
        'workerAddress': '机器地址',
        'cpuLoad': 'CPU 占用',
        'memoryLoad': '内存占用',
        'diskLoad': '磁盘占用',
        'lastActiveTime': '上次在线时间',
        'advanceConfig': '高级设置',

        // 任务管理
        'jobId': '任务 ID',
        'instanceId': '任务实例 ID',
        'jobName': '任务名称',
        'scheduleInfo': '定时信息',
        'executeType': '执行类型',
        'processorType': '处理器类型',
        'alarmPerson': '报警人',
        'status': '状态',
        'operation': '操作',
        'newJob': '新建任务',
        'inputJob': '导入任务',
        'jobDescription': '任务描述',
        'jobParams': '任务参数',
        'timeExpressionType': '时间表达式类型',
        'dispatchStrategy': '分发策略',
        'dispatchStrategyConfig': '分发策略配置',
        'timeExpressionPlaceHolder': 'CRON 填写 CRON 表达式，秒级任务填写整数，API 无需填写',
        'executeConfig': '执行配置',
        'javaProcessorInfoPLH': '全限定类名，eg：tech.powerjob.HelloWordProcessor',
        'containerProcessorInfoPLH': '容器ID#全限定类名，eg：1#tech.powerjob.HelloWordProcessor',
        'shellProcessorInfoPLH': 'SHELL 脚本文件内容',
        'pythonProcessorInfoPLH': 'Python 脚本文件内容',
        'runtimeConfig': '运行时配置',
        'maxInstanceNum': '最大实例数',
        'threadConcurrency': '单机线程并发度',
        'timeout': '运行时间限制(毫秒)',
        'retryConfig': '重试配置',
        'taskRetryTimes': 'Instance 重试次数',
        'subTaskRetryTimes': "Task 重试次数",
        'workerConfig': '机器配置',
        'minCPU': '最低 CPU 核心数',
        'minMemory': '最低内存(GB)',
        'minDisk': '最低磁盘空间(GB)',
        'clusterConfig': '集群配置',
        'designatedWorkerAddress': '执行机器地址',
        'designatedWorkerAddressPLH': '执行机器地址（可选，不指定代表全部；多值英文逗号分割）',
        'maxWorkerNum': '最大执行机器数量',
        'maxWorkerNumPLH': '最大执行机器数量（0代表不限）',
        'alarmConfig': '报警配置',
        'logConfig': '日志配置',
        'logType': '日志类型',
        'logLevel': '日志级别',
        'loggerName': 'Logger名称',
        'alarmSelectorPLH': '选择报警通知人员',
        'standalone': '单机执行',
        'broadcast': '广播执行',
        'map': 'Map执行',
        'mapReduce': 'MapReduce 执行',
        'fixRate': '固定频率（毫秒）',
        'fixDelay': '固定延迟（毫秒）',
        'workflow': '工作流',
        'dailyTimeInterval': '每日固定间隔',
        'validateTimeExpression': '校验定时参数',
        'javaContainer': 'Java（容器）',
        'runHistory': '运行记录',
        'reRun': '重试',
        'builtIn': '内建',
        'external': '外置（动态加载）',
        'interval': '时间间隔',
        'timeRange': '时间范围',
        'weekRange': '星期范围',
        'taskTrackerBehavior':'TaskTracker行为',
        'healthFirst': '健康度优先',
        'random': '随机',
        'specify': '指定执行',
        'api': 'API',
        'cron': 'CRON',
        'fixed_rate': '固定频率（毫秒）',
        'fixed_delay': '固定延迟（毫秒）',
        'daily_time_interval': '每日固定间隔',

        // 任务实例管理
        'wfInstanceId': '工作流实例 ID',
        'normalInstance': '普通任务实例',
        'wfInstance': '工作流任务实例',
        'triggerTime': '触发时间',
        'finishedTime': '结束时间',
        'log': '日志',
        'runningTimes': '运行次数',
        'taskTrackerAddress': 'TaskTracker 地址',
        'startTime': '开始时间',
        'endTime': '结束时间',
        'createdTime': '创建时间',
        'lastModifiedTime': '最后编辑时间',
        'lastReportTime': '最后上报时间',
        'failedCnt':'失败数',
        'retryIntervalTime':'重试间隔时间(秒)',
        'expectedTriggerTime': '预计执行时间',
        'result': '任务结果',
        'taskDetail': 'Task 统计',
        // 'secondlyJobHistory': '最近 10 条秒级任务历史记录（秒级任务专用）',
        'secondlyJobHistory': '最近 10 条秒级任务历史记录',
        'queriedTaskDetailInfoList':'Task 查询结果记录',
        'subInstanceId': '子任务实例 ID',
        'instanceParams': '任务实例参数',
        'lifeCycle': '生命周期',
        'alertThreshold': '错误阈值',
        'statisticWindow': '统计窗口',
        'silenceWindow': '沉默窗口',
        'runByParameter': '参数运行',
        'enteringParameter': '填写参数',


        // 工作流管理
        'wfId': '工作流 ID',
        'wfName': '工作流名称',
        'newWorkflow': '新建工作流',
        'wfDescription': '工作流描述',
        'importJob': '导入任务',
        'deleteJob': '删除任务',
        'newStartPoint': '新增起点',
        'newEndPoint': '新增终点',
        'deleteEdge': '删除边',
        'importJobTitle': "请选择需要导入工作流的任务",
        'wfTimeExpressionPLH': 'CRON 填写 CRON 表达式，API 无需填写',
        'import': '导入',
        'ntfClickNeedDeleteNode': '请点击需要删除的节点',
        'ntfClickStartPoint': '请点击起始节点',
        'ntfClickTargetPoint': '请点击目标节点',
        'ntfClickDeleteEdge': '请点击需要删除的边',
        'ntfAddStartPointFirst': '请先添加起点!',
        'ntfInvalidEdge': '非法操作（起点终点相同）！',

        // 工作流实例
        'wfTips': 'tips：点击节点可查看任务实例详情',
        'ntfClickNoInstanceNode': '未生成任务实例，无法查看详情！',
        'wfInitParams': '启动参数',

        // 容器
        'newContainer': '新增容器',
        'containerType': '容器类型',
        'containerGitURL': 'Git 仓库地址',
        'branchName': '分支名称',
        'username': '用户名',
        'oldPassword': '旧密码',
        'password': '密码',
        'containerId': '容器 ID',
        'containerName': '容器名称',
        'containerVersion': '容器版本',
        'deployTime': '部署时间',
        'deploy': '部署',
        'deployedWorkerList': '机器列表',
        'uploadTips': '拖拽或点击文件后会自动上传',

        // 任务实例状态
        'waitingDispatch': '等待派发',
        'waitingWorkerReceive': '等待Worker接收',
        'running': '运行中',
        'stopped': '手动停止',
        'canceled': '手动取消',
        'canceleded': '已取消',
        'wfWaiting': '等待调度',
        'waitingUpstream': '等待上游节点',
        'enable1':'启用',
        'disable': '停用',

        // 新增的提示信息
        'noSelect': '请至少选中一条数据',
        'nodeName': '节点名称',
        'nodeParams': '节点参数',
        'enable': '是否启用',
        'skipWhenFailed': '失败跳过',
        'fullScreen': '全屏',
        'zoomIn': '放大',
        'zoomOut': '缩小',
        'autoFit': '自适应',
        'markerSuccess': '标记成功',
        'restart': '重试',
        'wfContext': '上下文',
        'yes': 'YES',
        'no': 'NO',
        'copy': '复制',
        'export': '导出',
        'condition': '判断节点',
        'workflowChild': '子流程节点',
        'importWorkflowTitle': '工作流节点引入'
    },
    ...zhLocale
};

export default cn
