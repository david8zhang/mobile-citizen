import { Constants } from '~/util/Constants'

export const ScrollList = (data, height) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        overflowY: 'scroll',
        padding: '20px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        color: 'white',
        fontFamily: 'Graffiti',
      }}
    >
      {data.map((d) => {
        return <p style={{ cursor: 'pointer', userSelect: 'none' }}>{d.name}</p>
      })}
    </div>
  )
}
