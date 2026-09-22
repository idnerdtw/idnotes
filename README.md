# idnotes

感染科讀書筆記與 Journal Club；院內網站以新分頁連到此站。

- 網址：https://idnerdtw.github.io/idnotes/
- **Reading Notes 讀書筆記**：臨床主題整理；保留現有筆記及網址。
- **Journal Club 期刊選讀**：已建立入口，內容待補；目前不放示範文章或虛構研究結果。

## 維護

先讀 [AGENTS.md](AGENTS.md)，各 agent 使用自己的 branch＋PR。

| 原始檔案 | 用途 |
| --- | --- |
| `index.html` | 總覽、搜尋、類型／主題篩選 |
| `notes.json` | 唯一手動維護的文章 metadata／搜尋索引 |
| `notes/`、`notes-src/` | 讀書筆記 HTML 與既有 Markdown 原文 |
| `journal-club/index.html` | Journal Club 入口 |
| `journal-club/` | 未來的期刊選讀 HTML |
| `assets/site.css` | 與院內網站一致的青綠、深綠、藍色配色 |
| `search.js` | 搜尋、主題標籤、最新排序、載入更多與鍵盤自動完成 |

新增文章：建立 HTML，引用共用 CSS，再於 `notes.json` 加入一筆 `id`、`type`、`title`、`updated`、`takeaway`、`tags`、`keywords`、`url`。`type` 使用 `reading-note` 或 `journal-club`；`updated` 使用文章實際更新日（`YYYY-MM-DD`），只調整導覽 metadata 時不改日期。Journal Club 頁面沿用 `../index.html` 返回總覽。

## 標籤與搜尋規範

- `tags`：每篇 3–5 個主題，供首頁與文章卡片顯示；優先沿用既有名稱。現有詞彙：移植、流感、抗病毒治療、PJP、類固醇、重症。可按實際內容擴充，避免過度籠統或為單一文章建立太多細分類。
- `keywords`：完整搜尋詞，保留中英文、縮寫、藥名、作者及試驗名稱。例如 PJP 筆記的 PCP、Pneumocystis、PIC、Lemiale 都保留可搜尋，不另拆成可見標籤。腳本會檢查標籤數量、重複與大小寫／全半形不一致；醫學同義詞仍須人工統一。
- 搜尋範圍是標題、摘要、tags、keywords，**不是正文全文**。大小寫與全半形不敏感；空白分隔的多個詞須全部符合。
- 首頁順序：搜尋 → 內容類型 → 可收合主題標籤 → 條件／篇數 → 精簡文章卡片。保持青綠／深綠／藍色配色。
- 一次選一個主題，再點一次取消；主題、搜尋、內容類型取交集。已選主題保持可見，可單獨移除，或用「清除所有條件」重設搜尋、類型、主題。
- 標籤括號數字為符合目前文字搜尋與內容類型的文章數（尚未套用主題篩選）；按篇數由多至少、同篇數按名稱排序。字級一致，數量不代表臨床重要性。先顯示 16 個標籤，其餘可展開；已選主題即使不在前 16 個或變成 0 篇仍顯示。
- 文章預設按 `updated` 由新到舊，同日期按標題排序。每次顯示 20 篇，「載入更多」增加 20 篇；改變搜尋或篩選後重回前 20 篇。自動完成最多 8 筆，沿用上下鍵、Enter、Escape。

Journal Club 可依內容採用：Citation → Clinical question → PICO／Design → Results → Critical appraisal → Clinical implications → Discussion → References。待第一篇完成後，將入口的「內容待補」區塊改為文章連結。

```sh
python3 scripts/sync-site.py
python3 scripts/sync-site.py --check
```

腳本從 `notes.json` 產生 `notes-data.js`，支援本機 `file://` 閱讀，再同步根目錄靜態資產至 `docs/`。兩種 Pages 發布來源皆保留相同內容，不需改 GitHub 設定。`docs/` 全部為產物，不單獨編輯；移除文章時先修改原始頁面／索引再同步。

預覽：`python3 -m http.server 8000`，檢查根目錄與 `/docs/`；也可直接開啟 `index.html`。

導覽回歸檢查（需要 Node.js、Playwright 與 Chromium；若未安裝，可先 `npm install --no-save --package-lock=false playwright` 及 `npx playwright install chromium`）：

```sh
node scripts/test-navigation.cjs
```

測試自行啟動本機暫時 HTTP server，涵蓋根目錄、`docs/`、本機檔案、搜尋／篩選交集、鍵盤、窄螢幕與大量資料的載入／標籤展開。大量資料只注入測試瀏覽器，不寫入正式索引。提交前執行同步檢查並確認文章連結可開啟。
若使用自行安裝的 Chromium，可用環境變數 `CHROMIUM_PATH` 指定執行檔。測試截圖存於系統暫存目錄，不提交至 repo。

配色來源：院內 R5.4.13 `assets/css/site.css`；主色 `#0f766e`、深綠 `#0b4f4b`、連結 `#1d4ed8`、背景 `#f4f7fa`。
