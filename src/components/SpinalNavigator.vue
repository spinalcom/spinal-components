<template>
  <div>
    <space-selector
      v-model="navigator.element"
      :path.sync="cur_path"
      class="d-inline"
      :max-depth="maxDepth"
      :onopen="expandSelector"
    ></space-selector>
    <time-selector
      class="d-inline"
      v-model="navigator.period"
    ></time-selector>
  </div>
</template>

<script>
import SpaceSelector from "../components/SpaceSelector";
import TimeSelector from "../components/TimeSelector";

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
      navigator: this.value,
      cur_path: this.path
    };
  },

  watch: {
    navigator() {
      this.$emit("input", this.navigator)
    },
    cur_path() {
      this.$emit("update:path", this.cur_path)
    }
  },
};
</script>

<style scoped></style>
