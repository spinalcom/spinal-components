<template>
  <v-card
    id="prediction"
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
      <Bar :data="barChartData" :chart-id="'1'" :options="barChartOptions" />
    </div>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  BarElement,
  LinearScale,
  CategoryScale,
  LogarithmicScale,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, LogarithmicScale);

export default {
  name: "predictive-bar-card",

  props: {
    title: {
      type: String,
      default: "Predictive Bar Card",
    },

    labels: {
      type: Array,
      required: true,
    },

    estimations: {
      type: Array,
      required: true,
    },

    currentLabel: {
      type: String,
      required: true,
    },

    currentValue: {
      type: Number,
      default: 0,
    },

    step: {
      type: Number,
      default: 1,
    },
  },

  components: {
    Bar,
  },

  computed: {
    barChartData() {
      const index = this.labels.indexOf(this.currentLabel);
      const currentData = [];
      for (const i in this.estimations)
        currentData.push(i == index ? this.currentValue : 0);
      const datasets = [
        {
          data: currentData,
          backgroundColor: currentData.map((h, i) =>
            i == index ? "#ff7612" : "#f9f9f9"
          ),
          borderSkipped: false,
          borderRadius: 10,
        },
        {
          data: this.estimations,
          backgroundColor: "#d5d5d5",
          borderSkipped: false,
          borderRadius: 10,
        },
      ];
      return {
        labels: this.labels,
        datasets,
      };
    },

    barChartOptions() {
      return {
        maintainAspectRatio: false,
        barThickness: () => {
          const doc = document.querySelector("#prediction");
          const can = doc.querySelector("canvas");
          const width = Math.floor(can.width / (this.labels.length || 1));
          return width > 18 ? 15 : width - 3;
        },
        scales: {
          y: {
            beginAtZero: true,
            border: {
              display: false,
            },
            type: this.scaleType,
            ticks: {
              display: false,
            },
            grid: {
              color: "#f9f9f9",
            },
          },
          x: {
            stacked: true,
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
            display: false,
          },
        },
      };
    },
  },
};
</script>
<style>
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
