<template>
  <v-card class="bar-card pa-2 ma-2 rounded-lg" elevation="5" outlined>
    <v-card-title class="card-title text-uppercase"
    >{{ title }}
    </v-card-title>
    <Bar
        :chart-data="barChartData"
        :chart-id="'1'"
        :chart-options="barChartOptions"
        class="bar-height white"
    />
  </v-card>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Legend, BarElement, LinearScale, CategoryScale, LogarithmicScale, Chart as ChartJS } from "chart.js";

ChartJS.register(Legend, BarElement, CategoryScale, LinearScale, LogarithmicScale)

export default {
  name: "bar-card",

  props: {
    title: {
      type: String,
      default: 'Bar Card'
    },

    labels: {
      type: Array,
      required: true
    },

    datasets: {
      type: Array,
      required: true
    },

    scaleType: {
      type: String,
      default: 'linear'
    }
  },

  components: {
    Bar
  },

  computed: {
    barChartData() {
      return {
        labels: this.labels,
        datasets: this.datasets
      }
    },

    barChartOptions() {
      return  {
        maintainAspectRatio: false,
        responsive: true,
        borderRadius: 8,
        barThickness: 20,
        borderWidth: 2,
        borderColor: '#fff',
        scales: {
          y: {
            type: this.scaleType
          }
        },
        plugins: {
          legend: {
            align: "start",
            labels: {
              boxWidth: 10,
              boxHeight: 20,
            },
            font: {
              family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              size: 14
            }
          },
        },
      }
    }
  },
}
</script>

<style scoped>
.card-title {
  height: 20%;
}

.bar-height {
  height: 80%;
}
</style>