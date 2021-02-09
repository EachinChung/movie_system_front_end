import requests from "@/services/requests"

export const getDoubanTop250Api = (params) => {
  return requests.get("/api/douban/top250", params)
}
