interface OptionProps {
  tooltip: any;
  x: any;
  y: any;
  thickness?: any;
  aspect?: any;
}

class ChartModule {
  public setChart({ tooltip, x, y, thickness, aspect = true }: OptionProps) {
    return {
      maintainAspectRatio: aspect,
      maxBarThickness: thickness,
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: tooltip,
      },
      scales: {
        x: x,
        y: y,
      },
    };
  }
}
const chartInstance = new ChartModule();
export default chartInstance;
