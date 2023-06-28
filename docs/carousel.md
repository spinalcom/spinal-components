# Ticket Details

## Usage

This component display in a pop up detailed information relative to a ticket.

It takes as prop:

- v-model: pops the component when true
- detailed-ticket: result of API request 'ticket read_details'
- baseURL: beginning of request 'download_image' untill '/node' (included)
- token (optional): if API needs authentification

### Example

![carousel](../public/docs/carousel.png)

### Code

```vue
<template>
  <sc-carousel :image_list="images"></sc-carousel>
</template>

<script>
export default {
  data: () => ({
    images: [
      {
        name: "sasuke.webp",
        src: "url de l'image",
      },
      {
        name: "naruto.jpg",
        src: "url de l'image",
      },
    ],
  }),
};
</script>
```

[< ticket details](ticket-details.md) | [Home](documentation.md)
