<template>
  <div>
    <h1>{{ msg }}</h1>
    <a-button type="primary" @click="addCount">count is: {{ count }}</a-button>
    <a-button type="primary" @click="addCount1">count1 is: {{ count1 }}</a-button>
    <h2>{{countPro}}</h2>
    <h3 v-for="(item,index) in obj" :key="index">{{item}}</h3>
    <h1>{{countPro1}}</h1>
  </div>
</template>

<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";
import { Button as aButton } from "ant-design-vue";
export default {
  components: {
    aButton
  },
  props: {
    msg: String
  },
  setup(props, ctx) {
    const { msg } = toRefs(props);
    const count = ref(0);
    const value1 = ref("");
    const value2 = ref("");
    const obj = reactive({
      "1": 111,
      "2": 222,
      "3": 333
    });
    /**计算属性 */
    const countPro = computed(() => {
      return count.value * 2;
    });
    /**监听 */
    watch(count, (n, o) => {
      console.log(n, "--------", o);
    });
    watch(msg, () => {
      console.log(msg.value, "============");
    });
    /**生命周期 */
    onMounted(init);
    /**自定义方法 */
    const addCount = () => {
      count.value++;
      obj["2"] *= 10;
    };
    const init = () => {
      console.log("mounted");
      ctx.emit("ccc", 999);
    };
    return {
      obj,
      count,
      countPro,
      addCount,
      value1,
      value2,
      ...demo(props, ctx)
    };
  }
};
/**代码块 */
function demo(props, ctx) {
  const { msg } = toRefs(props);
  const count1 = ref(20);
  const countPro1 = computed(() => {
    return count1.value + "99999999999999999999";
  });
  function addCount1() {
    count1.value += 10;
    console.log(msg.value, "msg............");
  }
  return { count1, addCount1, countPro1 };
}
</script>
