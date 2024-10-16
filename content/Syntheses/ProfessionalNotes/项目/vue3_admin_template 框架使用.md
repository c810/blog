---
title: vue3_admin_template 框架使用
publish: true
---

## 一、项目初始化

使用 pnpm

```bash
pnpm create vite
```

如图，我选择 vue3+ts

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029155832.png)

然后依次运行

```bash
cd front_end
pnpm install
pnpm run dev
```

出现如下界面，表示项目启动成功。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029155920.png)

我们打开链接，看一下项目界面。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029155944.png)

这样项目就创建成功了。

进入项目查看项目目录结构：

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029160154.png)

如果遇到如下报错：

```txt
TS2307: Cannot find module './App.vue' or its corresponding type declarations.
```

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029161430.png)

这是因为 `ts` 不认识 `.vue` 文件，只需要在 `App.vue` 同级目录下新建 `shims-vue.d.ts` 文件，并在该文件中添加以下内容即可。

```typescript
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
```

然后进行如下操作：

- 删掉 `style.css` 文件和 `HelloWorld.vue` 文件
- 删除 `main.ts` 中 `import './style.css'`
- 删除 `App.vue` 中的内容，换成如下内容：

```vue
<template>
  <div>
    <h1>我是App</h1>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
```

- 在 `main.ts` 中获取应用实例对象，并将应用挂载到挂载点上：

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// 获取应用实例对象
const app = createApp(App)
// 将应用挂载到挂载点上
app.mount('#app')
```

将 `public` 包下的 `vite.svg` 删除，改成自己的 `logo.svg`。

在 `index.html` 中修改标题和 Logo 文件名：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>零号星球运营平台</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

至此，我们的项目目录结构如下图：

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029162640.png)

在 `package.json` 配置文件中，将 `"dev": "vite"` 改为 `"dev": "vite --open"`，即：

```json
{
  "name": "front_end",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vue-tsc": "^1.8.5"
  }
}
```

我们在运行时，就会自动打开我们的浏览器了。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029162712.png)

这样，我们的项目就完成了初始化工作。

## 二、项目配置

**以下配置可尝试使用代码编辑器配置。**

### （一）eslint 配置

在项目目录下安装 eslint

```bash
pnpm i eslint -D
```

生成配置文件 `.eslint.cjs`

```bash
npx eslint --init
```

依次选择：

- To check syntax and find problems
- JavaScript modules (import/export)
- Vue.js
- Yes
- Browser
- JavaScript
- Yes
- pnpm

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029163807.png)

安装结束后，会在项目中生成一个 `.eslintrc.cjs` 文件。

```js
module.exports = {
   //运行环境
    "env": {
        "browser": true,//浏览器端
        "es2021": true,//es2021
    },
    //规则继承
    "extends": [
       //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
       //比如:函数不能重名、对象不能出现重复key
        "eslint:recommended",
        //vue3语法规则
        "plugin:vue/vue3-essential",
        //ts语法规则
        "plugin:@typescript-eslint/recommended"
    ],
    //要为特定类型的文件指定处理器
    "overrides": [
    ],
    //指定解析器:解析器
    //Esprima 默认解析器
    //Babel-ESLint babel解析器
    //@typescript-eslint/parser ts解析器
    "parser": "@typescript-eslint/parser",
    //指定解析器选项
    "parserOptions": {
        "ecmaVersion": "latest",//校验ECMA最新版本
        "sourceType": "module"//设置为"script"（默认），或者"module"代码在ECMAScript模块中
    },
    //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
    //该eslint-plugin-前缀可以从插件名称被省略
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    //eslint规则
    "rules": {
    }
}
```

#### 1.安装 vue3 环境代码校验插件

安装指令：

```bash
pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
```

查看 `package.json`

```json
# 该解析器允许使用Eslint校验所有babel code
"@babel/eslint-parser": "^7.22.15",
# 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查
"eslint-config-prettier": "^9.0.0",
"eslint-plugin-import": "^2.29.0",
"eslint-plugin-node": "^11.1.0",
# 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低
"eslint-plugin-prettier": "^5.0.1",
# vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南）
"eslint-plugin-vue": "^9.18.1",
```

#### 2.修改 `.eslintrc.cjs` 配置文件

```js
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}
```

#### 3.配置 `.eslintignore` 配置文件

在根目录下新建 `.eslintignore` 文件并编辑：

```java
dist
node_modules
```

#### 4.运行脚本

在 `package.json` 新增两个运行脚本：

```java
"scripts": {
    "lint": "eslint src",
    "fix": "eslint src --fix",
}
```

### （二）prettier 配置

有了 eslint，为什么还要有 prettier？eslint 针对的是 javascript，他是一个检测工具，包含 js 语法以及少部分格式问题，在 eslint 看来，语法对了就能保证代码正常运行，格式问题属于其次；

而 prettier 属于格式化工具，它看不惯格式不统一，所以它就把 eslint 没干好的事接着干，另外，prettier 支持

包含 js 在内的多种语言。

总结起来，**eslint 和 prettier 这俩兄弟一个保证 js 代码质量，一个保证代码美观。**

#### 1.安装依赖包

```java
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

