# Paginated Table

## Usage

This component needs three props:
- title: displayed at the top of the table (Table cars by default)
- height: the height has to passed by prop and not modified in the CSS (see code below)
- tabla-data: an array of objects

### Example
![paginated table](../public/docs/paginated%20table.png)
### Code
```vue
<template>
  <sc-paginated-table :height="tableHeight" :title="'Avengers'" :table-data="tablaData"></sc-paginated-table>
</template>

<script>
export default {
  data: () => ({
    tablaData: [
      { nom: 'Hulk', 'puissance (%)': 98, 'vitesse (%)': 51, 'agilité (%)': 44, 'technique (%)': 43 },
      { nom: 'Iron-Man', 'puissance (%)': 85, 'vitesse (%)': 95, 'agilité (%)': 75, 'technique (%)': 82 },
      { nom: 'Captain America', 'puissance (%)': 80, 'vitesse (%)': 79, 'agilité (%)': 93, 'technique (%)': 89 },
      { nom: 'Thor', 'puissance (%)': 90, 'vitesse (%)': 86, 'agilité (%)': 81, 'technique (%)': 92 },
      { nom: 'Black Widow', 'puissance (%)': 60, 'vitesse (%)': 77, 'agilité (%)': 95, 'technique (%)': 87 },
      { nom: 'Hawk', 'puissance (%)': 64, 'vitesse (%)': 72, 'agilité (%)': 82, 'technique (%)': 90 },
    ]
  }),
  
  computed: {
    tableHeight() {
      return window.innerHeight * 0.5; // 50% of the page
    }
  }
}
</script>
```