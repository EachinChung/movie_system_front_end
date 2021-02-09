import requests from "@/services/requests"

export const getMovies = (params) => {
  return requests.get("/api/movies/", params)
}
