<template>
    <v-card
      class="line-card pa-1 rounded-lg d-flex flex-column"
      elevation="5"
      outlined
      >
      <v-card-title class="card-title pa-3 text-uppercase flex-shrink-1">{{ title }}</v-card-title>
        <div class="d-flex flex-column flex-grow-1">
        <slot name="extras" class="flex-shrink-1"></slot>
        <div class="flex-grow-1">
            <LineChart
              :chart-data="lineChartData"
              :chart-id="'99'"
              :chart-options="lineChartOptions"
              class="bar-height white"
              />
        </div>
        </div>
    </v-card>
</template>
  
  <script>
  import { Line as LineChart } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Filler } from 'chart.js';
  ChartJS.register( Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Filler );
  export default {
    name: "line-card",
    props: {
      title: {
        type: String,
        default: "Line Card",
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
      optional: {
        type: Object,
        default: () => {return {unit: '', footer: 'Total'}},
        required: false
      }
    },
    components: {
      LineChart,
    },
    computed: {
      lineChartData() {
        return {
          labels: this.labels,
          datasets: this.datasets,
        };
      },
      lineChartOptions() {
        return {
          maintainAspectRatio: false,
          borderWidth: 2,
          tension: 0.1,
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
              stacked: false,
              border: {
                display: false,
              },
              type: this.scaleType,
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
                  size: 12,
                },
                useBorderRadius: true,
                borderRadius: 5,
                boxWidth: 10,
                boxHeight: 25,
              },
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
            callbacks: {
              label: (tooltipItem, data) => {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw} ${this.optional.unit}`;
              },
              footer: (data) => {
                let total = data.reduce((a, b) => a+b.raw, 0);
                return `${this.optional.footer}: ${total} ${this.optional.unit}`;
              },
            }
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
  .line-card {
    background-color: #f9f9f9;
  }
  .card-title {
    letter-spacing: 1.1px;
    color: #214353;
    opacity: 1;
    font-size: 11px/13px;
  }
.bar-height {
  height: 100%;
}
  </style>