# Space Selector

## Usage

The notable props for this component are:

- onopen: a function returning an array of objects containing at least the attributes
  - name
  - dynamicId
  - color (hexa in a string)
- v-model: dynamicId and color are not required but will be returned
- path: the path to your current position in the selector (not required)
- firstTile: the top tile displayed when opening the selector
- list: if false the first tile will be considered as a selectable element

### Example

![space selector](../public/docs/space%20selector.png)

### Code

```vue
<template>
  <sc-space-selector
    v-model="element"
    :first-tile="firstTile"
    list
    :path.sync="path"
    :max-depth="2"
    :onopen="expand"
  ></sc-space-selector>
</template>

<script>
export default {
  data: () => ({
    element: { name: "Selection", dynamicId: 0, color: "#f00" },
    firstTile: { name: "Liste" },
    path: {},
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

[< time selector](time-selector.md) | [Home](documentation.md) | [spinal navigator >](spinal-navigator.md)
