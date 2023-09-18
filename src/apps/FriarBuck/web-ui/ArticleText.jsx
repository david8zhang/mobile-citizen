import { Constants } from '~/utils/Constants'

export const ArticleText = (text, width, height) => {
  return (
    <div
      id='news-article-text'
      style={{
        overflowY: 'scroll',
        padding: '0px 15px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
        width: `${width}px`,
        boxSizing: 'border-box',
        paddingBottom: '15px',
      }}
    >
      <p style={{ margin: '0px', whiteSpace: 'pre-line' }}>{text}</p>
    </div>
  )
}
