<template>
  <v-card class="pie-card ma-2 rounded-lg" elevation="5" outlined>
    <v-card-title class="card-title text-uppercase">{{ title }} </v-card-title>
    <Pie
      :chart-data="pieData"
      :chart-id="'2'"
      :chart-options="pieChartOptions"
      class="pie-height"
    />
  </v-card>
</template>

<script>
import { Pie } from "vue-chartjs/legacy";
import { Legend, ArcElement, Chart as ChartJS } from "chart.js";
import { hexaToHSV, singleColorGradiant } from "../colors";

ChartJS.register(ArcElement, Legend);

export default {
  name: "pie-card",

  components: {
    Pie,
  },

  data() {
    return {
      pieId: 1,
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 20,
              boxHeight: 20,
            },
          },
        },
      },
    };
  },

  props: {
    title: {
      type: String,
      default: "Pie Card",
    },
    pieChartData: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      default: "#f00",
    },
  },

  computed: {
    pieData() {
      const data = [...this.pieChartData];
      data.sort((e1, e2) => e1.value - e2.value).reverse();
      let sorted = [];
      if (data.length > 7) {
        for (let i = 0; i < 6; i++) sorted.push(data.shift());
        sorted.push({
          label: "ETC...",
          value: data.map((e) => e.value).reduce((e1, e2) => e1 + e2, 0),
        });
      } else sorted = data;
      return {
        labels: sorted.map((t) => t.label),
        datasets: [
          {
            backgroundColor: singleColorGradiant(
              sorted.length,
              hexaToHSV(this.color).h * 100
            ),
            data: sorted.map((t) => t.value),
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.pie-card {
  background-color: #f9f9f9;
}

.card-title {
  height: 20%;
}

.pie-height {
  height: 80%;
}
</style>
