# AI Finance Platform

## FinSight Ai

## 1. Setting up clerk for SignIn and SignUp
## 2. Buiilding Header component

## 3. Adding Backend to the system

- Added supabase for backend database: configure the new project and pasted the ORMs Prisma database .env.local to the .env file of the app

- Add Arcjet for security bot detection, rate limiting, email validation, attack protection, data redaction.
-- Get the api and paste in Env file

- Add Injest to the app for budget alerts, recalculating the recurring method, financial report using ai

-- run this command: npx inngest-cli@latest dev
 

 ## 4. Building Hero section
 - has used gradient in the title text
 - added scroll animation to the banner image

 ```js
//image div
  <div ref={imageRef} className="hero-image">

  //js code
    const imageRef = useRef();
  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

 ```


 ## Database Design

 -Install prisma : npm i -D prisma --legacy-peer-deps
 - npx prisma init

Pushing all changes to the database -- npx prisma migrate dev --name create-models

it will connect ot supabase and update databse with all the models that we have created

now create aprisma.js file in lib folder

and also install npm i @prisma/client --legacy-peer-deps

## creating server actions




<!-- Making the transaction page in which fulll transaction history is shown -->

1. getting data from getAccountWithTransactions from @actions/account.

2. given a check for if the data is recieved or not

3. now build the ui first for displaying the account name, balance, account type, 

4. installing npm i date-fns --legacy-peer-deps



---

# 📖 Transactions Page Documentation

*(Part of AI Finance Platform Project)*

---

## 1. Purpose of the Page

The **Transactions Page** is designed to display and manage all financial transactions associated with a specific account. It allows the user to:

* View account details (name, type, balance, number of transactions).
* Inspect a list of transactions with sorting and selection capabilities.
* Differentiate between **income** and **expenses** visually.
* Identify **recurring vs one-time** transactions.
* Perform basic actions like **Edit** and **Delete** on transactions.

This page is a critical part of the finance platform since it consolidates all transaction-related data for easy analysis and management.

---

## 2. Files & Components Involved

### 📂 `app/account/[id]/page.jsx`

* **Type**: Server Component (async).
* **Responsibilities**:

  * Fetches account and transaction data using `getAccountWithTransactions()`.
  * Handles 404 errors using Next.js `notFound()` if account doesn’t exist.
  * Renders the account details (name, type, balance, transaction count).
  * Wraps the **TransactionTable** in a `<Suspense>` boundary for smooth loading experience with a `BarLoader`.

### 📂 `app/account/[id]/_components/transaction-table.jsx`

* **Type**: Client Component.
* **Responsibilities**:

  * Displays transactions in a feature-rich table.
  * Provides **sorting**, **multi-select checkboxes**, and **bulk selection**.
  * Shows transaction **date, description, category, amount, recurring status**.
  * Uses `Tooltip`, `Badge`, and color-coded UI for clarity.
  * Includes an **action menu** (Edit/Delete).

---

## 3. Key Features Implemented

### ✅ **Account Page**

* **Dynamic route** (`/account/[id]`) → fetches account data by ID.
* **Suspense + Loader** → ensures good UX while fetching transactions.
* **Formatted account balance** → `parseFloat(...).toFixed(2)` ensures two decimal places.
* **Readable account type** → transforms uppercase DB value (`CREDIT_CARD`) to title-case (`Credit_card`).

---

### ✅ **Transaction Table**

1. **Sorting**

   * Implemented via `sortConfig` state.
   * User can sort transactions by:

     * **Date** (default: descending).
     * **Category**.
     * **Amount**.
   * Visual feedback with **ChevronUp / ChevronDown icons**.

2. **Selection & Bulk Selection**

   * Checkbox for each transaction.
   * "Select All" checkbox → selects/deselects all transactions in current view.
   * State maintained in `selectedIds`.

3. **Category Highlighting**

   * Categories are color-coded using `categoryColors`.
   * Each category shows as a small colored badge for better visual scanning.

4. **Amount Formatting**

   * Expense amounts shown in **red** with a `-` sign.
   * Income amounts shown in **green** with a `+` sign.
   * Always fixed to two decimal places.

