import React from 'react'
import TrackCard from './TrackCard'

const TrackList = ({ tracks, limitScroll = false, showAddBtn, showRemoveTrackIcon, showDeleteTrack, onDeleteTrack, showPlayTrack, onPlayTrack }) => {

  const classByScroll = limitScroll ? "max-h-[310px] overflow-y-auto" : "";
  return (
    <section className={`grid gap-3 pt-6  ${classByScroll}`}>
      {
        tracks.map((track) => 

        <TrackCard 
          key={track.id} 
          track={track} 
          showAddBtn={showAddBtn} 
          showRemoveTrackIcon={showRemoveTrackIcon} 
          showDeleteTrack={showDeleteTrack}
          onDeleteTrack={onDeleteTrack}
          showPlayTrack={showPlayTrack}
          onPlayTrack={onPlayTrack}
        
        />)
      }


      
    </section>
  )
}

export default TrackList