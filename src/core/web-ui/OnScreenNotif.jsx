import { Constants } from '~/utils/Constants'

export const OnScreenNotif = (notifText, onClick, onDismiss) => {
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
            height: '100%',
            alignItems: 'center',
          }}
          onClick={() => {
            onClick()
          }}
        >
          <p style={{ margin: '0px' }}>{notifText}</p>
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
