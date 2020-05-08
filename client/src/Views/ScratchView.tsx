import React from 'react'
import AppInput from '../components/AppInput'

export default function ScratchView() {
  return (
    <div className="Scratch">
      <div className="Scratch__valenceWrap">
        <div className="Scratch__valenceUpper" />
        <div className="Scratch__valenceLower" />
      </div>
      <div className="Scratch__leftColumn">
        <div className="Scratch__column">
          <div className="Scratch__buttressWrap">
            <div className="Scratch__buttress"></div>
            <div className="Scratch__columnTop">
              <div className="Scratch__buttressCenter">
                <div className="Scratch__buttressCenterAccent" />
              </div>
            </div>
            <div className="Scratch__buttress Scratch__butress--right"></div>
          </div>
          <div className="Scratch__columnImageWrapper">
            <img className="Scratch__columnImage" src="/images/column-texture.jpg" alt="" />
          </div>
          <div className="Scratch__columnBase">
            <div className="Scratch__columnBaseSide">
              <div className="Scratch__columnBaseTopGold" />
              <div className="Scratch__columnBaseTopBlock" />
              <div className="Scratch__columnBaseTopWing" />
              <div className="Scratch__columnBasePlate">
                <div className="Scratch__columnAccentBorder">
                  <div className="Scratch__columnAccent" />
                </div>
              </div>
            </div>
            <div className="Scratch__columnBaseSide">
              <div className="Scratch__columnBaseTopGold" />
              <div className="Scratch__columnBaseTopBlock" />
              <div className="Scratch__columnBaseTopWing" />
              <div className="Scratch__columnBasePlate">
                <div className="Scratch__columnAccentBorder">
                  <div className="Scratch__columnAccent" />
                </div>
              </div>
            </div>

            <div className="Scratch__columnBaseSide">
              <div className="Scratch__columnBaseTopGold" />
              <div className="Scratch__columnBaseTopBlock" />
              <div className="Scratch__columnBaseTopWing" />
              <div className="Scratch__columnBasePlate">
                <div className="Scratch__columnAccentBorder">
                  <div className="Scratch__columnAccent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Scratch__form">

        <form action="GET">
          <AppInput
            name="sonnetQuery"
            value="scratch"
            onChange={() => console.log('yo')}
          />
          <div className="Scratch__buttonWrap">
            <input className="AppButton" type="submit" />
            <button
              type="button"
              className="AppButton"
            >
              Get Random Sonnet
                </button>
          </div>
        </form>
      </div>
      <div className="Scratch__rightColumn">
        <div className="Scratch__column Scratch__column--small">
          <div className="Scratch__buttressWrap">
            <div className="Scratch__buttress"></div>
            <div className="Scratch__columnTop">
              <div className="Scratch__buttressCenter">
                <div className="Scratch__buttressCenterAccent" />
              </div>
            </div>
            <div className="Scratch__buttress Scratch__butress--right"></div>
          </div>
          <div className="Scratch__columnImageWrapper">
            <img className="Scratch__columnImage" src="/images/column-texture.jpg" alt="" />
          </div>
          <div className="Scratch__columnBase">
            <div className="Scratch__columnBaseSide">
              <div className="Scratch__columnBaseTopGold" />
              <div className="Scratch__columnBaseTopBlock" />
              <div className="Scratch__columnBaseTopWing" />
              <div className="Scratch__columnBasePlate">
                <div className="Scratch__columnAccentBorder">
                  <div className="Scratch__columnAccent" />
                </div>
              </div>
            </div>
            <div className="Scratch__columnBaseSide">
              <div className="Scratch__columnBaseTopGold" />
              <div className="Scratch__columnBaseTopBlock" />
              <div className="Scratch__columnBaseTopWing" />
              <div className="Scratch__columnBasePlate">
                <div className="Scratch__columnAccentBorder">
                  <div className="Scratch__columnAccent" />
                </div>
              </div>
            </div>

            <div className="Scratch__columnBaseSide">
              <div className="Scratch__columnBaseTopGold" />
              <div className="Scratch__columnBaseTopBlock" />
              <div className="Scratch__columnBaseTopWing" />
              <div className="Scratch__columnBasePlate">
                <div className="Scratch__columnAccentBorder">
                  <div className="Scratch__columnAccent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
