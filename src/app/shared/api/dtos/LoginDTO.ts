export interface LoginDTO {
  phone: string;
  password: string;
}

export interface LoginResponseDTO {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  address: string;
  password: string;
}
