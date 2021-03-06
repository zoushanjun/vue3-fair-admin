# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"

### version

2021.7.29 1.0.5 版本
1-解决展会新增日期少一天的问题
2-解决导出 EXCEL 时，展位带有字母 E 会变成科学计数的问题

2021.7.20 1.0.4 版本
1-作业-列表-显示工单数量和客户名称
2-作业-工单-编辑-显示工单数量和客户名称

2021.7.7 1.0.3 版本
1-资产-列表-用途/组别字段超长省略
2-资产-库存-编辑-将类别字段修改为平台，型号字段使用下拉列表
3-资产-库存，修复编辑/删除后页面刷新数据错误问题
4-\*\*\*解决列表中的操作按钮弹出抽屉卡顿问题

2021.7.6 1.0.2 版本
1-解决刷新页面当前菜单无法保持高亮问题
2-增加刷新按钮

2021.7.5 1.0.1 版本
1-最近展会 按照撤展时间进行排序
2-库存管理->新增->状态字段缺省为"库存"
3-资产统计-从用途/组别字段进行抽取关键词

2021.7.5 1.0.0 版本发布
2021.3.20 启动开发
