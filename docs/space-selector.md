# Space Selector

## Usage

The notable props for this component are:
- onopen: a function returning an array of objects containing at least the attributes
  - name
  - dynamicId
  - color (hexa in a string)

### Example
![time selector](../public/docs/space%20selector.png)
### Code
```vue
<template>
  <sc-space-selector v-model="title" :root-element="element" :max-depth="2" :onopen="expand" ></sc-space-selector>
</template>

<script>
export default {
  data: () => ({
    title: 'Selection'
  }),
  computed: {
    element() {
      return { title: this.title, name: 'Liste' }
    }
  },
  methods: {
    expand() {
      return [
        { name: "red", color: '#f00', dynamicId: 1 },
        { name: "green", color: '#0f0', dynamicId: 2 },
        { name: "blue", color: '#00f', dynamicId: 3 },
      ]
    }
  }
}
</script>
```

[< time selector](time-selector.md) | [Home](documentation.md) | [spinal navigator >](spinal-navigator.md)