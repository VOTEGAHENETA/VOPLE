# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

```
client
├─ .dockerignore
├─ .pnp.cjs
├─ .pnp.loader.mjs
├─ .prettierrc
├─ .storybook
│  ├─ main.ts
│  └─ preview.ts
├─ .yarnrc.yml
├─ Dockerfile
├─ eslint.config.js
├─ index.html
├─ nginx
│  └─ default.conf
├─ package.json
├─ public
│  ├─ mockServiceWorker.js
│  └─ vople_favi.svg
├─ README.md
├─ src
│  ├─ App.scss
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ fonts
│  │  │  └─ PretendardVariable.woff2
│  │  ├─ icons
│  │  │  ├─ back.svg
│  │  │  ├─ bigger.svg
│  │  │  ├─ check.svg
│  │  │  ├─ crown.svg
│  │  │  ├─ doodleback.svg
│  │  │  ├─ dots.svg
│  │  │  ├─ heart.svg
│  │  │  ├─ home.svg
│  │  │  ├─ IconBlurChart.tsx
│  │  │  ├─ IconFire.tsx
│  │  │  ├─ IconFlower.tsx
│  │  │  ├─ IconLogo.tsx
│  │  │  ├─ IconMiniCheck.tsx
│  │  │  ├─ IconRefresh.tsx
│  │  │  ├─ IconVoteHand.tsx
│  │  │  ├─ left.svg
│  │  │  ├─ medal.svg
│  │  │  ├─ mypage.svg
│  │  │  ├─ orangebigger.svg
│  │  │  ├─ send.svg
│  │  │  ├─ silverCrown.svg
│  │  │  ├─ stamp.svg
│  │  │  ├─ threeFinger.svg
│  │  │  ├─ twoFinger.svg
│  │  │  └─ x.svg
│  │  ├─ react.svg
│  │  ├─ sample
│  │  │  └─ sample.png
│  │  └─ styles
│  │     ├─ fonts.scss
│  │     ├─ globals.scss
│  │     ├─ reset.scss
│  │     ├─ variable.css
│  │     └─ _variable.scss
│  ├─ components
│  │  ├─ atoms
│  │  │  ├─ BaseButton
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ CircleButton
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ IconButton
│  │  │  │  ├─ Icon.stories.tsx
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ Input
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ Poster
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ Poster.stories.tsx
│  │  │  ├─ StreamReceiver.tsx
│  │  │  ├─ StreamSender
│  │  │  │  └─ index.tsx
│  │  │  ├─ Text
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ Text.stories.tsx
│  │  │  ├─ TextArea
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  └─ TextCounter
│  │  │     ├─ index.module.scss
│  │  │     ├─ index.stories.ts
│  │  │     └─ index.tsx
│  │  ├─ molecules
│  │  │  ├─ CandidateChoice
│  │  │  │  ├─ CandidateChoice.stories.tsx
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ CandidateResult
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ mockData.ts
│  │  │  ├─ CandidateSection
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ Introduction.tsx
│  │  │  │  └─ mockData.ts
│  │  │  ├─ CandidateTag
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ ChatBar
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ ConfirmModal
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ DateTimeField
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ ElectionListBox
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ ElectionListItem
│  │  │  │  ├─ CommonLeftContent.tsx
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ Footer
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ Header
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ InputField
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ Menu
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ RoleNameTag
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ RoleNameTag.stories.tsx
│  │  │  ├─ TextAreaField
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ VoteListItem
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  └─ index.tsx
│  │  │  └─ VoterNameCard
│  │  │     ├─ index.module.scss
│  │  │     ├─ index.stories.ts
│  │  │     └─ index.tsx
│  │  ├─ organisms
│  │  │  ├─ CandidateGallery
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ ChatBoard
│  │  │  │  ├─ index.module.scss
│  │  │  │  ├─ index.stories.ts
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ MessageList.tsx
│  │  │  ├─ ElectionInfoSection
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ MainCandidateList
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  └─ VotingBoard
│  │  │     ├─ index.module.scss
│  │  │     └─ index.tsx
│  │  └─ templates
│  │     ├─ CandidateInfoUpdateTemplate
│  │     │  ├─ index.module.scss
│  │     │  ├─ index.stories.ts
│  │     │  └─ index.tsx
│  │     ├─ ElectionCreateTemplate
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ ElectionMainTemplate
│  │     │  ├─ index.module.scss
│  │     │  ├─ index.tsx
│  │     │  └─ Turnout.tsx
│  │     └─ VoteTemplate
│  │        ├─ index.module.scss
│  │        ├─ index.tsx
│  │        └─ ModalPopUp.tsx
│  ├─ constants
│  │  └─ ui.constants.ts
│  ├─ hooks
│  │  ├─ useMediaStream.ts
│  │  ├─ useTimer.ts
│  │  └─ useWebSocket.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ mocks
│  │  ├─ browser.ts
│  │  └─ handlers.ts
│  ├─ pages
│  │  ├─ Channel
│  │  │  └─ index.tsx
│  │  ├─ Election
│  │  │  ├─ Create
│  │  │  │  └─ index.tsx
│  │  │  └─ Manage
│  │  │     └─ index.tsx
│  │  ├─ Home
│  │  │  └─ index.tsx
│  │  └─ Main
│  │     ├─ index.module.scss
│  │     └─ index.tsx
│  ├─ routes
│  │  └─ router.tsx
│  ├─ services
│  │  ├─ api.ts
│  │  ├─ election.ts
│  │  ├─ hooks
│  │  │  └─ useCreateElection.ts
│  │  └─ stream.ts
│  ├─ stores
│  │  ├─ election.ts
│  │  └─ voteStore.ts
│  ├─ types
│  │  ├─ api.ts
│  │  ├─ chat.ts
│  │  ├─ election.ts
│  │  ├─ eslint
│  │  │  └─ eslint-config-airbnb.d.ts
│  │  └─ voteSession.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ yarn.lock

```