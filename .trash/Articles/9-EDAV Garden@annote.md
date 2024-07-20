---
title: "EDAV Garden"
alias: 
  - "EDAV Garden"
created-date: 2024-07-18T10:19:58+0800
type: Simpread
banner: "https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png "
banner_icon: 🔖
tag: 
idx: 9
---

# EDAV Garden

> [!example]- [🧷内部链接](<http://localhost:7026/unread/9>) [🌐外部链接](<https://edav-garden.netlify.app/>)    
> URI:: [🧷](<http://localhost:7026/unread/9>) [🌐](<https://edav-garden.netlify.app/>) 
> intURI:: [🧷内部链接](<http://localhost:7026/reading/9>)

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
>  **Description**:: 
%%

> [!md] Metadata  
> **标题**:: [EDAV Garden](https://edav-garden.netlify.app/)  
> **日期**:: [[2024-07-18]]  

## Annotations


> [!srhl2] [[SR9@EDAV Garden|📄]] <mark style="background-color: #ffeb3b">Highlights</mark> [🧷](<http://localhost:7026/unread/9#id=1721269808805>) [🌐](<http://localhost:7026/reading/9#id=1721269808805>)   
> EDAV Garden
> 
>   
>   
>   
> 
>   
>   
> 
>   
>   
>   
> sr-annote { all: unset; }
> 
> EDAV Garden
> ===========
> 
>   
>   
>   
> 
>   
> 
>   
> 
>   
>   
> "
> ^sran-1721269808805

> [!srhl2] [[SR9@EDAV Garden|📄]] <mark style="background-color: #ffeb3b">Highlights</mark> [🧷](<http://localhost:7026/unread/9#id=1721269198864>) [🌐](<http://localhost:7026/reading/9#id=1721269198864>)   
> DAV Ga
> ^sran-1721269198864

> [!srhl2] [[SR9@EDAV Garden|📄]] <mark style="background-color: #ffeb3b">Highlights</mark> [🧷](<http://localhost:7026/unread/9#id=1721269953537>) [🌐](<http://localhost:7026/reading/9#id=1721269953537>)   
> ualization is a fundamenta
> ^sran-1721269953537

