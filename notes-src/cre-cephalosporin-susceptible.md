# CRE 的 cephalosporin susceptible：機轉、報告與選藥

初版日期：2026-09-30
更新日期：2026-10-01

來源：UpToDate Topic 471；CLSI M100；EUCAST breakpoint tables；IDSA AMR Guidance 2026。

**Carbapenem-resistant Enterobacterales（CRE）確實可能對 ceftriaxone、ceftazidime、cefepime 測得 susceptible；但侵襲性感染仍不建議使用傳統 beta-lactam，應做 carbapenemase 分型，走機轉導向選藥。**

## 一、UpToDate 立場

Topic：*Carbapenem-resistant E. coli, K. pneumoniae, and other Enterobacterales (CRE)*（Topic 471, Version 86.0；last updated Aug 25, 2026；literature review through Aug 2026）。

- 「Most CRE isolates are reported as nonsusceptible to traditional beta-lactams (eg, piperacillin-tazobactam, ceftriaxone, cefepime). Even if a CRE isolate is reported as susceptible to a traditional beta-lactam, the agent should generally not be used.」
- 例外：metallo-β-lactamase（MBL）-producing isolate 若 aztreonam 確實測得 susceptible，可考慮（罕見；MBL 本身不水解 aztreonam，但實際菌株多共帶 ESBL／AmpC）。
- Ertapenem 抗藥、meropenem／imipenem 敏感的 CRE：多數不帶 carbapenemase，可用 standard-spectrum 抗生素或 extended-infusion carbapenem；一旦 carbapenemase 陽性，即使 meropenem-S 也視為對所有 carbapenems 抗藥。
- OXA-48-like：首選 ceftazidime-avibactam（Grade 2C），cefiderocol 為替代。

## 二、為什麼會測得 susceptible

| Carbapenemase | Ambler class | 對 expanded-spectrum cephalosporins | Aztreonam | 臨床意義 |
|---|---|---|---|---|
| KPC | A（serine） | 有效水解，幾乎皆 R | 水解 | 仍可測得 cefepime 低 MIC（見下） |
| NDM／VIM／IMP | B（metallo） | 有效水解 | MBL 本身不水解 | 實際菌株多共帶 ESBL／AmpC → aztreonam 仍多為 R |
| 典型 OXA-48、OXA-181、OXA-232 | D（serine） | 水解極弱，依受質可為低度或測不到 | 不水解 | 未合併 ESBL／AmpC 時可為 cephalosporin-S；avibactam 可抑制 |
| OXA-163、OXA-405 | D（反向例外） | 水解較強 | — | carbapenemase 活性弱；不可與典型 OXA-48 等同 |

- Porin loss（±efflux 上調）本身不水解藥物，但降低藥物進入，可使 cephalosporin MIC 右移。Cephalosporin 的 S/R 由 β-lactamase 種類與表現量、外膜通透性共同決定。
- Non-carbapenemase-producing CRE 最常見為 porin 缺損合併 ESBL／AmpC 高量表現；ertapenem 是最敏感的篩檢哨兵。
- KPC 合併 cefepime 低 MIC 是真實表型：Fissel et al.（*J Clin Microbiol* 2020）單中心 209 株 KPC-producing CRE（BD Phoenix），19 株 S（9.1%）、40 株 susceptible-dose dependent（SDD，19.1%）。限制：非 reference broth microdilution 全數確認，非全球比例。

## 三、CLSI 報告規則

- M100 Table 2A-1：「Cefepime S/SDD results should be suppressed or edited and reported as resistant for isolates that demonstrate carbapenemase production.」
- Appendix G Table G3：「Suppress the cefepime result, or report cefepime as resistant.」配套說明指出證據主要來自 KPC 的動物模型。
- 適用範圍：僅 cefepime、僅已確認產 carbapenemase 者；不外推至 ceftriaxone／ceftazidime；carbapenems 本身不改判。規則能否觸發，取決於實驗室是否常規做 carbapenemase 檢測。
- OXA-48-like 若 meropenem-vaborbactam 測得 S → 亦抑制或改報 R（vaborbactam 對 class D 無抑制活性）。
- 演變：2021 年 M100 只要求重測；2024 年改為直接改報；背後是 2023 年動物模型數據（carbapenemase producer 即使 cefepime MIC ≤2 µg/mL 也達不到 1-log 殺菌）。CLSI 官方 2025 年 4 月部落格重申現行規則。

