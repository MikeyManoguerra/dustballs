import { useState, useEffect } from "react";
import { getRandomSonnet, querySonnets } from "../api/";

interface ApiSonnet {
  _id: {};
  type: string;
  title: string;
  length: number;
  text: Array<string>;
  query_index: number;
  author_last_name: string;
  author_first_name: string;
}

export default function useSonnet() {
  const [query, setQuery] = useState<string>('');
  const [querySet, setQuerySet] = useState<ApiSonnet[]>([]);
  const [snippet, setSnippet] = useState<Array<string>>([]);
  const [currentQuery, setCurrentQuery] = useState<number>(0);

  useEffect(() => {
    getSonnet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (querySet.length) {
      buildSnippetArray(currentQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querySet, currentQuery]);

  async function getSonnet(): Promise<void> {
    // get random sonnet returns an object, so we add it to an array
    try {
      setQuerySet([await getRandomSonnet()]);
      setQuery('');
    }
    catch (err) {
      handleEmptyResponse();
    }
  }

  function handleDisplayNextSnippet(): void {
    currentQuery + 1 >= querySet.length
      ? setCurrentQuery(0)
      : setCurrentQuery(currentQuery + 1);
  }

  function buildSnippetArray(sonnetIndex = 0): void {
    const queryIndex = querySet[sonnetIndex].query_index;
    // sonnets are 14 lines
    const start = queryIndex <= 11 ? queryIndex : 11; // - Math.floor(Math.random() * 3);
    const snpt: Array<string> = querySet[sonnetIndex].text.slice(
      start,
      start + 3
    );
    setSnippet(snpt);
  }

  function handleEmptyResponse() {
    // will become handle404 response
    setQuerySet(querySet);
  }

  async function handleUserSubmit(userQuery: string) {
    try {
      const queryResponse: ApiSonnet[] = await querySonnets(userQuery);
      if (!queryResponse.length) {
        return handleEmptyResponse();
      }

      setQuery(userQuery);
      setQuerySet(queryResponse);
    }
    catch (err) {
      handleEmptyResponse();
    }
  }

  return {
    query,
    snippet,
    querySet,
    getSonnet,
    currentQuery,
    handleUserSubmit,
    handleDisplayNextSnippet,
  };
}