5. **Recurring Transactions**

   * Recurring ones have a **Badge** with tooltip.
   * Shows recurrence type (Daily/Weekly/Monthly/Yearly).
   * Tooltip reveals **next recurring date**.
   * One-time transactions show a neutral "One Time" badge.

6. **Actions (Edit/Delete)**

   * **Edit** → navigates to `/transaction/create?edit={id}` using Next.js router.
   * **Delete** → calls `deleteFn([transaction.id])` (to be implemented in backend).
   * Uses `DropdownMenu` for clean UI.

---

## 4. Technical Highlights & Concepts Used

* **Server-Side Data Fetching**

  * Uses Next.js **Server Component** to fetch account data at build/request time.
  * Ensures **SEO + performance** (transactions are rendered on server).

* **Client-Side Interactivity**

  * Sorting, selection, tooltips, dropdowns → all handled in **client component**.
  * This hybrid approach keeps performance optimal.

* **State Management**

  * `useState` for handling selected checkboxes & sorting config.
  * Local state is sufficient since selection/sorting is only UI-level, not global.

* **UI Libraries Used**

  * **shadcn/ui** → for Table, Badge, Dropdown, Button, Checkbox.
  * **lucide-react** → for icons (ChevronUp/Down, Clock, RefreshCcw, etc.).
  * **date-fns** → for formatting dates (`format(new Date(transaction.date), "PP")`).
  * **react-spinners** → BarLoader for Suspense fallback.

---

## 5. What’s Left / TODOs

* [ ] Implement **deleteFn** for removing transactions from DB.
* [ ] Add **filtering options** (by date range, category, amount).
* [ ] Implement **search bar** for transactions.
* [ ] Add **pagination** or **infinite scroll** for large transaction lists.
* [ ] Handle **empty states** with illustrations or better messaging.

---

## 6. Possible Interview Questions

1. **Data Fetching**

   * Why did you use a Server Component for fetching account data?
   * Difference between `notFound()` vs returning null in Next.js?

2. **Client-Side Logic**

   * How is sorting implemented in the Transaction Table?
   * How would you implement server-side sorting if transactions were huge?

3. **UX Considerations**

   * Why use `Suspense` with a loader instead of conditional rendering?
   * How does tooltips improve recurring transactions UX?

4. **Code Decisions**

   * Why store `selectedIds` in local state instead of Redux/Context?
   * How do you ensure expenses and incomes are visually distinguishable?

5. **Scalability**

   * How would you optimize the table for **10k+ transactions**?
   * How would you implement bulk deletion of transactions?

---


# TRANSACTION PAGE WITH PAGINATION

# 📄 Documentation: Transactions Page

## 🔹 Overview  
The **Transactions Page** is responsible for displaying, filtering, sorting, paginating, and managing financial transactions tied to a user’s account. It integrates **Next.js server components**, **client-side filtering/search**, and **Prisma-based server actions** for robust data fetching and manipulation.  

---

## 🔹 File Responsibilities

### 1. `actions/accounts.js` (Server Actions)
- Handles all **secure DB operations** for accounts and transactions.
- Key functions:
  - `updateDefaultAccount(accountId)` → sets an account as default while ensuring only one default per user.  
  - `getAccountWithTransactions(accountId)` → fetches account + transactions (latest first) + transaction count.  
  - `bulkDeleteTransaction(transactionIds)` → deletes multiple transactions in one transaction-safe operation and updates account balances.

⚡ **Important Logic**:  
- Uses `db.$transaction()` → ensures deleting transactions and updating balances happen **atomically** (either all succeed or none).  
- Calculates balance updates based on transaction type:  
  ```js
  const change =
    transaction.type === "EXPENSE"
      ? transaction.amount
      : -transaction.amount;
  ```
  ➝ This ensures balance reflects real-world accounting correctly.

---

### 2. `app/account/[id]/page.js` (Account Page)
- **Server Component** → fetches account details and its transactions via `getAccountWithTransactions`.
- Shows account name, type, balance, and total transaction count.
- Renders **transaction table** inside `<Suspense>` with a **loading fallback**.

⚡ **Important Logic**:  
- Uses **Next.js `notFound()`** → automatically serves 404 if account doesn’t exist or user isn’t authorized.  
- Uses `<Suspense>` → ensures non-blocking UI with skeleton/loader (`BarLoader`) while table loads.  

