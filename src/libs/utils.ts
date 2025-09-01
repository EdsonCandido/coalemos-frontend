import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formartStringForNumber = (text: string): number => {
    return `${text}`.length > 0 ? Number(`${text}`.replace(/[^0-9,-]/g, '').replace(',', '.')) : 0;
}

export const manterApenasNumeros = (value: string) => {
  return `${value}`.replace(/\D/g, '');
}

export const formatCep = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{3})$/, "$1-$2")
}
export const formatTelefone = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
        .replace(/(-\d{4})\d+?$/, "$1")
}