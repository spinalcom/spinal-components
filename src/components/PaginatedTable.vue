<template>
  <v-card
    class="ma-2 d-flex flex-column table-card rounded-lg flex-grow-1"
    elevation="5"
    outlined
  >
    <v-card-title style="height: 56px" class="text-uppercase ma-2">{{
      title
    }}</v-card-title>
    <div style="height: calc(100% - 56px)" class="d-flex flex-column">
      <slot name="extras" class="flex-shrink-1"></slot>
      <v-data-table
        item-key="name"
        class="elevation-1 table-data d-flex flex-column flex-grow-1 flex-shrink-1 justify-space-between ml-6 mr-6 mb-6"
        loading-text="Chargement des données"
        :loading="!loaded"
        fixed-header
        :headers="headers"
        :items="tableData"
        :custom-sort="customSort"
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

    customSort: {
      type: Function,
      required: false,
    },
  },

  data: () => ({
    pageCount: 0,
    page: 1,
  }),

  computed: {
    headers() {
      return this.loaded
        ? Object.keys(this.tableData[0]).map((e) => ({
            text: e[0].toUpperCase() + e.substring(1),
            value: e,
          }))
        : [];
    },
  },
};
</script>

<style scoped>
.table-card {
  background-color: #f9f9f9;
}

.progress-bar {
  margin-left: -16px;
  width: calc(100% + 32px);
}

.card-header-text {
  font-weight: 500;
  color: #677088;
  letter-spacing: 2px;
  font-size: 14px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

::v-deep .theme--light.v-pagination .v-pagination__item--active {
  background-color: #eaeef0 !important;
  color: #59636b;
  border: 1px solid #d7dee3 !important;
}

::v-deep .theme--light.v-pagination .v-pagination__item {
  background-color: transparent !important;
  color: #59636b;
  box-shadow: none;
  border: 1px solid #d7dee3;
  min-width: 50px;
  border-radius: 8px;
}

::v-deep .theme--light.v-pagination .v-pagination__navigation {
  background-color: transparent !important;
  color: #59636b;
  box-shadow: none;
  border: 1px solid #d7dee3;
}

::v-deep .v-input--selection-controls {
  margin-top: 0;
}

::v-deep .v-item-group.v-bottom-navigation .v-btn.v-btn--active {
  color: #f6f6f6;
  background-color: #546e7a !important;
}

.table-data {
  box-shadow: none !important;
  background-color: white !important;
}
::v-deep
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  color: #546e7a;
}

tr {
  background-color: transparent !important;
}

::v-deep .v-app-bar.v-app-bar--fixed {
  position: relative !important;
}

::v-deep .v-input--selection-controls .v-input__slot > .v-label,
.v-input--selection-controls .v-radio > .v-label {
  font-size: 12px;
  font-weight: 500;
  color: #677088;
}
</style>
