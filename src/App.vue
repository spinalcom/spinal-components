<template>
  <v-app id="application">
    <spinal-navigator
      class="ma-2 pa-1"
      v-model="nav"
      :path.sync="path"
      :max-depth="2"
      :expand-selector="onopen"
    ></spinal-navigator>
    <v-main
      v-if="loaded"
      style="position: absolute; width: 100%; bottom: 0; top: 0; height: 100%"
    >
      <download-button
        :file-name="'fichier test'"
        :data="table"
        class="ma-2"
      ></download-button>
      <div class="d-flex flex-column">
        <bar-card
          class="ma-2"
          style="width: 95%; height: 400px"
          :title="'Test 2'"
          :labels="barLabels"
          :datasets="barDatas"
        >
        </bar-card>
        <pie-card
          style="width: 100%"
          class="ma-2"
          :title="'Test'"
          :pie-chart-data="pie"
        ></pie-card>
      </div>
      <div class="d-flex flex-row">
        <stats-card
          :value="-255500"
          :unit="'Km'"
          :title="'parcourus'"
          :subtitle="'Aujourd\'hui'"
          :color="'#956518'"
        ></stats-card>
        <loading-card class="pa-4" style="width: 25%" />
        <stats-card
          :value="25"
          :unit="'Km'"
          :title="'parcourus'"
          :subtitle="'Aujourd\'hui'"
        ></stats-card>
        <stats-card
          :value="25"
          :unit="'Km'"
          :title="'parcourus'"
          :subtitle="'Aujourd\'hui'"
        ></stats-card>
        <stats-card
          :value="25"
          :unit="'Km'"
          :title="'parcourus'"
          :subtitle="'Aujourd\'hui'"
        ></stats-card>
      </div>
      <!--<paginated-table
        class="ma-2"
        :table-data="tableData"
        :height="tableHeight"
      ></paginated-table>

      <double-stat-card
        style="width: 25%"
        :first-value="25550"
        :first-unit="'Km'"
        :first-title="'parcourus'"
        :first-subtitle="'Aujourd\'hui'"
        :second-value="1000"
        :second-unit="'Km'"
        :second-title="'marchés'"
        :second-type="'comparison'"
        :second-compared="'4%'"
        :second-subtitle="'par rapport à la distance totale'"
        :second-color="'#125684'"
      ></double-stat-card>
      <ticket-card class="ma-2"></ticket-card>-->
    </v-main>
    <loading-page v-else></loading-page>
  </v-app>
</template>

<script>
import PieCard from "./components/PieCard.vue";
import BarCard from "./components/BarCard.vue";
import StatsCard from "./components/StatsCard.vue";
import DownloadButton from "./components/DownloadButton.vue";
import PaginatedTable from "./components/PaginatedTable.vue";
import SpinalNavigator from "./components/SpinalNavigator";
import DoubleStatCard from "./components/DoubleStatCard";
import LoadingPage from "./components/LoadingPage";
import TicketCard from "./components/TicketCard";
import LoadingCard from "./components/LoadingCard.vue";

let i = 0;
export default {
  name: "App",

  components: {
    LoadingPage,
    LoadingCard,
    //DoubleStatCard,
    SpinalNavigator,
    //PaginatedTable,
    DownloadButton,
    StatsCard,
    BarCard,
    PieCard,
    //TicketCard,
  },

  data: () => ({
    loaded: true,
    path: {},
    nav: {
      element: { name: "Liste", title: "Titre", dynamicId: 0, color: "#f00" },
      period: { name: "SEMAINE", value: "week" },
    },
    pie: [
      { label: "plus tard", value: 64 },
      { label: "je m'en moque", value: 58 },
      { label: "serieux ?", value: 60 },
      { label: "Qui as dit ça ?", value: 69 },
      { label: "je m'en moque", value: 58 },
      { label: "serieux ?", value: 60 },
      { label: "Qui as dit ça ?", value: 69 },
    ],
    barLabels: [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ],
    barDatas: [
      {
        label: "Km parcourus",
        data: [15, 12, 13, 10, 21, 8, 2],
      },
      {
        label: "Km marchés",
        data: [10, 6, 11, 8, 18, 7, 1],
      },
    ],
    table: [],
  }),

  computed: {
    tableHeight() {
      return window.innerHeight * 0.295;
    },
    tableData() {
      return this.table;
    },
    pieColor() {
      return this.nav.element.color;
    },
  },

  methods: {
    async onopen() {
      return [
        { name: "étiquette rouge plutot rose", color: "#f56", dynamicId: ++i },
        { name: "étiquette verte", color: "#6f5", dynamicId: ++i },
        { name: "étiquette bleue", color: "#56f", dynamicId: ++i },
      ];
    },
  },

  mounted() {
    /*setInterval(() => {
      this.barDatas = this.barDatas.map((b) => ({
        label: b.label,
        data: [
          Math.random() * 20,
          Math.random() * 20,
          Math.random() * 20,
          Math.random() * 20,
          Math.random() * 20,
          Math.random() * 20,
          Math.random() * 20,
        ],
      }));
    }, 1000);*/
    setTimeout(
      () =>
        (this.table = [
          {
            a: 0,
            b: 1,
            c: 10,
            d: 11,
          },
          {
            a: 1,
            b: 0,
            c: 10,
            d: 11,
          },
          {
            a: 0,
            b: 1,
            c: 11,
            d: 10,
          },
          {
            a: 0,
            b: 1,
            c: 10,
            d: 11,
          },
          {
            a: 1,
            b: 0,
            c: 10,
            d: 11,
          },
          {
            a: 0,
            b: 1,
            c: 11,
            d: 10,
          },
          {
            a: 0,
            b: 1,
            c: 10,
            d: 11,
          },
          {
            a: 1,
            b: 0,
            c: 10,
            d: 11,
          },
          {
            a: 0,
            b: 1,
            c: 11,
            d: 10,
          },
          {
            a: 0,
            b: 1,
            c: 11,
            d: 10,
          },
        ]),
      6000
    );
  },
};
</script>

<style scoped lang="scss">
#application {
  background: transparent linear-gradient(121deg, #f8fafa 0%, #d6e2e6 100%) 0%
    0%;
  opacity: 1;
}

.pie-card {
  width: 20%;
}
.bar-card {
  width: 40%;
}
.stat-card {
  width: 25%;
}
</style>
