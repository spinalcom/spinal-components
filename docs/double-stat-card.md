# Double Stat Card

## Usage

This component is a fusion of two stat cards

### Example

![double stat card](../public/docs/double%20stat%20card.png)

### Code

```vue
<template>
  <sc-double-stat-card
    style="width: 25%"
    :first-value="255500"
    :first-unit="'Km'"
    :first-title="'parcourus'"
    :first-subtitle="'Cette année'"
    :first-color="'#956518'"
    :second-value="200000"
    :second-unit="'Km'"
    :second-title="'à vélo'"
    :second-type="'comparison'"
    :second-compared="'78%'"
    :second-subtitle="'de la distance totale'"
    :second-color="'#14202c'"
  ></sc-double-stat-card>
</template>

<script>
export default {};
</script>
```

[< stat card](stat-card.md) | [Home](documentation.md) | [pie card >](pie-card.md)
