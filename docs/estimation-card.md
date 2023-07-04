# Time Selector

## Usage

The estimation card displays an estimation of values as well as the real time value.

This component needs as props:

- title: displayed at top of the card (Estimation Bar Card by default).
- estimations: an array of numerique values.
- labels: abscisses of the chart
- step: labels will be displayed according to the step (optional)
- currentValue: will be displayed in another color
- currentLabel: label of the current value `verify labels.includes(currentLabel) = true`

### Example

![estimation card](../public/docs/estimation%20card.png)

### Code

```vue
<template>
  <sc-estimation-card
    title="Affluence"
    :estimations="estimations"
    :labels="estimations.map((h, i) => i + 'h')"
    :step="6"
    currentLabel="16h"
    :currentValue="14"
  ></sc-estimation-card>
</template>

<script>
export default {
  data: () => ({
    estimations: [
      0, 0, 0, 0, 2, 3, 5, 7, 8, 15, 20, 23, 24, 25, 25, 22, 19, 16, 17, 13, 6,
      0, 0,
    ],
  }),
};
</script>
```

[< carousel](carousel.md) | [Home](documentation.md)
