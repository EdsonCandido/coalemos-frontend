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
  foto_perfil: string | null;
  is_primeiro_acesso?: boolean;
  perfil?: string;
  is_ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type tEmpresas = {
  cod?: number;
  cnpj: string;
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
