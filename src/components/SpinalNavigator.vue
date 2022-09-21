<template>
  <div>
    <space-selector
      v-model="current_data"
      class="d-inline"
      :max-depth="maxDepth"
      :root-element="current_element"
      :onopen="expandSelector"
    ></space-selector>
    <time-selector
      class="d-inline"
      :root-element="current_period"
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
    current_element: {
      type: Object,
      required: true,
    },
    current_period: {
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
  },

  data() {
    return {
      current_data: this.current_element.title,
      period: this.current_period,
    };
  },

  watch: {
    current_data() {
      this.$emit("input", { spatial: this.current_data, time: this.period });
    },
    period() {
      this.$emit("input", { spatial: this.current_data, time: this.period });
    },
  },
};
</script>

<style scoped></style>
