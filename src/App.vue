<template>
  <v-app>
    <spinal-navigator class="ma-2 pa-1" v-model="nav" :path.sync="path" :max-depth="2" :expand-selector="onopen"></spinal-navigator>
    <v-main v-if="loaded" style="position: absolute; width: 100%; bottom: 0; top: 0">
      <download-button :file-name="'fichier test'" :data="table" class="ma-2"></download-button>
      <div class="d-flex flex-row">
        <pie-card :title="'Test'" :pie-chart-data="pie" :color="pieColor"></pie-card>
        <bar-card :title="'Test 2'" :labels="barLabels" :datasets="barDatas"></bar-card>
        <LineCard 
          :title="'CONSOMMATION D\'EAU'" 
          :titleDetails="''" 
          :labels="lineLabel" 
          :datasets="lineData" 
          :optional="lineOptions1"
          @nav="lineNav" 
          @stack="stack" 
          :stacked="stackState"
        />
      </div>
      <div class="d-flex flex-row">
        <stats-card
            :value="-255500"
            :unit="'Km'"
            :title="'parcourus'"
            :subtitle="'Aujourd\'hui'"
            :color="'#956518'"
        ></stats-card>
        <LoadingCard class="pa-4" style="width: 25%"/>
        <stats-card
            :value="25"
            :unit="'Km'"
            :title="'parcourus'"
            :subtitle="'Aujourd\'hui'"
        ></stats-card>
        <stats-card
          :value="80800"
          :title="'parcourus'"
        />
      </div>
      <paginated-table class="ma-2" :table-data="tableData" :height="tableHeight"></paginated-table>
