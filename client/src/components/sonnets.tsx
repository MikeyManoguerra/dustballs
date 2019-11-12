import React, { useEffect, useState, SyntheticEvent } from "react";
import { getRandomSonnet, querySonnets } from "../api/sonnets";
import { string } from "prop-types";

interface Sonnet {
  _id: {};
  type: string;
  author_first_name: string;
  author_last_name: string;
  length: number;
  text: Array<string>;
  title: string;
  query_index: number;
}

export default function SonnetDisplay() {
  const [summary, setSummary] = useState("");
  const [query, setQuery] = useState("");
  const [querySet, setQuerySet] = useState<Sonnet[]>([]);
  const [randomSonnet, setRandomSonnet] = useState<Sonnet>();
  const [snippet, setSnippet] = useState<Array<string>>([]);
  const [currentQuery, setCurrentQuery] = useState<number>(0);

  // useEffect(() => setYear(), [month, day])
  async function getSonnet() {
    setRandomSonnet(await getRandomSonnet());
  }

  useEffect(() => {
    console.log('hey')
    if (querySet.length) {
      buildSnippetArray(currentQuery);
    }
  }, [querySet]);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const queryResponse: Sonnet[] = await querySonnets(query);
    setQuerySet(queryResponse);
  }

  function mapSonnetArray(sonnetText: Array<string>) {
    console.log(sonnetText);
    return sonnetText
      ? sonnetText.map((line: string) => {
          return (
            <li>
              <p>{line}</p>
            </li>
          );
        })
      : null;
  }

  function buildSnippetArray(sonnetIndex = 0) {
    sonnetIndex = sonnetIndex + 1 > querySet.length ? 0 : sonnetIndex;
    const queryIndex = querySet[sonnetIndex].query_index;
    const start = queryIndex; // - Math.floor(Math.random() * 3);
    const snpt: Array<string> = [];
    for (let i = start; i < start + 3; i++) {
      snpt.push(querySet[sonnetIndex].text[i]);
    }
    setCurrentQuery(sonnetIndex);
    setSnippet(snpt);
  }

  // const sonnet = mapSonnetArray(randomSonnet.text);

  return (
    <div>
      <h1>Dustball Bards</h1>
      <p>check your sonnet search</p>
      {/* <ul>{sonnet}</ul> */}
      <button onClick={() => getSonnet()}>Get Random Sonnet</button>
      <form action="GET" onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="sonnetQuery"
          onChange={event => setQuery(event.target.value)}
          value={query}
          id=""
        />
        <input type="submit" />
        {snippet.length && (
          <div>
            <ul>{mapSonnetArray(snippet)}</ul>
            <button onClick={() => setCurrentQuery(currentQuery + 1)}>
              next
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
