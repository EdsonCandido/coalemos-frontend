"use client"

import { useEffect, useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Loading from "@/components/loading"

interface ClientFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string }) => void
  codSearch?: number
}

export function ClientForm({
  open,
  onClose,
  onSubmit,
  codSearch,
}: ClientFormProps) {
  const [loadingPage, setLoadingPage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSave() {
    onSubmit({ name, email })
    handleClose()
  }

  const handleClose = () => {
    setName("")
    setEmail("")
    onClose()
  }

  const onInit = async () => {
    setLoadingPage(true);
    if (codSearch) {
      setName("Cliente Exemplo")
      setEmail("zSjyX@example.com")
    }
    setTimeout(() => {
      setLoadingPage(false);
    }, 1000);
  }

  useEffect(() => {
    if (open) {
      onInit()
    }
  }, [open]);

  return (
    <Drawer direction="left" dismissible={false} open={open} onOpenChange={handleClose}>
      <DrawerContent
        style={{ width: '30vw', maxWidth: "100%" }}
        className="p-4 w-full md:w-auto"
      >
        <DrawerHeader>
          <DrawerTitle>{codSearch ? "Editar Cliente" : "Novo Cliente"}</DrawerTitle>
        </DrawerHeader>

        {
          loadingPage ? <Loading text="Carregando..." /> : (
            <div className="space-y-4 mt-2">
              <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          )
        }



        <DrawerFooter className="pt-6">
          <div className="flex justify-end gap-2">
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>Cancelar</Button>
            </DrawerClose>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
