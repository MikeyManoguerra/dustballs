import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { Sonnet, AppInput, Stage } from '../components'
import { useToggle, useSonnet } from '../hooks'

export default function SonnetDisplay() {
  const {
    query,
    snippet,
    querySet,
    getSonnet,
    currentQuery,
    handleUserSubmit,
    handleDisplayNextSnippet,
  } = useSonnet()

  const [isExpanded, setIsExpanded] = useToggle()
  const [userQuery, setUserQuery] = useState('')
  const [pause, setPause] = useState(false)
  // const [error, setError] = useState('')

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsExpanded(false)

    await handleUserSubmit(userQuery)
    setUserQuery('')
  }

  function displayNext(): void {
    handleDisplayNextSnippet()
    setIsExpanded(false)
  }

  function handleExpand() {
    if (pause) return
    // allow for animation to finish. todo: revisit
    setPause(true)
    setIsExpanded()
    setTimeout(() => { setPause(false) }, 1.5 * 1000)
  }

  return (
    <div className="SonnetView">
      <div className="SonnetView__background">
        <img src="/images/wood-texture.jpg" alt="" className="SonnetView__bgImage" />
      </div>
      <div className="SonnetView__inner">
        <div className="SonnetView__header">
          <h2 className="SonnetView__heading">
            Sonnet Search
          </h2>
          <p className="SonnetView__body">
            Search Shakespeare's Sonnets for a word, and you will see snippets of the sonnets that contain your query. Or, get a random sonnet!
          </p>
        </div>
        <div className="SonnetView__forms">
          <Stage>
            <>
              <form
                className="SonnetView__form"
                action="GET"
                onSubmit={e => handleSubmit(e)}
              >
                <AppInput
                  name="sonnetQuery"
                  value={userQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUserQuery(e.target.value)}
                />
                <input
                  className="SonnetView__formButton"
                  type="submit"
                  value="Search"
                />
              </form>
              <div className="SonnetView__or">OR</div>
              <button
                type="button"
                className="SonnetView__formButton"
                onClick={() => getSonnet()}
              >
                Get Random
                </button>
            </>
          </Stage>
        </div>
        <div className="SonnetView__sonnet">
          {snippet.length ? (
            <div className="SonnetView__sonnetInner">
              <div className="SonnetView__sonnetControls">
                <div className="SonnetView__sonnetButtons"><button
                  className="SonnetView__sonnetButton"
                  onClick={() => handleExpand()}>expand</button>
                  {querySet.length > 1
                    &&
                    <button
                      className="SonnetView__sonnetButton"
                      onClick={displayNext}>next</button>
                  }
                </div>
                <div className="SonnetView__sonnetTitle">
                  <p >
                    Sonnet Number:&nbsp;{querySet[currentQuery].title}
                  </p>
                </div>
              </div>
              <Sonnet
                isExpanded={isExpanded}
                sonnet={isExpanded ? querySet[currentQuery].text : snippet}
                query={query}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
