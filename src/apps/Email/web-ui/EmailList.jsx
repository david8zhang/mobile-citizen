import { Constants } from '~/utils/Constants'

export const EmailList = (emails, width, height, onClick) => {
  return (
    <div
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
      {emails.map((email) => {
        return (
          <div
            style={{
              display: 'flex',
              color: 'black',
              marginBottom: '15px',
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => onClick(email)}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingTop: '10px',
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' height='40px' viewBox='0 0 512 512'>
                <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z' />
              </svg>
            </div>
            <div style={{ flex: 5 }}>
              <p
                style={{
                  margin: '0px',
                  marginBottom: '5px',
                  fontSize: '30px',
                  fontWeight: 'bold',
                }}
              >
                {email.sender}
              </p>
              <p style={{ margin: '0px', marginBottom: '5px', fontSize: '25px' }}>
                {email.subject}
              </p>
              <p style={{ margin: '0px', marginBottom: '5px', fontSize: '20px' }}>
                <i>{email.text.length > 30 ? `${email.text.slice(0, 30)}...` : email.text}</i>
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                paddingTop: '5px',
              }}
            >
              <p style={{ fontSize: '24px', margin: '0px' }}>{email.date}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
