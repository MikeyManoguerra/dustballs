import { getApi } from '../fetch'

export async function queryPlays(query: string) {
  try {
    return await getApi(`/plays?query=${query}`)
  }
  catch (err) {
    throw err
  }
}
