import Link from 'next/link'
import React from 'react'
import Text from './typography/text'
import clsx from 'clsx'

const Logo: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  const { className, ...restProps } = props
  return (
    <div className={clsx('', className)} {...restProps}>
      <Link href="/">
        <Text.TypographyP className="text-2xl text-primary">
          Trivia<span className="font-bold">Clash</span>
        </Text.TypographyP>
      </Link>
    </div>
  )
}
export default Logo
