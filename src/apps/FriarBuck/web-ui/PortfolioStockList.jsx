export const PortfolioStockList = (stocks, width, height, onClick) => {
  return (
    <div
      id='portfolio-stock-list'
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
      <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px', margin: '0px' }}>
        Portfolio
      </p>
      {stocks.map((stock) => {
        return (
          <div style={{ display: 'flex', color: 'black' }}>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '5px', fontSize: '25px' }}>{stock.symbol}</p>
              <p style={{ marginBottom: '0px', marginTop: '0px', fontSize: '18px' }}>
                {stock.name}
              </p>
            </div>
            <p style={{ fontSize: '30px' }}>${stock.price}</p>
          </div>
        )
      })}
    </div>
  )
}
