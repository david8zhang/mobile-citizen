import { Constants } from '~/utils/Constants'

export const OnScreenNotif = (notification, onClick, onDismiss) => {
  return (
    <div
      style={{
        width: `${Constants.WINDOW_WIDTH - 20}px`,
        height: '100px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxSizing: 'border-box',
        flexDirection: 'row',
        fontFamily: Constants.FONT_REGULAR,
      }}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{
            flex: 1,
            overflowY: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => {
            onClick()
          }}
        >
          <p style={{ marginBottom: '5px', marginTop: '0px', fontSize: '20px' }}>
            {notification.appName}
          </p>
          <p style={{ margin: '0px' }}>{notification.message}</p>
        </div>
        <div
          style={{
            display: 'flex',
            borderLeft: '2px solid #777777',
            paddingLeft: '10px',
            userSelect: 'none',
            cursor: 'pointer',
          }}
          onClick={() => {
            onDismiss()
          }}
        >
          <p style={{ margin: '0px', alignSelf: 'center', justifySelf: 'center' }}>Dismiss</p>
        </div>
      </div>
    </div>
  )
}
