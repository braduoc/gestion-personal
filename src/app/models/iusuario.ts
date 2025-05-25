export interface IUsuario {
  id: number;
  first_Name: string;
  last_Name: string;
  email: string;
  phone: string;
  address: string;
  [key: string]: string | number;  // <- Esto habilita el acceso dinámico

}
export interface IUsuarioParaCrear {
  first_Name: string;
  last_Name: string;
  email: string;
  phone: string;
  address: string;
}
