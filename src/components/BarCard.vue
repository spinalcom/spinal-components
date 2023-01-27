<template>
  <v-card
    class="bar-card pa-1 rounded-lg d-flex flex-column"
    elevation="5"
    outlined
  >
    <v-card-title class="card-title pa-3 text-uppercase flex-shrink-1">{{
      title
    }}</v-card-title>
    <div class="d-flex flex-column flex-grow-1">
      <slot name="extras" class="flex-shrink-1"></slot>
      <div class="flex-grow-1">
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
              color: (item) => {
                const max = (Math.floor((item.scale.max - 1) / 10) + 1) * 10;
                item.scale.end = max;
                return !item.tick.value || item.tick.value % Math.floor(max / 2)
                  ? item.tick.value === item.scale.max
                    ? "#214353"
                    : "#f9f9f9"
                  : "#214353";
              },
            },
            grid: {
              color: "#f9f9f9",
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
          },
        },
        plugins: {
          legend: {
            display: true,
            align: "start",
            labels: {
              color: "#214353",
              font: {
                size: 20,
              },
              useBorderRadius: true,
              borderRadius: 5,
              boxWidth: 10,
              boxHeight: 25,
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
    this.datasets.forEach((set) => {
      set.borderSkipped = false;
      set.borderRadius = borderRadius;
      set.borderWidth = 1;
      set.borderColor = "rgba(0,0,0,0)";
    });

    // Enregistrement du plugin de légende en HTML/CSS
  },
};
</script>

<style scoped>
.bar-card {
  background-color: #f9f9f9;
}

.card-title {
  letter-spacing: 1.1px;
  color: #214353;
  opacity: 1;
  font-size: 11px/13px;
}
</style>
