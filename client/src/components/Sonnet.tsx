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
        duration: 0
      },
      'size',
    )
    tl.current.to(paper.current,
      {
        height: isExpanded ? '300px' : '100px'
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
    return <li key={index}>{handleQueryHighlight(line)}</li>
  })

  return (
    <div className="Sonnet__background">
      <div
        ref={paper}
        className={`Sonnet__text Sonnet__text${isExpanded ? '--sonnet' : '--snippet'}`}
      >
        <ul ref={snippet}>{sonnetHtml}</ul>
        <span className="Sonnet__accent1"></span>
        <span className="Sonnet__accent2"></span>
        <span className="Sonnet__accent3"></span>
        <span className="Sonnet__accent4"></span>
      </div>
    </div>
  )
}
