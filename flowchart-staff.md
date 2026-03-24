flowchart TD
START([開始]) --> LOGIN["開啟登入頁"]
LOGIN --> INPUT["輸入登入名稱與密碼"]
INPUT --> AUTH{"登入是否成功？"}

    AUTH -->|否| ERROR["顯示錯誤訊息"]
    ERROR --> INPUT

    AUTH -->|是| SESSION["建立登入狀態"]
    SESSION --> DASHBOARD["進入儀表板"]
    DASHBOARD --> MODULE{"選擇功能模組"}

    MODULE --> POS["POS 銷售"]
    POS --> POS_STEP["選擇飲品 → 客製化 → 加入訂單 → 確認收款 → 完成交易"]
    POS_STEP --> CONTINUE{"是否繼續使用其他模組？"}

    MODULE --> KDS["廚房顯示系統"]
    KDS --> KDS_STEP["查看待處理訂單 → 開始製作 / 完成製作 / 取消訂單"]
    KDS_STEP --> CONTINUE

    MODULE --> CATALOG["產品總覽"]
    CATALOG --> CATALOG_STEP["切換檢視方式 → 查看產品或分類詳情 → 調整供應狀態 / 推薦狀態"]
    CATALOG_STEP --> CONTINUE

    MODULE --> PMGMT["產品管理"]
    PMGMT --> PMGMT_STEP["新增 / 編輯 / 刪除產品 → 儲存變更"]
    PMGMT_STEP --> CONTINUE

    MODULE --> ANALYTICS["銷售分析"]
    ANALYTICS --> ANALYTICS_STEP["查看 KPI 與圖表 → 匯出報表"]
    ANALYTICS_STEP --> CONTINUE

    MODULE --> INVENTORY["庫存管理"]
    INVENTORY --> INVENTORY_STEP["搜尋 / 篩選庫存 → 新增 / 編輯 / 刪除庫存項目"]
    INVENTORY_STEP --> CONTINUE

    MODULE --> ORDERS["訂單歷史"]
    ORDERS --> ORDERS_STEP["選擇訂單 → 查看訂單摘要 → 查看更多明細"]
    ORDERS_STEP --> CONTINUE

    MODULE --> STAFF["員工管理（店主可用）"]
    STAFF --> STAFF_STEP["篩選員工 → 新增員工 / 編輯資料 / 變更啟用狀態"]
    STAFF_STEP --> CONTINUE

    MODULE --> MEMBERS["會員名錄"]
    MEMBERS --> MEMBERS_STEP["搜尋會員 → 查看會員資料與消費紀錄"]
    MEMBERS_STEP --> CONTINUE

    CONTINUE -->|是| MODULE
    CONTINUE -->|否| LOGOUT["登出"]
    LOGOUT --> END(["結束"])
