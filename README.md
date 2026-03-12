# n8n-nodes-wechat-article-exporter

这是一个 n8n 社区节点，用于集成微信公众号文章导出器 API。支持搜索公众号、获取文章列表、下载文章内容等功能。

## 致谢

本项目基于 [wechat-article/wechat-article-exporter](https://github.com/wechat-article/wechat-article-exporter) 提供的 API 开发，感谢原作者的开源贡献！

## 功能特性

- **公众号管理**
  - 根据关键字搜索公众号
  - 根据文章链接搜索公众号
  - 获取公众号主体信息
  - 获取公众号详细信息

- **文章管理**
  - 获取公众号历史文章列表
  - 下载文章内容（支持 HTML/Markdown/Text/JSON 格式）

## 安装

在 n8n 中安装社区节点：

```bash
npm install n8n-nodes-wechat-article-exporter
```

## 凭证配置

在使用节点之前，需要配置 API 凭证：

1. **API Key**: 从 [公众号文章导出平台](https://down.mptext.top/dashboard/api) 获取 API 密钥
2. **Base URL**: API 服务器地址，默认为 `https://down.mptext.top`

## 使用方法

### 1. 搜索公众号

根据关键字搜索公众号列表：

- 资源：公众号
- 操作：根据关键字搜索公众号
- 参数：关键字、起始索引、返回条数

### 2. 获取文章列表

获取公众号的历史文章：

- 资源：文章
- 操作：获取文章列表
- 参数：公众号ID (fakeid)、起始索引、返回条数

### 3. 下载文章内容

下载指定文章的内容：

- 资源：文章
- 操作：下载文章内容
- 参数：文章链接、输出格式（html/markdown/text/json）

## API 文档

详细 API 文档请参考：[公众号文章导出 API](https://down.mptext.top/dashboard/api)

## 许可证

[MIT](LICENSE.md)
