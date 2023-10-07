import { Constants } from '~/utils/Constants'

export const MenuItemList = (menuItems, width, height, onClick) => {
  return (
    <div
      id='menu-item-list'
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
      {menuItems.map((menuItem) => {
        return (
          <div
            style={{
              display: 'flex',
              backgroundColor: 'white',
              padding: '20px',
              marginBottom: '10px',
              cursor: 'pointer',
              borderRadius: '15px',
              boxShadow: '2px 2px 8px 0px #aaa',
            }}
            onClick={() => {
              onClick(menuItem)
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src='/icons/burger-solid.svg'
                alt='none'
                style={{ height: '65px', width: '65px' }}
              />
            </div>
            <div
              style={{
                flex: 3,
                display: 'flex',
                flexDirection: 'column',
                color: 'black',
                paddingLeft: '15px',
              }}
            >
              <p style={{ color: 'black', fontSize: '30px', margin: '0px' }}>{menuItem.name}</p>
              <p
                style={{
                  color: '#444444',
                  fontSize: '20px',
                  marginTop: '10px',
                  marginBottom: '0px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {menuItem.description}
              </p>
              <div style={{ display: 'flex', marginTop: '15px', fontSize: '22px' }}>
                <p style={{ marginRight: '10px', marginBottom: '0px', marginTop: '0px' }}>
                  ${menuItem.price.toFixed(2)}
                </p>
                <p style={{ marginRight: '10px', marginBottom: '0px', marginTop: '0px' }}>
                  Full: {menuItem.fullnessBonus}
                </p>
                <p style={{ marginBottom: '0px', marginTop: '0px' }}>
                  Fit: {menuItem.fitnessBonus}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
