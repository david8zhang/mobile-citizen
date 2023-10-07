import { Constants } from '~/utils/Constants'

export const TransactionsList = (data, height, width) => {
  return (
    <div
      id='transaction-list'
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
      {data.map((d) => {
        return (
          <div
            style={{
              display: 'flex',
              backgroundColor: 'white',
              color: 'black',
              padding: '15px',
              marginBottom: '10px',
              userSelect: 'none',
              borderRadius: '5px',
            }}
          >
            <div style={{ flex: 2 }}>
              <p style={{ fontSize: '30px', marginTop: '10px', marginBottom: '10px' }}>
                {d.vendor}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <p style={{ fontSize: '30px', marginTop: '10px', marginBottom: '10px' }}>
                {`${d.amount < 0 ? '-' : ''}$${Math.abs(d.amount).toFixed(2)}`}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
