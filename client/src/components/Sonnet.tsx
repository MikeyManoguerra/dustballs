import React, { Fragment } from 'react'

interface TextProps {
  sonnet: Array<string>;
  queryIndex?: number; // index of the query in the current array.
  query: string;
}

export default function Sonnet({ sonnet, query }: TextProps) {

  // if the query appears in the line, put in a span that can have modifier class
  function handleQueryHighlight(line: string) {
    if (!query) {
      return <p>{line}</p>
    }

    const regexQuery = new RegExp(`${query}`, 'gi')
    const processedLine = line.split(regexQuery).map((subStr, index) => {
      if (!index) {
        // only want query to appear between array items. similar to a margin-left spacing
        return <span key={index}>{subStr}</span>
      }

      return (
        <Fragment key={index}>
          <span className='highlight'>{query}</span>
          <span>{subStr}</span>
        </Fragment>
      )

    })

    return <p>{processedLine}</p>
  }

  const sonnetHtml = sonnet.map((line: string, index) => {
    return (
      <li key={index}>
        {handleQueryHighlight(line)}
      </li>
    );
  });

  return (
    <ul>
      {sonnetHtml}
    </ul>
  )

}
