import { Constants } from '~/utils/Constants'

export const NewsStories = (stories, width, height) => {
  return (
    <div
      id='friar-buck-news-stories'
      style={{
        overflowY: 'scroll',
        padding: '0px 15px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {stories.map((story) => {
        return (
          <div
            style={{
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: 'white',
              marginBottom: '10px',
              display: 'flex',
            }}
          >
            <div style={{ flex: 1, paddingRight: '15px' }}>
              <p style={{ margin: '0px', marginBottom: '10px', fontSize: '20px' }}>
                {story.newsCompany}
              </p>
              <p style={{ margin: '0px', fontSize: '25px', paddingRight: '15px' }}>
                {story.headline}
              </p>
            </div>
            <img
              src='/icons/newspaper-solid.svg'
              alt='none'
              style={{
                height: '60px',
                width: '60px',
                padding: '15px',
                backgroundColor: '#eeeeee',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
