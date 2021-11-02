import * as React from 'react'
import { array } from 'yargs';

var testmarker: Marker[] = [];

export interface Marker {
  id: number
  time: number
  title: string
}

export {testmarker};

export interface MarkerConfiguration {
  color: string
  selectionColor: string
}

interface Props {
  marker: Marker
  duration: number
  newmarker: number
  onMarkerClick: (marker: Marker) => void
  selectedMarker?: Marker
  configuration?: MarkerConfiguration
}

export class MarkerView extends React.Component<Props, never> {
  getPosition = () => {
    const { marker, duration } = this.props
    const { time } = marker
    if (duration) {
      const percent = time <= duration ? time / duration : 1
      return `calc(${percent * 100}% - 2px)`
    }
    return '-9999px'
  }

  render() {
    const { marker, configuration, onMarkerClick } = this.props
    const { title } = marker
    const id = String(marker.id)
    if(testmarker.indexOf(marker) == -1){
      testmarker[marker.id] = marker;
    }
    console.log(testmarker)
    let selectedColor =
      this.props.selectedMarker !== undefined && this.props.selectedMarker.id === marker.id
        ? configuration !== undefined
          ? configuration.selectionColor
          : '#4CAF50'
        : configuration !== undefined
        ? configuration.color
        : '#F44336'

    return (
      <i
        id={id}
        className="react-video-marker"
        title={title}
        style={{
          background: selectedColor,
          left: this.getPosition(),
        }}
        onClick={() => {
          onMarkerClick(marker)
          console.log(marker)
          let index = testmarker.indexOf(marker);
          testmarker.splice(index, 1);
        }}
      />
    )
  }
}
