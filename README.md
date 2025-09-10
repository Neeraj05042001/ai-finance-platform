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

_(Part of AI Finance Platform Project)_

---

## 1. Purpose of the Page

The **Transactions Page** is designed to display and manage all financial transactions associated with a specific account. It allows the user to:

- View account details (name, type, balance, number of transactions).
- Inspect a list of transactions with sorting and selection capabilities.
- Differentiate between **income** and **expenses** visually.
- Identify **recurring vs one-time** transactions.
- Perform basic actions like **Edit** and **Delete** on transactions.

This page is a critical part of the finance platform since it consolidates all transaction-related data for easy analysis and management.

---

## 2. Files & Components Involved

### 📂 `app/account/[id]/page.jsx`

- **Type**: Server Component (async).
- **Responsibilities**:
  - Fetches account and transaction data using `getAccountWithTransactions()`.
  - Handles 404 errors using Next.js `notFound()` if account doesn’t exist.
  - Renders the account details (name, type, balance, transaction count).
  - Wraps the **TransactionTable** in a `<Suspense>` boundary for smooth loading experience with a `BarLoader`.

### 📂 `app/account/[id]/_components/transaction-table.jsx`

- **Type**: Client Component.
- **Responsibilities**:
  - Displays transactions in a feature-rich table.
  - Provides **sorting**, **multi-select checkboxes**, and **bulk selection**.
  - Shows transaction **date, description, category, amount, recurring status**.
  - Uses `Tooltip`, `Badge`, and color-coded UI for clarity.
  - Includes an **action menu** (Edit/Delete).

---

## 3. Key Features Implemented

### ✅ **Account Page**

- **Dynamic route** (`/account/[id]`) → fetches account data by ID.
- **Suspense + Loader** → ensures good UX while fetching transactions.
- **Formatted account balance** → `parseFloat(...).toFixed(2)` ensures two decimal places.
- **Readable account type** → transforms uppercase DB value (`CREDIT_CARD`) to title-case (`Credit_card`).

---

### ✅ **Transaction Table**

1. **Sorting**
   - Implemented via `sortConfig` state.
   - User can sort transactions by:
     - **Date** (default: descending).
     - **Category**.
     - **Amount**.

   - Visual feedback with **ChevronUp / ChevronDown icons**.

2. **Selection & Bulk Selection**
   - Checkbox for each transaction.
   - "Select All" checkbox → selects/deselects all transactions in current view.
   - State maintained in `selectedIds`.

3. **Category Highlighting**
   - Categories are color-coded using `categoryColors`.
   - Each category shows as a small colored badge for better visual scanning.

4. **Amount Formatting**
   - Expense amounts shown in **red** with a `-` sign.
   - Income amounts shown in **green** with a `+` sign.
   - Always fixed to two decimal places.

5. **Recurring Transactions**
   - Recurring ones have a **Badge** with tooltip.
   - Shows recurrence type (Daily/Weekly/Monthly/Yearly).
   - Tooltip reveals **next recurring date**.
   - One-time transactions show a neutral "One Time" badge.

6. **Actions (Edit/Delete)**
   - **Edit** → navigates to `/transaction/create?edit={id}` using Next.js router.
   - **Delete** → calls `deleteFn([transaction.id])` (to be implemented in backend).
   - Uses `DropdownMenu` for clean UI.

---

## 4. Technical Highlights & Concepts Used

- **Server-Side Data Fetching**
  - Uses Next.js **Server Component** to fetch account data at build/request time.
  - Ensures **SEO + performance** (transactions are rendered on server).

- **Client-Side Interactivity**
  - Sorting, selection, tooltips, dropdowns → all handled in **client component**.
  - This hybrid approach keeps performance optimal.

- **State Management**
  - `useState` for handling selected checkboxes & sorting config.
  - Local state is sufficient since selection/sorting is only UI-level, not global.

- **UI Libraries Used**
  - **shadcn/ui** → for Table, Badge, Dropdown, Button, Checkbox.
  - **lucide-react** → for icons (ChevronUp/Down, Clock, RefreshCcw, etc.).
  - **date-fns** → for formatting dates (`format(new Date(transaction.date), "PP")`).
  - **react-spinners** → BarLoader for Suspense fallback.

