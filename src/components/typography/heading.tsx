import React from 'react'
import clsx from 'clsx'

// Define props for the Heading component
interface HeadingProps extends React.ComponentPropsWithoutRef<'h1'> {
  tag: 1 | 2 | 3 | 4 | 5 | 6 // Determines the HTML tag (h1-h6)
  displayAs?: 1 | 2 | 3 | 4 | 5 | 6 // Determines the styling (optional)
  className?: string // Additional className from the user
}

const Heading: React.FC<HeadingProps> = ({
  tag,
  displayAs,
  className,
  children,
  ...rest
}) => {
  // Default 'displayAs' to the same value as 'tag' if not provided
  const styleType = displayAs || tag

  // Switch to determine the className based on displayAs
  const headingClass = (() => {
    switch (styleType) {
      case 1:
        return 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
      case 2:
        return 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'
      case 3:
        return 'scroll-m-20 text-2xl font-semibold tracking-tight'
      case 4:
      case 5:
      case 6:
        return 'scroll-m-20 text-xl font-semibold tracking-tight'
      default:
        return ''
    }
  })()

  // Switch to determine the HTML tag to render
  switch (tag) {
    case 1:
      return (
        <h1 className={clsx(headingClass, className)} {...rest}>
          {children}
        </h1>
      )
    case 2:
      return (
        <h2 className={clsx(headingClass, className)} {...rest}>
          {children}
        </h2>
      )
    case 3:
      return (
        <h3 className={clsx(headingClass, className)} {...rest}>
          {children}
        </h3>
      )
    case 4:
      return (
        <h4 className={clsx(headingClass, className)} {...rest}>
          {children}
        </h4>
      )
    case 5:
      return (
        <h5 className={clsx(headingClass, className)} {...rest}>
          {children}
        </h5>
      )
    case 6:
      return (
        <h6 className={clsx(headingClass, className)} {...rest}>
          {children}
        </h6>
      )
    default:
      return 'h1' // Fallback to h1 in case of error
  }

  // Merge the internal heading class with any user-provided className
}

export default Heading
