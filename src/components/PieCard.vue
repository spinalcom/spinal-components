<template>
  <v-card
    class="pie-card pa-1 rounded-lg d-flex flex-column"
    elevation="5"
    outlined
  >
    <v-card-title class="card-title text-uppercase flex-shrink-1 pa-3"
      >{{ title }}
    </v-card-title>
    <div
      class="d-flex flex-row justify-center flex-grow-1 pb-3"
      style="max-height: 250px;"
    >
      <div>
        <Pie :data="pieData" :options="pieChartOptions" ref="pieChart" />
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
            borderRadius: 10,
          },
        ],
      };
    },
  },

  mounted() {
    this.renderChart();
  },

  methods: {
    renderChart() {
      // re-render the chart
      this.$refs.pieChart.chartInstance.resize();
    },
  },

  watch: {
    "$el.clientWidth": function (val) {
      this.renderChart();
    },
    "$el.clientHeight": function (val) {
      this.renderChart();
    },
  },
};
</script>

<style>
.v-application {
  font-family: "Charlevoix Pro";
}
</style
