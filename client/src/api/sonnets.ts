import { getApi } from '../fetch'

export async function getRandomSonnet() {
  try {
    return await getApi('/sonnets/random')
  }
  catch (err) {
    return err
  }
}

export async function querySonnets(query: string) {
  try {
    return await getApi(`/sonnets?query=${query}`)
  }
  catch (err) {
    return err
  }
}
