export const NumSharesInput = (props, style, onUpdate) => {
  return (
    <input
      id={props.id}
      type='number'
      style={style}
      placeholder={props.placeholder}
      onKeyUp={(e) => {
        onUpdate(e)
      }}
    />
  )
}
