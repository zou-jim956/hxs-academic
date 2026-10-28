# 黄旭升副教授个人学术网站

这是一个不依赖框架和第三方构建工具的静态网页项目。视觉基准来自已确认的参考图：米白色背景、建筑空间图像、简洁导航、中文为主的中英文栏目和底部三栏信息区。

## 项目结构

```text
src/
  index.html                 页面入口
  css/styles.css             全站颜色、字体、间距和响应式布局
  js/components.js           首页各模块模板
  js/app.js                  组装页面与交互
  assets/images/
    architecture/            建筑项目与空间摄影
    portrait/                教授照片
    drawings/                图纸、分析图、模型图
    teaching/                课程与教学图片
content/site-data.json        可由 Pages CMS 编辑的内容
scripts/build.mjs             将 src 构建到 dist/
dist/                         可直接预览和发布的静态文件
```

## 修改文字

- 修改个人简介、研究方向、项目、教学、讲座、联系方式和成果：编辑 `content/site-data.json`，或在 Pages CMS 的“网站内容”表单中编辑。
- 修改页面模块结构：编辑 `src/js/components.js`。首页、导航、研究、项目、成果、教学、讲座、联系和页脚均为独立模板函数。
- 修改导航或页面入口：编辑 `src/index.html` 或 `src/js/components.js`。

## 增加或修正论文

在 `content/site-data.json` 的 `publications` 数组中新增或修改一条记录，字段为：

```text
`type`、`number`、`title`、`authors`、`venue`、`year`
```

类型只能使用 `journal`（期刊论文）、`conference`（会议论文）或 `thesis`（硕士论文）。页码、DOI、英文题名、摘要和全文链接没有确认前不要填写。

## 修改图片、图片说明和按钮

Pages CMS → 网站内容 → 首页大图与按钮，或展开研究/项目/教学/讲座/成果中的具体条目。直接上传或选择图片，填写图片说明、替代文字及按钮文字、链接地址，保存后自动部署。首页说明需开启“显示图片说明”；图片或链接留空时不显示相应内容。官方主页按钮文字在“个人资料”里编辑。

完整升级和操作步骤见 `部署说明.md` 第八节。若仓库已编辑过内容，不要直接覆盖原 JSON；先备份，再按说明合并。

## 本地预览

在项目根目录运行：

```text
node scripts/build.mjs
python -m http.server 4173 --directory dist
```

然后打开 <http://localhost:4173/>。必须通过本地 HTTP 服务器预览；双击 HTML 无法可靠加载模块和 JSON。

## 发布更新

每次修改 `src/` 或 `content/` 后重新运行 `node scripts/build.mjs`，将 `dist/` 文件夹上传到任意静态托管服务即可。发布时只需上传 `dist/`，长期维护时保留并编辑源文件，不要直接修改构建后的 `dist/` 文件。

## GitHub Pages 与 Pages CMS

项目已包含 `.pages.yml` 和 `.github/workflows/pages.yml`。将整个项目放入 GitHub 仓库后，在仓库 Settings → Pages 中把 Source 设为 **GitHub Actions**；推送到 `main` 分支或手动运行工作流会构建 `dist/` 并部署到 GitHub Pages。Pages CMS（<https://app.pagescms.org/>）登录并授权该仓库后，会显示“网站内容”编辑表单，保存时把修改提交回 `content/site-data.json`，随后由工作流自动发布。

Pages CMS 只提供 GitHub 文件编辑界面，不保存独立数据库，也不会替用户创建仓库或开启 Pages。首次设置和之后的编辑都需要有该仓库的 GitHub 权限；本项目没有在未确认时连接或发布到任何账户。

## 内容边界

网站保留已确认的17项成果：14篇期刊论文、2篇会议论文、1篇硕士论文。不展示学生名单、学生个人资料或课题组成员信息。没有确认的项目、年份、地址、讲座、照片、DOI、页码和摘要继续使用占位内容。
