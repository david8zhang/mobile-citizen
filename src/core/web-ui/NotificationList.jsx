import { Constants } from '~/utils/Constants'

export const NotificationList = (notificationList, width, height, onClick, onDismiss) => {
  return (
    <div
      id='notification-list'
      style={{
        overflowY: 'scroll',
        padding: '0px 15px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        fontFamily: Constants.FONT_REGULAR,
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {notificationList.map((notification, index) => {
        return (
          <div
            style={{
              display: 'flex',
              backgroundColor: 'white',
              color: 'black',
              marginBottom: '10px',
              userSelect: 'none',
              borderRadius: '5px',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{ flex: 3, padding: '15px', borderRight: '#aaa 1px solid' }}
              onClick={() => {
                onClick(notification, index)
              }}
            >
              <p
                style={{
                  fontSize: '28px',
                  color: 'black',
                  margin: '0px',
                  marginBottom: '10px',
                }}
              >
                {notification.appName}
              </p>
              <p
                style={{
                  fontSize: '22px',
                  color: '#555',
                  margin: '0px',
                }}
              >
                {notification.message}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                height: '90px',
              }}
              onClick={() => {
                onDismiss(index)
              }}
            >
              <p style={{ fontSize: '22px', color: '#222', margin: '0px' }}>Dismiss</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
