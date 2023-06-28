# Paginated Table

## Usage

This component needs for props:

- title: displayed at the top of the table (Table cards by default)
- tabla-data: an array of objects
- loaded: the table will display a loading bar if false (true by default)
- header-option: headers props of [vuetify data table](https://v2.vuetifyjs.com/en/components/data-tables/#usage) value excluded and text not required
- custom-sort: a function to customize array sorting (not required) taking three parameters
  - items: values to be sorted
  - index: array containing the name of the column to be sorted at index[0]
  - isDesc: array containing a boolean at index[0]

### Example

![paginated table](../public/docs/paginated%20table.png)

### Code

```vue
<template>
  <sc-paginated-table
    :title="'Avengers'"
    :table-data="tablaData"
    :custom-sort="customSort"
    :header-options="tableHeader"
  >
    <template v-slot:extras><!-- Put in here whatever your want --><template>
  </sc-paginated-table>
</template>

<script>
export default {
  data: () => ({
    tableHeader: [
      { width: "40%" },
      { width: "15%" },
      { width: "15%" },
      { width: "15%" },
      { width: "15%" },
    ],
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

  methods: {
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        let first, second;
        switch (index[0]) {
          // click on name: sorted in alphabetic order
          case "nom":
            return isDesc[0]
              ? a[index].toLowerCase().localeCompare(b[index].toLowerCase())
              : b[index].toLowerCase().localeCompare(a[index].toLowerCase());

          // else sorted by average combat value
          default:
            first = Object.values(a).slice(1);
            second = Object.values(b).slice(1);
            return isDesc[0]
              ? first.reduce((e1, e2) => e1 + e2, 0) / first.length -
                  second.reduce((e1, e2) => e1 + e2, 0) / second.length
              : second.reduce((e1, e2) => e1 + e2, 0) / second.length -
                  first.reduce((e1, e2) => e1 + e2, 0) / first.length;
        }
      });
      return items;
    },
  },
};
</script>
```

[< download button](download-button.md) | [Home](documentation.md) | [stat card >](stat-card.md)
