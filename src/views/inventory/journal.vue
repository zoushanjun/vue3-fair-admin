<template>
  <!-- 资产日志表格，size="small"指定为紧凑型 -->

  <a-table
    :columns="Columns"
    :data-source="listData"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
    :rowKey="(record) => record.id"
    :rowClassName="
      (record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
    size="small"
  >
  </a-table>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import moment from "moment";

// 引入与flask后端交互的http api方法
import { getInvtJournal } from "../../network/inventoryApi";

// 定义日志列表表头
const Columns = [
  {
    name: "create_time", //对应API返回的字段
    title: "时间",
    dataIndex: "create_time",
    key: "create_time",
    width: 200,
    customRender: ({ text }) =>
      moment(text).utcOffset(0).format("YYYY/MM/DD HH:mm:ss"), //utcoffset用于调整时区
  },
  {
    name: "content", //对应API返回的字段
    title: "内容",
    dataIndex: "content",
    key: "content",
  },
];

export default defineComponent({
  name: "journal",
  setup() {
    const listData = ref([]);

    // 页面挂载后读取日志数据
    onMounted(() => {
      getInvtJournal()
        .then((res) => {
          listData.value = res.data;
          // console.log(listData.value);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      Columns,
      listData,
    };
  },
  components: {},
});
</script>
<style lang="less">
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  margin: 0px;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  min-height: 280px;
  // height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}

.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 48px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 25px;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon-cancel {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }
  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon-cancel {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-cell-icon-cancel:hover {
    color: #108ee9;
  }
  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