## 四、CLSI vs EUCAST：為什麼立場不同

- EUCAST 維持 report as tested：MIC 是測量值，已整合該菌株所有機轉的實際表現；驗到 carbapenemase gene 不等於有表現。在沒有夠強的人體臨床證據前，實驗室不該改動測量結果，最多加註警語（2025 年 7 月公開諮詢：對產 carbapenemase 菌株的 carbapenems S/I 加警語，而非改判）。
- CLSI 採家長式做法：以機轉推論改報告，背景是美國 KPC 盛行、擔心臨床醫師看到 S 就直接使用。
- 規則證據確實薄弱：動物模型為主、KPC 為主、無人體隨機試驗；外推到 OXA-48（證據最弱、但規則影響最大的族群）最有爭議。
- 兩個結構性差異：(1) EUCAST cefepime breakpoint 較嚴（Enterobacterales S ≤1 mg/L；CLSI S ≤2），「CPE 測得 cefepime-S」的情境自然較少；(2) 流行病學不同：美國 KPC 主導，歐洲 KPC／OXA-48／NDM 混合流行（ECDC 2019：KPC 38.3%、OXA-48 28.9%、NDM 15.3%），一刀切改掉 OXA-48 的 cefepime-S 臨床代價更大。
- 治療端的共識其實一致：UpToDate 與 IDSA 2026 均不建議侵襲性 CRE 使用傳統 beta-lactam，只是把決定留給臨床醫師與 antimicrobial stewardship（AMS），而非印在報告上。

## 五、依 carbapenemase 分型選藥

| 機轉 | 建議 |
|---|---|
| KPC | ceftazidime-avibactam、meropenem-vaborbactam、imipenem-relebactam（均須驗 susceptibility） |
| OXA-48-like | ceftazidime-avibactam（UpToDate Grade 2C）；cefiderocol 替代 |
| MBL（NDM 為主） | aztreonam-avibactam 或 cefiderocol（IDSA 2026：兩者皆可，略偏好前者） |
| Non-CP-CRE（ertapenem-R、meropenem／imipenem-S、carbapenemase 陰性） | extended-infusion meropenem 或 imipenem（限兩者 MIC 皆 ≤1；僅其一保留時須非重症＋source control 良好；IDSA 2026 Q3.3） |

台灣現況：
- Aztreonam-avibactam 已在台灣上市；單方 aztreonam 無供應 → ceftazidime-avibactam + aztreonam 組合在台灣不可行。
- Cefiderocol 台灣 2024 年 2 月核准、5 月上市，健保 2026 年 8 月起給付。
- 台灣 carbapenemase-producing CRE 以 KPC／NDM 為主（P-1367：KPC 38.6%、NDM 34.7%、IMP 7.6%、OXA-48-like 6%），MBL 佔比上升中。

## 六、實驗室實務

- Carbapenemase 分型流程：mCIM／eCIM 初篩（mCIM 陽性／eCIM 陰性 → serine class A／D；mCIM 陽性／eCIM 陽性 → MBL）→ lateral flow（CARBA-5）或 PCR 區分 KPC 與 OXA-48-like（兩者用藥完全不同，mCIM／eCIM 無法區分）。
- 哨兵表型：「carbapenem-NS ＋ 3rd-gen cephalosporin-S 的 Enterobacterales」應設 flag——OXA-48-like 哨兵、感染管制事件、最易誤用藥，三重意義。
- 報告加註並觸發 ID／AMS 會診，避免臨床誤用印出的 ceftriaxone／ceftazidime-S。
- 感染管制：確診 carbapenemase-producing organism 啟動接觸防護與追蹤。

## 七、台灣實務建議（無 routine genotype 時）