---

## 5. What’s Left / TODOs

- [ ] Implement **deleteFn** for removing transactions from DB.
- [ ] Add **filtering options** (by date range, category, amount).
- [ ] Implement **search bar** for transactions.
- [ ] Add **pagination** or **infinite scroll** for large transaction lists.
- [ ] Handle **empty states** with illustrations or better messaging.

---

## 6. Possible Interview Questions

1. **Data Fetching**
   - Why did you use a Server Component for fetching account data?
   - Difference between `notFound()` vs returning null in Next.js?

2. **Client-Side Logic**
   - How is sorting implemented in the Transaction Table?
   - How would you implement server-side sorting if transactions were huge?

3. **UX Considerations**
   - Why use `Suspense` with a loader instead of conditional rendering?
   - How does tooltips improve recurring transactions UX?

4. **Code Decisions**
   - Why store `selectedIds` in local state instead of Redux/Context?
   - How do you ensure expenses and incomes are visually distinguishable?

5. **Scalability**
   - How would you optimize the table for **10k+ transactions**?
   - How would you implement bulk deletion of transactions?

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
    transaction.type === "EXPENSE" ? transaction.amount : -transaction.amount;
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
    result = result.filter((t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (recurringFilter) {
    result = result.filter((t) =>
      recurringFilter === "recurring" ? t.isRecurring : !t.isRecurring
    );
  }

  if (typeFilter) {
    result = result.filter((t) => t.type === typeFilter);
  }

  result.sort((a, b) => {
    switch (sortConfig.field) {
      case "date":
        return new Date(a.date) - new Date(b.date);
      case "amount":
        return a.amount - b.amount;
      case "category":
        return a.category.localeCompare(b.category);
      default:
        return 0;
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
const totalPages = Math.ceil(
  filteredAndSortedTransactions.length / ITEMS_PER_PAGE
);

const paginatedTransaction = useMemo(() => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  return filteredAndSortedTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
}, [filteredAndSortedTransactions, currentPage]);
```

⚡ **Why Important**:

- Classic **client-side pagination** pattern.
- Easy to replace with **server-side pagination** later if dataset grows.

---

### 3. **Bulk Delete with Confirmation**

```js
const handleBulkDelete = async () => {
  if (
    !window.confirm(
      `Are you sure you want to delete ${selectedIds.length} transactions?`
    )
  ) {
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

# CHART SECTIONS

INSTALL RECHART: npm install recharts --legacy-peer-deps

1. create the ui of charts section:

- define it in the id page.js
- create the component

Perfect 👍 — this **Chart Section** is an important part of your project because interviewers often dive into **data transformation, state management, and visualization logic**. Below is a **clear, structured documentation** of this code, including all the logics you’ll need to revise and highlight during interviews.

---

# 📊 AccountCharts (Chart Section of Account Page)

## 🔎 Purpose

The **AccountCharts** component provides a **visual summary of transactions (Income vs Expense)** over a selected time period.
It helps users quickly see **trends, totals, and net balance** in a bar chart.

---

## 🏗️ Component Structure

- **UI Wrapper** → `Card` (title, dropdown filter, totals, chart)
- **State** → `dateRange` (7D, 1M, 3M, etc.)
- **Data Transformations** → Filter → Group → Aggregate → Sort
- **Visualization** → `Recharts` BarChart with Income/Expense bars

---

## ⚙️ Key Logics to Revise

### 1. **Date Range Filter**

```js
const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All time", days: null },
};
```

- User can choose **7 days, 1 month, 3 months, 6 months, or All time**.
- Uses `date-fns` helpers:
  - `subDays(now, range.days)` → calculate start date
  - `startOfDay`, `endOfDay` → ensure inclusive filtering

👉 **Interview highlight**: Using libraries like `date-fns` avoids edge cases with raw JS date math.

---

### 2. **Filtering Transactions by Date**

```js
const filtered = transactions.filter(
  (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
);
```

- Keeps only transactions **within the selected range**.
- Converts `t.date` to JS Date before comparison.

👉 **Importance**: Correct date filtering is critical in financial apps.

---

### 3. **Grouping by Day & Aggregating**

```js
const grouped = filtered.reduce((acc, transaction) => {
  const date = format(new Date(transaction.date), "MMM dd");

  if (!acc[date]) {
    acc[date] = { date, income: 0, expense: 0 };
  }

  if (transaction.type === "INCOME") {
    acc[date].income += transaction.amount;
  } else {
    acc[date].expense += transaction.amount;
  }
  return acc;
}, {});
```

- Groups transactions **by day label** (e.g., `"Sep 05"`)
- Aggregates totals into `income` and `expense`

👉 **Important to revise**:

- `reduce()` for grouping
- Conditional accumulation based on transaction type

---

### 4. **Sorting Final Data**

```js
return Object.values(grouped).sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);
```

- Converts grouped object into array
- Sorts by date to ensure chart renders in chronological order

---

### 5. **Calculating Totals (Income, Expense, Net)**

```js
const totals = filteredData.reduce(
  (acc, day) => ({
    income: acc.income + day.income,
    expense: acc.expense + day.expense,
  }),
  { income: 0, expense: 0 }
);
```

- Provides summary numbers displayed above the chart:
  - **Total Income (green)**
  - **Total Expense (red)**
  - **Net = Income - Expense**

👉 **Highlight**: `reduce()` again for cumulative totals.

---

### 6. **Bar Chart Visualization (Recharts)**

```js
<BarChart data={filteredData}>
  <CartesianGrid strokeDasharray="3 3" vertical={false} />
  <XAxis dataKey="date" />
  <YAxis tickFormatter={(value) => `$${value}`} />
  <Tooltip formatter={(value) => [`$${value}`, undefined]} />
  <Legend />
  <Bar dataKey="income" fill="#22c55e" name="Income" radius={[4, 4, 0, 0]} />
  <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[4, 4, 0, 0]} />
</BarChart>
```

- **XAxis** → dates
- **YAxis** → formatted with `$`
- **Tooltip** → shows value on hover
- **Legend** → distinguishes Income vs Expense
- **Bars** → Income (green), Expense (red)

👉 **Important**: Always format numbers as currency for finance apps.

---

## ✅ Key Interview Talking Points

1. **Data transformations pipeline**:
   Raw → Filtered → Grouped → Aggregated → Sorted → Visualized
2. **Why use `useMemo`?**
   To optimize expensive calculations (`filter`, `reduce`, `sort`) and avoid recalculating on every render.
3. **Importance of date handling**:
   Edge cases (timezones, inclusive ranges) handled with `date-fns`.
4. **Charting choices**:
   `Recharts` is declarative, integrates well with React state, and supports responsive layouts.

## Potential Interview Questions

1. How does `useMemo` help in optimizing this chart rendering?
2. Why is `startOfDay` and `endOfDay` used for date filtering?
3. How would you handle time zones or locale differences in transaction dates?
4. What happens if multiple transactions occur on the same day?
5. How would you extend this to support weekly or monthly aggregation?
6. Why is the net total conditionally styled? How is it implemented?
7. What improvements would you make to DATE_RANGES?

---

# PROGRESS BAR

# Budget Progress Component Documentation

## 📌 Purpose

The **Budget Progress** feature allows users to view, update, and track their monthly budget usage.  
It provides a **visual progress bar** showing how much of the set budget has been spent, and dynamically adjusts color based on thresholds (green/yellow/red).  
This component improves financial awareness and helps prevent overspending.

---

## 🗂️ Files & Components Involved

1. **Server Action (`budget.js`)**
   - Handles authentication and ensures budget updates are tied to the logged-in user (`auth()` and `db.user.findUnique`).
   - Provides the backend logic for updating a budget in the database.

2. **BudgetProgress.jsx (Client Component)**
   - Manages UI state (`isEditing`, `newBudget`) and user interactions.
   - Integrates with `updateBudget` server action using a custom hook `useFetch`.
   - Calculates budget usage percentage (`percentUsed`).
   - Displays progress bar, budget info, and provides inline editing.

3. **Progress.jsx (UI Component)**
   - A wrapper around Radix UI’s Progress component.
   - Handles smooth progress animations.
   - Supports dynamic styles (e.g., green/yellow/red bar depending on usage).

---

## ⚙️ Core Logic & Flow

### 1. **State Management**

- `isEditing`: Tracks if the budget is in edit mode.
- `newBudget`: Stores the new budget value entered by the user.
- `percentUsed`: `(currentExpenses / budget.amount) * 100` — calculates usage.

### 2. **Update Budget Flow**

- User clicks **✏️ Edit** → switches UI to input mode.
- User enters amount → clicks **✔️ Save** → `updateBudgetFn(amount)` called.
- If invalid input → error toast.
- If success → toast success, exit edit mode.
- If failure → error toast shown.

### 3. **Dynamic Progress Bar Coloring**

- **Green**: usage < 75%
- **Yellow**: 75% ≤ usage < 90%
- **Red**: usage ≥ 90%

This ensures users get **visual alerts** as they near their limit.

### 4. **Cancel Edit**

- Clicking **❌ Cancel** resets value to original budget and closes edit mode.

---

## 🖼️ UI/UX Behavior

- Default: Shows `"$X of $Y spent"` with progress bar.
- Edit Mode: Inline input with Save (✔️) and Cancel (❌) buttons.
- Progress bar fills smoothly based on usage % with warning colors.
- Toast notifications guide user through success/failure.

---

## 🔑 Important Concepts to Revise

- **Server Actions** in Next.js 13+ (`"use server"`, authentication, DB queries).
- **Client Component State Management** (`useState`, `useEffect`).
- **Custom Hooks** (`useFetch` → loading, error, data pattern).
- **Radix UI Integration** (`ProgressPrimitive.Root`, `Indicator`).
- **Form Validation** (checking for positive numbers).
- **Optimistic UI Pattern** (UI updates after success, errors handled gracefully).

---

## ❓ Possible Interview Questions

1. How does the budget progress bar calculate the usage percentage?
2. Why do we use `useMemo` or `useEffect` for handling API response updates?
3. What is the difference between optimistic and pessimistic UI updates?
4. How is Radix UI Progress customized with Tailwind in this project?
5. How does the system handle invalid inputs (negative or NaN)?
6. Why are thresholds (75%, 90%) chosen for progress bar colors?
7. What design pattern is `useFetch` implementing?
8. How does the `updateBudget` server action ensure security?

---

## ✅ TODO / Future Enhancements

- Add support for **multiple budgets** (per account/category).
- Implement **budget history** (track changes over time).
- Provide **alerts/notifications** when nearing/exceeding budget.
- Allow **monthly auto-reset** of budget.

# Corn Job for Budget Alert

1. install inngest: see documnettion
2. create an inggest folder inside api

- create route.js file

3. now inside the lib folder create a folder named ingest and under that create a file named client.js

corn job
email: react.email

- npm install react-email -D -E
- npm install react-email -D -E --legacy-peer-deps

in package.json write: - "email":"email dev"

5. Resend

# RECEIPT SCANNER

1. Install google/genai: npm install @google/generative-ai --legacy-peer-deps

### AI receipt scanner server action code:

``js

export async function scanReceipt(file) {
try {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//CAonvert File to ArrayBuffer
const arrayBuffer = await file.arrayBuffer();
//convert ArrayBuffer to Base64
const base64String = Buffer.from(arrayBuffer).toString("base64");

    const prompt = `
      Analyze this receipt image and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in ISO format)
      - Description or items purchased (brief summary)
      - Merchant/store name
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense )

      Only respond with valid JSON in this exact format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string",
        "category": "string"
      }

      If its not a receipt, return an empty object
    `;
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
        prompt,
      },
    ]);

    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    try {
      const data = JSON.parse(cleanedText);
      return {
        amount: parseFloat(data.amount),
        date: new Date(data.date),
        description: data.description,
        category: data.category,
        merchantName: data.merchantName,
      };
    } catch (parseError) {
      console.error("Error parsing JSON response", parseError);
      throw new Error("Invalid response format from GeminiAi");
    }

} catch (error) {
console.log("Error scanning receipt:", error.message);
throw new Error("Failed to scan receipt");
}
}

``
