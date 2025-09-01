import { useTheme } from "@/components/theme-provider"
import { memo } from "react"
import Chart from "react-apexcharts"


const ChartAreaInteractive = () =>{
  const { theme } = useTheme() 

  const isDark = (() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return theme === "dark"
  })()

  const series = [
    { name: "Receitas", data: [1000, 1200, 1500, 1300, 1700, 1600, 1800] },
    { name: "Despesas", data: [800, 700, 900, 1000, 950, 1100, 1200] },
  ]

  const options = {
    chart: {
      id: "area",
      toolbar: { show: false },
      foreColor: isDark ? "#f1f5f9" : "#1e293b", // texto do gráfico
    },
    xaxis: {
      categories: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      labels: {
        style: { colors: isDark ? "#cbd5e1" : "#334155" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: isDark ? "#cbd5e1" : "#334155" },
      },
    },
    grid: {
      borderColor: isDark ? "#334155" : "#e2e8f0",
    },
    colors: isDark ? ["#22c55e", "#f87171"] : ["#16a34a", "#dc2626"], // cores do gráfico
    stroke: { curve: "smooth" },
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
  }

  return <Chart options={(options as ApexCharts.ApexOptions)} series={series} type="area" height={300} />
}

export default memo(ChartAreaInteractive);