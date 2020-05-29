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

  return (
    <div className="SonnetView">
      <div className="SonnetView__background">
        <img src="/images/wood-texture.jpg" alt="" className="SonnetView__bgImage" />
      </div>
      <div className="SonnetView__inner">
        <div className="SonnetView__forms">
          <div className="SonnetView__formContent">
            <Stage>
              <>
                <form action="GET" onSubmit={e => handleSubmit(e)}>
                  <AppInput
                    name="sonnetQuery"
                    value={userQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserQuery(e.target.value)}
                  />
                  <input className="AppButton" type="submit" />
                </form>
                <button
                  type="button"
                  className="AppButton"
                  onClick={() => getSonnet()}
                >
                  Get Random Sonnet
                </button>
              </>
            </Stage>
          </div>
        </div>
        <div className="SonnetView__sonnet">
          {snippet.length && (
            <div className="SonnetView__sonnetInner">
              <div className="SonnetView__sonnetControls">
                <p>Sonnet Number:{querySet[currentQuery].title}</p>
                <button
                  className="AppButton"
                  onClick={() => setIsExpanded()}>expand</button>
                {querySet.length > 1
                  &&
                  <button
                    className="AppButton"
                    onClick={displayNext}>next</button>
                }
              </div>
              <Sonnet
                isExpanded={isExpanded}
                sonnet={isExpanded ? querySet[currentQuery].text : snippet}
                query={query}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
