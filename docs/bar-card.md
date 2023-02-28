# Bar Card

## Usage

The component needs a title (Bar Card by default), labels (array of string), stacked (false by default) to stack the bars and an array of objects as props.

These objects have as attributes:

- label: for the legend
- backgroundColor: color of the corresponding bars (not required)
- data: an array of number of the same size as the 'labels' array

### Example

### Code

```vue
<template>
  <sc-bar-card :title="'Activité de la semaine'" :labels="barLabels" :datasets="barChartData">
    <template v-slot:extras><!-- Put in here whatever your want --><template>
  </sc-bar-card>
</template>

<script>
export default {
  data: () => ({
    barLabels: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
    barChartData: [
      {
        label: 'Km parcourus',
        backgroundColor: '#153284',
        data: [15, 12, 13, 10, 18, 8, 2]
      }
    ],
  })
}
</script>
```

[< pie card](pie-card.md) | [Home](documentation.md)
