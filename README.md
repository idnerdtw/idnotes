# idnotes

感染科讀書筆記與 Journal Club；院內網站以新分頁連到此站。

- 網址：https://idnerdtw.github.io/idnotes/
- **Reading Notes 讀書筆記**：臨床主題整理；保留現有筆記及網址。
- **Journal Club 期刊選讀**：已建立入口，內容待補；目前不放示範文章或虛構研究結果。

## 維護

先讀 [AGENTS.md](AGENTS.md)，各 agent 使用自己的 branch＋PR。

| 原始檔案 | 用途 |
| --- | --- |
| `index.html` | 總覽、搜尋、類型篩選 |
| `notes.json` | 唯一手動維護的文章 metadata／搜尋索引 |
| `notes/`、`notes-src/` | 讀書筆記 HTML 與既有 Markdown 原文 |
| `journal-club/index.html` | Journal Club 入口 |
| `journal-club/` | 未來的期刊選讀 HTML |
| `assets/site.css` | 與院內網站一致的青綠、深綠、藍色配色 |
| `search.js` | 搜尋與鍵盤自動完成邏輯 |

新增文章：建立 HTML，引用共用 CSS，再於 `notes.json` 加入一筆 `id`、`type`、`title`、`updated`、`takeaway`、`keywords`、`url`。`type` 使用 `reading-note` 或 `journal-club`；`updated` 使用實際更新日。Journal Club 頁面沿用 `../index.html` 返回總覽。

Journal Club 可依內容採用：Citation → Clinical question → PICO／Design → Results → Critical appraisal → Clinical implications → Discussion → References。待第一篇完成後，將入口的「內容待補」區塊改為文章連結。

```sh
python3 scripts/sync-site.py
python3 scripts/sync-site.py --check
```

腳本從 `notes.json` 產生 `notes-data.js`，支援本機 `file://` 閱讀，再同步根目錄靜態資產至 `docs/`。兩種 Pages 發布來源皆保留相同內容，不需改 GitHub 設定。`docs/` 全部為產物，不單獨編輯；移除文章時先修改原始頁面／索引再同步。

預覽：`python3 -m http.server 8000`，檢查根目錄與 `/docs/`；也可直接開啟 `index.html`。

配色來源：院內 R5.4.13 `assets/css/site.css`；主色 `#0f766e`、深綠 `#0b4f4b`、連結 `#1d4ed8`、背景 `#f4f7fa`。
