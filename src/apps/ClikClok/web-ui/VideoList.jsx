import { Constants } from '~/utils/Constants'

export const VideoList = (id, videos, currDay, height, width, onClick) => {
  return (
    <div
      id={id}
      style={{
        overflowY: 'scroll',
        padding: '0px 15px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        color: 'white',
        fontFamily: Constants.FONT_REGULAR,
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {videos.map((video) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              marginBottom: '10px',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
            onClick={() => {
              onClick(video)
            }}
          >
            <p
              style={{
                fontSize: '30px',
                color: 'black',
                marginTop: '0px',
                marginBottom: '10px',
              }}
            >
              {video.videoName}
            </p>
            <div style={{ display: 'flex', color: '#333333', flexDirection: 'row' }}>
              <p
                style={{
                  fontSize: '22px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  marginRight: '10px',
                }}
              >
                Created:Day {video.creationDate}
              </p>
              <p
                style={{
                  fontSize: '22px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  marginRight: '10px',
                }}
              >
                Views:{video.totalViews}
              </p>
              <p
                style={{
                  fontSize: '22px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  marginRight: '10px',
                }}
              >
                Today's Earnings:$
                {video.revenueEarnedPerDay[currDay]
                  ? video.revenueEarnedPerDay[currDay].toFixed(2)
                  : 0}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