#### 2.配置 `.prettierrc.json` 添加规则

在根目录下新建 `.prettierrc.json` 文件

```java
// 以下内容复制时注意要把所有注释去掉
{
  // 单引号
  "singleQuote": true,
  // 不要分号；
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  // 缩进占2个位置
  "tabWidth": 2
}
```

#### 3.配置 `.prettierignore` 忽略文件

在根目录下新建 `.prettierignore` 文件

```java
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

**通过 pnpm run lint 去检测语法，如果出现不规范格式,通过 pnpm run fix 修改**

### （三）配置 stylelint

[stylelint](https://stylelint.io/) 为 css 的 lint 工具。可格式化 css 代码，检查 css 语法错误与不合理的写法，指定 css 书写顺序等。

我们的项目中使用 scss 作为预处理器，安装以下依赖：

```java
pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```

#### 1.配置 `.stylelintrc.cjs` 配置文件

**官网:<https://stylelint.bootcss.com/**>

```java
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

#### 2.配置 `.stylelintignore` 忽略文件

```java
/node_modules/*
/dist/*
/html/*
/public/*
```

#### 3.运行脚本

```java
"scripts": {
	"lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
}
```

最后配置统一的 prettier 来格式化我们的 js 和 css，html 代码

```java
 "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "fix": "eslint src --fix",
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },
```

**当我们运行 `pnpm run format` 的时候，会把代码直接格式化**

### （四）配置 husky

在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用 husky 在代码提交之前触发 git hook(git 在客户端的钩子)，然后执行 `pnpm run format` 来自动的格式化我们的代码。

安装 `husky`

```java
pnpm install -D husky
```

执行

```java
npx husky-init
```

会在根目录下生成个一个.husky 目录，在这个目录下面会有一个 pre-commit 文件，这个文件里面的命令在我们执行 commit 的时候就会执行

在 `.husky/pre-commit` 文件添加如下命令：

```java
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run format
```

当我们对代码进行 commit 操作的时候，就会执行命令，对代码进行格式化，然后再提交。

### （五）配置 commitlint

对于我们的 commit 信息，也是有统一规范的，不能随便写,要让每个人都按照统一的标准来执行，我们可以利用**commitlint**来实现。

安装包

```java
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

添加配置文件，新建 `commitlint.config.cjs`(注意是 cjs)，然后添加下面的代码：

```java
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
```

在 `package.json` 中配置 scripts 命令

```java
# 在scrips中添加下面的代码
{
"scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  },
}
```

配置结束，现在当我们填写 `commit` 信息的时候，前面就需要带着下面的 `subject`

```java
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```

配置 husky

```java
npx husky add .husky/commit-msg
```

在生成的 commit-msg 文件中添加下面的命令

```java
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm commitlint
```

当我们 commit 提交信息时，就不能再随意写了，必须是 git commit -m 'fix: xxx' 符合类型的才可以，**需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的**

### （六）强制使用 pnpm 包管理器工具

团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,

导致项目出现 bug 问题,因此包管理器工具需要统一管理！！！

在根目录创建 `scripts/preinstall.js` 文件，添加下面的内容

```java
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
```

配置命令

```java
"scripts": {
	"preinstall": "node ./scripts/preinstall.js"
}
```

**当我们使用 npm 或者 yarn 来安装包的时候，就会报错了。原理就是在 install 的时候会触发 preinstall（npm 提供的生命周期钩子）这个文件里面的代码。**

## 三、项目集成

### （一）集成 element-plus

零号星球运营平台，UI 组件库采用的 element-plus，因此需要集成 element-plus 插件。

官网地址:<https://element-plus.gitee.io/zh-CN/>

安装 element-plus 和图标组件库：

```bash
pnpm install element-plus @element-plus/icons-vue
```

**入口文件 main.ts 全局安装 element-plus,element-plus 默认支持语言英语设置为中文**

```typescript
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 获取应用实例对象
const app = createApp(App)

