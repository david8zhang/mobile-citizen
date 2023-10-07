import { Constants } from '~/utils/Constants'

export const PendingOrderList = (pendingOrders, width, height, onClaimItem) => {
  return (
    <div
      id='pending-order-list'
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
      {pendingOrders.map((pendingOrder) => {
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
              src={pendingOrder.storeItem.imageSrc}
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
                {pendingOrder.storeItem.name}
              </p>
              <p
                style={{
                  marginTop: '5px',
                  marginBottom: '10px',
                  fontSize: '25px',
                }}
              >
                ${pendingOrder.storeItem.price.toFixed(2)}
              </p>
              {pendingOrder.daysUntilDelivery > 0 ? (
                <p style={{ marginTop: '5px', marginBottom: '0px', fontSize: '22px' }}>
                  {pendingOrder.daysUntilDelivery} day(s) until delivery
                </p>
              ) : (
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
                    onClaimItem(pendingOrder)
                  }}
                >
                  Claim Item
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
