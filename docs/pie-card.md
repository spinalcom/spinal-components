# Pie Card

## Usage

The component needs a title (Pie Card by default) and an array of { label, value } as props.
The six biggest values will be represented in the chart and the rest will be summed in a single object labeled ETC...

### Example
### Code
```vue
<template>
  <sc-pie-card :title="'Réponses les plus données'" :pie-chart-data="pieChartData" :color="'#f00'"></sc-pie-card>
</template>

<script>
export default {
  data: () => ({
    pieChartData: [
      { label: "oui", value: 75 },
      { label: "non", value: 65 },
      { label: "peut-être", value: 15 },
      { label: "je ne sais pas", value: 42 },
      { label: "joker", value: 52 },
      { label: "plus tard", value: 64 },
      { label: "je m'en moque", value: 58 },
      { label: "serieux ?", value: 60 },
      { label: "Qui as dit ça ?", value: 69 }
    ]
  })
}
</script>
```

[< stat card](stad-card.md) | [Home](documentation.md) | [bar card >](bar-card.md)