<div class="d-flex ">
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

      <LoadingCard class="pa-4"  style="width: 25%; height: 96px"/>
    </div>  
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
import LineCard from "./components/LineCard";
import LoadingCard from "./components/LoadingCard";
let i = 0;
export default {
  name: 'App',

  components: {
    LoadingPage,
    DoubleStatCard,
    SpinalNavigator,
    PaginatedTable,
    DownloadButton,
    StatsCard,
    BarCard,
    PieCard,
    LineCard,
    LoadingCard,
  },

  data: () => ({
    lineLabel: [],
    lineData: [],
    lineOptions1: {unit: 'L', footer: 'Consommation totale du patrimoine'},
    stackState: true,
    loaded: false,
    path: {},
    nav: {
      element: { name: "Liste", title: "Titre", dynamicId: 0, color: '#233' },
      period: { name: "SEMAINE", value: "week" },
    },
    pie: [
      { label: "oui", value: 75 },
      { label: "non", value: 65 },
      { label: "peut-être", value: 15 },
      { label: "je ne sais pas", value: 42 },
      { label: "joker", value: 52 },
      { label: "plus tard", value: 64 },
      { label: "je m'en moque", value: 58 },
      { label: "serieux ?", value: 60 },
      { label: "Qui as dit ça ?", value: 69 }
    ],
    barLabels: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
    barDatas: [
      {
        label: 'Km parcourus',
        backgroundColor: '#153284',
        data: [15, 12, 13, 10, 18, 8, 2]
      },
      {
        label: 'Km marchés',
        backgroundColor: '#ff0',
        data: [10, 6, 11, 8, 18, 1, 0]
      }
    ],
    lineLabels: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
    lineDatas: [
      {
        label: 'Hydra',
        borderColor: 'rgb(54, 162, 235, 1)',
        backgroundColor: '#ff6384',
        data: [23, 6, 23, 8, 6, 1, 0],
        fill: true,
        pointRadius: 0,
      },
      {
        label: 'Mona',
        borderColor: 'rgb(255, 187, 0, 1)',
        backgroundColor: '#36a2eb',
        data: [45, 12, 13, 10, 18, 8, 2],
        fill: true,
        pointRadius: 0,
      },
      {
        label: 'Pemba',
        borderColor: 'rgb(255, 187, 0, 1)',
        backgroundColor: '#4bc0c0',
        data: [23, 32, 42, 13, 11, 14, 24],
        fill: true,
        pointRadius: 0,
      },
    ],
    lineOptions: {unit: 'L', footer: 'Consommation totale du patrimoine'},
    table: []
  }),

  computed: {
    tableHeight() {
      return window.innerHeight * 0.295
    },
    tableData() {
      return this.table;
    },
    pieColor() {
      return this.nav.element.color;
    }
  },

  methods: {
    async onopen() {
      return [
        { name: "étiquette rouge plutot rose", color: '#f56', dynamicId: ++i },
        { name: "étiquette verte", color: '#6f5', dynamicId: ++i },
        { name: "étiquette bleue", color: '#56f', dynamicId: ++i }
      ]

    },
    lineNav(payload) {
      return payload
    },
    stack(payload) {
      this.stackState = payload;
    },
  },

  mounted() {
    let res = [
    [
        "01 févr.",
        "02 févr.",
        "03 févr.",
        "04 févr.",
        "05 févr.",
        "06 févr.",
        "07 févr.",
        "08 févr.",
        "09 févr.",
        "10 févr.",
        "11 févr.",
        "12 févr.",
        "13 févr.",
        "14 févr.",
        "15 févr.",
        "16 févr.",
        "17 févr.",
        "18 févr.",
        "19 févr.",
        "20 févr.",
        "21 févr.",
        "22 févr.",
        "23 févr.",
        "24 févr.",
        "25 févr.",
        "26 févr.",
        "27 févr.",
        "28 févr."
    ],
    [
        {
            "name": "A",
            "area": 21725.549999999952,
            "dynamicId": 54227984,
            "staticId": "1c67-eb88-7338-18515cf15f6",
            "timeSeries": [
                9670,
                9591,
                8036,
                1835,
                1455,
                9188,
                5377,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "sum": 45152,
            "squareMeter": 2.0782903079553843,
            "color": "#ff6384"
        },
        {
            "name": "A",
            "area": 21725.549999999952,
            "dynamicId": 54227984,
            "staticId": "eb91-b222-681a-185544354b0",
            "timeSeries": [
                9670,
                9591,
                8036,
                1835,
                1455,
                9188,
                5377,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "sum": 45152,
            "squareMeter": 2.0782903079553843,
            "color": "#36a2eb"
        },
        {
            "name": "A",
            "area": 21725.549999999952,
            "dynamicId": 54227984,
            "staticId": "b15a-44b6-5641-18634daa002",
            "timeSeries": [
                9670,
                9591,
                8036,
                1835,
                1455,
                9188,
                5377,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "sum": 45152,
            "squareMeter": 2.0782903079553843,
            "color": "#4bc0c0"
        },
        {
            "name": "A",
            "area": 21725.549999999952,
            "dynamicId": 54227984,
            "staticId": "671f-affd-427d-1864ac77786",
            "timeSeries": [
                9670,
                9591,
                8036,
                1835,
                1455,
                9188,
                5377,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "sum": 45152,
            "squareMeter": 2.0782903079553843,
            "color": "#ff7b00"
        },
        {
            "name": "A",
            "area": 21725.549999999952,
            "dynamicId": 54227984,
            "staticId": "8ded-25e9-fe7b-1864ac79a7d",
            "timeSeries": [
                9670,
                9591,
                8036,
                1835,
                1455,
                9188,
                5377,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "sum": 45152,
            "squareMeter": 2.0782903079553843,
            "color": "#97BCC7"
        },
        {
            "name": "A",
            "area": 21725.549999999952,
            "dynamicId": 54227984,
            "staticId": "ec48-b6f3-be45-1864ac7b92c",
            "timeSeries": [
                9670,
                9591,
                8036,
                1835,
                1455,
                9188,
                5377,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "sum": 45152,
            "squareMeter": 2.0782903079553843,
            "color": "#006884"
        }
    ],
    {
        "totalArea": 130353.29999999973,
        "buildings": 6,
        "totalConsumption": 270912,
        "totalConsumptionSquareMeter": 12.469741847732307
    }
    ];
    this.lineLabel = res[0];
    this.stats = res[2];
    this.lineData = [];
    for( let i = 0; i < res[1].length; i++) {
        this.lineData.push(
          {
            label: res[1][i].name,
            backgroundColor: res[1][i].color,
            data: res[1][i].timeSeries,
            borderColor: res[1][i].color,
            pointRadius: 0,
          }
        )
      }
    setTimeout(() => this.loaded = true, 2000)
    setTimeout(() => this.table = [
      {
        a:0,
        b:1,
        c:10,
        d:11
      },
      {
        a:1,
        b:0,
        c:10,
        d:11
      },
      {
        a:0,
        b:1,
        c:11,
        d:10
      },
      {
        a:0,
        b:1,
        c:10,
        d:11
      },
      {
        a:1,
        b:0,
        c:10,
        d:11
      },
      {
        a:0,
        b:1,
        c:11,
        d:10
      },
      {
        a:0,
        b:1,
        c:10,
        d:11
      },
      {
        a:1,
        b:0,
        c:10,
        d:11
      },
      {
        a:0,
        b:1,
        c:11,
        d:10
      },
      {
        a:0,
        b:1,
        c:11,
        d:10
      }
    ], 6000)
  }
}

</script>

<style scoped lang="scss">
.v-main {
  background: transparent linear-gradient(121deg, #F8FAFA 0%, #D6E2E6 100%) 0% 0% no-repeat padding-box;
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