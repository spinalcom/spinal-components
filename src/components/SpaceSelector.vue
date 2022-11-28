<template>
  <div>
    <div class="glass" v-show="dropDown" @click="dropDown=false"></div>
    <v-card
      elevation="2"
      color="#14202C"
      class="strech"
      :class="{ drop: dropDown }"
      width="100%"
      style="border-radius: 10px !important; color: #bfbfbf"
    >
      <div
        @click="dropDown = !dropDown"
        id="selected"
        style="border-radius: 0px; height: 64px; background-color: #14202c;"
      >
        <p
          style="
            font-weight: 400;
            padding: 4px;
            font-size: 30px;
          "
        >
          <span class="text-uppercase">{{ title }}</span>
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
          @click="expand = !expand"
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
              {{ privateRootElement.name }}
            </div>
            <v-btn
              elevation="0"
              fab
              icon
              raised
              text
              tile
              style="
                color: #bfbfbf;
                float: right;
                margin-top: -12px;
                margin-right: -11px;
                border-radius: 6px;
              "
              @click="root = !root"
              :disabled="rootButton"
            >
              <expand-load-collapse
                :rootButton="rootButton"
                :root="root"
              ></expand-load-collapse>
            </v-btn>
          </div>
        </div>

        <transition-group
          name="fade"
          tag="div"
          :css="true"
          @enter="enter"
          @leave="leave"
        >
          <div v-for="item in buildingStructure" :key="item.dynamicId">
            <div
              @click="dive(item)"
              class="first-nested-level card-hover fade"
              :style="{
                'margin-bottom': checkLast(item),
                'margin-left': '' + ((item.level - 1) * 20 + 30) + 'px',
              }"
            >
              <div class="first-nested-level-angle"></div>
              <div
                class="first-nested-level-angle-extend"
                v-show="item.isFirst == undefined"
              ></div>
              <div
                class="parent-link"
                v-for="depth in item.level - 1"
                :key="depth"
                v-show="canDraw(item, depth)"
                :style="{ 'margin-left': '-' + (depth * 20 + 11) + 'px' }"
              ></div>
              <div
                class="colored-square"
                :style="{ 'background-color': item.color }"
              ></div>
              <div
                class="d-flex flex-row"
                style="cursor: pointer; padding: 12px; margin-bottom: 0px"
              >
                <div
                  style="
                    width: 100%;
                    cursor: pointer;
                    padding-left: 12px;
                    margin-bottom: 0px;
                  "
                  @click="select(item)"
                >
                  {{ item.name }}
                </div>
                <v-btn
                  elevation="0"
                  fab
                  icon
                  raised
                  text
                  tile
                  style="
                    color: #bfbfbf;
                    position: absolute;
                    right: 25px;
                    margin-top: -12px;
                    margin-right: -13px;
                    border-radius: 6px;
                  "
                  @click="expandCollapse(item)"
                  v-show="item.level != maxDepth"
                >
                  <expand-load-collapse
                    :rootButton="item.loading"
                    :root="item.isOpen"
                  ></expand-load-collapse>
                </v-btn>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </v-card>
  </div>
</template>

<script>
import Velocity from "velocity-animate";
import ExpandLoadCollapse from "./ExpandLoadCollapse.vue";

