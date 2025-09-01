
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate, formatNumberForMoney } from "@/libs/utils";
import { memo } from "react";

const DataTableSumary = () =>{
  const data = [
    { id: 1, description: "Venda Produto A", type: "Receita", amount: 2000, date: "2025-08-01" },
    { id: 2, description: "Compra Material", type: "Despesa", amount: 500, date: "2025-08-02" },
    { id: 3, description: "Salário Funcionário", type: "Despesa", amount: 1500, date: "2025-08-03" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell className={item.type === "Receita" ? "text-green-600" : "text-red-600"}>
              { formatNumberForMoney(item.amount)}
            </TableCell>
            <TableCell>{formatDate(item.date, "dd/MM/yyyy")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default memo(DataTableSumary);
