# 项目预览地址(尚未完成)
[移动端](https://xpc.hxq-001.top)
各浏览器视频详情页可能会有bug(浏览器自动固定视频位置,造成tab会隐藏)
# 技术栈
Vue3+TypeScript(anyScript😁)+VueRouter+Pinia+Axios+Scss+Vant

# 项目说明
1. 添加分类的loadMoreUrl,自动增加page数,无需更改
2. 推荐页面的loadMoreUrl 每次需自行更改(已更改)
3. 每日精选页面的loadMoreUrl 每次需自行更改(需更改日期)
4. 热门页面的loadMoreUrl 每次需自行更改
5. 入场必看页面无loadMoreUrl
6. 推荐页面的vlog,古风数据为null
7. 视频文章评论数据都是同一个,无论哪个id

# 部署项目
由于写成anyScript😁,部署项目注意将`pageage.json`中`scripts`的`build`改为`vite build`

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
