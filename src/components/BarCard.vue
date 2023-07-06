<template>
  <v-card
    style="min-height: 220px !important"
    class="bar-card pa-1 rounded-lg d-flex flex-column"
    outlined
  >
    <v-card-title
      style="font-size: 20px; height: 56px"
      class="card-title pa-3 text-uppercase"
      >{{ title }}</v-card-title
    >
    <div style="height: calc(100% - 56px)" class="d-flex flex-column">
      <slot name="extras" class="flex-shrink-1"></slot>
      <div style="height: 100%">
        <Bar :data="barChartData" :chart-id="'1'" :options="barChartOptions" />
      </div>
    </div>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  customBackgroundPlugin,
  customLegendPlugin,
} from "../plugins/canvasPlugins";
import {
  Legend,
  BarElement,
  LinearScale,
  CategoryScale,
  LogarithmicScale,
  Chart as ChartJS,
} from "chart.js";
import { defaultColor, gradiant, RGBtoHexa, HSVtoRGB } from "../colors";

ChartJS.register(
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  customBackgroundPlugin,
  customLegendPlugin
);

export default {
  name: "bar-card",

  props: {
    title: {
      type: String,
      default: "Bar Card",
    },

    step: {
      type: Number,
      default: 1,
    },

    labels: {
      type: Array,
      required: true,
    },

    datasets: {
      type: Array,
      required: true,
    },

    scaleType: {
      type: String,
      default: "linear",
    },

    stacked: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Bar,
  },

  computed: {
    barChartData() {
      return {
        labels: this.labels,
        datasets: this.datasets,
      };
    },

    barChartOptions() {
      return {
        id: "bar-chart-id",
        labelStep: this.step,
        maintainAspectRatio: false,
        barThickness: 20,
        transitions: {
          show: {
            animations: {
              y: {
                from: 1000,
              },
            },
          },
          hide: {
            animations: {
              y: {
                to: 1000,
              },
            },
          },
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            type: this.scaleType,
            stacked: this.stacked,
            ticks: {
              font: {
                family: "Charlevoix Pro",
                size: 11,
              },
              color: (item) => {
                const step =
                  item.scale.ticks[1].value - item.scale.ticks[0].value;
                let mid = Math.floor(item.scale.max / 2);
                while (mid % step) mid += 1;
                switch (item.tick.value) {
                  case item.scale.max:
                  case mid:
                    return "#214353";
                  default:
                    return "#f9f9f9";
                }
              },
            },
            grid: {
              color: "#f9f9f9",
              lineWidth: 2,
            },
          },
          x: {
            stacked: this.stacked,
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: "Charlevoix Pro",
                size: 11,
              },
              color: (e) => (e.index % this.step ? "#f9f9f9" : "#214353"),
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            align: "start",
            labels: {
              color: "#214353",
              font: {
                family: "Charlevoix Pro",
                size: 14,
                letterSpacing: 0.7,
              },
              useBorderRadius: true,
              borderRadius: 5,
              boxWidth: 9,
              boxHeight: 21,
            },
          },
        },
      };
    },
  },

  created() {
    const radius = 4;
    const borderRadius = {
      topLeft: radius,
      topRight: radius,
      bottomLeft: radius,
      bottomRight: radius,
    };
    const colors =
      this.datasets.length <= 3
        ? defaultColor(3)
        : gradiant(this.datasets.length).map((color) => {
            const col = HSVtoRGB(color / 100, 1, 1);
            return RGBtoHexa(col.r, col.g, col.b);
          });
    this.datasets.forEach((set) => {
      if (!set.backgroundColor) set.backgroundColor = colors.shift();
      set.borderSkipped = false;
      set.borderRadius = borderRadius;
      set.borderWidth = 1;
      set.borderColor = "rgba(0,0,0,0)";
    });
  },

  watch: {
    datasets() {
      const radius = 4;
      const borderRadius = {
        topLeft: radius,
        topRight: radius,
        bottomLeft: radius,
        bottomRight: radius,
      };
      const colors =
        this.datasets.length <= 3
          ? defaultColor(3)
          : gradiant(this.datasets.length).map((color) => {
              const col = HSVtoRGB(color / 100, 1, 1);
              return RGBtoHexa(col.r, col.g, col.b);
            });
      this.datasets.forEach((set) => {
        if (!set.backgroundColor) set.backgroundColor = colors.shift();
        set.borderSkipped = false;
        set.borderRadius = borderRadius;
        set.borderWidth = 1;
        set.borderColor = "rgba(0,0,0,0)";
      });
    },
  },
};
</script>
<style>
html {
  overflow-y: auto !important;
}
.v-application {
  font-family: "Charlevoix Pro";
}
</style>
<style scoped>
.bar-card {
  background-color: #f9f9f9;
  font-family: "Charlevoix Pro";
  font-size: 14px;
}

.card-title {
  letter-spacing: 1.1px;
  color: #214353;
  opacity: 1;
  font-size: 11px/13px;
}
</style>
