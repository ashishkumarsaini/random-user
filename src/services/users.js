import { fetchData } from "./api"

export const getUsers = () => {
  const path = '/public/randomusers'
  return fetchData(path, 'GET')
}