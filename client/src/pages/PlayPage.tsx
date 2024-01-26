import React, { useState, SyntheticEvent } from 'react';
import { AppInput, Stage } from '../components'
import { queryPlays } from '../api';
import { isDirection } from '../models/direction';
import { Play } from '../models/play';
import BaseLayout from '../layouts/BaseLayout';



export default function PlayPage() {
  const [query, setQuery] = useState('');
  const [querySet, setQuerySet] = useState<Play[]>([]);
  const [randomResult, setRandomResult] = useState(0)

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const queryResponse: any = await queryPlays(query);
    setQuerySet(queryResponse)
    setRandomResult(Math.floor(Math.random() * queryResponse.length))
  }

  const playDisplay = () => {
    const play = querySet[randomResult]

    return (
      <div className="PlayPage__play">
        <p className="PlayPage__title">{play.title}</p>
        <p className="PlayPage__title">Act: {play.act} Scene{play.scene}</p>
        <ul>
          {
            play.interaction.map((x, index) => {
              if (isDirection(x)) {
                return (
                  <li key={index}>
                    <p className="PlayPage__entry">
                      {x.direction}
                    </p>
                  </li>
                )
              }

              return (
                <li key={index}>
                  <p className="PlayPage__entry">
                    {x.character} : {x.line}
                  </p>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  return (
    <BaseLayout>
      <div className="PlayPage__inner">
        <div className="SonnetPage__header">
          <h2 className="SonnetPage__heading">
            Play Search
          </h2>
          <p className="SonnetPage__body">
            Find Scenes In Shakespeare's plays that contain your search term.<br /> WARNING: under construction!
            <img src="/images/cone.png" alt="" className="PlayPage__cone" />
          </p>
        </div>
        <div className="PlayPage__forms">
          <div className="PlayPage__formContent">
            <Stage>
              <form action="GET" onSubmit={e => handleSubmit(e)}>
                <AppInput
                  name="playQuery"
                  onChange={event => setQuery(event.target.value)}
                  value={query}
                />
                <input className="PlayPage__formSubmit" type="submit" />
              </form>
            </Stage>
          </div>
        </div>
        {
          querySet.length ? playDisplay() : null
        }
      </div>
    </BaseLayout>
  )
}
