# DOCUMENTATION

## Installation

```
npm i https://github.com/spinalcom/spinal-components.git
```

In your main file add the following lines

```javascript
import SpinalComponents from "spinal-components";
import "spinal-components/dist/spinal-components.css";

Vue.use(SpinalComponents, {});
```

If your app use typescript instead of javascript you might need to add the declaration of the module.
Create a file name named `spinal-components.d.ts` which will contain the code

```typescript
declare module "spinal-components";
```

## Components

- [Time Selector](time-selector.md)
- [Space Selector](space-selector.md)
- [Spinal Navigator](spinal-navigator.md)
- [Download Button](download-button.md)
- [Paginated Table](paginated-table.md)
- [Stat Card](stad-card.md)
- [Double Stat Card](double-stat-card.md)
- [Pie Card](pie-card.md)
- [Bar Card](bar-card.md)
- [Ticket Details](ticket-details.md)
- [Carousel](carousel.md)
- [Estimation](estimation-card.md)
