import React, { useState, SyntheticEvent } from 'react';
import { AppInput, Stage } from '../components'
import { queryPlays } from '../api';



interface Direction {
  type: string;
  direction: string;
}

interface Dialouge {
  type: string;
  character: string;
  line: string;
}

interface Play {
  _id: any;
  title: string;
  author_first_name: string;
  author_last_name: string;
  act: number;
  scene: number;
  direction: string
  interaction: Array<Direction | Dialouge>
}

// function isDialouge(entry: any): entry is Dialouge {
//   return entry.line !== undefined
// }
function isDirection(entry: any): entry is Direction {
  return entry.direction !== undefined
}


export default function PlayView() {
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
      <div className="PlayView__play">
        <p className="PlayView__title">{play.title}</p>
        <p className="PlayView__title">Act: {play.act} Scene{play.scene}</p>
        <ul>
          {
            play.interaction.map((x, index) => {
              if (isDirection(x)) {
                return (
                  <li key={index}>
                    <p className="PlayView__entry">
                      {x.direction}
                    </p>
                  </li>
                )
              }

              return (
                <li key={index}>
                  <p className="PlayView__entry">
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
    <div className="PlayView">
      <div className="PlayView__background">
        <img src="/images/wood-texture.jpg" alt="" className="PlayView__bgImage" />
      </div>
      <div className="PlayView__inner">
        <div className="SonnetView__header">
          <h2 className="SonnetView__heading">
            Play Search
          </h2>
          <p className="SonnetView__body">
            Find Scenes In Shakespeare's plays that contain your search term.<br /> WARNING: under construction!
            <img src="/images/cone.png" alt="" className="PlayView__cone" />
          </p>
        </div>
        <div className="PlayView__forms">
          <div className="PlayView__formContent">
            <Stage>
              <form action="GET" onSubmit={e => handleSubmit(e)}>
                <AppInput
                  name="playQuery"
                  onChange={event => setQuery(event.target.value)}
                  value={query}
                />
                <input className="PlayView__formSubmit" type="submit" />
              </form>
            </Stage>
          </div>
        </div>
        {
          querySet.length ? playDisplay() : null
        }
      </div>
    </div>
  )
}
