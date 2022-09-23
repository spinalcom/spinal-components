# Stat Card

## Usage

The props for this component are:
- unit
- title
- type: date (by default) or comparison
- value: number in the left part of the card
- compared: only if the type is comparison
- subtitle: will be displayed differently given the type

### Example
![stat card](../public/docs/stat%20card.png)
### Code
```vue
<template>
  <sc-stat-card
      :value="25"
      :unit="'Km'"
      :title="'parcourus'"
      :subtitle="'Aujourd\'hui'"
  ></sc-stat-card>
  
  <sc-stat-card
      :value="25"
      :unit="'Km'"
      :title="'parcourus'"
      :type="'comparison'"
      :compared="'+5'"
      :subtitle="'par rapport à hier'"
  ></sc-stat-card>
</template>

<script>
export default {
}
</script>
```

[< paginated table](paginated-table.md) | [Home](documentation.md) | [pie card >](pie-card.md)