---

### 3. `components/_components/paginated-transaction-table.js` (Client Component)
The **core UI for transactions**. Includes:

#### ✅ Features Implemented:
- **Search** → filter by description.  
- **Filters** → by type (`INCOME` / `EXPENSE`) and recurring (`Recurring / Non-recurring`).  
- **Sorting** → by `date`, `amount`, or `category`.  
- **Pagination** → 15 items per page with navigation.  
- **Bulk selection** with checkboxes:
  - Select all on page
  - Select individual transactions
  - Bulk delete confirmation modal  
- **Inline Actions** per transaction:
  - Edit → navigate to edit form  
  - Delete → delete individual transaction  
- **Recurring Badge with Tooltip**:
  - Shows interval (`Daily`, `Weekly`, etc.)
  - Tooltip shows **next recurring date**  

---

## 🔹 Important Logics (💡 Remember for Interviews)

### 1. **Filtering + Sorting Pipeline**
All filtering, searching, and sorting is done in **one `useMemo` block**:
```js
const filteredAndSortedTransactions = useMemo(() => {
  let result = [...transactions];

  if (searchTerm) {
    result = result.filter(t =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (recurringFilter) {
    result = result.filter(t =>
      recurringFilter === "recurring" ? t.isRecurring : !t.isRecurring
    );
  }

  if (typeFilter) {
    result = result.filter(t => t.type === typeFilter);
  }

  result.sort((a, b) => {
    switch (sortConfig.field) {
      case "date": return new Date(a.date) - new Date(b.date);
      case "amount": return a.amount - b.amount;
      case "category": return a.category.localeCompare(b.category);
      default: return 0;
    }
  });

  return sortConfig.direction === "asc" ? result : result.reverse();
}, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);
```

⚡ **Why Important**:  
- Demonstrates how to combine multiple filters + sorting efficiently.  
- `useMemo` avoids re-computation on every render → performance optimization.

---

### 2. **Pagination Logic**
```js
const totalPages = Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE);

const paginatedTransaction = useMemo(() => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  return filteredAndSortedTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
}, [filteredAndSortedTransactions, currentPage]);
```
⚡ **Why Important**:  
- Classic **client-side pagination** pattern.  
- Easy to replace with **server-side pagination** later if dataset grows.

---

### 3. **Bulk Delete with Confirmation**
```js
const handleBulkDelete = async () => {
  if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} transactions?`)) {
    return;
  }
  deleteFn(selectedIds);
};
```

⚡ **Why Important**:  
- User experience → prevents accidental data loss.  
- Interview angle → shows you understand **atomic deletes** + **UI confirmations**.

---

### 4. **Balance Update on Transaction Delete**
Inside `bulkDeleteTransaction`:
```js
const accountBalanceChanges = transactions.reduce((acc, t) => {
  const change = t.type === "EXPENSE" ? t.amount : -t.amount;
  acc[t.accountId] = (acc[t.accountId] || 0) + change;
  return acc;
}, {});
```

⚡ **Why Important**:  
- Ensures account balances **stay consistent** after deletes.  
- Example of **business logic inside server action**.

---

## 🔹 Possible Interview Questions & Answers

1. **Q: Why did you use `useMemo` for filtering and sorting?**  
   A: To avoid recalculating filtered/sorted lists on every re-render, which improves performance especially with large datasets.

2. **Q: How do you ensure data consistency when deleting transactions?**  
   A: I use Prisma’s `db.$transaction()` to delete transactions and update account balances in one atomic operation.

3. **Q: What’s the difference between client-side and server-side pagination here?**  
   A: Currently, pagination is client-side (all data is fetched once, sliced per page). For very large datasets, I would implement server-side pagination to reduce memory and network usage.

4. **Q: How do you prevent unauthorized access to transactions?**  
   A: All server actions check `auth()` from Clerk and match `userId` before fetching or mutating data.

5. **Q: What happens if a recurring transaction is deleted?**  
   A: Currently, it deletes like any other transaction. Future improvement could be differentiating “series delete” vs “single instance delete.”

---

## 🔹 Future Improvements
- Add **charts** (spending trends, category breakdown).  
- Server-side pagination for scalability.  
- Bulk **export to CSV/Excel**.  
- More granular recurring transaction management.  


