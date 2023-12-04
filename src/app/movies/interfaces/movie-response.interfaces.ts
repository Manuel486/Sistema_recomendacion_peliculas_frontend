
export interface MovieResponse {
  page: number;
  results: any[]; // Aquí deberías definir un tipo adecuado para las películas
  total_pages: number;
  total_results: number;
}
