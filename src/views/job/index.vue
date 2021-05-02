<template>
  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <!-- 1/工单中心选项卡内容 -->
      <a-tab-pane key="1" tab="业务开通">
        <!-- 工单列表，嵌套表格 -->
        <a-table :columns="columns" :data-source="data" class="components-table-demo-nested">
          <!-- 对嵌套子表格进行渲染-->
          <template #expandedRowRender>
            <a-table
              :columns="innerColumns"
              :data-source="innerData"
              :pagination="false"
              size="small"
            >
              <template #orderStaus>
                <span>
                  <a-badge status="success" />
                  Finished
                </span>
              </template>
              <template #orderJob>
                <span>
                  <a-tag color="pink">Job</a-tag>
                  <a-tag color="green">SMS</a-tag>
                </span>
              </template>

              <template #operation>
                <span class="table-operation">
                  <a>作业</a>
                  <a-divider type="vertical" style="height: 10px; background-color: #7cb305" />
                  <a>短信</a>
                  <a-divider type="vertical" style="height: 10px; background-color: #7cb305" />
                  <a>详情</a>
                </span>
              </template>
            </a-table>
          </template>
        </a-table>
      </a-tab-pane>

      <!-- 2/收入统计选项卡内容 -->
      <a-tab-pane key="2" tab="数据回滚">
        <div>
          <!-- 服务搜索 -->
        </div>
        <!-- 分割线 -->
        <a-divider />
        <!-- 服务列表 -->
      </a-tab-pane>

      <!-- 3/绩效统计选项卡内容 -->
      <a-tab-pane key="3" tab="定时任务">
        <div> </div>
        <!-- 分割线 -->
        <a-divider />
        <!-- 服务列表 -->
      </a-tab-pane>
      <a-tab-pane key="4" tab="AP巡检">
        <div> </div>
        <!-- 分割线 -->
        <a-divider />
        <!-- 服务列表 -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRaw, UnwrapRef } from 'vue';
  import { PlusOutlined, FileExcelOutlined, ReloadOutlined } from '@ant-design/icons-vue';
  import {
    Input,
    // 弹出对话框
    Modal,
    DatePicker,
    Form,
    Table,
    Tabs,
    Button,
    Icon,
    Tag,
    Divider,
    Popconfirm,
  } from 'ant-design-vue';

  import { Moment } from 'moment';

  // import 'ant-design-vue/dist/antd.css';
  const { RangePicker } = DatePicker;
  const columns = [
    { title: '展会名称', dataIndex: 'fairName', key: 'fairName' },
    { title: '举办时间', dataIndex: 'fariTime', key: 'fariTime' },
    { title: '举办地点', dataIndex: 'fairLocation', key: 'fairLocation' },
    // { title: '操作', key: 'operation', slots: { customRender: 'operation' } },
  ];

  interface DataItem {
    key: number;
    fairName: string;
    fariTime: string;
    fairLocation: string;
    // upgradeNum: number;
    // creator: string;
    // createdAt: string;
  }

  const data: DataItem[] = [];
  for (let i = 0; i < 50; ++i) {
    data.push({
      key: i,
      fairName: '2021广州国际工业自动化技术及装备展览会及广州国际工业机器人展览会',
      fariTime: '2021.2.28-2021.3.5',
      fairLocation: '10.2-11.2、13.2',
      // upgradeNum: 500,
      // creator: 'Jack',
      // createdAt: '2014-12-24 23:12:00',
    });
  }

  const innerColumns = [
    {
      title: '安装地点',
      dataIndex: 'orderLocation',
      key: 'orderLocation',
      width: 150,
      ellipsis: true,
    },
    {
      title: '服务项目',
      dataIndex: 'orderSvcItem',
      key: 'orderSvcItem',
      width: 200,
      ellipsis: true,
    },

    { title: '宽带账号密码', dataIndex: 'orderAccPwd', key: 'orderAccPwd', ellipsis: true },
    { title: '专线配置信息', dataIndex: 'orderLine', key: 'orderLine', width: 250, ellipsis: true },
    { title: '工单状态', dataIndex: 'orderStaus', key: 'orderStaus', width: 80 },
    {
      title: '作业标识',
      dataIndex: 'orderJob',
      key: 'orderJob',
      width: 120,
      slots: { customRender: 'orderJob' },
    },
    { title: '备注', dataIndex: 'orderRemark', key: 'orderRemark', width: 80, ellipsis: true },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 150,
      slots: { customRender: 'operation' },
    },
  ];

  interface innerDataItem {
    key: number;
    orderLocation: string;
    orderSvcItem: string;
    orderAccPwd: string;
    orderLine: string;
    orderStaus: string;
    orderJob: string;
    orderRemark: string;
  }

  const innerData: innerDataItem[] = [];
  for (let i = 0; i < 50; ++i) {
    innerData.push({
      key: i,
      orderLocation: '一楼9号门门禁及服务点一楼9号门门禁及服务点一楼9号门门禁及服务点',
      orderSvcItem: '15M宽带*1 15M宽带*1 15M宽带*1 15M宽带*1',
      orderAccPwd: 'test/123456',
      orderLine: '7.7.1.5,255.255.255.0,7.7.1.1,192.168.8.34,13,601,10,10,custom1',
      orderStaus: '未指派',
      // orderJob: '已配置，已短信',
      orderRemark: '4月3日上午安装到位，提供HUB一个',
    });
  }

  export default defineComponent({
    setup() {
      const value = ref<string>('');

      // 定义弹出框举办地点变量
      const value2 = ref<string>('');

      const onSearch = (searchValue: string) => {
        console.log('use value', searchValue);
        console.log('or use this.value', value.value);
      };

      const onSubmit = () => {
        console.log('submit!', toRaw(formFair));
      };

      return {
        //针对时间段选择器
        value3: ref<Moment[]>([]),

        //针对选项卡
        activeKey: ref('1'),
        value,
        onSearch,

        //返回新增展会表单内容
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },

        onSubmit,
        value2,

        data,
        columns,
        innerColumns,
        innerData,
      };
    },
    components: {
      PlusOutlined,
      FileExcelOutlined,
      ReloadOutlined,
      [Input.name]: Input,
      [Input.Search.name]: Input.Search,
      [Input.TextArea.name]: Input.TextArea,
      [RangePicker.name]: RangePicker,
      [Form.name]: Form,
      [Form.Item.name]: Form.Item,
      [Modal.name]: Modal,
      [Table.name]: Table,
      [Divider.name]: Divider,
      [Tag.name]: Tag,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      [Popconfirm.name]: Popconfirm,
    },
  });
</script>
<style>
  .card-container {
    /* height: 100%; */
    padding: 24px;
    overflow: hidden;
    /* background: #f5f5f5; */
  }

  .card-container > .ant-tabs-card > .ant-tabs-content {
    height: 300px;
    margin-top: -8px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    padding: 16px;
    background: #fff;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    background: #fff;
    border-color: #fff;
  }
</style>
