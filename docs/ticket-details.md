# Ticket Details

## Usage

This component display in a pop up detailed information relative to a ticket.

It takes as prop:

- v-model: pops the component when true
- detailed-ticket: result of API request 'ticket read_details'
- baseURL: beginning of request 'download_image' untill '/node' (included)
- token (optional): if API needs authentification

### Example

![ticket details](../public/docs/ticket%20details.png)

### Code

```vue
<template>
  <sc-ticket-details
    v-model="ticketDialog"
    :detailed-ticket="ticket"
    :baseURL="'http://localhost:10406/api/v1/node/'"
  ></sc-ticket-details>
</template>

<script>
export default {
  data: () => ({
    ticketDialog: true,
    ticket: {},
  }),

  async mounted() {
    this.ticket = getTicketDetail(4568971);
  },
};
</script>
```

[< bar card](bar-card.md) | [Home](documentation.md) | [carousel >](carousel.md)
