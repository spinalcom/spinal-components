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
        :file-name="'Avengers'"
        :data="table"
        class="ma-2"
      ></download-button>
      <ticket-card style="width: 20%" class="ma-5"></ticket-card>
      <!--<div class="d-flex flex-column">
        <bar-card
          class="ma-2"
          style="width: 95%; height: 400px"
          :title="'Test 2'"
          :labels="barLabels"
          :datasets="barDatas"
        >
          <template v-slot:extras>
            <v-btn></v-btn>
          </template>
        </bar-card>
        <pie-card
          style="width: 100%; height: 300px"
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
        <LoadingCard class="pa-4" style="width: 25%" />
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
      <paginated-table
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
let i = 0;
export default {
  name: "App",

  components: {
    LoadingPage,
    //DoubleStatCard,
    SpinalNavigator,
    //PaginatedTable,
    DownloadButton,
    //StatsCard,
    //BarCard,
    //PieCard,
    TicketCard,
  },

  data: () => ({
    loaded: true,
    path: {},
    nav: {
      element: { name: "Liste", title: "Titre", dynamicId: 0, color: "#f00" },
      period: { name: "SEMAINE", value: "week" },
    },
    ticket: {
      dynamicId: 4142128896,
      staticId: "3926-cb81-46b0-1845705e630",
      name: "AUTRES DEMANDES",
      type: "SpinalSystemServiceTicketTypeTicket",
      priority: 2,
      creationDate: 1667907315248,
      description:
        "La table de la salle H2.59 bouge,\nIl faudrait la resserrer merci",
      declarer_id: "Mission",
      elementSelected: {
        dynamicId: 123277360,
        staticId: "SpinalNode-1652189a-86aa-3c0e-193d-5c3141c2dc18-17a86bca7e9",
        name: "2",
        type: "geographicFloor",
      },
      userName: "BELA NTE ANDREE",
      gmaoId: 12080,
      gmaoDateCreation: 1667906700000,
      process: {
        dynamicId: 123241840,
        staticId: "SpinalNode-f0c265b3-8427-65d4-fcfa-08272214f922-17a86d5b02e",
        name: "AUTRES",
        type: "SpinalServiceTicketProcess",
      },
      step: {
        dynamicId: 4141029264,
        staticId: "SpinalNode-c555dd16-534c-a698-0e7d-3646e9817e01-17a86d5b032",
        name: "Réalisation partielle",
        type: "SpinalSystemServiceTicketTypeStep",
        color: "#00ffff",
        order: 2,
      },
      workflowId: 64241104,
      workflowName: "Ticket Mission",
      annotation_list: [
        {
          userName: "",
          date: 1667907315252,
          type: "text",
          message:
            "La table de la salle H2.59 bouge,\nIl faudrait la resserrer merci",
        },
      ],
      file_list: [],
      log_list: [
        {
          userName: "BELA NTE ANDREE",
          date: 1667907315300,
          event: "created",
          ticketStaticId: "3926-cb81-46b0-1845705e630",
        },
        {
          userName: "BELA NTE ANDREE",
          date: 1667907315303,
          event:
            "Backward from Attente de lect.avant Execution to Attente de réalisation",
          ticketStaticId: "3926-cb81-46b0-1845705e630",
        },
        {
          userName: "BELA NTE ANDREE",
          date: 1668588621835,
          event:
            "Backward from Attente de réalisation to Réalisation partielle",
          ticketStaticId: "3926-cb81-46b0-1845705e630",
        },
      ],
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
    table: [
      {
        nom: "Hulk",
        "puissance (%)": 98,
        "vitesse (%)": 51,
        "agilité (%)": 44,
        "technique (%)": 43,
      },
      {
        nom: "Iron-Man",
        "puissance (%)": 85,
        "vitesse (%)": 95,
        "agilité (%)": 75,
        "technique (%)": 82,
      },
      {
        nom: "Captain America",
        "puissance (%)": 80,
        "vitesse (%)": 79,
        "agilité (%)": 93,
        "technique (%)": 89,
      },
      {
        nom: "Thor",
        "puissance (%)": 90,
        "vitesse (%)": 86,
        "agilité (%)": 81,
        "technique (%)": 92,
      },
      {
        nom: "Black Widow",
        "puissance (%)": 60,
        "vitesse (%)": 77,
        "agilité (%)": 95,
        "technique (%)": 87,
      },
      {
        nom: "Hawk",
        "puissance (%)": 64,
        "vitesse (%)": 72,
        "agilité (%)": 82,
        "technique (%)": 90,
      },
    ],
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
