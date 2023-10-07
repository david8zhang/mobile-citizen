import { FitNessMonster } from '~/apps/FitNessMonster/FitNessMonster'
import { FitNessMonsterConstants } from '~/apps/FitNessMonster/FitNessMonsterConstants'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'

export const WorkoutList = ({
  workouts,
  fitnessGrade,
  fullnessLevel,
  energyLevel,
  width,
  height,
  onClick,
}) => {
  return (
    <div
      id='workout-list'
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
      {workouts.map((workout) => {
        const energyCost = workout.fitnessLevelToGainMappings[fitnessGrade].energyCost
        const fullnessToEnergyCost = Math.round(
          FitNessMonsterConstants.fullnessLevelToEnergyCostPct(fullnessLevel) * energyCost
        )
        const energyCostStr = `-${fullnessToEnergyCost}`
        const fitnessGain = workout.fitnessLevelToGainMappings[fitnessGrade].fitnessGain
        const fitnessGainStr = `+${fitnessGain}`
        const energyInsufficient = energyLevel < fullnessToEnergyCost
        return (
          <div
            style={{
              display: 'flex',
              backgroundColor: energyInsufficient ? '#dddddd' : 'white',
              color: energyInsufficient ? 'red' : 'black',
              padding: '15px',
              marginBottom: '10px',
              userSelect: 'none',
              borderRadius: '5px',
              alignItems: 'center',
              cursor: energyInsufficient ? 'not-allowed' : 'pointer',
            }}
            onClick={() => {
              if (energyLevel >= fullnessToEnergyCost) {
                onClick(workout)
              }
            }}
          >
            <p
              style={{
                fontSize: '28px',
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
                marginRight: '20px',
              }}
            >
              <p
                style={{
                  fontSize: '28px',
                  color: energyInsufficient
                    ? 'red'
                    : Utils.getFullnessLevelHexString(fullnessLevel),
                  marginRight: '10px',
                }}
              >
                {energyCostStr}
              </p>
              <svg xmlns='http://www.w3.org/2000/svg' height='28px' viewBox='0 0 448 512'>
                <path
                  fill={energyInsufficient ? 'red' : Utils.getFullnessLevelHexString(fullnessLevel)}
                  d='M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z'
                />
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
                  fontSize: '28px',
                  marginRight: '10px',
                  color: energyInsufficient ? 'red' : 'black',
                }}
              >
                {fitnessGainStr}
              </p>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' height='28px'>
                <path
                  fill={energyInsufficient ? 'red' : 'black'}
                  d='M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z'
                />
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}
