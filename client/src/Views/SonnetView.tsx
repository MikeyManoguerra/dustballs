import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import AppLinkPrimary from '../components/AppLinkPrimary'
import Sonnet from '../components/Sonnet'
import AppInput from '../components/AppInput';
import Stage from '../components/Stage'
import { useSonnet } from '../hooks/useSonnet'

export default function SonnetDisplay() {
  const {
    query,
    snippet,
    querySet,
    getSonnet,
    isExpanded,
    currentQuery,
    setIsExpanded,
    handleUserSubmit,
    handleDisplayNextSnippet,
  } = useSonnet()


  const [userQuery, setUserQuery] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    await handleUserSubmit(userQuery)
    setUserQuery('')
  }

  return (
    <div className="SonnetView">
      <div className="SonnetView__inner">
        <div className="SonnetView__forms">
          <div className="SonnetView__formContent">
          </div>
          <div className="SonnetView__formContent">
            <Stage>
              <form action="GET" onSubmit={e => handleSubmit(e)}>
                <AppInput
                  name="sonnetQuery"
                  value={userQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUserQuery(e.target.value)}
                />
                <input className="AppButton" type="submit" />
                <button
                  type="button"
                  className="AppButton"
                  onClick={() => getSonnet()}
                >
                  Get Random Sonnet
                </button>
              </form>
            </Stage>
          </div>
        </div>
        <div className="SonnetView__sonnet">
          {snippet.length && (
            <div className="SonnetView__SonnetInner">
              <div className="SonnetView__sonnetControls">
                <p>Sonnet Number:{querySet[currentQuery].title}</p>
                <button
                  className="AppButton"
                  onClick={() => setIsExpanded(!isExpanded)}>expand</button>
                {querySet.length > 1
                  &&
                  <button
                    className="AppButton"
                    onClick={() => handleDisplayNextSnippet()}>next</button>
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
      <AppLinkPrimary to="/">home</AppLinkPrimary>
    </div>
  );
}
