import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'
import { expect, fn, userEvent } from 'storybook/test'
import { Button } from './Button'
import type { ButtonVariant } from './Button'

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M8 3v10M3 8h10" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

const icons = { none: undefined, plus: <PlusIcon />, arrow: <ArrowRightIcon /> }
const iconControl = {
  options: Object.keys(icons),
  mapping: icons,
  control: { type: 'select' },
} as const

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger']

const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 'var(--primitives-space-16)' }

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Triggers actions. Hugs its content — never a fixed width. Hierarchy via `variant`, scale via `size`; ' +
          'hover, pressed, focus and disabled come from the browser. Icons are optional slots, the label is `children`.',
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'sm',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    iconLeft: iconControl,
    iconRight: iconControl,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Primary: Story = {
  args: { variant: 'primary' },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Button' }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  args: { iconLeft: <PlusIcon />, children: 'Create' },
  render: (args) => (
    <div style={row}>
      <Button {...args} />
      <Button {...args} iconLeft={undefined} iconRight={<ArrowRightIcon />}>Continue</Button>
      <Button {...args} iconRight={<ArrowRightIcon />}>Both</Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeDisabled()
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const KeyboardFocus: Story = {
  name: 'Keyboard focus',
  play: async ({ canvas }) => {
    await userEvent.tab()
    await expect(canvas.getByRole('button')).toHaveFocus()
  },
}

const states = [
  { label: 'Default', className: undefined, disabled: false },
  { label: 'Hover', className: 'is-hover', disabled: false },
  { label: 'Pressed', className: 'is-active', disabled: false },
  { label: 'Focused', className: 'is-focus', disabled: false },
  { label: 'Disabled', className: undefined, disabled: true },
]

/** Mirrors the Figma component sheet: every Type × State for the selected size. */
export const AllStates: Story = {
  name: 'All states',
  parameters: {
    layout: 'padded',
    pseudo: { hover: ['.is-hover'], active: ['.is-active'], focusVisible: ['.is-focus'] },
  },
  argTypes: {
    variant: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `80px repeat(${variants.length}, max-content)`,
        alignItems: 'center',
        gap: 'var(--primitives-space-24) var(--primitives-space-32)',
        fontFamily: "'Inter Variable', system-ui, sans-serif",
        fontSize: 12,
        color: 'var(--semantic-text-muted)',
      }}
    >
      <span />
      {variants.map((v) => (
        <span key={v} style={{ textTransform: 'capitalize' }}>{v}</span>
      ))}
      {states.map((s) => (
        <div key={s.label} style={{ display: 'contents' }}>
          <span>{s.label}</span>
          {variants.map((v) => (
            <div key={v}>
              <Button {...args} variant={v} className={s.className} disabled={s.disabled} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
