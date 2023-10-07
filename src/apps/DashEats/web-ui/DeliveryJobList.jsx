import { Constants } from '~/utils/Constants'

export const DeliveryJobList = (deliveryJobs, width, height, onClick) => {
  return (
    <div
      id='delivery-job-list'
      style={{
        overflowY: 'scroll',
        padding: '0px 15px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {deliveryJobs.map((job) => {
        return (
          <div
            style={{
              padding: '15px',
              cursor: 'pointer',
              backgroundColor: 'white',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
            onClick={() => {
              onClick(job)
            }}
          >
            <p style={{ marginBottom: '5px', fontSize: '28px', marginTop: '0px' }}>
              {job.restaurantName}
            </p>
            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '22px' }}>
              <p style={{ marginTop: '5px', flex: 1, marginBottom: '5px', marginRight: '10px' }}>
                <b>Distance: </b>
                {job.distance}
              </p>
              <p
                style={{
                  marginTop: '5px',
                  textAlign: 'center',
                  flex: 1,
                  marginBottom: '5px',
                  marginRight: '10px',
                }}
              >
                <b>Energy: </b>
                {job.energyCost}
              </p>
              <p
                style={{
                  marginTop: '5px',
                  textAlign: 'center',
                  flex: 1,
                  marginBottom: '5px',
                  marginRight: '10px',
                }}
              >
                <b>Earnings: </b>
                {job.earningsPotential}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
