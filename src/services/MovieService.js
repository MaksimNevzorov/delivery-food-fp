import { dishes } from "../MOCK/dishes";

class MovieService {
  getAllMovies() {
    return Promise.resolve({ data: dishes });
  }
}

export const movieService = new MovieService();
