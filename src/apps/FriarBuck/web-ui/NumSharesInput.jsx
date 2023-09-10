export const NumSharesInput = (props, style, onUpdate) => {
  return (
    <input
      id={props.id}
      type='number'
      min='0'
      max={props.max}
      style={style}
      placeholder={props.placeholder}
      onKeyUp={(e) => {
        onUpdate(e)
      }}
    />
  )
}
