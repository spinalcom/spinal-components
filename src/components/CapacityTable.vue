<template>
  <v-card
    class="line-card pa-1 rounded-lg d-flex flex-column"
    outlined
    style="min-height: 185px !important; min-width: 270px !important"
  >
    <v-card-title
      style="font-size: 20px; height: 56px"
      class="card-title pa-3 text-uppercase"
      >{{ title }}</v-card-title
    >
    <div class="d-flex justify-space-around flex-grow-1 align-center">
      <div
        v-if="totalPages > 1"
        class="arrow-container-left d-flex align-center"
        @click="previousPage"
      >
        <div class="round">
          <v-icon class="arrow-icon">mdi-chevron-left</v-icon>
        </div>
      </div>
      <div
        ref="carousel"
        :class="[
          values.length >= item_per_page
            ? 'carrousel-container'
            : 'carrousel-container2',
          animate === 'right'
            ? 'container-animation-right'
            : animate === 'left'
            ? 'container-animation-left'
            : '',
          paginatedItems.length === item_per_page
            ? 'justify-space-between'
            : '',
        ]"
      >
        <div
          v-for="(item, i) in paginatedItems"
          :key="i"
          class="item"
          style="width: 220px"
        >
          <div>
            <div class="title_capactity_card ml-1">{{ item.title }}</div>
            <div style="height: 45px; font-size: 36px; font-weight: 500">
              {{ item.percentage }}
            </div>
            <div style="display: flex; align-items: center">
              <div
                class="rounded_square mr-1 ml-1"
                :style="{ backgroundColor: item.color }"
              ></div>
              <div style="font-size: 22px">{{ item.count }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="totalPages > 1"
        class="arrow-container-right d-flex align-center"
        @click="nextPage"
      >
        <div class="round">
          <v-icon class="arrow-icon" width="32">mdi-chevron-right</v-icon>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "capacity-table",
  props: {
    title: {
      type: String,
      default: "Capacity Table",
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 0,
      animate: "",
      item_per_page: 7,
    };
  },
  methods: {
    //animation previous page
    previousPage() {
      this.animate = "left";
      this.currentPage =
        (this.totalPages - 1 - this.currentPage) % this.totalPages;
      setTimeout(() => {
        this.animate = "";
      }, 500);
    },
    //animation next page
    nextPage() {
      this.animate = "right";
      this.currentPage = (this.currentPage + 1) % this.totalPages;
      setTimeout(() => {
        this.animate = "";
      }, 600);
    },
  },

  computed: {
    paginatedItems() {
      if (this.values.length) {
        const startIndex = this.currentPage * this.item_per_page;
        const endIndex = startIndex + this.item_per_page;
        return this.values.slice(startIndex, endIndex);
      } else {
        return [
          {
            title: "Pas de donnée",
            color: "red",
            percentage: "0%",
            count: "0/0",
          },
        ];
      }
    },
    totalPages() {
      return Math.ceil(this.values.length / this.item_per_page) || 1;
    },
  },

  mounted() {
    const { carousel } = this.$refs;
    this.item_per_page = Math.floor(carousel.clientWidth / 220 + 0.5);
    window.onresize = () => {
      const { carousel } = this.$refs;
      this.item_per_page = Math.floor(carousel.clientWidth / 220 + 0.5);
    };
  },
};
</script>

<style scoped>
.container-animation-right {
  -webkit-animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.container-animation-left {
  -webkit-animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.card-title {
  letter-spacing: 1.1px;
  color: #214353;
  opacity: 1;
  font-size: 11px/13px;
}

.round {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  width: 35px;
  height: 35px;
  border-radius: 20px;
}

.arrow-container-right:hover .round,
.arrow-container-left:hover .round {
  background-color: rgb(236, 236, 236);
}

.arrow-container-left {
  left: 0;
}

.arrow-container-right {
  right: 0;
}

.line-card {
  background-color: #f9f9f9;
  overflow: hidden;
}

.rounded_square {
  width: 8px;
  height: 17px;
  border-radius: 2px;
}

.carrousel-container {
  display: flex;
  width: 85%;
}

.carrousel-container2 {
  margin-left: 60px;
  display: flex;
  width: 95%;
}

.title_capactity_card {
  letter-spacing: 1.5px;
  color: gray;
  height: 14px;
  font-weight: 500;
  font-size: 14px;
}

.text_capactity_card {
  letter-spacing: 1.5px;
  color: gray;
  height: 12px;
  font-weight: 500;
  font-size: 10px;
}

.item:first-child {
  margin-left: 12px;
}
</style>
