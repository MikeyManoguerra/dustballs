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

export function useSonnet() {
  const [query, setQuery] = useState("");
  const [querySet, setQuerySet] = useState<ApiSonnet[]>([]);
  const [snippet, setSnippet] = useState<Array<string>>([]);
  const [currentQuery, setCurrentQuery] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    getSonnet();
  }, []);

  useEffect(() => {
    if (querySet.length) {
      buildSnippetArray(currentQuery);
    }
  }, [querySet, currentQuery]);

  async function getSonnet() {
    // get random sonnet returns an object, so we add it to an array
    try {
      setQuerySet([await getRandomSonnet()]);
      setQuery("");
    } catch (err) {
      handleEmptyResponse();
    }
  }

  function handleDisplayNextSnippet() {
    setIsExpanded(false);
    currentQuery + 1 >= querySet.length
      ? setCurrentQuery(0)
      : setCurrentQuery(currentQuery + 1);
  }

  function buildSnippetArray(sonnetIndex = 0) {
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
      setIsExpanded(false);
      setQuerySet(queryResponse);
    } catch (err) {
      handleEmptyResponse();
    }
  }

  return {
    query,
    snippet,
    querySet,
    getSonnet,
    isExpanded,
    currentQuery,
    setIsExpanded,
    handleUserSubmit,
    handleDisplayNextSnippet,
  };
}
