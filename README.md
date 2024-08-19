项目模板分支
生效的eslint+prettier配置，较为简单的配置，没有设置提交控制
first：[参考eslint](https://blog.csdn.net/weixin_45687201/article/details/139283814) 完成eslint的配置后其实无需再使用prettier，直接执行配置在package.json的自定义指令 pnpm lint 和 pnpm lint:fix进行检查和修复，或者直接执行官方默认指令 pnpm lint --fix
          如果还要配置prettier，请 [参考prettier](https://blog.csdn.net/weixin_45687201/article/details/137028525)和 [官网](https://eslint.nuxt.com/packages/module) 差不多 

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
