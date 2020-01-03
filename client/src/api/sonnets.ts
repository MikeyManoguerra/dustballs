
const API_PATH = 'http://localhost:5000'

export async function getRandomSonnet() {
  try {
    const randomSonnet = await fetch(`${API_PATH}/sonnets/random`, {
      method: 'GET'
    })
    return randomSonnet.json()
  }
  catch (err) {
    console.log(err)
    return err
  }
}

export async function querySonnets(query: string) {
  try {
    const sonnetQuerySet = await fetch(`${API_PATH}/sonnets?query=${query}`, {
      method: 'GET'
    })
    return sonnetQuerySet.json()
  }
  catch (err) {
    console.log(err)
  }
}