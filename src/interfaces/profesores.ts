export interface Profesor {
  id: number;
  nombre_completo: string;
  correo: string;
  telefono: string;
  direccion: string;
  genero: string;
  estado_profe: number;
  usuario: Usuario;
}

interface Usuario {
  id: number;
  username: string;
  estado_usuario: number;
}