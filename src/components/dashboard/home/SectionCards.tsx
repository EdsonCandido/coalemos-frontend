import  { memo } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { DollarSign, ArrowUp, ArrowDown, TrendingUp } from "lucide-react"

const SectionCards = () => {
  const kpis = [
    {
      title: "Saldo Atual",
      value: 15200,
      icon: <DollarSign className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Receitas",
      value: 20000,
      icon: <ArrowUp className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Despesas",
      value: 4800,
      icon: <ArrowDown className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Fluxo de Caixa",
      value: 15200,
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="flex items-center justify-between p-4">
          <div className="space-y-1">
            <CardTitle className="text-sm text-muted-foreground">{kpi.title}</CardTitle>
            <p className="text-lg font-bold">R$ {kpi.value.toLocaleString()}</p>
          </div>
          <div>{kpi.icon}</div>
        </Card>
      ))}
    </div>
  )
}

export default memo(SectionCards);
