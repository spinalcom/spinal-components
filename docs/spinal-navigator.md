# Spinal Navigator

## Usage

This component use both the time and space selectors as one component.

### Example
![time selector](../public/docs/spinal%20navigator.png)
### Code
```vue
<template>
  <sc-spinal-navigator v-model="navigator" :current_period="time" :current_element="element" :max-depth="2" :expandSelector="expand"></sc-spinal-navigator>
</template>

<script>
export default {
  data: () => ({
    navigator: {
      spatial: 'Selection',
      time: { name: "SEMAINE", value: "week" }
    }
  }),
  computed: {
    time() {
      return this.navigator.time
    },
    element() {
      return { title: this.navigator.spatial, name: 'Liste' }
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

[< space selector](space-selector.md) | [Home](documentation.md) | [download button >](download-button.md)