export default {
  components: {
    ExpandLoadCollapse,
  },
  props: {
    onopen: {
      type: Function,
    },
    value: {
      type: Object,
      required: true,
    },
    maxDepth: {
      type: Number,
      required: true,
    },
    path: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    rootButton: false,
    root: false,
    buildingStructure: [],
    active: [],
    flag: true,
    expand: true,
    dropDown: false,
  }),
  computed: {
    privateRootElement() {
      const el = this.value;
      el["level"] = 0;
      el["isOpen"] = false;
      el["doNotDraw"] = [];
      el["loading"] = false;
      return el;
    },
    title() {
      return this.value.title.length > 20
          ? this.value.title.substring(0, 19) + '...'
          : this.value.title;
    },
  },
  methods: {
    select(item) {
      this.dive(item);
      if(item.level > 0) this.$emit("input", { name: this.value.name, title: item.name, dynamicId: item.dynamicId, color: item.color });
    },
    dive(item) {
      /*this.path[item.level] = item.dynamicId;*/ this.$set(this.path, item.level, item.dynamicId)
      for(let i = item.level + 1; i <= this.maxDepth; i++) /*this.path[i] = null;*/ this.$set(this.path, i, null)
      this.$emit("update:path", this.path)
    },
    expandCollapse(item) {
      const nextDepth = item.level + 1;
      const doCall = function (a) {
        if (a.length > 0) {
          a[0]["isFirst"] = true;
          a[a.length - 1]["isLast"] = true;
          a[a.length - 1]["isLastInGroup"] = true;
          const newForbidden = item.doNotDraw.map((x) => x + 1);
          if (item.isLast && item.isLast == true) newForbidden.unshift(0);
          a = a.map((obj) => {
            obj["level"] = nextDepth;
            obj["isOpen"] = false;
            obj["doNotDraw"] = newForbidden;
            obj["loading"] = false;
            return obj;
          });
        }
        return a;
      };
      item.isLastInGroup = false;
      if (!item.isOpen) {
        const to_close = this.buildingStructure.filter(x => x.level === item.level && x.dynamicId !== item.dynamicId && x.isOpen)
        to_close.forEach(x => {
          const local_index = this.buildingStructure.indexOf(x)
          this.buildingStructure[local_index].isLastInGroup = false;
          const elementByLevel = (i) => i.level <= x.level;
          const removeBlock = this.buildingStructure
              .slice(local_index + 1, this.buildingStructure.length)
              .findIndex(elementByLevel);

          switch (removeBlock) {
            case 0:
              break;
            case -1:
              this.buildingStructure.splice(
                  local_index + 1,
                  this.buildingStructure.length
              );
              break;
            default:
              this.buildingStructure.splice(local_index + 1, removeBlock);
              break;
          }
          x.isOpen = !x.isOpen
        })
        item.loading = true;
        this.onopen(item)
          .then((r) => {
            this.buildingStructure.splice(this.buildingStructure.indexOf(item) + 1, 0, ...doCall(r));
            this.rootButton = false;
          })
          .then(() => (item.loading = false));
      } else {
        let index = this.buildingStructure.indexOf(item);
        const elementByLevel = (i) => i.level <= item.level;
        const removeBlock = this.buildingStructure
          .slice(index + 1, this.buildingStructure.length)
          .findIndex(elementByLevel);

        switch (removeBlock) {
          case 0:
            break;
          case -1:
            this.buildingStructure.splice(
              index + 1,
              this.buildingStructure.length
            );
            break;
          default:
            this.buildingStructure.splice(index + 1, removeBlock);
            break;
        }
      }
      item.isOpen = !item.isOpen;
    },
    canDraw(element, depth) {
      if (element.doNotDraw.includes(depth)) return false;
      return true;
    },
    checkLast(first) {
      if (first.isLastInGroup != undefined && first.isLastInGroup == true)
        return "6px";
      const maxLength = this.buildingStructure.length;
      const indexOfElement = this.buildingStructure.indexOf(first);
      if (
        indexOfElement < maxLength - 1 &&
        this.buildingStructure[this.buildingStructure.indexOf(first) + 1]
          .level < first.level
      )
        return "6px";
      return "0px";
    },
    reset() {
      document.getElementById("selected").scrollIntoView();
    },
    enter: function (el, done) {
      Velocity(el, "fadeIn", { complete: done, duration: 200 });
    },
    leave: function (el, done) {
      Velocity(el, "fadeOut", { complete: done, duration: 200 });
    },
  },
  watch: {
    dropDown(v1) {
      if (!v1) this.reset();
    },
    root(v1) {
      if (v1) {
        this.rootButton = true;
        const nextDepth = this.privateRootElement.level + 1;
        this.select(this.privateRootElement);
        this.onopen(this.privateRootElement).then((r) => {
          if (r.length > 0) {
            r[0]["isFirst"] = true;
            r[r.length - 1]["isLast"] = true;
            r = r.map((obj) => {
              obj["level"] = nextDepth;
              obj["isOpen"] = false;
              obj["doNotDraw"] = [];
              obj["loading"] = false;
              return obj;
            });
            this.buildingStructure.splice(0, 0, ...r);
            this.rootButton = false;
          }
          this.rootButton = false;
        });
      } else this.buildingStructure = [];
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

.colored-square {
  margin-top: 16px;
  margin-left: 8px;
  border-radius: 2px;
  display: inline-block;
  position: absolute;
  height: 16px;
  width: 4px;
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
