"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Client = {
  id: number
  name: string
  email: string
  phone: string
  cpf: string
}

export const columns = (
  handleEdit: (client: Client) => void
): ColumnDef<Client>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const client = row.original
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEdit(client)}
        >
          Editar
        </Button>
      )
    },
  },
]
