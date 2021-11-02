import React, { useState } from 'react'
import VideoPlayer from '../src/index'
import './styles.css'
import { testmarker } from  '../src/marker.tsx'

function App() {
  const [url] = useState('https://media.w3.org/2010/05/bunny/trailer.mp4')
  const [controls, setControls] = useState(['Play', 'Time', 'Progress', 'Volume', 'FullScreen', 'AddMarker', 'NextFrame', 'LastFrame'])
  const [settings, setSettings] = useState(['Title'])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [timeStart] = useState(0)
  const [fps] = useState(30)
  const [selectedMarker, setSelectedMarker] = useState(undefined)

  const controlsList = [
    {
      id: 'Play',
      title: 'Play button',
    },
    {
      id: 'Time',
      title: 'Time',
    },
    {
      id: 'Progress',
      title: 'Progress',
    },
    {
      id: 'Volume',
      title: 'Volume',
    },
    {
      id: 'FullScreen',
      title: 'Full Screen',
    },
    {
      id: 'NextFrame',
      title: 'Next Frame',
    },
    {
      id: 'LastFrame',
      title: 'Last Frame',
    },
    {
      id: 'AddMaker',
      title: 'Add Marker',
    },
  ]

  const settingsList = [
    {
      id: 'Title',
      title: 'Title',
    },
    {
      id: 'FPS',
      title: 'FPS',
    },
    {
      id: 'Volume',
      title: 'Volume',
    },
    {
      id: 'Repeat',
      title: 'Repeat',
    },
    {
      id: 'StartTime',
      title: 'Start Time',
    },
  ]

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleControlToggle = (event) => {
    let result = [...controls]
    const name = event.target.id
    if (result.includes(name)) {
      result = result.filter((item) => item !== name)
    } else {
      result.push(name)
    }
    setControls(result)
  }

  const handleSettingToggle = (event) => {
    let result = [...settings]
    const name = event.target.id
    if (result.includes(name)) {
      result = result.filter((item) => item !== name)
    } else {
      result.push(name)
    }
    setSettings(result)
  }

  const handleVolume = (value) => {
    setVolume(value)
  }

  const handleAddMarkerClick = (currentTime) => {
    if(markers.length > 0){
      markers.push({
        id: markers[markers.length - 1].id + 1,
        time: currentTime,
        title: 'Marker ' + parseInt(markers.length + 1),
        })
    }else{
      markers.push({
        id: 1,
        time: currentTime,
        title: 'Marker ' + parseInt(markers.length + 1),
        })
    }
    
  }

  const handleProgress = (e) => {
  }

  const handleDuration = (duration) => {
  }

  const handleMarkerClick = (marker) => {
    var removeMarker = markers.indexOf(marker)
    if (removeMarker > -1) {
      markers.splice(removeMarker, 1)
    }
    console.log(markers)
  }

  const markers = testmarker.filter((a) => a);


  return (
    <div className="container">
      <header className="main-header">
        <h1 className="app-name">React Video Player (Extended)</h1>
      </header>
      <VideoPlayer
        url={url}
        controls={controls}
        isPlaying={isPlaying}
        volume={volume}
        loop={true}
        markers={markers}
        height={'auto'}
        width={'640px'}
        timeStart={timeStart}
        onPlay={handlePlay}
        onPause={handlePause}
        onVolume={handleVolume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onMarkerClick={handleMarkerClick}
        onAddMarkerClick={handleAddMarkerClick}
        fps={fps}
        selectedMarker={selectedMarker}
        viewSettings={settings}
      />
      <div className="controls">
        <p className="control-list">
          Controls:
          {controlsList.map((control) => {
            return (
              <label key={control.id.toString()} htmlFor={control.id}>
                <input
                  id={control.id}
                  type="checkbox"
                  checked={controls.includes(control.id)}
                  onChange={handleControlToggle}
                />{' '}
                {control.title}
              </label>
            )
          })}
        </p>

        <p className="control-list">
          State:
          <span style={{ height: 3 }} />
          controls: {controls.join(', ')}
          <span style={{ height: 3 }} />
          isPlaying: {isPlaying.toString()}
          <span style={{ height: 3 }} />
          volume: {volume}
          <span style={{ height: 3 }} />
          timeStart: {timeStart}
          <span style={{ height: 3 }} />
          fps: {fps}
          <span style={{ height: 3 }}></span>
          selectedMarker:{' '}
          {selectedMarker === undefined
            ? 'No Marker is Selected'
            : JSON.stringify(selectedMarker, null, 2)}
        </p>

        <p className="control-list">
          Settings:
          {settingsList.map((setting) => {
            return (
              <label key={setting.id.toString()} htmlFor={setting.id}>
                <input
                  id={setting.id}
                  type="checkbox"
                  checked={settings.includes(setting.id)}
                  onChange={handleSettingToggle}
                />{' '}
                {setting.title}
              </label>
            )
          })}
        </p>
      </div>
    </div>
  )
}

export default App
