<template>
  <div>
    <v-card
        class="stat-card charlevoix ma-2 rounded-lg"
        elevation="5"
        outlined
    >
      <v-flex class="d-flex flex-row fill-height">
        <v-flex
            class="d-flex flex-column justify-center text-center stat-value"
        >
          <div :style="{ color: firstColor }">{{ shortNumberCall(firstValue) }}</div>
          <div :style="{ color: secondColor }">{{ shortNumberCall(secondValue) }}</div>
        </v-flex>
        <v-flex
            class="d-flex flex-column justify-center justify-start stat-text"
        >
          <div>
            <div>
                    <span :style="{ color: firstColor }">{{ firstUnit + "  " }}</span
                    >{{ firstTitle }}
            </div>
            <div v-if="firstType === 'comparison'" class="stat-subtitle">
              <span class="black--text">{{ firstCompared + " " }}</span>{{ firstSubtitle }}
            </div>
            <div v-else class="stat-subtitle orange--text text-uppercase">
              <div
                  class="rounded-circle d-inline-block orange pa-1">
              </div>
              {{ firstSubtitle }}
            </div>
          </div>
          <div>
            <div>
                    <span :style="{ color: secondColor }">{{ secondUnit + "  " }}</span
                    >{{ secondTitle }}
            </div>
            <div v-if="secondType === 'comparison'" class="stat-subtitle">
              <span class="black--text">{{ secondCompared + " " }}</span>{{ secondSubtitle }}
            </div>
            <div v-else class="stat-subtitle orange--text text-uppercase">
              <div
                  class="rounded-circle d-inline-block orange pa-1">
              </div>
              {{ secondSubtitle }}
            </div>
          </div>
        </v-flex>
      </v-flex>
    </v-card>
    <!--<v-card class="d-flex flex-column charlevoix py-4 px-2" style="width: 100%">
      <v-row style="width: 100%" class="clipped">
        <div class="col-4 ma-auto text-right custom-number clipped">{{shortNumberCall(value[0])}}</div>
        <div class="d-flex flex-row col-8 pa-0 clipped" style="position: relative">
          <div class="d-flex align-self-center flex-column">
            <div style="line-height: 10px;">
              <div style="display: inline-block" class="unit">{{unit[0]}} </div>
              <div style=" display: inline-block; margin-left: 3px;" class="side-text">{{title[0]}}</div>
            </div>
            <div v-if="type[0] === 'date'" class="second-side-text" style="margin-top:6px; letter-spacing: 3px; color: orange; font-weight: bold"><b><span class="dot"></span>{{subtitle[0]}}</b></div>

            <div v-else>
              <span class="small-percentage">{{compared[0]}} </span>
              <span class="second-side-text">{{subtitle[0]}}</span>
            </div>
          </div>
        </div>
      </v-row>


      <v-row style="width: 100%" class="mt-n3 clipped">
        <div class="col-4 ma-auto text-right second-custom-number clipped" :style="{'color':color[1]}">{{shortNumberCall(value[1])}}</div>
        <div class="d-flex flex-row col-8 pa-0 clipped" style="position: relative">
          <div class="d-flex align-self-center flex-column">
            <div style="line-height: 10px;">
              <div style="display: inline-block" class="unit" :style="{'color':color[1]}">{{unit[1]}} </div>
              <div style=" display: inline-block; margin-left: 3px;" class="side-text">{{title[1]}}</div>
            </div>
            <div v-if="type[1] === 'date'" class="second-side-text" style="margin-top:6px; letter-spacing: 3px; color: orange; font-weight: bold"><b><span class="dot"></span>{{subtitle[1]}}</b></div>
            <div v-else>
              <span class="small-percentage">{{compared[1]}} </span>
              <span class="second-side-text">{{subtitle[1]}}</span>
            </div>
          </div>
        </div>
      </v-row>
    </v-card>-->
  </div>
</template>

<script>
export default {
  name: 'double-stat-card',
  props: {
    firstType: {
      type: String,
      default: 'date'
    },
    firstValue: {
      type: Number,
      required: true
    },
    firstUnit: {
      type: String,
      required: true
    },
    firstTitle: {
      type: String,
      required: true
    },
    firstCompared: {
      type: String
    },
    firstSubtitle: {
      type: String,
      required: true
    },
    firstColor: {
      type: String,
      default: '#14202c'
    },
    secondType: {
      type: String,
      default: 'date'
    },
    secondValue: {
      type: Number,
      required: true
    },
    secondUnit: {
      type: String,
      required: true
    },
    secondTitle: {
      type: String,
      required: true
    },
    secondCompared: {
      type: String
    },
    secondSubtitle: {
      type: String,
      required: true
    },
    secondColor: {
      type: String,
      default: '#14202c'
    }
  },
  methods: {
    shortNumberCall (n) {
      if(Math.abs(n)>=1000000000)
        return Math.round(n/100000000) / 10+'B';
      if(Math.abs(n)>=1000000)
        return Math.round(n/100000) / 10+'M';
      if(Math.abs(n)>=1000)
        return Math.round(n/100) / 10+'K';
      return n;
    },
  }
}
</script>
<style scoped>
.stat-value {
  font-size: 2em;
}

.stat-subtitle {
  font-size: 0.73em;
}

.stat-text {
  width: 60%;
  color: #949da6;
}
.custom-number {
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: #14202C;
}

.second-custom-number {
  font-size: 23px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: #E8D712;
}

.unit {
  font-size: 11px;
}
.second-unit {
  font-size: 11px;
  color: #E8D712;
}
.small-percentage {
  font-size: 8px;
  color: #14202C;
}
.side-text {
  font-size: 11px;
  color: #949DA6;
}
.second-side-text {
  font-size: 8px;
  color: #949DA6;
}
.clipped {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.clipped:hover {
  overflow: visible;
}

.dot {
  height: 10px;
  width: 10px;
  background-color: orange;
  border-radius: 50%;
  display: inline-block;
}
</style>