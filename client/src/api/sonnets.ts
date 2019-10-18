export async function getRandomSonnet(){
  const randomSonnet = await fetch('http://localhost:5000/sonnets/random',{
    method:'GET'
  })
  return randomSonnet.json()
}