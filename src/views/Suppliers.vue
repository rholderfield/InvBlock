<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
    }"
  >
    <a-table sticky :columns="columns" :data-source="data" :scroll="{ x: 800 }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'"><a>action</a></template>
      </template>
      <template #summary>
        <a-table-summary>
          <a-table-summary-row>
            <a-table-summary-cell :index="0" :col-span="2"
              >Fix Left</a-table-summary-cell
            >
            <a-table-summary-cell :index="2" :col-span="8"
              >Scroll Context</a-table-summary-cell
            >
            <a-table-summary-cell :index="10">Fix Right</a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Suppliers",
  setup() {
    const columns = ref([
      {
        title: "Supplier Id",
        width: 20,
        dataIndex: "SupplierId",
        key: "Supplier Id",
        fixed: "left",
      },
      {
        title: "Supplier Name",
        width: 20,
        dataIndex: "SupplierName",
        key: "SupplierName",
      },
      {
        title: "Supplier Phone",
        dataIndex: "SupplierPhone",
        key: "SupplierPhone",
        width: 50,
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 20,
      },
    ]);
    const data = [];

    for (let i = 0; i <= 5; i++) {
      data.push({
        key: i,
        SupplierId: `${i}`,
        SupplierName: `Supplier ${i}`,
        SupplierPhone: `408-123-457${i}`,
      });
    }

    return {
      data,
      columns,
    };
  },
};
</script>
