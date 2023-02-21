import { Chart, ChartOptions } from "chart.js";

export const customBackgroundPlugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx, chartArea } = chart;
    ctx.save();
    let begin = chartArea.left;
    const { top, height } = chartArea;
    let width;
    switch (chart.config.type) {
      case "bar":
        width = chartArea.width / (chart.data.labels?.length || 1);
        ctx.fillStyle = options.color || "white";
        chart.data.labels?.forEach(() => {
          ctx.moveTo(begin + 5, top);

          ctx.lineTo(begin + width - 5, top);
          ctx.arcTo(begin + width, top, begin + width, top + 5, 5);

          ctx.lineTo(begin + width, top + height - 5);
          ctx.arcTo(
            begin + width,
            top + height,
            begin + width - 5,
            top + height,
            5
          );

          ctx.lineTo(begin + 5, top + height);
          ctx.arcTo(begin, top + height, begin, top + height - 5, 5);

          ctx.lineTo(begin, top + 5);
          ctx.arcTo(begin, top, begin + 5, top, 5);

          ctx.fill();
          ctx.strokeStyle = "#f9f9f9";
          ctx.stroke();
          begin += width;
        });
        break;

      case "pie":
        break;

      default:
        break;
    }
    ctx.restore();
  },
};

export const customLegendPlugin = {
  id: "htmlLegend",
  afterUpdate: (chart, args, options) => {
    if (chart.config.type === "bar" && chart.legend) {
      chart.legend.left = chart.chartArea.left - 10;
    } else if (chart.config.type === "pie") {
      const legendContainer = chart.canvas.parentElement?.parentNode?.lastChild;
      while (legendContainer?.firstChild) legendContainer.firstChild?.remove();
      const items =
        chart.options.plugins?.legend?.labels?.generateLabels(chart);

      for (const item of items) {
        const li = document.createElement("li");
        li.classList.add("d-flex", "flex-row", "ma-3");
        li.style.cursor = "pointer";
        li.style.color = "#214353";

        li.onclick = () => {
          chart.toggleDataVisibility(item.index);
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement("span");
        boxSpan.classList.add("mr-2");
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.height = "21px";
        boxSpan.style.width = "9px";
        boxSpan.style.borderRadius = "5px";

        // Text
        const textContainer = document.createElement("p");
        textContainer.classList.add("ma-0", "pa-0");
        textContainer.style.textDecoration = item.hidden ? "line-through" : "";
        textContainer.style.fontSize = "14px";

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        legendContainer?.appendChild(li);
      }
    }
  },
};
