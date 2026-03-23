flowchart TD
LOGIN["Login Page"]

    CUSTOMER["Customer Landing Page"]
    MENU["Customer Menu Page"]
    CHECKOUT["Customer Checkout Page"]
    SUCCESS["Customer Checkout Success Page"]

    DASH["Dashboard Page"]
    POS["POS Page"]
    EMP["Employee Page"]
    EMPNEW["Employee Create Page"]
    ORDERHISTORY["Order History Page"]
    ORDERDETAIL["Order Detail Page"]
    INVENTORY["Inventory Page"]
    CATALOG["Product Catalog"]
    PMGMT["Product Management"]
    KDS["Kitchen Display Page"]
    ANALYTICS["Analytics Page"]
    MEMBERSHIP["Membership Page"]

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
