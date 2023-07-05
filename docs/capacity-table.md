# Capacity Table

## Usage

The capacity table has two props:

- title: displayed at top of the card (Capacity Table Card by default).
- values: an array of objects with the following structure

```js
{
    title: "Titre",
    percentage: "100%",
    color: "white",
    count: "100/100",
}
```

### Example

![capacity table](../public/docs/capacity%20table.png)

### Code

```vue
<template>
  <capacity-table :values="capacities"></capacity-table>
</template>

<script>
export default {
  data: () => ({
    capacities: [
      {
        title: "Taux 1",
        color: "hsl(0, 100%, 50%)",
        percentage: "50%",
        count: "6/12",
      },
      {
        title: "Taux 2",
        color: "rgb(0,255,0)",
        percentage: "40%",
        count: "6/15",
      },
      {
        title: "Taux 3",
        color: "#00f",
        percentage: "75%",
        count: "15/20",
      },
      {
        title: "Taux 4",
        color: "purple",
        percentage: "33%",
        count: "3/9",
      },
    ],
  }),
};
</script>
```

[< estimation card](estimation-card.md) | [Home](documentation.md)
