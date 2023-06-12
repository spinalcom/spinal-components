<template>
  <div>
    <div v-show="dropDown" @click="dropDown = false"></div>
    <v-card
      color="#14202C"
      class="strech shrink"
      :class="{ drop: dropDown }"
      width="100%"
      style="border-radius: 10px !important; color: #bfbfbf"
    >
      <div
        @click="dropDown = !dropDown"
        id="selected"
        style="border-radius: 0px; height: 64px; background-color: #14202c"
      >
        <p style="font-weight: 400; padding: 4px; font-size: 30px">
          {{ value.name }}
          <v-icon
            style="color: #bfbfbf; float: left; padding: 10px; font-size: 30px"
            class="rotate-disabled"
            :class="{ 'rotate-enabled': dropDown }"
            >mdi-chevron-down</v-icon
          >
        </p>
      </div>

      <div class="card-list" :class="{ 'fade-in': dropDown }">
        <div
          v-for="item in items"
          :key="item.value"
          @click="select(item)"
          style="
            margin-left: 10px;
            margin-right: 10px;
            height: 50px;
            background-color: #14202c;
            border: 1px solid #bfbfbf;
            border-radius: 6px;
          "
        >
          <div
            class="d-flex flex-row"
            style="cursor: pointer; padding: 12px; margin-bottom: 0px"
          >
            <div
              style="
                width: 100%;
                cursor: pointer;
                padding: 0px;
                margin-bottom: 0px;
              "
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "time-selector",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    items: [
      { name: "SEMAINE", value: "week" },
      { name: "MOIS", value: "month" },
      { name: "ANNÉE", value: "year" },
      { name: "DÉCENNIE", value: "decade" },
    ],
    expand: true,
    dropDown: false,
  }),
  methods: {
    select(item) {
      this.$emit("input", item);
    },
  },
};
</script>

<style scoped>
.smooth-load-start-enter-active,
.smooth-load-start-leave-active {
  transition: all 0.5s;
}

.smooth-load-start-enter,
.smooth-load-start-leave-to {
  opacity: 0;
}

.smooth-load-end-enter-active,
.smooth-load-end-leave-active {
  transition: all 0.5s;
}

.smooth-load-end-enter,
.smooth-load-end-leave-to {
  opacity: 0;
}

.fade-move {
  transition: transform 0.2s;
}

.fade-leave-active {
  position: absolute;
  width: 100%;
}

.strech {
  z-index: 1000;
  width: 500px !important;
  min-width: 500px;
  height: 52px;
  transition: height 0.3s ease-out;
  float: right;
  overflow: hidden;
}

.card-list {
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.fade-in {
  opacity: 1;
  transition: opacity 0.3s ease-in;
}
.drop {
  padding-bottom: 12px;
  overflow-y: auto;
  height: calc(100vh - 24px);
  transition: height 0.3s ease-in;
}

.rotate-enabled {
  transform: rotate(-180deg);
  transition: transform 0.3s ease-in;
}

.blue-square {
  margin-top: 16px;
  margin-left: 8px;
  border-radius: 2px;
  display: inline-block;
  position: absolute;
  height: 16px;
  width: 4px;
  background-color: #2693ff;
}

.violet-square {
  margin-top: 16px;
  margin-left: 8px;
  border-radius: 2px;
  display: inline-block;
  position: absolute;
  height: 16px;
  width: 4px;
  background-color: #d138de;
}

.yellow-square {
  margin-top: 16px;
  margin-left: 8px;
  border-radius: 2px;
  display: inline-block;
  position: absolute;
  height: 16px;
  width: 4px;
  background-color: #ded638;
}

.first-nested-level {
  /* margin-left: 30px; */
  margin-right: 10px;
  height: 50px;
  background-color: #14202c;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  /* border-top: none; */
  margin-top: -1px;
}

.first-nested-level-angle {
  margin-left: -11px;
  height: 24px;
  background-color: transparent;
  border: 1px solid #5c5c5c;
  border-radius: 6px;
  margin-top: 0;
  width: 10px;
  border-right: none;
  border-top: none;
  position: absolute;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
}

.first-nested-level-angle-extend {
  margin-left: -11px;
  height: 50px;
  background-color: transparent;
  border: 1px solid #777777;
  border-radius: 6px;
  margin-top: -30px;
  width: 10px;
  border-right: none;
  border-bottom: none;
  border-top: none;
  position: absolute;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
}

.parent-link {
  height: 65px;
  background-color: transparent;
  border: 1px solid #777777;
  border-radius: 6px;
  margin-top: -30px;
  width: 10px;
  border-right: none;
  border-bottom: none;
  border-top: none;
  position: absolute;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
}

.card-hover:hover {
  background-color: #444;
}

::v-deep .v-btn--fab.v-size--default {
  height: 48px;
  width: 50px;
}

::v-deep .v-application p {
  margin-bottom: 0px !important;
}

::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ffffff80;
  border-radius: 10px;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #133b6a;
  border-radius: 10px;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #386395;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.glass {
  color: #bfbfbf;
  position: absolute;
  top: 0px;
  width: 100%;
  left: 0px;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
  background: rgba(215, 215, 215, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
}
</style>

<style scoped>
html {
  scroll-behavior: smooth;
  overflow: auto;
}
</style>
