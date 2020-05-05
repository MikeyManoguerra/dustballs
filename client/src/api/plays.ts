import { getApi } from '../fetch'

export async function queryPlays(query: string) {
  try {
    return await getApi(`/sonnets?query=${query}`)
  }
  catch (err) {
    throw err
  }
}
