import TimeSelector from "./components/TimeSelector.vue";
import SpaceSelector from "./components/SpaceSelector.vue";
import SpinalNavigator from "./components/SpinalNavigator.vue";
import PieCard from "./components/PieCard.vue";
import BarCard from "./components/BarCard.vue";
import DownloadButton from "./components/DownloadButton.vue";
import PaginatedTable from "./components/PaginatedTable.vue";
import StatsCard from "./components/StatsCard.vue";
import DoubleStatCard from "./components/DoubleStatCard.vue";
import LoadingPage from "./components/LoadingPage.vue";
import vuetify from "./plugins/vuetify";
import LineCard from "./components/LineCard.vue";
import LoadingCard from "./components/LoadingCard.vue";
import CarouselComponent from "./components/CarouselComponent.vue";
import TicketDetails from "./components/TicketDetails.vue";

export default {
  install(Vue: any, options: any) {
    Vue.use(vuetify);
    Vue.component("sc-loader", LoadingPage);
    Vue.component("sc-time-selector", TimeSelector);
    Vue.component("sc-space-selector", SpaceSelector);
    Vue.component("sc-spinal-navigator", SpinalNavigator);
    Vue.component("sc-pie-card", PieCard);
    Vue.component("sc-bar-card", BarCard);
    Vue.component("sc-download-button", DownloadButton);
    Vue.component("sc-paginated-table", PaginatedTable);
    Vue.component("sc-stat-card", StatsCard);
    Vue.component("sc-double-stat-card", DoubleStatCard);
    Vue.component("sc-line-card", LineCard);
    Vue.component("sc-loading-card", LoadingCard);
    Vue.component("sc-carousel", CarouselComponent);
    Vue.component("sc-ticket-detail", TicketDetails);
  },
};
