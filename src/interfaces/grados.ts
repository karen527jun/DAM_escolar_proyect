export default interface Grado {
  id_grado: number;
  id_profesor: number;
  id_especialidad: number;
  nombre_grado: string;
  seccion: string | null;
  year: number;
  especialidad: string;
  profesor: string;
}
