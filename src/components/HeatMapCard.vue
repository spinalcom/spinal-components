<template>
  <div class="d-flex flex-row flex-shrink-1">
    <div
      v-for="col in columnCount"
      :key="col"
      class="d-flex flex-column flex-shrink-1"
    >
      <div
        v-for="line in lineCount"
        :key="line"
        class="rounded"
        style="min-width: 24px; min-height: 26px; border: 0.5px solid #f9f9f9"
        :style="{
          'background-color':
            (col - 1) * lineCount + (line - 1) < skipFirst
              ? '#f9f9f9'
              : displayColor(datas[(col - 1) * lineCount + (line - 1)] || 0),
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { hexaToHSL } from "../colors";
export default {
  name: "heat-map-card",

  props: {
    title: {
      type: String,
      default: "HeatMapCard",
    },
    lineCount: {
      type: Number,
      required: true,
    },
    columnCount: {
      type: Number,
      required: true,
    },
    skipFirst: {
      type: Number,
      default: 0,
    },
    dataset: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    h: 0,
    s: 100,
  }),

  computed: {
    datas() {
      const datas = [...this.dataset];
      for (let i = 0; i < this.skipFirst; i++) datas.unshift(0);
      return datas;
    },
  },

  methods: {
    displayColor(intensity) {
      if (!this.color) {
        const h = (intensity * 120) / 100;
        return `hsl(${h}, 100%, 50%)`;
      }
      const l = 100 - intensity;
      return `hsl(${this.h}, ${this.s}%, ${l}%)`;
    },
  },

  created() {
    const { h, s } = hexaToHSL(this.color);
    this.h = h * 360;
    this.s = s * 100;
  },

  watch: {
    color(val) {
      const { h, s } = hexaToHSL(val);
      this.h = h * 360;
      this.s = s * 100;
    },
  },
};
</script>

<style></style>
