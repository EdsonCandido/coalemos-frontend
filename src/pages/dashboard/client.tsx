"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

import { ClientsTable, type Client } from "@/components/dashboard/client/clients-table"
import { ClientForm } from "@/components/dashboard/client/client-form"

export default function ClientsPage() {
  const [codSearch,] = useState<number | null>(null);
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "João Silva", email: "joao@email.com" },
    { id: 2, name: "Maria Souza", email: "maria@email.com" },
  ])
  const [openForm, setOpenForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  function handleAdd(client: { name: string; email: string }) {
    if (editingClient) {
      setClients(prev =>
        prev.map(c => (c.id === editingClient.id ? { ...c, ...client } : c))
      )
    } else {
      setClients(prev => [...prev, { id: Date.now(), ...client }])
    }
    setEditingClient(null)
  }

  const onInit = async () => {
    console.log("codSearch", codSearch)
  }

  useEffect(() => {
    void onInit();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button onClick={() => setOpenForm(true)}>Novo Cliente</Button>
      </div>
      <ClientsTable
        data={clients}
        onEdit={client => {
          setEditingClient(client)
          setOpenForm(true)
        }}
      />
      <ClientForm
        open={openForm}
        onClose={() => {
          setOpenForm(false)
          setEditingClient(null)
        }}
        onSubmit={handleAdd}
        codSearch={codSearch}
      />
    </div>
  )
}
