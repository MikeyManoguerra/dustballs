import React, { useState, SyntheticEvent, useEffect } from 'react';
import { AppInput, Stage } from '../components'
import { queryPlays } from '../api';
import { isDirection } from '../models/direction';
import { Play } from '../models/play';
import BaseLayout from '../layouts/BaseLayout';
import { getPlayTitles } from '../api/plays';
import PlayForm from '../components/PlayForm';
import { Sprite } from '../components/Sprite';



export default function PlayPage() {

  const [querySet, setQuerySet] = useState<Play[]>([]);
  const [randomResult, setRandomResult] = useState(0)
  const [playTitles, setPlayTitles] = useState([])

  async function handleSubmit(event: string) {
    const queryResponse: any = await queryPlays(event);
    setQuerySet(queryResponse);
    setRandomResult(Math.floor(Math.random() * queryResponse.length));
  }

  useEffect(() => {
    (async () => {
      const titles = await getPlayTitles()
      setPlayTitles(titles);
    })();
  }, [])


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
              <Sprite></Sprite>
            </Stage>
          </div>
        </div>

      <PlayForm playTitles={playTitles} handleSubmit={v => handleSubmit(v)}></PlayForm>

      {
        querySet.length ? playDisplay() : null
      }
    </div>
    </BaseLayout >
  )
}
