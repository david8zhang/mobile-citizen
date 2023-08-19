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
        fontFamily: 'Arial',
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {menuItems.map((menuItem) => {
        return (
          <div
            style={{ display: 'flex' }}
            onClick={() => {
              onClick(menuItem)
            }}
          >
            <p style={{ flex: 1, color: 'black', fontSize: '20px' }}>{menuItem.name}</p>
          </div>
        )
      })}
    </div>
  )
}
