import React, { useEffect, useState } from 'react';
import { getRandomSonnet } from '../api/sonnets'
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
  const [randomSonnet, setRandomSonnet] = useState()
  // useEffect(() => setYear(), [month, day])
  async function getSonnet() {
    setRandomSonnet(await getRandomSonnet());
    console.log(randomSonnet)
  }

  const sonnet: Sonnet = randomSonnet ? randomSonnet['text'].map((line: string) => {
    return (<li>
      <p>{line}</p>
    </li>)
  }) : null

  return (<div>
    <h1>Dustball Bards</h1>
    <p>{description}</p>
    <ul>
      {sonnet}
    </ul>
    <button onClick={() => getSonnet()}>Click me</button>
  </div>)
}

