import { format } from 'date-fns';

export const numberForMoney = (value: number, fractionDigits: number = 2) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const numberFormater = (value: number, fractionDigits: number = 2) => {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

/**
 *
 * @param value string
 * @param formatString default  'dd/MM/yyyy HH:mm:ss'
 * @returns string
 */
export const dateFormat = (value: string, formatString = 'dd/MM/yyyy HH:mm:ss') => {
  return format(new Date(value), formatString);
};

// export const formatCPF = (cpf: string): string => {
//     const cpfNumbers = cpf.replace(/\D/g, '');

//     if (cpfNumbers.length !== 11) {
//         return cpf;
//     }

//     return cpfNumbers.replace(
//         /(\d{3})(\d{3})(\d{3})(\d{2})/,
//         '$1.$2.$3-$4'
//     );
// };

export const formatCpfCnpj = (value: string) => {
  value = `${value}`.replace(/[^\d]/g, '');

  if (value.length <= 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
};
export const formatPhone = (value: string | number): string => {
  value = `${value}`.replace(/[^\d]/g, '');

  if (value.length === 10 || value.length === 11) {
    return value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  } else {
    // return 'Telefone inválido';
    return value;
  }
};

export const maskCep = (value: string): string => {
  value = value.replace(/\D/g, '').replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2-$3');
  return value;
};
export const maskPhoneComplete = (value: string): string => {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '+$1 ($2) $3-$4');
  return value;
};

export const deepEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key] as Record<string, unknown>, obj2[key] as Record<string, unknown>)) {
      return false;
    }
  }

  return true;
};

export function removerEspecial(texto: string) {
  return texto.replace(/[^\w\s]/gi, '');
}

export const handlerValue = (value: string, cb: (value: string) => void) => {
  const newValue = `${value}`.replace(/[^\d,]/g, '');

  cb(newValue);
};
