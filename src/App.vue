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
      <!--<ticket-details
        v-model="ticketDialog"
        :detailedTicket="ticket"
        :baseURL="'https://api-subsidio.spinalcom.com/api/v1/node/'"
      ></ticket-details>-->
      <!--<ticket-card style="width: 20%" class="ma-5"></ticket-card>-->
      <!--<div class="d-flex flex-column" style="height: calc(100% - 70px)">-->
      <bar-card
        class="ma-2"
        style="height: 50%; width: 99%"
        :title="'Test 2'"
        :labels="barLabels"
        :datasets="barDatas"
      >
        <template v-slot:extras>
          <v-btn> Pour afficher d'autres informations </v-btn>
        </template>
      </bar-card>
      <pie-card
        style="width: 40%; height: 300px"
        class="ma-2"
        :title="'Test'"
        :pie-chart-data="pie"
      ></pie-card>
      <!--<div class="d-flex flex-row">
          <stats-card
            :value="-255500"
            :unit="'Km'"
            :title="'parcourus'"
            :subtitle="'Aujourd\'hui'"
            :color="'#956518'"
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
          <stats-card
            :value="25"
            :unit="'Km'"
            :title="'parcourus'"
            :subtitle="'Aujourd\'hui'"
          ></stats-card>
        </div>
      </div>-->
      <paginated-table class="ma-2" style="height: 50%" :table-data="tableData">
        <template v-slot:extras>Ceci est du contenu supplémentaire</template>
      </paginated-table>

      <!--<double-stat-card
        class="ml-2"
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
      ></double-stat-card>-->
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
import TicketDetails from "./components/TicketDetails";

let i = 0;
export default {
  name: "App",

  components: {
    LoadingPage,
    //DoubleStatCard,
    SpinalNavigator,
    PaginatedTable,
    DownloadButton,
    //TicketDetails,
    //StatsCard,
    BarCard,
    PieCard,
    //TicketCard,
  },

  data: () => ({
    loaded: true,
    path: {},
    ticketDialog: true,
    nav: {
      element: { name: "Liste", title: "Titre", dynamicId: 0, color: "#f00" },
      period: { name: "SEMAINE", value: "week" },
    },
    ticket: {
      dynamicId: 123236448,
      staticId: "SpinalNode-7c7beef2-bd8f-a86d-41f5-2f921dac4182-17c7f322bf3",
      name: "TEST MB <> Autre - Autre - Hydra",
      type: "SpinalSystemServiceTicketTypeTicket",
      priority: 2,
      creationDate: 1634221566963,
      description:
        "User: Occupant Vinci \nDescription: TEST MB <> Autre - Autre - Hydra",
      declarer_id: "",
      elementSelected: {
        dynamicId: 54224368,
        staticId: "SpinalNode-c824cb4b-c2f5-211c-74ee-fa4ec7a86109-17a86bc2eb1",
        name: "7",
        type: "geographicFloor",
      },
      userName: "ARCHIPEL_MB MonBuilding",
      gmaoId: 613,
      gmaoDateCreation: 1634221560000,
      process: {
        dynamicId: 123241840,
        staticId: "SpinalNode-f0c265b3-8427-65d4-fcfa-08272214f922-17a86d5b02e",
        name: "AUTRES",
        type: "SpinalServiceTicketProcess",
      },
      step: {
        dynamicId: 123239200,
        staticId: "SpinalNode-760725a5-29e4-cd6b-458b-2e4cb551cc95-17a86d5b032",
        name: "Attente de lect.avant Execution",
        type: "SpinalSystemServiceTicketTypeStep",
        color: "#0804ef",
        order: 0,
      },
      workflowId: 64241104,
      workflowName: "Ticket Mission",
      annotation_list: [
        {
          userName: "unknow",
          date: 1634221566964,
          type: "text",
          message:
            "User: Occupant Vinci \nDescription: TEST MB <> Autre - Autre - Hydra",
        },
        {
          userName: "admin",
          date: 1682584656289,
          type: "img",
          message: "Capture d’écran du 2022-12-23 14-07-46.png",
        },
        {
          userName: "admin",
          date: 1683029618536,
          type: "img",
          message: "Capture d’écran du 2023-02-24 19-30-26.png",
        },
        {
          userName: "admin",
          date: 1683029641470,
          type: "img",
          message: "Capture d’écran du 2023-04-27 14-15-37.png",
        },
      ],
      file_list: [
        {
          dynamicId: 9672720672,
          Name: "Capture d’écran du 2022-12-23 14-07-46.png",
        },
        {
          dynamicId: 9672818112,
          Name: "Capture d’écran du 2023-02-24 19-30-26.png",
        },
        {
          dynamicId: 9672839200,
          Name: "Capture d’écran du 2023-04-27 14-15-37.png",
        },
      ],
      log_list: [
        {
          date: 1634221566973,
          event: "created",
          ticketStaticId:
            "SpinalNode-7c7beef2-bd8f-a86d-41f5-2f921dac4182-17c7f322bf3",
        },
      ],
      buildingId: "e6b7-a12f-cc1d-1853a5dba9a",
      buildingName: "BOS test",
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
