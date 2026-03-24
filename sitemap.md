flowchart TD
    LOGIN["登入頁面"]

    CUSTOMER["客人主頁"]
    MENU["菜單頁"]
    CHECKOUT["結帳頁面"]
    SUCCESS["結帳成功頁"]

    DASH["儀表板"]
    POS["POS銷售"]
    EMP["員工管理"]
    EMPNEW["創建員工帳號"]
    ORDERHISTORY["訂單歴史"]
    ORDERDETAIL["訂單詳細"]
    INVENTORY["庫存管理"]
    CATALOG["產品總覽"]
    PMGMT["產品管理"]
    KDS["廚房顯示系統"]
    ANALYTICS["銷售分析"]
    MEMBERSHIP["會員名錄"]

    CUSTOMER --> MENU
    MENU --> CHECKOUT
    CHECKOUT --> SUCCESS
LOGIN --> DASH
    DASH --> POS
    DASH --> EMP
    EMP --> EMPNEW
    DASH --> ORDERHISTORY
    ORDERHISTORY --> ORDERDETAIL
    DASH --> INVENTORY
    DASH --> CATALOG
    DASH --> PMGMT
    DASH --> KDS
    DASH --> ANALYTICS
    DASH --> MEMBERSHIP