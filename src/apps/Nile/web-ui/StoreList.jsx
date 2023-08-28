export const StoreList = (storeItemChunks, width, height, onClick, onAddToCart) => {
  return (
    <div
      id='store-item-list'
      style={{
        overflowY: 'scroll',
        position: 'static',
        padding: '0px 15px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        color: 'white',
        fontFamily: 'Arial',
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {storeItemChunks.map((chunk) => {
        return (
          <div style={{ display: 'flex' }}>
            {chunk.map((item) => {
              return (
                <div
                  style={{
                    flexGrow: 1,
                    maxWidth: '33%',
                    padding: '10px',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    onClick(item)
                  }}
                >
                  <img
                    src={item.imageSrc}
                    style={{
                      width: '100%',
                      height: '120px',
                      pointerEvents: 'none',
                      boxSizing: 'border-box',
                      padding: '20px',
                    }}
                  />
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'black',
                      marginTop: '10px',
                      marginBottom: '10px',
                      height: '35px',
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontSize: '20px',
                      color: 'black',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    style={{ width: '100%' }}
                    onAddToCart={() => {
                      onAddToCart(item)
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
