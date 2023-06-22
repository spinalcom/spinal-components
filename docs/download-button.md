# Download Button

## Usage

The props for the button are:

- file-name: without extension
- data: array of objects to be downloaded
- csv: downlaod as csv if true and excel if false (false by default)
- disabled: to disable as any other button

### Example

![download button](../public/docs/download%20button.png)

### Code

```vue
<template>
  <sc-download-button
    :file-name="'Avengers'"
    :data="tablaData"
    csv
  ></sc-download-button>
</template>

<script>
export default {
  data: () => ({
    tablaData: [
      {
        nom: "Hulk",
        "puissance (%)": 98,
        "vitesse (%)": 51,
        "agilité (%)": 44,
        "technique (%)": 43,
      },
      {
        nom: "Iron-Man",
        "puissance (%)": 85,
        "vitesse (%)": 95,
        "agilité (%)": 75,
        "technique (%)": 82,
      },
      {
        nom: "Captain America",
        "puissance (%)": 80,
        "vitesse (%)": 79,
        "agilité (%)": 93,
        "technique (%)": 89,
      },
      {
        nom: "Thor",
        "puissance (%)": 90,
        "vitesse (%)": 86,
        "agilité (%)": 81,
        "technique (%)": 92,
      },
      {
        nom: "Black Widow",
        "puissance (%)": 60,
        "vitesse (%)": 77,
        "agilité (%)": 95,
        "technique (%)": 87,
      },
      {
        nom: "Hawk",
        "puissance (%)": 64,
        "vitesse (%)": 72,
        "agilité (%)": 82,
        "technique (%)": 90,
      },
    ],
  }),
};
</script>
```

[< spinal navigator](spinal-navigator.md) | [Home](documentation.md) | [paginated table >](paginated-table.md)
