# WebSpeak Plugin Store / 插件商店

WebSpeak 功能插件的 GitHub 分发目录。与 `.wskin` 皮肤仓库独立，需要包含功能插件 API v1 的 WebSpeak dev 版本；正式版 v0.2.9 尚不支持。

- [开发指南 / Development guide](https://github.com/EchoSixHIYA/WebSpeak-client-for-TeamSpeak/blob/dev/docs/PLUGIN_DEVELOPMENT.md)
- [开发 Agent Skill](https://github.com/EchoSixHIYA/WebSpeak-client-for-TeamSpeak/blob/dev/.agents/skills/webspeak-plugin-development/SKILL.md)

## 安装 / Install

在 WebSpeak `/admin/plugins` 打开商店，安装后检查权限、选择作用域并启用。安装和更新后默认禁用。

| 插件 / Plugin | 类型 / Scope | 权限 / Permissions |
| --- | --- | --- |
| Watch Together / 一起观看 | 服务器 / server；实例 / instance | `room.read`, `room.write` |

服务器插件按实际 TS 服务器和频道共享；实例插件在同一个网关的已连接用户间共享。各用户打开工作台的插件入口，即可一起加载、播放、暂停和跳转视频。音量与全屏仅影响自己；浏览器阻止自动播放时点击“允许播放”。使用浏览器支持的 HTTPS MP4/WebM 等视频直链，不是视频网站播放页面。

Install through the WebSpeak admin Plugin Store, review permissions, select a scope and explicitly enable. Server plugins share per-target/channel rooms; instance plugins span connected users of one WebSpeak gateway. Participants open Plugins in their workbench. Playback and seeking are shared; volume/fullscreen are local. Video loads directly from a compatible media URL. Native TS clients and separate WebSpeak gateways do not participate. Rooms are temporary and disappear when empty or after gateway restart.

## 维护目录 / Catalog contributions

`index.json` 的每项包含稳定 `id`、GitHub `repository`，以及可选的 `metadataPath`（默认 `plugin.json`）。插件仓库默认分支提供元数据，内含清单 `manifest` 与 `package: { ref, path, sha256 }`。包格式、大小、API 和权限以开发指南为准。推荐不可变提交或发布标签，必须计算真实 SHA-256；宿主会重读目录、校验清单和摘要，不会执行服务端插件代码。

The catalog records GitHub repositories, not arbitrary download URLs. Submit source, license, both day/night styles and a reproducible package. Never include secrets in public config, shared state, source or media URLs. A checksum establishes content consistency, not trust or a code-safety certification.

## 构建示例 / Build the example

Requires Node.js 22+; no npm install or WebSpeak source is needed.

```sh
node build.mjs
```

Sources: `examples/watch-together/`. Outputs: `packages/watch-together.wplugin` and `plugin.json`. Import the bundle into a development instance to test two independent participants, late joining, concurrent edits, disconnect and administrator disable. Version changes must update the manifest and the immutable package ref in `build.mjs` together.

Example and repository content: AGPL-3.0-only. Individual contributed plugin repositories declare their own licenses.
