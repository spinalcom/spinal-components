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
import { Legend, BarElement, LinearScale, CategoryScale, Chart as ChartJS } from "chart.js";

ChartJS.register(Legend, BarElement, CategoryScale, LinearScale)

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
    }
  },

  components: {
    Bar
  },

  data: () => ({
    barChartOptions: {
      maintainAspectRatio: false,
      borderRadius: 4,
      barThickness: 20,
      plugins: {
        legend: {
          align: "start",
          labels: {
            boxWidth: 7,
            boxHeight: 15,
          },
        },
      },
    },
  }),

  computed: {
    barChartData() {
      return {
        labels: this.labels,
        datasets: this.datasets
      }
    }
  }
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