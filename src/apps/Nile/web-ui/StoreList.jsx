import { Constants } from '~/utils/Constants'

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
        fontFamily: Constants.FONT_REGULAR,
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
                  }}
                >
                  <div
                    style={{ cursor: 'pointer' }}
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
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        border: '1px solid #777',
                      }}
                    />
                    <p
                      style={{
                        fontSize: '22px',
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
                        fontSize: '28px',
                        color: 'black',
                        marginTop: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    style={{
                      width: '100%',
                      fontFamily: Constants.FONT_REGULAR,
                      backgroundColor: 'white',
                      border: '2px solid #555',
                      borderRadius: '5px',
                      fontSize: '22px',
                      paddingBottom: '5px',
                    }}
                    onClick={() => {
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
