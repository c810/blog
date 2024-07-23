---
title: "本站搭建教程"
alias: 
  - "本站搭建教程"
created-date: 2024-07-20T20:09:09+0800
type: Simpread
banner: "https://blog.lhp.pub/static/og-image.png "
banner_icon: 🔖
tag: 
idx: 13
---

## 本站搭建教程

> [!example]- [🧷内部链接](<http://localhost:7026/unread/13>) [🌐外部链接](<https://blog.lhp.pub/Syntheses/Others/%E5%85%B3%E4%BA%8E%E7%BD%91%E7%AB%99/%E6%98%9F%E7%90%83%E6%90%AD%E5%BB%BA%E6%95%99%E7%A8%8B>)
> URI:: [🧷](<http://localhost:7026/unread/13>) [🌐](<https://blog.lhp.pub/Syntheses/Others/%E5%85%B3%E4%BA%8E%E7%BD%91%E7%AB%99/%E6%98%9F%E7%90%83%E6%90%AD%E5%BB%BA%E6%95%99%E7%A8%8B>)
> intURI:: [🧷内部链接](<http://localhost:7026/reading/13>)

%%

> [!example]+ **Comments**
>
> ```dataview
> TABLE 
>     WITHOUT ID
>     link(Source, dateformat(date(Source), "yyyy-MM-dd")) as Date___, 
>     regexreplace(rows.Comments,"^@@\[\[.+?\]\]\s","") as "Comments"
> FROM "journals"
> WHERE  contains(cmnt, this.file.name)
> FLATTEN cmnt as Comments
> WHERE contains(Comments, this.file.name)
> GROUP BY file.link as Source
> SORT rows.file.day desc
> ```
>  **Description**:: 星球使用 Quartz 搭建并托管到 Vercel。
%%

> [!md] Metadata
> **标题**:: [本站搭建教程](https://blog.lhp.pub/Syntheses/Others/%E5%85%B3%E4%BA%8E%E7%BD%91%E7%AB%99/%E6%98%9F%E7%90%83%E6%90%AD%E5%BB%BA%E6%95%99%E7%A8%8B)
> **日期**:: [[2024-07-20]]

### Annotations

> [!srhl2] [[SR13@本站搭建教程|📄]] <mark style="background-color: #ffeb3b">Highlights</mark> [🧷](<http://localhost:7026/unread/13#id=1721477349297>) [🌐](<http://localhost:7026/reading/13#id=1721477349297>)
> 本地拉取 quartz 代码并安装
> ^sran-1721477349297

> [!srhl2] [[SR13@本站搭建教程|📄]] <mark style="background-color: #ffeb3b">Highlights</mark> [🧷](<http://localhost:7026/unread/13#id=1721477403254>) [🌐](<http://localhost:7026/reading/13#id=1721477403254>)
> 拉取到的文件夹名为
> ^sran-1721477403254
