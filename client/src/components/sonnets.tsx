import React, { useEffect, useState, SyntheticEvent } from 'react';
import { getRandomSonnet, querySonnets } from '../api/sonnets'
import { string } from 'prop-types';


interface Sonnet {
  _id: {};
  type: string;
  author_first_name: string;
  author_last_name: string;
  length: number;
  text: Array<string>;
  title: string;
}




export default function SonnetDisplay() {
  const [description, setDescription] = useState('hey');
  const [summary, setSummary] = useState('');
  const [query, setQuery] = useState('');
  const [querySet, setQuerySet] = useState<Sonnet[]>([]);
  const [randomSonnet, setRandomSonnet] = useState()
  // useEffect(() => setYear(), [month, day])
  async function getSonnet() {
    setRandomSonnet(await getRandomSonnet());
    console.log(randomSonnet)
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const queryResponse: Sonnet[] = await querySonnets(query);
    await setQuerySet(queryResponse)
  }


  function mapSonnetArray(snt: Sonnet) {
    return snt ? snt.text.map((line: string) => {
      return (<li>
        <p>{line}</p>
      </li>)
    }) : null
  }

  const sonnet = mapSonnetArray(randomSonnet)
  const resultSonnet = mapSonnetArray(querySet[0])

  return (<div>
    <h1>Dustball Bards</h1>
    <p>{description}</p>
    <ul>
      {sonnet}
    </ul>
    <button onClick={() => getSonnet()}>Get Random Sonnet</button>
    <form action="GET" onSubmit={(e) => handleSubmit(e)}>
      <input type="text"
        name="sonnetQuery"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        id="" />
      <input type="submit" />
      {resultSonnet}
    </form>


  </div>)
}

