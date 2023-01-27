<template>
  <v-card
    class="pie-card pa-1 rounded-lg d-flex flex-column"
    elevation="5"
    outlined
  >
    <v-card-title class="card-title text-uppercase pa-3 flex-shrink-1"
      >{{ title }}
    </v-card-title>
    <div class="d-flex flex-row justify-center flex-grow-1 pb-3">
      <div>
        <Pie :data="pieData" :id="'2'" :options="pieChartOptions" />
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
import { hexaToHSV, singleColorGradiant } from "../colors";

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
        maintainAspectRatio: false,
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
      const tab = ["#14202c", "#00c4ff", 0, 0, 0, 0, 0].fill("#cadee2", 2, 7);
      return {
        labels: sorted.map((t) => `${t.value}: ${t.label}`),
        datasets: [
          {
            backgroundColor: this.color
              ? singleColorGradiant(
                  sorted.length,
                  hexaToHSV(this.color).h * 100
                )
              : tab.reverse(),
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
  font-size: 11px/13px;
}
</style>
