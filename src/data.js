export const data = {
  business: {
    name: "Anika Water",
    totalCustomers: 85,
    securityDeposit: "0.0",
    wallet: "1719.0",
    deliveriesToday: "7 Days Upcoming Events",
    paymentsToday: "7 Days Upcoming Events",
    productReceived: "0.0",
    unbalanceJar: [
      { name: "Carrot", meta: "Balance Due 3000kg Bag Rs 15" },
      { name: "Carrot", meta: "Balance Due 3000kg Bag Rs 15" }
    ],
    productDeliveries: [
      { name: "Pepsi", meta: "Expected Qty: 24" }
    ],
    invoiceSummary: [
      { name: "Invoice Amount", meta: "₹16785.54" },
      { name: "Due Amount", meta: "₹60.38" }
    ],
    profitLoss: [
      { name: "Profit", meta: "₹0.0" },
      { name: "Loss", meta: "₹0.0" }
    ]
  },
  heroSlides: [
    {
      title: "Subscription Expired!",
      message: "Your Subscription has been expired. Please click on Buy Now to continue your services.",
      cta: "Get Membership",
      actions: [
        { label: "Create Delivery", target: "deliveries", icon: "delivery" },
        { label: "Create Customer", target: "customers", icon: "customer" },
        { label: "Create Payment", target: "payments", icon: "payment" },
        { label: "Create Expense", target: "expenses", icon: "expense" }
      ]
    },
    {
      title: "Grow Faster",
      message: "Add inventory, products and groups to run your water agency like a full official ERP.",
      cta: "Open Inventory",
      actions: [
        { label: "Create Expense", target: "expenses", icon: "expense" },
        { label: "Create Inventory", target: "inventory", icon: "inventory" },
        { label: "Create Product", target: "products", icon: "product" },
        { label: "Create Group", target: "groups", icon: "group" }
      ]
    }
  ],
  dashboardModules: [
    { id: "products", label: "Products", icon: "product" },
    { id: "groups", label: "Groups", icon: "group" },
    { id: "customers", label: "Customers", icon: "customer" }
  ],
  products: [
    { name: "Carret", brand: "Anika Water", capacity: "6000 L", price: "300.0/-", balanceJar: 1, customerCount: 1, stockBalance: 0 },
    { name: "Evervess Soda 750ml Pet Rs 20", brand: "Anika Water", capacity: "750 ML", price: "15.41/-", balanceJar: 0, customerCount: 0, stockBalance: 0 },
    { name: "Pepsi Cola 400ml Pet Rs 20", brand: "Anika Water", capacity: "500 ML", price: "18.0/-", balanceJar: 0, customerCount: 0, stockBalance: 0 },
    { name: "Cb Milk Chocolate Pet Rs 30", brand: "Anika Water", capacity: "250 ML", price: "26.66/-", balanceJar: 0, customerCount: 0, stockBalance: 0 },
    { name: "Cb Milk Maxum Pet Rs 30", brand: "Anika Water", capacity: "250 ML", price: "26.67/-", balanceJar: 0, customerCount: 0, stockBalance: 0 }
  ],
  groups: [
    { name: "Chandua", createdBy: "Anish Patra", customers: 0, balanceJar: 0, pastDue: 0, currentDue: 0, advance: 0 },
    { name: "Darogadihi", createdBy: "Anish Patra", customers: 0, balanceJar: 0, pastDue: 0, currentDue: 0, advance: 0 },
    { name: "Default Group", createdBy: "Anish Patra", customers: 1, balanceJar: 0, pastDue: 0, currentDue: 0, advance: 0 },
    { name: "Deuli", createdBy: "Anish Patra", customers: 0, balanceJar: 0, pastDue: 0, currentDue: 0, advance: 0 }
  ],
  customers: [
    { name: "Sibu Battle Shop", phone: "Default Group", area: "", balanceJar: 0, pastDue: "₹ 0.0", currentDue: "₹ 0.0", advance: "₹ 0.0" },
    { name: "Mohalaxmi Bhandar", phone: "9437139708", area: "Lakmiposi", balanceJar: 0, pastDue: "₹ 0.0", currentDue: "₹ 0.0", advance: "₹ 0.0" },
    { name: "Sahu Store", phone: "8249164213", area: "Laxmiposi", balanceJar: 0, pastDue: "₹ 0.0", currentDue: "₹ 0.46", advance: "₹ 0.5" },
    { name: "Om Sai Tae Stal", phone: "8093435233", area: "Murgabadi", balanceJar: 0, pastDue: "₹ 0.0", currentDue: "₹ -0.12", advance: "₹ -0.1" },
    { name: "Asish Pall", phone: "7978990314", area: "Takatpur", balanceJar: 25, pastDue: "₹ 0.0", currentDue: "₹ 59.88", advance: "₹ 59.9" }
  ],
  payments: {
    customer: [
      { name: "Sahu Store", receivedBy: "Rahul Hansda", amount: "5777.0" },
      { name: "Mohalaxmi Bhandar", receivedBy: "Rahul Hansda", amount: "1350.0" },
      { name: "Radha Rani Behera", receivedBy: "Rahul Hansda", amount: "3990.0" },
      { name: "Banti Store", receivedBy: "Rahul Hansda", amount: "1080.0" }
    ],
    employee: []
  },
  invoices: [
    { name: "Om Sai Tae Stal", phone: "8093435233", ref: "1112", invoiceAmount: "₹1718.88/-", payableAmount: "₹-0.12/-" },
    { name: "Asish Pall", phone: "7978990314", ref: "1113", invoiceAmount: "₹1964.88/-", payableAmount: "₹59.88/-" },
    { name: "Tukuna Bhai", phone: "9776365536", ref: "1114", invoiceAmount: "₹905.04/-", payableAmount: "₹0.04/-" }
  ],
  expenses: [
    { category: "Transport", employee: "Rahul Hansda", amount: "350.0" },
    { category: "Maintenance", employee: "Amit Lenka", amount: "180.0" }
  ],
  employees: [
    { name: "Amit Lenka Pepsi Marketing", area: "Takatpur", role: "Distributor", wallet: "0.0 /-", balanceJars: 0 },
    { name: "Rahul Hansda", area: "", role: "Distributor", wallet: "15007.0 /-", balanceJars: 0 }
  ],
  membership: {
    notes: [
      "This plan purchase payment is non-refundable.",
      "You can upgrade or downgrade membership plans anytime.",
      "The renewed plan will come into effect once the current plan has expired.",
      "You can not make deliveries in duration you don't have any active plan."
    ],
    plans: {
      monthly: [
        { name: "Basic", limit: "Up to 50 Customers", original: "₹63.0", price: "₹59.0", perCustomer: "₹1.18 / Customer" },
        { name: "Plus", limit: "Up to 100 Customers", original: "₹126.0", price: "₹119.0", perCustomer: "₹1.19 / Customer" },
        { name: "Bronze", limit: "Up to 200 Customers", original: "₹252.0", price: "₹239.0", perCustomer: "₹1.20 / Customer" },
        { name: "Silver", limit: "Up to 300 Customers", original: "₹378.0", price: "₹359.0", perCustomer: "₹1.20 / Customer" },
        { name: "Gold", limit: "Up to 500 Customers", original: "₹630.0", price: "₹599.0", perCustomer: "₹1.20 / Customer" },
        { name: "Platinum", limit: "Up to 1000 Customers", original: "₹1260.0", price: "₹1199.0", perCustomer: "₹1.20 / Customer" }
      ],
      yearly: [
        { name: "Basic", limit: "Up to 50 Customers", original: "₹630.0", price: "₹599.0", perCustomer: "₹1.00 / Customer" },
        { name: "Plus", limit: "Up to 100 Customers", original: "₹1260.0", price: "₹1199.0", perCustomer: "₹1.00 / Customer" },
        { name: "Bronze", limit: "Up to 200 Customers", original: "₹2520.0", price: "₹2399.0", perCustomer: "₹1.00 / Customer" },
        { name: "Silver", limit: "Up to 300 Customers", original: "₹3780.0", price: "₹3599.0", perCustomer: "₹1.00 / Customer" },
        { name: "Gold", limit: "Up to 500 Customers", original: "₹6300.0", price: "₹5999.0", perCustomer: "₹1.00 / Customer" },
        { name: "Platinum", limit: "Up to 1000 Customers", original: "₹13310.0", price: "₹12100.0", perCustomer: "₹1.01 / Customer" }
      ]
    }
  },
  agency: {
    owner: "Anish Patra",
    agencyProfile: [
      { title: "Agency Profile", subtitle: "Agency Profile Details", icon: "building" },
      { title: "Bank Details", subtitle: "Bank Basic Details", icon: "card" },
      { title: "UPI Details", subtitle: "UPI Basic Details", icon: "qr" },
      { title: "Agency Additional Detail", subtitle: "Add agency additional details", icon: "sheet" },
      { title: "Agency Settings", subtitle: "Manage agency settings", icon: "settings" },
      { title: "Agency Location", subtitle: "Update agency location", icon: "map" }
    ],
    userProfile: [
      { title: "User Profile", subtitle: "Update user basic details", icon: "user" },
      { title: "Change password", subtitle: "Change your password to continue using", icon: "card" },
      { title: "Wallet Amount", subtitle: "₹ 1719.0", icon: "wallet" }
    ]
  },
  reports: {
    reports: [
      { title: "Customer Invoice", items: ["Invoice Reports"] },
      { title: "Daily Reports", items: ["Product Delivery Report", "Daily Expense Details Report", "Payment Collection Report", "Expected Product Delivery Report"] },
      { title: "Monthly Reports", items: ["Customer Delivery Report", "Monthly Expense Report", "Sales Report", "Payment Collection Report", "Event Payment Collection Report"] },
      { title: "Other Report", items: ["Customers Details Report", "Employee Payment Report", "Customer Payment Collection", "Product Stocks Report"] }
    ],
    bulk: [
      { title: "Bulk Reports", items: ["Customer Remaining Payment Report", "Employee Delivery With Product & Payment Collection Report(CustomerWise)", "Online Order Booking And Delivery Report", "Event Report"] }
    ],
    sample: [
      { title: "Customer Invoice", items: ["Summary Report", "Summary Report With Product", "Invoice Summary V3", "Detail Report"] },
      { title: "Daily Reports", items: ["Product Delivery Report", "Payment Collection Report"] }
    ]
  }
};
