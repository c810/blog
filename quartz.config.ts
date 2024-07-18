import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Blog 2.0",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "zh-CN",
    baseUrl: "blog.lhp.pub",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "published",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          // light: "#faf8f8",
          // lightgray: "#e5e5e5",
          // gray: "#b8b8b8",
          // darkgray: "#4e4e4e",
          // dark: "#2b2b2b",
          // secondary: "#284b63",
          // tertiary: "#84a59d",
          // highlight: "rgba(143, 159, 169, 0.15)",
          // textHighlight: "#fff23688",
          
          // light: "#faf8f8",
          // lightgray: "#e5e5e5",
          // gray: "#b8b8b8",
          // darkgray: "#4e4e4e",
          // dark: "#2b2b2b",
          // secondary: "#8a5cf5",
          // tertiary: "#8a5cf599",
          // highlight: "8a5cf526",
          // textHighlight: "#fff23688",
          
          // light: "#faf8f8",
          // lightgray: "#e5e5e5",
          // gray: "#b8b8b8",
          // darkgray: "#4e4e4e",
          // dark: "#2b2b2b",
          // secondary: "#0050db",
          // tertiary: "#0050db99",
          // highlight: "0050db26",
          // textHighlight: "#fff23688",
          
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#000000",
          tertiary: "#8a5cf5",
          highlight: "8a5cf5",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
