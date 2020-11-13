<template>
  <a-table :columns="columns" :data-source="data">
    <a slot="name" slot-scope="text">{{ text }}</a>
  </a-table>
</template>
<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";

export default {
  setup(props, ctx) {
    const columnsArr = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        scopedSlots: { customRender: "name" }
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 80
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address 1",
        ellipsis: true
      },
      {
        title: "Long Column Long Column Long Column",
        dataIndex: "address",
        key: "address 2",
        ellipsis: true
      },
      {
        title: "Long Column Long Column",
        dataIndex: "address",
        key: "address 3",
        ellipsis: true
      },
      {
        title: "Long Column",
        dataIndex: "address",
        key: "address 4",
        ellipsis: true
      }
    ];

    const dataArr = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
        tags: ["nice", "developer"]
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 2 Lake Park, London No. 2 Lake Park",
        tags: ["loser"]
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
      }
    ];
    const data = reactive(dataArr);
    const columns = reactive(columnsArr);
    return {
      data,
      columns
    };
  }
};
</script>