// @ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 安装element-plus插件
app.use(ElementPlus, {
    // element-plus国际化配置
    locale: zhCn
})

// 将应用挂载到挂载点上
app.mount('#app')
```

**Element Plus 全局组件类型声明**（TODO 有什么用？）

在 `tsconfig.json` 配置

```json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

配置完毕可以测试 element-plus 组件与图标的使用.

### （二）src 别名的配置

在开发项目的时候文件与文件关系可能很复杂，因此我们需要给 src 文件夹配置一个别名。

在 `vite.config.ts` 中

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 相对路径别名配置，使用 @ 代替 src
      "@": path.resolve("./src")
    }
  }
})
```

TypeScript 编译配置：

在 `tsconfig.json` 中

```json
{
  "compilerOptions": {
    // 解析非相对模块的基地址，默认是当前目录
    "baseUrl": "./",
    // 路径映射，相对于baseUrl
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

那么，`main.ts` 中的 `import App from './App.vue'` 可以改为 `import App from '@/App.vue'`。

### （三）环境变量的配置

**项目开发过程中，至少会经历开发环境、测试环境和生产环境 (即正式环境) 三个阶段。不同阶段请求的状态 (如接口地址等) 不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。**

开发环境（development）

顾名思义，开发使用的环境，每位开发人员在自己的 dev 分支上干活，开发到一定程度，同事会合并代码，进行联调。

测试环境（testing）

测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试

生产环境（production）

生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)

注意: 一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！

项目根目录分别添加 开发、生产和测试环境的文件!

```java
.env.development
.env.production
.env.test
```

文件内容

```java
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '零号星球运营平台'
VITE_APP_BASE_API = '/dev-api'
VITE_SERVER_URL = 'http://xxxx.com'
```

```java
NODE_ENV = 'production'
VITE_APP_TITLE = '零号星球运营平台'
VITE_APP_BASE_API = '/prod-api'
VITE_SERVER_URL = 'http://yyyy.com'
```

```java
NODE_ENV = 'test'
VITE_APP_TITLE = '零号星球运营平台'
VITE_APP_BASE_API = '/test-api'
VITE_SERVER_URL = 'http://zzzz.com'
```

配置运行命令：package.json

```json
 "scripts": {
    "dev": "vite --open",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "preview": "vite preview"
  },
```

通过 import.meta.env 获取环境变量

### （四）SVG 图标配置

在开发项目的时候经常会用到 svg 矢量图,而且我们使用 SVG 以后，页面上加载的不再是图片资源,

这对页面性能来说是个很大的提升，而且我们 SVG 文件比 img 要小的很多，放在项目中几乎不占用资源。

安装 SVG 依赖插件：

```java
pnpm install vite-plugin-svg-icons -D
```

在 `vite.config.ts` 中配置插件：

```typescript
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        // 相对路径别名配置，使用 @ 代替 src
        "@": path.resolve("./src"),
      },
    },
  };
});
```

在 `main.ts` 入口文件导入：

```java
import 'virtual:svg-icons-register'
```

使用方法：

到图标网站复制图标 svg 代码，这里我们使用 [阿里图标库](https://www.iconfont.cn/)。

在 `assets` 文件夹下新建 `icons` 文件夹，然后创建 `phone.svg` 文件，将图标 svg 代码粘贴到该文件里。

来到要使用图标的地方，使用如下方法引用：

```vue
<svg style="width: 30px;height: 30px">
    <!-- xlink:href执行用哪一个图标，属性值务必使用 #icon-图标名字 -->
    <use xlink:href="#icon-phone" fill="red"></use>
</svg>
```

如果报错少了 `fast-glob`，则安装即可：

```bash
pnpm install fast-glob
```

**当然，当我们的项目中很多模块要大量使用这些图标时，我们可以选择将它封装成全局组件：**

在 `src/components` 目录下创建 `SvgIcon` 文件夹，在里面新建一个 `index.vue`，封装成 `SvgIcon` 组件：

```vue
<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  // svg矢量图的名字
  name: String,
  // svg图标的颜色
  color: {
    type: String,
    default: ""
  },
  // svg宽度
  width: {
    type: String,
    default: '16px'
  },
  // svg高度
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<style scoped></style>
```

在 `src` 文件夹目录下创建一个 `index.ts` 文件，用于注册 components 文件夹内部全部全局组件。

```typescript
// 引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue';
import Pagination from '@/components/Pagination/index.vue';

// 全局对象
const allGlobalComponents = { SvgIcon, Pagination };

// 对外暴露插件对象
export default {
    // 插件对象必须有一个install方法
    // @ts-ignore
    install(app) {
        // 遍历components对象，注册项目全部的全局组件
        Object.keys(allGlobalComponents).forEach(key => {
            // 注册为全局组件
            // @ts-ignore
            app.component(key, allGlobalComponents[key]);
        })
    }
}
```

或者（推荐）：

```typescript
// 引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue';

// 引入vue的类型定义
import type { App, Component } from 'vue';

// 定义一个对象，存储全部的全局组件
const components: { [name: string]: Component } = { SvgIcon };

// 对外暴露插件对象
export default {
    // 插件对象必须有一个install方法，定义install方法，接收app作为参数
    install(app: App) {
        // 遍历components对象，注册项目全部的全局组件
        Object.keys(components).forEach((key: string) => {
            // 注册为全局组件
            app.component(key, components[key]);
        })
    }
}
```

在入口文件引入 `src/index.ts` 文件,通过 `app.use` 方法安装自定义插件

```typescript
// 引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/index.ts';
// 安装自定义插件对象
app.use(globalComponent);
```

使用方法：

```vue
<svg-icon name="phone" color="red" width="100px" height="100px"/>
```

### （五）集成 sass

我们目前在组件内部已经可以使用 `scss` 样式,因为在配置 `styleLint` 工具的时候，项目当中已经安装过 `pnpm add sass sass-loader -D` ，因此我们再组件内可以使用 `scss` 语法。需要加上 `lang="scss"`

```java
<style scoped lang="scss"></style>
```

接下来我们为项目添加一些全局的样式：

在 `src/styles` 目录下创建一个 `index.scss` 文件，当然项目中需要用到清除默认样式，因此，在 `src/styles` 目录下创建一个 `reset.scss` 文件，`reset.scss` 中的内容去<https://www.npmjs.com/package/reset.scss?activeTab=code>复制。

在 `index.scss` 引入 `reset.scss`。

```scss
// 引入清除默认样式
@import './reset.scss';
```

在 `main.ts` 文件引入

```typescript
// 引入模板的全局样式
import '@/styles/index.scss'
```

但是你会发现在 src/styles/index.scss 全局样式文件中没有办法使用 $变量.因此需要给项目中引入全局变量$.

在 style/variable.scss 创建一个 variable.scss 文件！

在 vite.config.ts 文件配置如下:

```typescript
export default defineConfig((config) => {
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
}
```

**`@import "./src/styles/variable.less";` 后面的 `;` 不要忘记，不然会报错！**

在 `variable.scss` 中提供 scss 的全局变量：

```scss
// 给项目提供的scss的全局变量
// 定义项目主题颜色
$base-color: red;
```

配置完毕会发现 scss 提供这些全局变量可以在组件样式中使用了：

```vue
<style scoped lang="scss">
div {
  h1 {
    color: $base-color;
  }
}
</style>
```

### （六）mock 数据

安装依赖:<https://www.npmjs.com/package/vite-plugin-mock>

```java
pnpm install -D vite-plugin-mock@2.9.6 mockjs
```

在 vite.config.js 配置文件启用插件。

```js
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command })=> {
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
  }
})
```

至此，完整的 `vite.config.ts` 如下：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // 保证开发阶段可以使用mock接口
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        // 相对路径别名配置，使用 @ 代替 src
        "@": path.resolve("./src")
      }
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
```

在根目录创建 `mock` 文件夹，去创建我们的假的 mock 数据与接口。

在 `mock` 文件夹内部创建一个 `user.ts` 文件

```typescript
// 用户信息数据
// 此函数执行后会返回一个数组，数组中包含两个对象，每个对象就是一个用户信息（账号）
function createUserList() {
    return [
        {
            // 用户id
            userId: 1,
            // 用户头像
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            // 用户名
            username: 'admin',
            // 用户密码
            password: '111111',
            // 用户描述
            desc: '平台管理员',
            // 用户角色
            roles: ['平台管理员'],
            // 用户按钮权限
            buttons: ['cuser.detail'],
            // 用户路由权限
            routes: ['home'],
            // 用户token
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}

// 对外暴露一个数组，数组中包含两个对象，每个对象就是一个接口
// 一个是用户登录的假接口，一个是获取用户信息的假接口
export default [
    // 用户登录接口
    {
        url: '/api/user/login', // 请求地址
        method: 'post', // 请求方式
        response: ({ body }) => {
            // 获取请求体携带过来的用户名与密码
            const { username, password } = body;
            // 调用获取用户信息函数,用于判断是否有此用户
            // @ts-ignore
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            // 没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            // 如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            // 获取请求头携带token
            const token = request.headers.token;
            // 查看用户信息是否包含有次token用户
            // @ts-ignore
            const checkUser = createUserList().find((item) => item.token === token)
            // 没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            // 如果有返回成功信息
            return { code: 200, data: {checkUser} }
        },
    },
]
```

测试是否可以使用：

安装 axios

```java
pnpm install axios
```

在 `main.ts` 中测试：

```typescript
// 测试代码：测试假接口能否使用
import axios from "axios";
axios({
    url: '/api/user/login',
    method: 'post',
    data: {
        username: 'admin',
        password: '111111'
    }
})
```

启动项目，进入 F12 控制台，找到如下信息，代表测试成功。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029211802.png)

还可以再试一下错误的密码：

在 `main.ts` 中测试：

```typescript
// 测试代码：测试假接口能否使用
import axios from "axios";
axios({
    url: '/api/user/login',
    method: 'post',
    data: {
        username: 'admin',
        password: '112111'
    }
})
```

刷新页面，找到如下信息：

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029211956.png)

通过 axios 测试接口，可以将 `main.ts` 中的测试代码删掉了。

### （七）axios 二次封装

在开发项目的时候避免不了与后端进行交互,因此我们需要使用 axios 插件实现发送网络请求。在开发项目的时候

我们经常会把 axios 进行二次封装。

目的：

1. 使用请求拦截器，可以在请求拦截器中处理一些业务（开始进度条、请求头携带公共参数）
2. 使用响应拦截器，可以在响应拦截器中处理一些业务（进度条结束、简化服务器返回的数据、处理 http 网络错误）

在根目录下创建 `utils/request.ts`

```typescript
// 进行axios的二次封装，目的是为了使用请求和响应拦截器

// 引入axios
import axios from "axios";
// 引入element-plus的消息提示框，用于提示错误信息
import { ElMessage } from "element-plus";

// 第一步：利用axios对象的create方法，创建axios实例
// 此时，这个文件里有两个axios
// 一个是默认的axios（上面import的）
// 一个是我们自己创建的axios实例，可以配置一些其他的配置：基础路径、超时时间等
let request = axios.create({
    // 记得在.env.development文件中配置VITE_APP_BASE_API，这里我改为了/api
    // 基础路径上会自动拼接/api
    // （因为我们模拟假接口开头都带有一个/api，所以我们才这么配置，当然也可以没有）
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时时间：发送的请求超过了5秒钟都没有响应，就是失败
    timeout: 5000
})

// 第二步：给axios实例（request）添加请求拦截器
// 请求拦截器
request.interceptors.request.use(config => {
    // config是请求配置对象，headers是请求头，经常给服务器端携带公共参数，token就是一个公共参数
    // 返回配置对象，否则请求就停在这里发不出去了
    return config;
});

// 第三步：给axios实例（request）添加响应拦截器
// 响应拦截器
request.interceptors.response.use((response) => {
    // 成功的回调
    // 简化返回数据
    return response.data;
}, (error) => {
    // 失败的回调
    // 处理http网络错误
    // 定义一个变量，用于存储网络错误信息
    let msg = '';
    // http状态码
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "网络出现问题";

    }
    // 提示错误信息
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});

// 第四步：对外暴露request
export default request;
```

测试 axios 二次封装是否可以使用：

在 `App.vue` 中

```vue
<template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>

<script setup lang="ts">
import request  from "@/utils/request";
import { onMounted } from "vue";

onMounted(() => {
  request({
    // 因为有了baseURL，所以这里的url不需要/api，只需要写后面的路径即可
    url: "/user/login",
    method: "post",
    data: {
      username: "admin",
      password: "111111"
    },
  }).then((res) => {
    console.log(res);
  });
});
</script>

<style scoped lang="scss">

</style>

```

刷新浏览器，看到控制台输出，测试成功：

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231029215858.png)

### （八）API 接口统一管理

在开发项目的时候,接口可能很多需要统一管理。在 src 目录下去创建 api 文件夹去统一管理项目的接口。

在 `src` 下建 `api/user` 文件夹，在 `user` 下建 `index.ts` 和 `type.ts`

`index.ts` 中：

```typescript
// 统一管理项目中用户相关的接口

// 导入封装好的axios实例
import request from '@/utils/request'
// 导入接口的ts数据类型
import type { loginForm, loginResponseData, userInfoResponseData } from "@/api/user/type";

// 统一管理接口
enum API {
    LOGIN_URL = '/user/login',
    USER_INFO_URL = '/user/info'
}

// 暴露请求方法
// 登录接口方法
export const reqLogin = (data:loginForm) => request.post<any,loginResponseData>(API.LOGIN_URL, data);
// 获取用户信息接口方法
export const reqUserInfo = () => request.get<any,userInfoResponseData>(API.USER_INFO_URL);
```

`type.ts` 中：

```typescript
// 登录接口需要携带的参数的ts数据类型
export interface loginForm {
    username: string,
    password: string
}

interface dataType {
    token: string
}

// 登录接口返回的ts数据类型
export interface loginResponseData {
    code: number,
    data: dataType
}

interface userInfo {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string
}

interface user {
    checkUser: userInfo
}

// 用户信息接口返回的ts数据类型
export interface userInfoResponseData {
    code: number,
    data: user
}
```

到 `App.vue` 中测试：

```vue
<template>
  <div>
    <h1>App根组件</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { reqLogin } from "@/api/user";

onMounted(() => {
  reqLogin({username:'admin',password:'111111'})
});
</script>

<style scoped>

</style>
```

刷新浏览器，有如下效果：

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231030010732.png)

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231030010638.png)

则测试成功。

## 四、路由配置

先安装 `vue-router`

```bash
pnpm install vue-router
```

在 `src` 下新建 `views` 文件夹去放置路由组件，在其下新建 `login`、`home`、`404` 文件夹，在每个文件夹下新建 `index.vue` 文件，内容如下：

```vue
<template>
  <div>
    <h1>我是一级路由登录</h1>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
```

在 `src` 下新建 `router` 文件夹，并在里面创建 `routes.ts` 和 `index.ts` 文件：

`routes.ts` 文件

```typescript
// 对外暴露配置的路由
// 常量路由
export const constantRoutes = [
    {
        // 登录路由
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login'
    },
    {
        // 首页路由
        path: '/',
        component: () => import('@/views/home/index.vue'),
        name: 'home'
    },
    {
        // 404路由
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404'
    },
    {
        // 重定向路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any'
    }
]
```

`index.ts` 文件

```typescript
// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routes";

// 创建路由器
let router = createRouter({
    // 路由模式：hash模式
    history: createWebHashHistory(),
    // 路由地址
    routes: constantRoutes,
    // 路由跳转后滚动条位置（滚动行为）
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        }
    }
});

export default router;
```

在 `main.ts` 中注册路由：

```typescript
// 引入路由
import router from './router'
// 注册路由
app.use(router)
```

在 `App.vue` 中测试：

```vue
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
```

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231030230122.png)

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231030230148.png)

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231030230225.png)

下面无效地址回车后会重定向到 404，地址也变成 404，同上一张图片。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/obsidian/20231030230257.png)

## 五、登录部分

首先先搭建登录路由的静态页面：
