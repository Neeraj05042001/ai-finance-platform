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




