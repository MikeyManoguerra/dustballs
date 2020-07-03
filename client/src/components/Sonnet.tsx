import React, { useRef, useEffect, Fragment } from 'react'
import gsap from 'gsap'

interface TextProps {
  query: string
  isExpanded: boolean
  sonnet: Array<string>
  queryIndex?: number // index of the query in the current array.
}

export default function Sonnet({ sonnet, query, isExpanded }: TextProps) {
  const paper = useRef<HTMLDivElement>(null)
  const snippet = useRef<HTMLUListElement>(null)
  const tl = useRef<GSAPTimeline | null>(null)

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true })

    tl.current.fromTo(snippet.current,
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0,
      },

    )
    tl.current.to(paper.current,
      {
        height: isExpanded ? '500px' : '200px'
      },
      'size',
    )
    tl.current.to(snippet.current,
      {
        opacity: 1,
        duration: 1
      },
    )
    tl.current.play(0)
  }, [isExpanded])


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
          <span className="highlight">{query}</span>
          <span>{subStr}</span>
        </Fragment>
      )
    })

    return <p>{processedLine}</p>
  }

  const sonnetHtml = sonnet.map((line: string, index) => {
    return (
      <li
        className={`Sonnet__line ${index > 11 ? "Sonnet__line--ending" : null}`}
        key={index}
      >
        {handleQueryHighlight(line)}
      </li>
    )
  })

  return (
    <div className="Sonnet">
      <div className="Sonnet__accentTop" />
      <div
        ref={paper}
        className={`Sonnet__paper Sonnet__paper${isExpanded ? '--sonnet' : '--snippet'}`}
      >
        <ul className="Sonnet__textList" ref={snippet}>{sonnetHtml}</ul>

      </div>
      <div className="Sonnet__accentBottom" />
    </div>
  )
}
