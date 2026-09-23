## 2026-09-23
**Update** English/Grammar/Resources/Irregular Verbs: rewrite flat list thành bảng nhóm theo mô hình biến hóa AAA/ABA/ABB/ABC (300 động từ, giữ nghĩa tiếng Việt + ví dụ)
**Update** Normalize English section: reclassify Grammar/IELTS/TOEIC concept docs as guide (Roadmap → plan), rewrite frontmatter descriptions (bỏ mấy dòng kiểu "1. Khái niệm"/"Promt"), strip numbered-heading artifacts và thêm H1 title, đổi [[wikilinks]] sang bundle-relative links, regenerate index.md; add .agents/skills/rewrite-docs skill
**Update** Rewrite entire Travel section in English and restructure: new Guides/, Trips/, Destinations/Vietnam + Destinations/International layout; split Tay Bac series into Northwest Vietnam/ subfolder (7 files); split Trung Quoc into China/China Visa/China Itineraries; merge Ha Giang community notes into Destinations/Vietnam/Ha Giang; extract Ha Long food guide from company trip into Destinations/Vietnam/Ha Long; dissolve Du Lich into Hanoi + South Korea; rename all files to English
**Update** Refactor Travel: domain metadata now names the actual topic (ha-giang, tay-bac, vung-tau, ...) instead of duplicating type; reclassify HA Giang/Hue/Tay Bac chapters as guide; strip leftover numbered-heading artifacts across the Tay Bac series and the two trip write-ups; move Resources/Du Lich sang Planning (nó là 1 itinerary, không phải resource); tách đoạn ghi chú Bảo Lộc lạc chỗ trong Vung Tau sang Sai Gon Da Lat Cung Duong
**Update** Replace Quartz static site generator (web/quartz) with a custom SolidJS build (web/); resolves links via scripts/okf-core directly
**Update** Technology/AI/Tools/GenAI/Content And Multimedia Tools: note briaai/RMBG-2.0 (background removal)
**Update** Technology/AI/Tools/Data/Knowledge And Data Management: note convaiinnovations/laya (multilingual classification/decision model)
**Update** Technology/Security/Tools/Security Tools: new "PII Detection & Data Privacy" section, note openai/privacy-filter
**Update** Refactor English/TOEIC docs: split English/Grammar into Concepts/Resources, move TOEIC content into English/TOEIC/Concepts, move English Roadmap từ Technology/AI/Practices về English/Resources
## 2026-09-22
**Creation** Technology/System-Design/Practices/Kafka DLQ Va Retry: chắt thread Golang Vietnam 10/04/2026 về DLQ, retry topic và replay
**Update** Technology/System-Design/Practices/Retry Va Circuit Breaker: trỏ sang Kafka DLQ và retry
**Update** Heavy Write Voucher 1M Req S: bổ sung Q&A từ toàn bộ comment bài 1M write/s
**Creation** Technology/AI/Write Ups/Tang Jie Advanced Machine Learning: bài tập môn của Tang Jie ở Thanh Hoa (2026) và các phán đoán buổi khai giảng
**Update** Technology/AI/Concepts/LLM-Generative-AI/Resources/LLM Learning Resources và Technology/AI/Write Ups/index: trỏ tới bài tập Advanced Machine Learning của Tang Jie
**Creation** Technology/Backend-Database/Practices/Heavy Write Voucher 1M Req S: writeup bài 1M write/s phát voucher (Khúc Ngọc Huy) và các comment kỹ thuật
**Update** Technology/Frontend/Tools/React/React Next: note React Bits (https://reactbits.dev/)
**Update** Technology/Tools-Utilities/Tools/Media Editors: note Stirling PDF (https://github.com/Stirling-Tools/stirling-pdf)
**Creation** Travel/Destinations/Domestic/Sai Gon Da Lat Cung Duong: các cung đường Sài Gòn - Đà Lạt chạy trong ngày
## 2026-09-08
**Creation** Travel/Destinations/International/Ladakh: add AMS altitude-sickness prevention notes from Leh airport health signage
## 2026-07-04
**Update** Replace custom preview web with Quartz static site generator (web/quartz); okf-index now emits percent-encoded bundle-root URLs
## 2026-06-28
**Update** inbox: added MediaCrawler, plane, ainovel-cli, FluidVoice, ai-berkshire, astryx
## 2026-06-19
**Update** Migrate vault to OKF v0.1 (type inference, recommended fields, bundle-relative links, generated index.md)