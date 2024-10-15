import React from 'react'
import clsx from 'clsx'

const Text = {
  TypographyP: (props: { className?: string; children: React.ReactNode }) => {
    const { className, children, ...rest } = props
    return (
      <p className={clsx('leading-7', className)} {...rest}>
        {children}
      </p>
    )
  },

  TypographyBlockquote: (props: {
    className?: string
    children: React.ReactNode
  }) => {
    const { className, children, ...rest } = props
    return (
      <blockquote
        className={clsx('mt-6 border-l-2 pl-6 italic', className)}
        {...rest}
      >
        {children}
      </blockquote>
    )
  },

  TypographyList: (props: {
    className?: string
    children: React.ReactNode
  }) => {
    const { className, children, ...rest } = props
    return (
      <ul className={clsx('my-6 ml-6 list-disc', className)} {...rest}>
        {children}
      </ul>
    )
  },

  TypographyInlineCode: (props: {
    className?: string
    children: React.ReactNode
  }) => {
    const { className, children, ...rest } = props
    return (
      <code
        className={clsx(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className
        )}
        {...rest}
      >
        {children}
      </code>
    )
  },

  TypographySmall: (props: {
    className?: string
    children: React.ReactNode
  }) => {
    const { className, children, ...rest } = props
    return (
      <small
        className={clsx('text-sm font-medium leading-none', className)}
        {...rest}
      >
        {children}
      </small>
    )
  },
}

export default Text
