import React, { useEffect, useState, SyntheticEvent } from 'react';
import { getRandomSonnet, querySonnets } from '../api/sonnets';
import AppLinkPrimary from '../components/AppLinkPrimary'


interface Sonnet {
  _id: {};
  type: string;
  title: string;
  length: number;
  text: Array<string>;
  query_index: number;
  author_last_name: string;
  author_first_name: string;
}

export default function SonnetDisplay() {
  const [query, setQuery] = useState('');
  const [querySet, setQuerySet] = useState<Sonnet[]>([]);
  const [snippet, setSnippet] = useState<Array<string>>([]);
  const [currentQuery, setCurrentQuery] = useState<number>(0);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function getSonnet() {
    setQuerySet([await getRandomSonnet()]);
  }

  useEffect(() => {
    getSonnet()
  },
    []
  )

  useEffect(() => {
    if (querySet.length) {
      buildSnippetArray(currentQuery);
    }
  },
    [querySet, currentQuery]
  );

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setError('');
    setCurrentQuery(0);

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
      const highlight =
        querySet[currentQuery].query_index === index ? 'highlight' : '';
      return (
        <li className={highlight} key={index}>
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
    const start =
      queryIndex <= querySet[sonnetIndex].text.length - 3
        ? queryIndex
        : querySet[sonnetIndex].text.length - 3; // - Math.floor(Math.random() * 3);
    const snpt: Array<string> = [];
    for (let i = start; i < start + 3; i++) {
      snpt.push(querySet[sonnetIndex].text[i]);
    }
    setSnippet(snpt);
  }

  // const sonnet = mapSonnetArray(randomSonnet.text);

  return (
    <div className="SonnetView">
      <div className="SonnetView__inner">
        <div className="SonnetView__forms">
          <div className="SonnetView__formContent">
            <button
              onClick={() => getSonnet()}
            >
              Get Random Sonnet
          </button>
          </div>
          <div className="SonnetView__formContent">
            <form action="GET" onSubmit={e => handleSubmit(e)}>
              <input
                className={error}
                type="text"
                name="sonnetQuery"
                onChange={event => setQuery(event.target.value)}
                value={query}
                id=""
              />
              <input className="SonnetView__formSubmit" type="submit" />
            </form>
          </div>
        </div>
        <div className="SonnetView__sonnet">
          {snippet.length && (
            <div>
              <div className="SonnetView__sonnetControls">
                <p>Sonnet Number:{querySet[currentQuery].title}</p>
                <button onClick={() => setIsExpanded(!isExpanded)}>expand</button>
                {querySet.length > 1
                  &&
                  <button onClick={() => handleDisplayNextSnippet()}>next</button>
                }
              </div>
              <ul>{mapSonnetArray(isExpanded ? querySet[currentQuery].text : snippet)}</ul>
            </div>
          )}
        </div>
      </div>
      <AppLinkPrimary to="/">home</AppLinkPrimary>
    </div>
  );
}
