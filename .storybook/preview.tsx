import type { Preview } from '@storybook/react-vite'
import '@fontsource-variable/inter'
import '../src/tokens/tokens.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Semantic token theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const root = document.documentElement
      root.dataset.theme = context.globals.theme
      document.body.style.background = 'var(--semantic-bg-canvas)'
      document.body.style.color = 'var(--semantic-text-primary)'
      return <Story />
    },
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
