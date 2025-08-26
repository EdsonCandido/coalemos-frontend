"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface ClientFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string }) => void
  initialData?: { name: string; email: string }
}

export function ClientForm({ open, onClose, onSubmit, initialData }: ClientFormProps) {
  const [name, setName] = useState(initialData?.name ?? "")
  const [email, setEmail] = useState(initialData?.email ?? "")

  function handleSave() {
    onSubmit({ name, email })
    onClose()
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="fixed right-0 top-0 h-full w-96 p-4">
        <DrawerHeader>
          <DrawerTitle>{initialData ? "Editar Cliente" : "Novo Cliente"}</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-4">
          <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <DrawerFooter className="flex justify-end gap-2 pt-6">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
          <Button onClick={handleSave}>Salvar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
