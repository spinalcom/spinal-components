# Stat Card

## Usage

The props for this component are:

- unit
- title
- type: date (by default) or comparison
- value: number in the left part of the card
- compared: only if the type is comparison
- subtitle: will be displayed differently given the type
- color (optional): color in which the value will be displayed

### Example

![stat card](../public/docs/stat%20card.png)

### Code

```vue
<template>
  <sc-stats-card
    :value="255500"
    :unit="'Km'"
    :title="'parcourus'"
    :subtitle="'cette année'"
    :color="'#956518'"
  ></sc-stats-card>

  <sc-stats-card
    value="200000"
    unit="Km"
    title="en vélo"
    type="comparison"
    :compared="Math.round((200000 / 255500) * 100) + '%'"
    subtitle="de la distance totale"
  ></sc-stats-card>
</template>

<script>
export default {};
</script>
```

[< paginated table](paginated-table.md) | [Home](documentation.md) | [double stat card >](double-stat-card.md)
