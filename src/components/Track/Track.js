import React from 'react';
import './Track.css';
import Grow from '@material-ui/core/Grow';

export const Track = props => {

  const addTrack = () => {
    props.onAdd(props.track);
    console.log('clicked')
  }

  const removeTrack = () => {
    props.onRemove(props.track);
  }

  return (
    <Grow in={props.track ? true : false} style={{ transformOrigin: '0 0 0' }}
    {...(props.track ? { timeout: 1000 } : {})}>
    <div className="Track">
      <div className="Track-image">
        <img src={props.track.albumImage} width="200" />
      </div>
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>

      { props.isRemoval ? <button className="Track-action" onClick={removeTrack}>-</button> : <button className="Track-action" onClick={addTrack}>+</button>}
    </div>
    </Grow>
  );
};