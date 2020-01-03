import React, { useEffect, useState, SyntheticEvent } from 'react';
import { getRandomSonnet, querySonnets } from '../api/sonnets';

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
  const [summary, setSummary] = useState('');
  const [query, setQuery] = useState('');
  const [querySet, setQuerySet] = useState<Sonnet[]>([]);
  const [randomSonnet, setRandomSonnet] = useState<Sonnet>();
  const [snippet, setSnippet] = useState<Array<string>>([]);
  const [currentQuery, setCurrentQuery] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // useEffect(() => setYear(), [month, day])
  async function getSonnet() {
    setRandomSonnet(await getRandomSonnet());
  }

  useEffect(() => {
    if (querySet.length) {
      buildSnippetArray(currentQuery);
    }
  }, [querySet, currentQuery]);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setError('');
    const queryResponse: Sonnet[] = await querySonnets(query);
    queryResponse.length ? setQuerySet(queryResponse) : handleEmptyResponse();
    setIsExpanded(false);
  }

  function handleEmptyResponse() {
    setQuerySet(querySet);
    setError('error-border');
  }

  function mapSonnetArray(sonnetText: Array<string>) {
    return sonnetText.map((line: string, index) => {
      return (
        <li key={index}>
          <p>{line}</p>
        </li>
      );
    });
  }

  function handleDisplayNextSnippet() {
    setIsExpanded(false);
    currentQuery + 1 >= querySet.length
      ? setCurrentQuery(0)
      : setCurrentQuery(currentQuery + 1);
  }

  function buildSnippetArray(sonnetIndex = 0) {
    const queryIndex = querySet[sonnetIndex].query_index;
    const start = queryIndex; // - Math.floor(Math.random() * 3);
    const snpt: Array<string> = [];
    for (let i = start; i < start + 3; i++) {
      snpt.push(querySet[sonnetIndex].text[i]);
    }
    setSnippet(snpt);
  }

  // const sonnet = mapSonnetArray(randomSonnet.text);

  return (
    <div id="sonnet-container">
      <h1>Dustball Bards</h1>
      <p>check your sonnet search</p>
      <button onClick={() => getSonnet()}>Get Random Sonnet</button>
      <form action="GET" onSubmit={e => handleSubmit(e)}>
        <input
          className={error}
          type="text"
          name="sonnetQuery"
          onChange={event => setQuery(event.target.value)}
          value={query}
          id=""
        />
        <input type="submit" />
      </form>
      {snippet.length && (
        <div>
          <h2>Sonnet Number:{querySet[currentQuery].title}</h2>
          {isExpanded ? (
            <ul>{mapSonnetArray(querySet[currentQuery].text)}</ul>
          ) : (
            <ul>{mapSonnetArray(snippet)}</ul>
          )}
          <button onClick={() => handleDisplayNextSnippet()}>next</button>
          <button
            onClick={() => {
              return setIsExpanded(!isExpanded);
            }}
          >
            expand
          </button>
        </div>
      )}
    </div>
  );
}
