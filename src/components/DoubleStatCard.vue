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
.stat-card {
  background-color: #f9f9f9;
}

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

</style>