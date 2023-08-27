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
        fontFamily: 'Arial',
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
              <p style={{ fontSize: '18px' }}>{d.vendor}</p>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <p style={{ fontSize: '20px' }}>
                {`${d.amount < 0 ? '-' : ''}$${Math.abs(d.amount).toFixed(2)}`}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
