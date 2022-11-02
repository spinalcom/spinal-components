<template>
  <v-app>
    <spinal-navigator class="ma-2 pa-1" v-model="nav" :path.sync="path" :max-depth="2" :expand-selector="onopen"></spinal-navigator>
    <v-main v-if="loaded" style="position: absolute; width: 100%">
      <download-button :file-name="'fichier test'" :data="table" class="ma-2"></download-button>
      <div class="d-flex flex-row">
        <pie-card :title="'Test'" :pie-chart-data="pie"></pie-card>
        <bar-card :title="'Test 2'" :labels="barLabels" :datasets="barDatas"></bar-card>
      </div>
      <div class="d-flex flex-row">
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
      <paginated-table class="ma-2" :table-data="tableData" :height="tableHeight"></paginated-table>

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
    </v-main>
    <loading-page v-else></loading-page>
  </v-app>
</template>

<script>
import TimeSelector from "@/components/TimeSelector.vue";
import PieCard from "@/components/PieCard.vue";
import BarCard from "@/components/BarCard.vue";
import StatsCard from "@/components/StatsCard.vue";
import DownloadButton from "@/components/DownloadButton.vue";
import PaginatedTable from "@/components/PaginatedTable.vue";
import SpaceSelector from "@/components/SpaceSelector";
import SpinalNavigator from "@/components/SpinalNavigator";
import DoubleStatCard from "@/components/DoubleStatCard";
import LoadingPage from "@/components/LoadingPage";
let i = 0;
export default {
  name: 'App',

  components: {
    LoadingPage,
    DoubleStatCard,
    SpinalNavigator,
    //TimeSelector,
    //SpaceSelector,
    PaginatedTable,
    DownloadButton,
    StatsCard,
    BarCard,
    PieCard,
  },

  data: () => ({
    loaded: false,
    path: {},
    nav: {
      element: { name: "Liste", title: "Titre", dynamicId: 0, color: '#f00' },
      period: { name: "SEMAINE", value: "week" },
    },
    el: { name: "Liste", title: "Titre", dynamicId: 0, color: '#f00' },
    time: { name: "SEMAINE", value: "week" },
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
    table: []
  }),

  computed: {
    tableHeight() {
      return window.innerHeight * 0.295
    },
    tableData() {
      return this.table;
    },
  },

  methods: {
    async onopen() {
      return [
        { name: "étiquette rouge plutot rose", color: '#f56', dynamicId: ++i },
        { name: "étiquette verte", color: '#6f5', dynamicId: ++i },
        { name: "étiquette bleue", color: '#56f', dynamicId: ++i }
      ]

    }
  },

  mounted() {
    setTimeout(() => this.loaded = true, 5000)
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
        c:11,
        d:10
      }
    ], 6000)
  }
}

</script>

<style scoped lang="scss">
.pie-card {
  width: 30%;
}
.bar-card {
  width: 70%;
}
.stat-card {
  width: 25%;
}
</style>