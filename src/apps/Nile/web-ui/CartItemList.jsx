import { Constants } from '~/utils/Constants'

export const CartItemList = (cartItems, width, height, onRemoveItem) => {
  return (
    <div
      id='cart-item-list'
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
      {cartItems.map((cartItem) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: 'black',
              marginBottom: '10px',
            }}
          >
            <img
              src={cartItem.imageSrc}
              style={{
                width: '130px',
                height: '130px',
                padding: '20px',
                boxSizing: 'border-box',
                border: '1px solid black',
              }}
            />
            <div
              style={{
                marginLeft: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <p
                style={{
                  marginBottom: '15px',
                  marginTop: '0px',
                  fontSize: '25px',
                  maxHeight: '40px',
                }}
              >
                {cartItem.name}
              </p>
              <p
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  fontSize: '22px',
                }}
              >
                ${cartItem.price.toFixed(2)}
              </p>
              <button
                style={{ width: '50%' }}
                onClick={() => {
                  onRemoveItem(cartItem)
                }}
              >
                Remove
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
