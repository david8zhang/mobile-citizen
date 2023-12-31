import { Constants } from '~/utils/Constants'

export const StockList = (id, stocks, headerText, width, height, onClick) => {
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
      <p
        style={{
          color: 'black',
          fontFamily: Constants.FONT_BOLD,
          fontSize: '35px',
          marginTop: '0px',
          marginBottom: '10px',
        }}
      >
        {headerText}
      </p>
      {stocks.length == 0 ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#777777',
            height: '80%',
          }}
        >
          <p style={{ fontSize: '30px', textAlign: 'center' }}>No Data</p>
        </div>
      ) : (
        stocks.map((stock) => {
          return (
            <div
              style={{
                display: 'flex',
                color: 'black',
                paddingTop: '8px',
                paddingBottom: '8px',
                cursor: 'pointer',
              }}
              onClick={() => onClick(stock)}
            >
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: '5px', marginTop: '0px', fontSize: '32px' }}>
                  {stock.symbol}
                </p>
                <p style={{ marginBottom: '0px', marginTop: '0px', fontSize: '25px' }}>
                  {stock.name}
                </p>
              </div>
              <p style={{ fontSize: '30px', marginTop: '15px', marginBottom: '15px' }}>
                ${stock.price.toFixed(2)}
              </p>
            </div>
          )
        })
      )}
    </div>
  )
}
