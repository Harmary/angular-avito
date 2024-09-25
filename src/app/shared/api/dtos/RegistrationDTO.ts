export interface RegistrationDTO {
  phone: string;
  name: string;
  password: string;
}

export interface RegistrationResponseDTO {
  guid: string;
  name: string;
  phone: string;
  address: string;
  password: string;
}
