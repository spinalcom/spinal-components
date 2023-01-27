<template>
  <v-card class="card-layout" elevation="5" outlined>
    <div
      class="ticket-header pa-1 d-flex flex-row align-center justify-space-between"
    >
      <div class="d-flex flex-row">
        <div
          class="colored-square mr-1"
          :style="{ background: ticket.color + ' no-repeat padding-box' }"
        ></div>
        <span class="ticket-id">{{ `#${ticket.dynamicId}` }}</span>
      </div>
      <div class="ticket-location">{{ location }}</div>
    </div>
    <div class="ticket-main pa-1">
      <div class="d-flex flex-row">
        <div class="flex-grow-1">
          <div class="ticket-subtitle">TYPE</div>
          <v-progress-circular
            indeterminate
            :size="20"
            :width="2"
          ></v-progress-circular>
          <span class="ticket-values">{{ " " + ticket.type }}</span>
        </div>
        <div class="flex-grow-1">
          <div class="ticket-subtitle">DATE</div>
          <span class="ticket-values">{{ ticket.date }}</span>
        </div>
      </div>
      <div>
        <div class="ticket-subtitle">SIGNALEMENT</div>
        <p class="ticket-values">{{ ticket.description }}</p>
      </div>
    </div>
    <div class="ticket-actions pa-1">
      <div class="ticket-subtitle">GESTION</div>
      <div class="ticket-status">{{ ticket.step }}</div>
      <div class="d-flex flex-row justify-space-between">
        <v-btn class="flex-grow-1 btn-action">
          <v-icon>mdi-plus</v-icon> ÉDITER
        </v-btn>
        <v-btn class="flex-grow-1 btn-action">
          <v-icon>mdi-map-marker</v-icon> LOCALISER
        </v-btn>
      </div>
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
.card-layout {
  width: 234px;
  height: 238px;
  background: padding-box;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
}

.ticket-header {
  height: 13%;
  border-bottom: 1px solid #f9f9f9;
}

.colored-square {
  width: 6px;
  height: 13px;
  border-radius: 2px;
}

.ticket-id {
  font: normal normal normal 12px/14px Charlevoix Pro;
  letter-spacing: 0.6px;
  color: #435567;
}

.ticket-location {
  font: normal normal normal 12px/14px Charlevoix Pro;
  letter-spacing: 0.6px;
  color: #a2abb4;
  opacity: 1;
}

.ticket-subtitle {
  font: normal normal normal 7px/8px Charlevoix Pro;
  letter-spacing: 0.7px;
  color: #a2abb4;
  opacity: 1;
}

.ticket-values {
  font: normal normal normal 9px/11px Charlevoix Pro;
  letter-spacing: 0.9px;
  color: #214353;
}

.ticket-status {
  height: 36%;
  border: 1px solid #e3e7e8;
  border-radius: 6px;
  font: normal normal normal 12px/14px Charlevoix Pro;
  letter-spacing: 1.2px;
  color: #14202c;
}

.btn-action {
  width: 48%;
  font: normal normal normal 9px/11px Charlevoix Pro;
  letter-spacing: 0.9px;
  color: #14202c;
}
</style>
