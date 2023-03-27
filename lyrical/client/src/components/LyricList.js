import React from 'react';

const LyricList = ({ lyrics }) => {
  return(
    <ul className="collection">
      {lyrics.map(({ id, content }) => {
        return(
        <li key={id} className="collection-item">{content}</li>
        )
      })}
    </ul>
  )
}

export default LyricList;