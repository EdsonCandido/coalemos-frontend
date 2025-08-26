"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

export type Client = {
  id: number
  name: string
  email: string
}

interface ClientsTableProps {
  data: Client[]
  onEdit: (client: Client) => void
}

export function ClientsTable({ data, onEdit }: ClientsTableProps) {
  const columns: ColumnDef<Client>[] = [
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "email", header: "Email" },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <Button variant="outline" size="sm" onClick={() => onEdit(row.original)}>
          Editar
        </Button>
      ),
    },
  ]

  return <DataTable columns={columns} data={data} />
}
