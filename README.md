空白模板分支-以防止安装 Nuxt3 失败
host 添加下面一行即可安装成功 ：[参考](https://juejin.cn/post/7154586714416087076)
185.199.108.133 raw.githubusercontent.com

## 2025/3/7 学习打包上传部署至 github

注意现在为了清晰管理分支，专门新建template_devops分支，作为打包部署基础分支。

原来的template_blank空白模板分支还原原来的状态。

所以配置文件中的 on: push:branches: 应该改为 目标打包基础分支，比如 template_devops

新增部署备份文件【deploy_backup.yml】和部署配置文件【.github\workflows\deploy.yml】

### 手动打包部署

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
});

```

尝试执行`pnpm build` 构建（打包），观察过程 client and server ，和产物输出目录

尝试执行`pnpm genertate` 生成静态站点，观察过程和产物输出目录。 生成静态文件在`.output/public` 

设置开源权限仓库可见：setting-General-Danger Zone(拉到底) -  This repository is currently public. 

设置Github Pages：打开setting - Pages，Build and deployment，Deploy from a branch，打包目标分支，/docs，Save

这一步设置Github Pages部署目录是 【目标分支】的 docs目录。

修改nuxt.config.ts打包配置。来匹配Github Pages的设置

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
      output: {
          publicPath: 'docs'  // 或者 path.join(__dirname, 'docs')
      }
  }  
});
```

注意！！这里并不是直接将 docs 文件夹作为静态目录提供页面访问服务，而是将这个目录的文件交给 Github 去打包处理，提供静态服务。因为我们保存设置之后，github 其内部自己跑了一个 Github Action 去部署了，我们点开 Actions tab 看看。

`pnpm generate`  观察产物输出目录

git push；Actions中观察到自动开始构建。

点击部署完成后生成的链接访问。观察请求，出现部分打包的静态资源请求404，观察请求路径。

```
// 404原因
有些文件没加载到，这是因为我们部署的 publicPath 是 nuxt3_learn, Github Pages 默认部署到跟仓库名一样的路径中，但打包的默认配置(baseURL)是 /
```

新增nuxt.config.ts的baseURL配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    // 保留原来配置
    ...
    // 新增
    app: {
        baseURL: '/nuxt3_learn/'  // 仓库名
    }
})
```

重新构建` pnpm generate `,  观察产物输出目录。git push；Actions中观察到自动开始构建。访问生成的链接。

 可以看到，请求路径对了，但是还是404，找不到文件，这是为什么呢？ 

 经过Google，才知道，Github Pages 构建部署时候，会忽略隐藏文件比如`.`开头文件，`_`开头的文件也会忽略，而我们的构建产物，刚好是在`_nuxt`目录下面，还有个 `_payload.json`文件，这些都被忽略，导致文件找不到。 

```typescript
export default defineNuxtConfig({
    // 新增
    app: {
        baseURL: '/nuxt-github-pages/',
        buildAssetsDir: 'nuxt_assets',
    },
    experimental: {
     payloadExtraction: false,  // 设置不需要生成这个实验性文件
  },
})
```

重新构建` pnpm generate `,  观察产物输出目录。git push；Actions中观察到自动开始构建。访问生成的链接。

输出了 全部200！至此nuxt.config.ts配置如下！

```typescript
// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // 保留配置  
  app: {
    baseURL: '/nuxt3_learn/',
    buildAssetsDir: 'nuxt_assets',  
  },
  // ssr: false,
  // 设置打包产物输出目录
  nitro: {
     output: {
       publicDir: 'docs',
     }
  },
  // 设置不需要生成这个实验性文件
  experimental: {
     payloadExtraction: false,
  },
});
```

### 问题分析

以上，我们就算是部署了Nuxt3项目的 Github Pages 页面了，这个过程，有两个问题：

- 不优雅！—— 打包是在我们本地完成的！打包产物是提交到远程仓库的。
- 太折腾！—— 我们为了“迎合” Github Pages Branch 分支文件夹的部署方法，改了构建产物输出的目录为 /docs，改了构建产物的文件夹名以防止特殊文件名`_`开头。

期待的效果是：用Nuxt3默认的打包构建方式就好了，不需要改什么东西！其次，打包的过程应该得在远程打包的，构建产物不应该放在仓库里面的。

### 使用Github Actions

```typescript
// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // 保留配置  
  app: {
    baseURL: '/nuxt3_learn/',
    buildAssetsDir: 'nuxt_assets',  
  },
  // ssr: false,
  // 注释打包输出目录，先恢复产物输出目录
  // nitro: {
  //   output: {
  //     publicDir: 'docs',
  //   }
  // },
  experimental: {
     payloadExtraction: false,
  },
});

