import React from 'react';

function SongPattern({ li_num, height, width, zIndex }) {
    const items = [];
    for (let i = 0; i < li_num; i++) {
      items.push(
        <li
          key={i}
          style={{
            height: `${height}`,
            width: `${width}`,
            zIndex: zIndex,
          }}
        ></li>
      );
    }

  return (
    <div className="music-beat">
      <ul>
        {items}
      </ul>
    </div>
  );
}

export default SongPattern;
