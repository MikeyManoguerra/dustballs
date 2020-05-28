import React ,{ReactNode} from 'react'
import AppInput from '../components/AppInput'

interface StageProps {
  children?: ReactNode
}

export default function StageView(props : StageProps) {
  // const { children } = props.children
  return (
    <div className="Stage">
      {/* <div className="Stage__roof"></div> */}
      <div className="Stage__valenceWrap">
        <div className="Stage__valenceUpper" />
        <div className="Stage__valenceLower" />
      </div>
      <div className="Stage__leftColumn">
        <div className="Stage__column">
          <div className="Stage__buttressWrap">
            <div className="Stage__buttress"></div>
            <div className="Stage__columnTop">
              <div className="Stage__buttressCenter">
                <div className="Stage__buttressCenterAccent" />
              </div>
            </div>
            <div className="Stage__buttress Stage__butress--right"></div>
          </div>
          <div className="Stage__columnImageWrapper">
            <img className="Stage__columnImage" src="/images/column-texture.jpg" alt="" />
          </div>
          <div className="Stage__columnBase">
            <div className="Stage__columnBaseSide">
              <div className="Stage__columnBaseTopGold" />
              <div className="Stage__columnBaseTopBlock" />
              <div className="Stage__columnBaseTopWing" />
              <div className="Stage__columnBasePlate">
                <div className="Stage__columnAccentBorder">
                  <div className="Stage__columnAccent" />
                </div>
              </div>
            </div>
            <div className="Stage__columnBaseSide">
              <div className="Stage__columnBaseTopGold" />
              <div className="Stage__columnBaseTopBlock" />
              <div className="Stage__columnBaseTopWing" />
              <div className="Stage__columnBasePlate">
                <div className="Stage__columnAccentBorder">
                  <div className="Stage__columnAccent" />
                </div>
              </div>
            </div>

            <div className="Stage__columnBaseSide">
              <div className="Stage__columnBaseTopGold" />
              <div className="Stage__columnBaseTopBlock" />
              <div className="Stage__columnBaseTopWing" />
              <div className="Stage__columnBasePlate">
                <div className="Stage__columnAccentBorder">
                  <div className="Stage__columnAccent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Stage__form">
      {/* {children} */}
        {/*
        <form action="GET">
          <AppInput
            name="sonnetQuery"
            value="scratch"
            onChange={() => console.log('yo')}
          />
          <div className="Stage__buttonWrap">
            <input className="AppButton" type="submit" />
            <button
              type="button"
              className="AppButton"
            >
              Get Random Sonnet
                </button>
          </div>
        </form> */}
      </div>
      <div className="Stage__rightColumn">
        <div className="Stage__column Stage__column--small">
          <div className="Stage__buttressWrap">
            <div className="Stage__buttress"></div>
            <div className="Stage__columnTop">
              <div className="Stage__buttressCenter">
                <div className="Stage__buttressCenterAccent" />
              </div>
            </div>
            <div className="Stage__buttress Stage__butress--right"></div>
          </div>
          <div className="Stage__columnImageWrapper">
            <img className="Stage__columnImage" src="/images/column-texture.jpg" alt="" />
          </div>
          <div className="Stage__columnBase">
            <div className="Stage__columnBaseSide">
              <div className="Stage__columnBaseTopGold" />
              <div className="Stage__columnBaseTopBlock" />
              <div className="Stage__columnBaseTopWing" />
              <div className="Stage__columnBasePlate">
                <div className="Stage__columnAccentBorder">
                  <div className="Stage__columnAccent" />
                </div>
              </div>
            </div>
            <div className="Stage__columnBaseSide">
              <div className="Stage__columnBaseTopGold" />
              <div className="Stage__columnBaseTopBlock" />
              <div className="Stage__columnBaseTopWing" />
              <div className="Stage__columnBasePlate">
                <div className="Stage__columnAccentBorder">
                  <div className="Stage__columnAccent" />
                </div>
              </div>
            </div>

            <div className="Stage__columnBaseSide">
              <div className="Stage__columnBaseTopGold" />
              <div className="Stage__columnBaseTopBlock" />
              <div className="Stage__columnBaseTopWing" />
              <div className="Stage__columnBasePlate">
                <div className="Stage__columnAccentBorder">
                  <div className="Stage__columnAccent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
