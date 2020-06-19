const API_PATH = process.env.NODE_ENV === 'production'? process.env.REACT_APP_API_SERVER :'http://localhost:5000'
const NOT_FOUND = 'NOT_FOUND'
const ERROR = 'ERROR'

//  TODO: extend error object
export async function getApi(requestString: string) {
  const response = await fetch(`${API_PATH}${requestString}`, {
    method: 'GET'
  })
  // todo error handling setup
  if (response.status === 404) {
    throw new Error(NOT_FOUND)
  }

  if (!response.ok) {
    throw new Error(ERROR)
  }

  return response.json()
}
