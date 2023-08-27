export const SoundList = (sounds, height, width, onClick, energyLevel) => {
  return (
    <div
      id='sound-list'
      style={{
        overflowY: 'scroll',
        padding: '0px 15px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        color: 'white',
        fontFamily: 'Arial',
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {sounds.map((sound) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              marginBottom: '10px',
              backgroundColor: energyLevel >= sound.energyCost ? 'white' : '#dddddd',
              cursor: energyLevel >= sound.energyCost ? 'pointer' : 'default',
            }}
            onClick={() => {
              onClick(sound)
            }}
          >
            <p
              style={{
                fontSize: '25px',
                color: 'black',
                marginTop: '0px',
                marginBottom: '10px',
                color: energyLevel >= sound.energyCost ? 'black' : 'gray',
              }}
            >
              {sound.name}
            </p>
            <div style={{ display: 'flex', color: 'black', flexDirection: 'row' }}>
              <p
                style={{
                  marginTop: '0px',
                  marginBottom: '0px',
                  marginRight: '10px',
                  color: energyLevel >= sound.energyCost ? 'black' : 'gray',
                }}
              >
                Difficulty: {sound.difficulty}
              </p>
              <p
                style={{
                  marginTop: '0px',
                  marginBottom: '0px',
                  marginRight: '10px',
                  color: energyLevel >= sound.energyCost ? 'black' : 'gray',
                }}
              >
                Earnings Pot: {sound.earningPotential}
              </p>
              <p
                style={{
                  marginTop: '0px',
                  marginBottom: '0px',
                  marginRight: '10px',
                  color: energyLevel >= sound.energyCost ? 'black' : 'red',
                }}
              >
                Energy Cost: {sound.energyCost}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
