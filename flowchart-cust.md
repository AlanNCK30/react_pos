flowchart TD
A["Landing Page"] -->|Open Menu| B["Menu Page"]

    B -->|Search or Filter| B
    B -->|Select Item| C["Drink Customizer"]
    C -->|Add to Cart| D["Cart"]
    C -->|Close| B

    B -->|View Cart| D
    D -->|Update Items| D
    D -->|Proceed to Checkout| E["Checkout Page"]

    E -->|Confirm Payment| F["Order Success Page"]
