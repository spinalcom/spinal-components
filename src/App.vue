<template>
  <v-app>
    <v-main>
      <space-selector class="ma-2" :root-element="el" :max-depth="3" :onopen="onopen"></space-selector>
      <download-button :file-name="'fichier test'" :data="table" class="ma-2"></download-button>
      <div class="d-flex flex-row">
        <pie-card :title="'Test'" :pie-chart-data="pie"></pie-card>
        <bar-card :title="'Test 2'" :labels="barLabels" :datasets="barDatas"></bar-card>
      </div>
      <div class="d-flex flex-row">
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
        <stats-card
            :value="25"
            :unit="'Km'"
            :title="'parcourus'"
            :subtitle="'Aujourd\'hui'"
        ></stats-card>
      </div>
      <paginated-table class="ma-2" :table-data="tableData" :height="tableHeight"></paginated-table>
    </v-main>
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

export default {
  name: 'App',

  components: {
    SpaceSelector,
    PaginatedTable,
    DownloadButton,
    StatsCard,
    BarCard,
    PieCard,
  },

  data: () => ({
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
    }
  },

  methods: {
    async onopen(item) {
      return [
        { name: "aiud", color: '#f56', dynamicId: 1 },
        { name: "bhsb", color: '#f56', dynamicId: 2 },
        { name: "oisqjx", color: '#f56', dynamicId: 3 },
        { name: "bhvfu", color: '#f56', dynamicId: 4 },
        { name: "dscgf", color: '#f56', dynamicId: 5 },
      ]
    }
  },

  mounted() {
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