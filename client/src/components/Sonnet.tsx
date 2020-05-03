import React, { useEffect, Fragment } from 'react'
import gsap from 'gsap'

interface TextProps {
  query: string;
  isExpanded: boolean;
  sonnet: Array<string>;
  queryIndex?: number; // index of the query in the current array.
}

export default function Sonnet({ sonnet, query, isExpanded }: TextProps) {

      useEffect(() => {
        gsap.to(
          "#snippet",
          {
            skewY: '25deg'
          }
        )
      },
        []
      )

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
    <div id="snippet" className={`Sonnet__text Sonnet__text${isExpanded ? '--sonnet' : '--snippet'}`}>
      <ul >
        {sonnetHtml}
      </ul>
      <span className="Sonnet__tear"></span>
      <span className="Sonnet__tear"></span>
      <span className="Sonnet__tear"></span>
      <span className="Sonnet__tear"></span>
      <span className="Sonnet__tearTop"></span>
      <span className="Sonnet__tearTop"></span>
      <span className="Sonnet__tearTop"></span>

    </div>
  )

}
