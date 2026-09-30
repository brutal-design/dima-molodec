import type { ComponentPropsWithRef, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /** Visual hierarchy. Figma: `Type`. */
  variant?: ButtonVariant
  /** Figma: `Size`. */
  size?: ButtonSize
  /** Icon before the label, rendered at 16×16 and colored with `currentColor`. Figma: `Left icon`. */
  iconLeft?: ReactNode
  /** Icon after the label. Figma: `Right icon`. */
  iconRight?: ReactNode
}

/**
 * Triggers actions. Hugs its content — never a fixed width.
 * Hover, pressed and focus states come from the browser (`:hover`, `:active`, `:focus-visible`).
 */
export function Button({
  variant = 'primary',
  size = 'sm',
  iconLeft,
  iconRight,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {iconLeft && (
        <span className={styles.icon} aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className={styles.icon} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  )
}
