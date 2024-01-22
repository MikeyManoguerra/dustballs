import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { Sonnet, AppInput, Stage } from '../components'
import { useToggle, useSonnet } from '../hooks'
import BaseLayout from '../layouts/BaseLayout';

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
    <BaseLayout>
      <div className="SonnetPage__header">
        <h2 className="SonnetPage__heading">
          Sonnet Search
        </h2>
        <p className="SonnetPage__body">
          Search Shakespeare's Sonnets for a word, and you will see snippets of the sonnets that contain your query. Or, get a random sonnet!
        </p>
      </div>
      <div className="SonnetPage__forms">
        <Stage>
          <>
            <form
              className="SonnetPage__form"
              action="GET"
              onSubmit={e => handleSubmit(e)}
            >
              <AppInput
                name="sonnetQuery"
                value={userQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUserQuery(e.target.value)}
              />
              <input
                className="SonnetPage__formButton"
                type="submit"
                value="Search"
              />
            </form>
            <div className="SonnetPage__or">OR</div>
            <button
              type="button"
              className="SonnetPage__formButton"
              onClick={() => getSonnet()}
            >
              Get Random
            </button>
          </>
        </Stage>
      </div>
      <div className="SonnetPage__sonnet">
        {snippet.length ? (
          <div className="SonnetPage__sonnetInner">
            <div className="SonnetPage__sonnetControls">
              <div className="SonnetPage__sonnetButtons"><button
                className="SonnetPage__sonnetButton"
                onClick={() => handleExpand()}>expand</button>
                {querySet.length > 1
                  &&
                  <button
                    className="SonnetPage__sonnetButton"
                    onClick={displayNext}>next</button>
                }
              </div>
              <div className="SonnetPage__sonnetTitle">
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
    </BaseLayout>
  );
}
