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
                width: '100px',
                height: '100px',
                background: 'white',
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
                  marginBottom: '5px',
                  marginTop: '0px',
                  fontSize: '28px',
                  maxHeight: '40px',
                }}
              >
                {cartItem.name}
              </p>
              <p
                style={{
                  marginTop: '5px',
                  marginBottom: '10px',
                  fontSize: '25px',
                }}
              >
                ${cartItem.price.toFixed(2)}
              </p>
              <button
                style={{
                  width: '50%',
                  fontSize: '22px',
                  fontFamily: Constants.FONT_REGULAR,
                  paddingBottom: '5px',
                  borderRadius: '5px',
                  border: '2px solid #888',
                  backgroundColor: 'white',
                }}
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
