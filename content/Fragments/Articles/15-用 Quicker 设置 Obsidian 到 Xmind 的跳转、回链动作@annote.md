---
title: "用 Quicker 设置 Obsidian 到 Xmind 的跳转、回链动作"
alias: 
  - "用 Quicker 设置 Obsidian 到 Xmind 的跳转、回链动作"
created-date: 2024-08-06T12:18:13+0800
type: Simpread
banner: "https://cdnfile.sspai.com/2024/05/16/9887827938cc6b428a9fbeb135eda656.png "
banner_icon: 🔖
tag: 
idx: 15
---

# 用 Quicker 设置 Obsidian 到 Xmind 的跳转、回链动作

> [!example]- [🧷内部链接](<http://localhost:7026/unread/15>) [🌐外部链接](<https://sspai.com/post/87815>)    
> URI:: [🧷](<http://localhost:7026/unread/15>) [🌐](<https://sspai.com/post/87815>) 
> intURI:: [🧷内部链接](<http://localhost:7026/reading/15>)

%%
> [!example]+ **Comments**  
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
>  **Description**:: 用 Quicker 可以帮助我们完成一些繁琐的、需要多个操作步骤的动作。
%%

> [!md] Metadata  
> **标题**:: [用 Quicker 设置 Obsidian 到 Xmind 的跳转、回链动作](https://sspai.com/post/87815)  
> **日期**:: [[2024-08-06]]  

## Annotations


> [!srhl2] [[SR15@用 Quicker 设置 Obsidian 到 Xmind 的跳转、回链动作|📄]] <mark style="background-color: #ffeb3b">Highlights</mark> [🧷](<http://localhost:7026/unread/15#id=1722917893790>) [🌐](<http://localhost:7026/reading/15#id=1722917893790>)   
> 将的 Xmind 导出的思
> ^sran-1722917893790

