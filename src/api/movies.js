import requests from "@/services/requests"

export const getMovies = (params) => {
  return requests.get("/api/movies/", params)
}

export const getSearchMovies = (params) => {
  return requests.get("/api/movies/search", params)
}

export const postMoviesComment = (movieId, data) => {
  return requests.post(`/api/movies/${movieId}/comment`, data)
}

export const getMoviesComment = (movieId, params) => {
  return requests.get(`/api/movies/${movieId}/comment`, params)
}
