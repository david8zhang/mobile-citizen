export const WorkoutList = (workouts, width, height, onClick) => {
  return (
    <div
      id='workout-list'
      style={{
        overflowY: 'scroll',
        padding: '0px 15px',
        height: `${height}px`,
        scrollbarWidth: 'none',
        fontFamily: 'Arial',
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {workouts.map((workout) => {
        return (
          <div
            style={{
              display: 'flex',
              backgroundColor: 'white',
              color: 'black',
              padding: '15px',
              marginBottom: '10px',
              userSelect: 'none',
              borderRadius: '5px',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              onClick(workout)
            }}
          >
            <p
              style={{
                fontSize: '22px',
                color: 'black',
                margin: '0px',
                flex: 3,
              }}
            >
              {workout.name}
            </p>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <p
                style={{
                  fontSize: '22px',
                  color: 'black',
                  marginRight: '10px',
                }}
              >
                -{workout.energyCost}
              </p>
              <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                <path d='M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z' />
              </svg>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <p
                style={{
                  fontSize: '22px',
                  color: 'black',
                  marginRight: '10px',
                }}
              >
                +{workout.fitnessGain}
              </p>
              <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                <path d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z' />
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}
