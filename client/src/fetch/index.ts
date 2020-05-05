const API_PATH = 'http://localhost:5000'
const NOT_FOUND = 'NOT_FOUND'
const ERROR = 'ERROR'

//  TODO: extend error object
export async function getApi(requestString: string) {
  const response = await fetch(`${API_PATH}${requestString}`, {
    method: 'GET'
  })
  if (response.ok) {
    return response.json()
  }
  if (response.status === 404) {
    throw new Error(NOT_FOUND)
  }
  throw new Error(ERROR)
}
