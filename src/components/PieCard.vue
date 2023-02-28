<template>
  <v-card
    class="pie-card pa-1 rounded-lg d-flex flex-column"
    elevation="5"
    outlined
  >
    <v-card-title
      style="height: 56px"
      class="card-title text-uppercase flex-shrink-1 pa-3"
      >{{ title }}
    </v-card-title>
    <div
      style="height: calc(100% - 56px)"
      class="d-flex flex-row flex-fill justify-center pb-3"
    >
      <div style="aspect-ratio: 1/1">
        <pie :data="pieData" :id="'2'" :options="pieChartOptions" />
      </div>
      <div id="pie-legend-container"></div>
    </div>
  </v-card>
</template>

<script>
import { Pie } from "vue-chartjs";
import { customBackgroundPlugin } from "../plugins/canvasPlugins";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { defaultColor, hexaToHSV, singleColorGradiant } from "../colors";

ChartJS.register(
  ArcElement,
  Title,
  Legend,
  Tooltip,
  CategoryScale,
  customBackgroundPlugin
);

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
        cutout: 0,
        autopadding: false,
        plugins: {
          legend: {
            display: false,
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
      required: false,
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
        labels: sorted.map((t) => `${t.value}: ${t.label}`),
        datasets: [
          {
            backgroundColor: this.color
              ? singleColorGradiant(
                  sorted.length,
                  hexaToHSV(this.color).h * 100
                )
              : defaultColor(7),
            data: sorted.map((t) => t.value),
          },
        ],
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
.pie-card {
  background: #f9f9f9 0% 0% no-repeat padding-box;
}

.card-title {
  letter-spacing: 1.1px;
  color: #214353;
  opacity: 1;
  font-size: 20px;
}
</style>
