<template>
  <v-card
      class="stat-card ma-2 rounded-lg"
      elevation="5"
      outlined
  >
    <v-flex class="d-flex flex-row fill-height">
      <v-flex
          class="d-flex flex-column justify-center text-center stat-value"
          :style="{ color: color}"
      >{{ shortNumberCall(value) }}
      </v-flex>
      <v-flex
          class="d-flex flex-column justify-center justify-start stat-text"
      >
        <div>
                    <span :style="{ color: color }">{{ unit + "  " }}</span
                    >{{ title }}
        </div>
        <div v-if="type === 'comparison'" class="stat-subtitle">
          <span class="black--text">{{ compared + " " }}</span>{{ subtitle }}
        </div>
        <div v-else class="stat-subtitle orange--text text-uppercase">
          <div
            class="rounded-circle d-inline-block orange pa-1">
          </div>
        {{ subtitle }}
      </div>
      </v-flex>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  name: "StatsCard",

  props: {
    type: {
      type: String,
      default: 'date'
    },
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    compared: {
      type: String
    },
    subtitle: {
      type: String,
      required: true
    },
    color: {
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
  font-size: 3em;
}

.stat-subtitle {
  font-size: 0.73em;
}

.stat-text {
  width: 60%;
  color: #949da6;
}
</style>