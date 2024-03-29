# Spinal Navigator

## Usage

This component use both the time and space selectors as one component.

### Example

![spinal navigator](../public/docs/spinal%20navigator.png)

### Code

```vue
<template>
  <sc-spinal-navigator
    v-model="navigator"
    :first-tile="firstTile"
    :max-depth="2"
    :expandSelector="expand"
  ></sc-spinal-navigator>
</template>

<script>
export default {
  data: () => ({
    navigator: {
      element: { name: "Selection" },
      period: { name: "SEMAINE", value: "week" },
    },
    firstTile: { name: "red", color: "#f00", dynamicId: 0 },
  }),
  methods: {
    expand() {
      return [
        { name: "red", color: "#f00", dynamicId: 1 },
        { name: "green", color: "#0f0", dynamicId: 2 },
        { name: "blue", color: "#00f", dynamicId: 3 },
      ];
    },
  },
};
</script>
```

[< space selector](space-selector.md) | [Home](documentation.md) | [download button >](download-button.md)
