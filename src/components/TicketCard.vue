<template>
  <v-card id="card-layout">
    <div
      id="card-header"
      class="d-flex flex-row justify-space-between align-center pa-2"
    >
      <div
        class="d-flex flex-row flex-shrink-1 align-center justify-start"
        style="left: 0; right: 0"
      >
        <div
          class="colored-square mr-1"
          :style="{ background: ticket.color + ' no-repeat padding-box' }"
        ></div>
        <span>{{ "#" + ticket.dynamicId }}</span>
      </div>
      <div>{{ location }}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TicketCard",

  props: {
    ticket: {
      type: Object,
      default: () => ({
        dynamicId: 0,
        color: "#f00",
        description: "en attente...",
        date: "en attente...",
        name: "en attente...",
        type: "en attente...",
        step: "Status",
      }),
    },
    location: {
      type: String,
      default: "Bâtiment",
    },
  },
};
</script>

<style>
#card-layout {
  aspect-ratio: 234/238;
  border: 1px solid #f9f9f9;
}

#card-header {
  height: 13%;
  border-bottom: 1px solid #000;
  border-radius: 0;
}

.colored-square {
  width: 6px;
  height: 15px;
  border-radius: 2px;
}
</style>