- 最關鍵的分型是 MBL vs serine carbapenemase：決定 ceftazidime-avibactam 能不能用。沒有 molecular 也沒關係——CARBA-5 lateral flow 約 15 分鐘就有答案；eCIM 則要隔天（試管孵育 4 小時＋平板 18–24 小時）。推實驗室做快速分型，是 CP 最高的投資。
- Meropenem-R 的 CRE：台灣 CP-CRE 中 MBL 基因佔 54.5% 且上升中（P-1367）。沒有分型前不要單用 CAZ-AVI。重症直接上 cefiderocol（健保 2026/8/1 起給付，需感染科會診，療程原則不超過 14 天）或 aztreonam-avibactam——這兩個 MBL 都 cover。Aztreonam-avibactam 台灣已上市，院內品項跟藥劑部確認；FDA 核准適應症為 cIAI，用於重症 CRE 屬適應症外推。
- Ertapenem-R、meropenem/imipenem MIC ≤1：多半是 non-CP（porin loss + ESBL/AmpC；這類 phenotype 帶 carbapenemase 基因的不到 3%）。照 IDSA 2026 用 extended-infusion meropenem/imipenem——這是 phenotype 唯一可以直接拿來用藥的 pattern。
- Cefepime：bacteremia 或重症不用；只有 UTI 這類輕症、source control 好、又沒更好選擇時才考慮。CLSI 改報規則（cefepime S/SDD 抑制或改報 R）只限 confirmed CPE，證據主要來自 KPC 動物模型。沒有分型時，報告怎麼印就怎麼判，但臨床解讀要打折。

## 參考

UpToDate. Carbapenem-resistant E. coli, K. pneumoniae, and other Enterobacterales (CRE). Topic 471, Version 86.0. Topic last updated Aug 25, 2026. https://www.uptodate.com/contents/carbapenem-resistant-e-coli-k-pneumoniae-and-other-enterobacterales-cre

Tamma PD, et al. Infectious Diseases Society of America 2026 guidance on the treatment of antimicrobial-resistant gram-negative infections. https://www.idsociety.org/practice-guideline/amr-guidance/（2026 年 7 月 30 日發布，current as of March 1, 2026）

CLSI. Performance Standards for Antimicrobial Susceptibility Testing. 34th ed. CLSI supplement M100. 2024.（Table 2A-1；Appendix G Table G3）

CLSI. Cefepime reporting strategies for carbapenemase-producing isolates of Enterobacterales. CLSI AST News Update, Vol 10, Issue 1, April 2025. https://clsi.org/resources/insights-blog/cefepime-reporting-strategies-for-carbapenemase-producing-isolates-of-enterobacterales/

EUCAST. Public consultation: proposed addition of a comment for carbapenemase-producing Enterobacterales. July 2025. https://www.eucast.org/fileadmin/src/media/PDFs/EUCAST_files/Consultation/2025/Consultation_carbapenemase_comment_20250729.pdf

Poirel L, Potron A, Nordmann P. OXA-48-like carbapenemases: the phantom menace. *J Antimicrob Chemother.* 2012.

Poirel L, et al. OXA-163, an OXA-48-related class D β-lactamase with extended activity toward expanded-spectrum cephalosporins. *Antimicrob Agents Chemother.* 2011.

Fissel JA, et al. Reporting considerations for cefepime-susceptible and -susceptible-dose dependent results for carbapenemase-producing Enterobacterales. *J Clin Microbiol.* 2020;58:e01271-20.

Fouad A, et al. Cefepime in vivo activity against carbapenem-resistant Enterobacterales that test as cefepime susceptible or susceptible-dose dependent in vitro. *J Antimicrob Chemother.* 2023;78:2242–2253.

Simner PJ, et al. The shift from "MIC-Only" back to carbapenemase testing among carbapenem-resistant Enterobacterales. *J Clin Microbiol.* 2025. https://journals.asm.org/doi/10.1128/jcm.00451-25

Harris PNA, et al. Effect of piperacillin-tazobactam vs meropenem on 30-day mortality (MERINO trial). *JAMA.* 2018.