```

1. 新增备份文件【deploy_backup.yml】

    Github Action 是根据这个配置文件干活的 ，有了这个配置 `Nuxt3`项目打包的过程就可以放到 Github 远程来做了。 

   改Github-Page  设置为 `gh-pages`的 `/(root)` 目录作为部署目录。

   -这个配置现象：

   ![1741333764236](D:\ysc\TESTpro\nuxt3_learn\README.assets\1741333764236.png)

   需要在 template_blank（打包目标分支）部署一次。提交代码后，会自动生成 gh-pages 分支,这里又 build+部署一次（这个才是真正部署）
   所以提交代码之后触发了两个 workflow, 其中一个是我们前面配置的 Github Pages 默认的部署行为，只要你提交代码都会有，另一个才是我们配置的打包 workflow【gh-pages 分支】
   此时检查 Github- Pages 的配置应为 gh-pages 分支 + /root 目录，手动 save，就会触发打包配置文件【.github\workflows\deploy.yml】
   第一次修改提交代码，需要手动 save 部署。后续 git push 之后就会自动部署。会出现两个 workflow, 先 template_blank 分支 deploy，后触发部署文件 gh-pages 分支 build and deploy。

   总结提交代码后的工作流程：

   ```
   我们提交代码，触发自己的工作流。打包完成会提交到 `gh-pages`分支（如果没有gh-pages分支会自动生成这个分支），之后由于 Github Pages 监听这个分支，然后触发了 Github Pages 的重新部署。这里依然要经过 Github Pages 默认的分支（gh-pages的workflow）打包部署，所有上面提到问题依然存在，产物文件不能是`_`开头文件、`.`开头文件，所以还是不能用 Nuxt3 默认的打包配置。
   ```

   #### 问题分析

   两个flow不优雅！ 能不能一步到位，不要经过分支啊？直接从 Github Action 就部署到 Github Pages 呢？ 所以需要以下第二种优化。并且要求：不设置nuxt.config.ts的打包配置，使用默认打包配置！

2. Github Action 打包 Nuxt3 项目并部署 Github Pages

   ```typescript
   // nuxt.config.ts
   // https://nuxt.com/docs/api/configuration/nuxt-config
   export default defineNuxtConfig({
     compatibilityDate: '2024-04-03',
     devtools: { enabled: true },
     app: {
       // 保留baseURL  
       baseURL: '/nuxt3_learn/',
       // buildAssetsDir: 'nuxt_assets',  
     },
     // ssr: false,
     // nitro: {
     //   output: {
     //     publicDir: 'docs',
     //   }
     // },
     // 注释这个实验性配置
     // experimental: {
     //   payloadExtraction: false,
     // },
   });
   ```

   

   部署配置文件【.github\workflows\deploy.yml】

   配置文件编写完成，在Github- Page 修改部署方式为 Github Actions

   提交代码

   现象：只出现一个workflow [template_blank](https://github.com/yangshangchao23/nuxt3_learn/tree/refs/heads/template_blank)  分支 过程是 build and deploy

   ![1741331993016](D:\ysc\TESTpro\nuxt3_learn\README.assets\1741331993016.png)

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
