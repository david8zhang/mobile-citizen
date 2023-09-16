import { Constants } from '~/utils/Constants'

export const HealthStatList = (healthStats, width, height) => {
  return (
    <div
      id='health-stat-list'
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
      {healthStats.map((healthStat) => {
        return (
          <div
            style={{
              padding: '15px',
              cursor: 'pointer',
              color: 'black',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '25px',
                  flex: 1,
                  marginTop: '15px',
                  marginBottom: '15px',
                }}
              >
                {healthStat.header.label}
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '25px',
                  alignItems: 'flex-end',
                  marginTop: '15px',
                  marginBottom: '15px',
                }}
              >
                {healthStat.header.value}
              </p>
            </div>
            {healthStat.subLines.map((line) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontSize: '20px', flex: 1, marginTop: '10px', marginBottom: '10px' }}>
                    {line.label}
                  </p>
                  <p
                    style={{
                      fontSize: '20px',
                      alignItems: 'flex-end',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    {line.value}
                  </p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
