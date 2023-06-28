<template>
  <v-card class="d-flex flex-column table-card rounded-lg" outlined>
    <v-card-title style="height: 56px" class="text-uppercase ma-2">{{
      title
    }}</v-card-title>
    <div
      ref="tableContainer"
      style="height: calc(100% - 56px)"
      class="d-flex flex-column mx-6 mb-6"
    >
      <div ref="tableHead">
        <slot name="extras" class="flex-shrink-1"></slot>
      </div>
      <div ref="dataTable" class="d-flex flex-fill">
        <v-data-table
          item-key="name"
          class="elevation-1 table-data d-flex flex-column flex-grow-1 flex-shrink-1"
          loading-text="Chargement des données"
          :loading="!loaded"
          fixed-header
          :headers="headers"
          :height="tableHeight"
          :items="tableData"
          :footer-props="{
            prevIcon: 'mdi-menu-left',
            nextIcon: 'mdi-menu-right',
            showCurrentPage: true,
            itemsPerPageAllText: 'Tout',
          }"
        >
          <v-progress-linear
            v-show="!loaded"
            slot="progress"
            color="accent"
            class="progress-bar"
            indeterminate
          ></v-progress-linear>
          <template v-slot:no-data> Pas de données disponibles </template>
        </v-data-table>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "PaginatedTable",

  props: {
    title: {
      type: String,
      default: "Table Card",
    },

    loaded: {
      type: Boolean,
      default: true,
    },

    tableData: {
      type: Array,
      required: true,
    },

    headerOptions: {
      type: Array,
      required: false,
    },
  },

  data: () => ({
    tableHeight: 96,
    pageCount: 0,
    page: 1,
  }),

  computed: {
    headers() {
      const headers = Object.keys(this.tableData[0]);
      return this.loaded
        ? this.headerOptions
          ? this.headerOptions.map((h, i) => {
              h.value = headers[i];
              h.text = h.text || headers[i];
              return h;
            })
          : headers.map((e) => ({
              text: e[0].toUpperCase() + e.substring(1),
              value: e,
            }))
        : [];
    },
  },

  mounted() {
    const { dataTable, tableContainer, tableHead } = this.$refs;
    this.tableHeight = dataTable.clientHeight - 59;
    window.onresize = () => {
      this.tableHeight =
        tableContainer.clientHeight - (tableHead.clientHeight + 85);
    };
  },
};
</script>

<style scoped>
.v-data-table {
  font-size: 14px;
}

.table-card {
  background-color: #f9f9f9;
}

.progress-bar {
  margin-left: -16px;
  width: calc(100% + 32px);
}
</style>
