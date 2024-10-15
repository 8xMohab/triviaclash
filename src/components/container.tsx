import clsx from 'clsx'
import React from 'react'

const Container: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  const { className, ...restProps } = props
  return (
    <div className={clsx('container', className)} {...restProps}>
      {props.children}
    </div>
  )
}

export default Container
