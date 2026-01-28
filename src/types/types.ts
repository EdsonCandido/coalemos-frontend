export type ApiResponse<T> = {
  data: T;
  message: string | null;
  success: boolean;
};

export type tBanners = {
  cod?: number;
  descricao: string;
  arquivo?: string;
  nome_arquivo?: string;
  data_vigencia_inicial: string;
  data_vigencia_final: string;
  is_ativo?: boolean;
  created_at?: string;
  cod_usuario_criacao?: number;
  updated_at?: string;
  cod_usuario_updated?: number;
};

export type tUsuarios = {
  cod?: number;
  nome: string;
  senha?: string | null;
  cpf?: string;
  login: string;
  cod_empresa?: number;
  foto_perfil: string | null;
  is_primeiro_acesso?: boolean;
  perfil?: string;
  is_ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type tClientes = {
  cod?: number;
  cod_empresa?: number;
  nome: string;
  cpf_cnpj: string;
  telefone?: string;
  email?: string;
  cep?: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  is_ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type tCEP = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
};

export type tEmpresas = {
  cod?: number;
  cnpj: string;
  lat?: number;
  long?: number;
  nome_fantasia: string;
  razao_social: string;
  cep?: string;
  endereco?: string;
  cidade?: string;
  bairro?: string;
  uf?: string;
  created_at?: string;
  updated_at?: string;
};

export enum tAppointmentStatus {
  AGENDADO = 'agendado',
  CONFIRMADO = 'confirmado',
  CANCELADO = 'cancelado',
  CONCLUIDO = 'concluido',
}

export type tAgendamentos = {
  cod?: number;
  cod_usuario_responsavel: number;
  data_agendamento: string;
  titulo: string;
  descricao?: string;
  status_agendamento: tAppointmentStatus;
  cod_cliente?: number;

  is_ativo?: boolean;
  created_at?: string;
  cod_usuario_criacao?: number;
  updated_at?: string;
  cod_usuario_updated?: number;

  cliente_nome?: string;
  cliente_telefone?: string;
  cliente_email?: string;

  nome_usuario_updated?: string;
  nome_usuario_criacao?: string;
};
