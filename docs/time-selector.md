# Time Selector

## Usage

The time selector component needs the same object as v-model and prop.

That component has two attributes:
- name: either SEMAINE, MOIS, ANNÉE or DÉCENNIE. Is displayed by the component.
- value: week, month, year, decade. To be used in functions and for comparisons.

### Example
![time selector](../public/docs/time%20selector.png)
### Code
```vue
<template>
  <sc-time-selector v-model="time" :root-element="time"></sc-time-selector>
</template>

<script>
export default {
  data: () => ({
    time: { name: "SEMAINE", value: 'week' }
  })
}
</script>
```