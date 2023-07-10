<template>
  <v-card
    class="line-card pa-1 rounded-lg d-flex flex-column flex-grow-1"
    outlined
  >
    <v-card-title
      class="card-title pa-3 text-uppercase flex-shrink-1 justify-space-between"
      style="height: fit-content !important"
    >
      <p class="mb-0">
        {{ title }} <b>{{ titleDetails }}</b>
      </p>
      <div
        class="d-flex align-center mln6"
        style="position: absolute; right: calc(50% - 55px)"
      >
        <v-icon icon class="pr-3" size="default">mdi-chart-line</v-icon>
        <v-switch
          @click="$emit('stack', switchValue)"
          style="margin-top: 1px; padding: 0px; height: 24px"
          v-model="switchValue"
          inset
          color="blue-grey"
          dense
        />
        <v-icon icon size="default">mdi-layers-triple</v-icon>
      </div>
      <div v-if="next && prev" style="height: 40px">
        <v-btn
          @click="$emit('nav', -1)"
          style="
            font-size: 14px !important;
            border-radius: 10px;
            min-width: 36px !important;
            box-shadow: none;
          "
          ><v-icon icon>mdi-chevron-left</v-icon> {{ prev }}</v-btn
        >
        <v-btn
          @click="$emit('nav', +1)"
          style="
            font-size: 14px !important;
            border-radius: 10px;
            min-width: 36px !important;
            box-shadow: none;
          "
          >{{ next }}<v-icon icon>mdi-chevron-right</v-icon></v-btn
        >
      </div>
    </v-card-title>
    <div class="d-flex flex-column flex-grow-1 flex-shrink-1" style="height: 0">
      <LineChart
        :data="lineChartData"
        :chart-id="'2'"
        :options="lineChartOptions"
        class="bar-height"
      />
    </div>
  </v-card>
</template>

<script>
import { Line as LineChart } from "vue-chartjs";
import { customBackgroundPlugin } from "../plugins/canvasPlugins";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler,
} from "chart.js";
import {
  defaultColor,
  gradiant,
  hexaToRGB,
  HSVtoRGB,
  RGBtoHexa,
} from "../colors";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler,
  customBackgroundPlugin
);

export default {
  name: "line-card",
  props: {
    title: {
      type: String,
      default: "Line Card",
    },
    step: {
      type: Number,
      default: 1,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    titleDetails: { type: String, required: false },
    next: { type: String, required: false },
    prev: { type: String, required: false },
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
    optional: {
      type: Object,
      default: () => {
        return { unit: "", footer: "Total" };
      },
      required: false,
    },
  },

  components: {
    LineChart,
  },

  data: () => ({
    switchValue: false,
  }),

  computed: {
    lineChartData() {
      return {
        labels: this.labels,
        datasets: this.datasets,
      };
    },
    lineChartOptions() {
      return {
        id: "line-chart-id",
        pointStyle: false,
        fill: this.fill && this.switchValue,
        labelStep: this.step,
        maintainAspectRatio: false,
        borderWidth: 2,
        tension: 0.3,
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
            stacked: this.switchValue,
            border: {
              display: false,
            },
            type: this.scaleType,
            grid: {
              color: "#f9f9f9",
              lineWidth: 2,
            },
            ticks: {
              font: {
                family: "Charlevoix Pro",
                size: 11,
              },
              color: "#214353",
            },
          },
          x: {
            stacked: this.switchValue,
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              callback: (v, i) => {
                if (!(v % this.step || [0, this.labels.length - 1].includes(i)))
                  return this.labels[i];
              },
              font: {
                family: "Charlevoix Pro",
                size: 11,
              },
              color: "#214353",
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
        interaction: {
          mode: "nearest",
          axis: "xy",
          intersect: false,
          callbacks: {
            label: (tooltipItem) =>
              `${tooltipItem.dataset.label}: ${tooltipItem.raw} ${this.optional.unit}`,
            footer: (data) => {
              let total = data.reduce((a, b) => a + b.raw, 0);
              return `${this.optional.footer}: ${total} ${this.optional.unit}`;
            },
            labelColor: (context, i) => ({
              borderColor: "rgba(0,0,0,0)",
              backgroundColor: context.dataset.borderColor,
            }),
          },
        },
      };
    },
  },

  created() {
    this.switchValue = this.stacked;
    const colors =
      this.datasets.length <= 3
        ? defaultColor(3)
        : gradiant(this.datasets.length).map((color) => {
            const col = HSVtoRGB(color / 100, 1, 1);
            return RGBtoHexa(col.r, col.g, col.b);
          });
    this.datasets.forEach((set) => {
      set.borderColor = set.borderColor || colors.shift();
      const { r, g, b } = hexaToRGB(set.borderColor);
      set.backgroundColor = set.backgroundColor || `rgba(${r},${g},${b},0.3)`;
    });
    // Enregistrement du plugin de légende en HTML/CSS
  },

  watch: {
    datasets() {
      const colors =
        this.datasets.length <= 3
          ? defaultColor(3)
          : gradiant(this.datasets.length).map((color) => {
              const col = HSVtoRGB(color / 100, 1, 1);
              return RGBtoHexa(col.r, col.g, col.b);
            });
      this.datasets.forEach((set) => {
        set.borderColor = set.boederColor || colors.shift();
        const { r, g, b } = hexaToRGB(set.borderColor);
        set.backgroundColor = set.backgroundColor || `rgba(${r},${g},${b},0.3)`;
      });
    },
  },
};
</script>

<style scoped>
.line-card {
  background-color: #f9f9f9;
}
.card-title {
  letter-spacing: 1.1px;
  color: #214353;
  opacity: 1;
  font-size: 20px !important;
}
.bar-height {
  height: 100%;
}
::v-deep .theme--light.v-input--switch .v-input--switch__thumb,
.theme--light.v-input--switch .v-input--switch__track {
  color: #607d8b !important;
}
</style>
