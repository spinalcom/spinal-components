<template>
  <div>
    <space-selector
      v-model="element"
      :path.sync="cur_path"
      class="d-inline"
      :max-depth="maxDepth"
      :onopen="expandSelector"
    ></space-selector>
    <time-selector
      class="d-inline"
      v-model="period"
    ></time-selector>
  </div>
</template>

<script>
import SpaceSelector from "@/components/SpaceSelector";
import TimeSelector from "@/components/TimeSelector";

export default {
  name: "spinal-navigator",

  components: { SpaceSelector, TimeSelector },

  props: {
    value: {
      type: Object,
      required: true,
    },
    expandSelector: {
      type: Function,
      required: true,
    },
    maxDepth: {
      type: Number,
      required: true,
    },
    path: {
      type: Object,
      default: () =>({})
    }
  },

  data() {
    return {
      element: this.value.element,
      period: this.value.period,
      cur_path: this.path
    };
  },

  watch: {
    current_data() {
      this.$emit("input", { spatial: this.element, time: this.period });
    },
    period() {
      this.$emit("input", { spatial: this.element, time: this.period });
    },
    cur_path() {
      this.$emit("update:path", this.cur_path)
    }
  },
};
</script>

<style scoped></style>
