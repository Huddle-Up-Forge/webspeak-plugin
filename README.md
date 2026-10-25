# WebSpeak Plugin Catalog

[![Validate catalog](https://github.com/Huddle-Up-Forge/webspeak-plugin/actions/workflows/validate.yml/badge.svg)](https://github.com/Huddle-Up-Forge/webspeak-plugin/actions/workflows/validate.yml) · **API v2 · Independent applications · AGPL-3.0-only**

WebSpeak 功能插件分发目录。每款插件在自己的仓库维护完整源码、构建脚本、测试和发布包；本仓库维护安装索引、收录规范与完整性校验，并提供通用开发起点。

A distribution catalog for independent WebSpeak applications. Each application owns its source, build, tests and package. This repository links those repositories and verifies their published metadata and package integrity.

## 插件 / Applications

| 插件 | 功能 | 独立仓库 |
| --- | --- | --- |
| **P2P File Transfer** · 点对点文件传输 | 接收确认、浏览器直连、SHA-256 校验、文件保存 | [源码与配置](https://github.com/Huddle-Up-Forge/webspeak-plugin-p2p-file-transfer) |
| **Watch Together** · 视频同看 | 视频直链、共享播放与跳转、倍速、中途加入、主持权交接 | [源码与配置](https://github.com/Huddle-Up-Forge/webspeak-plugin-watch-together) |

当前收录两款 **2.0.0 / API v2** 应用。安装目录入口为 [`index.json`](index.json)。插件源码和发布包位于各自仓库，分发仓库不再复制业务代码或发布包。

## 安装 / Install

1. 确认实例已包含开发中的 **WebSpeak 应用运行时 API v2**；已发布的 v0.2.9 和旧 API v1 不支持这些包。
2. 在 `/admin/plugins` 打开插件商店，选择安装；也可从对应仓库下载 `.wplugin` 后本地导入。
3. 审核代码及依赖，配置作用域，勾选信任并启用。更新后需要重新审核与启用。
4. 用户连接语音后，从“插件功能”入口打开应用。服务器范围按实际 TS 目标和频道分组；实例范围覆盖当前语音网关。

公网实例需要独立 HTTPS 应用源，并支持 WebSocket 与 SSE。浏览器的网络、权限、自动播放和媒体解码规则继续适用。P2P 网络及保存限制、视频来源限制请查看各插件的说明。

API v2 applications use standard browser code and optional trusted Node backends. Node code has the WebSpeak service account's OS privileges; separate processes are lifecycle management, not a hostile-code sandbox. Administrators should review source and dependencies before enabling. Hash checks verify integrity, not code safety.

## 仓库分工 / Repository responsibilities

| 仓库 | 维护内容 |
| --- | --- |
| 本仓库 | `index.json`、目录结构规范、静态校验、通用模板 |
| 各插件仓库 | `manifest.json`、`client/`、`server/`、构建与测试、`.wplugin`、`plugin.json` |
| WebSpeak 主仓库 | 通用运行环境与生命周期，不包含这些插件的业务逻辑 |

## 收录格式 / Catalog format

```json
{
  "schemaVersion": 2,
  "plugins": [
    {
      "id": "community.p2p-file-transfer",
      "repository": "https://github.com/Huddle-Up-Forge/webspeak-plugin-p2p-file-transfer",
      "metadataPath": "plugin.json"
    }
  ]
}
```

目录格式见 [JSON Schema](schemas/catalog.schema.json)。每个插件仓库的 `plugin.json` 必须提供完整 API v2 `manifest`，以及 `package.ref/path/sha256`。本目录要求 `ref` 为 **40 位不可变提交 SHA**，不能使用 `main`、`HEAD` 等可变引用；包路径和 SHA-256 必须对应该提交中的真实文件。

发布时先提交源码和构建包，再生成指向该提交的 `plugin.json`，最后提交元数据并推送。两款插件仓库均提供 `npm run metadata -- FULL_PACKAGE_COMMIT_SHA`，会核对提交中的包与当前构建包一致。此流程避免元数据指向尚不存在的标签或不包含发布包的提交。

提交收录前应审核来源、许可证、依赖、私密数据处理、运行资源和关闭/更新行为。验证器只解析数据与校验哈希，不执行下载的插件代码。

## 校验 / Validate

Node 22 或更高版本，无需安装依赖：

```sh
npm run verify
npm run verify:remote
```

- `verify`：校验目录结构、验证通用模板可复现构建，并运行目录契约测试。
- `verify:remote`：从 GitHub 获取实际元数据，再按不可变提交下载包，核验 ID、manifest、路径、内容大小与 SHA-256。
- 离线审查本地插件仓库可运行 `node validate.mjs --sources ../webspeak-plugin-p2p-file-transfer ../webspeak-plugin-watch-together`；包字节从对应提交读取。

GitHub Actions 在提交和 PR 中运行本地校验与远端校验。各插件仓库的 CI 独立验证自己的构建和功能。

## 开发起点 / Starter

复制 [`template/`](template/manifest.json)，使用标准 HTML/CSS/JavaScript 和可选 Node 服务编写应用：

```sh
node build.mjs template application.wplugin
```

通用模板只展示上下文和作者自定义的计数路由，不是商店预装插件，也不是两款业务插件的依赖。`.wplugin` 为 JSON `{manifest,files}`；后端依赖需随包提供，宿主不执行包安装脚本。详细的实际应用结构可参考上方两个独立仓库。

## 许可证 / License

目录、工具和通用模板采用 [AGPL-3.0-only](LICENSE)。每款应用的许可证由其独立仓库声明。
