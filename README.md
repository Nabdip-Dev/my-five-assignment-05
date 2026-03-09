
# Answer all question:

## 1️⃣ What is the difference between var, let, and const?

**Answer:**

- **var**: এটা JavaScript এর পুরোনো variable declaration। এটা function scoped এবং একই variable আবার declare করা যায়। এজন্য অনেক সময় bug হওয়ার সম্ভাবনা থাকে।

- **let**: এটা block scoped। একই block এর ভিতরে আবার declare করা যায় না, কিন্তু value change করা যায়।

- **const**: এটাও block scoped, কিন্তু একবার value assign করলে পরে change করা যায় না। সাধারণত constant value রাখার জন্য ব্যবহার করা হয়।

---

## 2️⃣ What is the spread operator (...)?

**Answer:**

Spread operator (`...`) ব্যবহার করা হয় array বা object এর elements expand করার জন্য।

Example:

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
```

এখানে পুরোনো array এর সব element নতুন array তে copy হয়ে গেছে।

---

## 3️⃣ What is the difference between map(), filter(), and forEach()?

**Answer:**

- **map()**: প্রতিটি element এর উপর কাজ করে এবং নতুন একটি array return করে।
- **filter()**: condition অনুযায়ী কিছু element select করে নতুন array return করে।
- **forEach()**: শুধু loop চালায়, কিন্তু নতুন array return করে না।

Example:

```javascript
const numbers = [1, 2, 3, 4];

numbers.map(n => n * 2);
numbers.filter(n => n > 2);
numbers.forEach(n => console.log(n));
```

---

## 4️⃣ What is an arrow function?

**Answer:**

Arrow function হলো JavaScript এ function লেখার ছোট এবং সহজ syntax।

Example:

```javascript
const add = (a, b) => a + b;
```

এটা normal function এর short version।

---

## 5️⃣ What are template literals?

**Answer:**

Template literals ব্যবহার করে string এর ভিতরে variable বা expression সহজে বসানো যায়। এটা backtick (` `) দিয়ে লেখা হয়।

Example:

```javascript
const name = "Nabdip";
console.log(`Hello ${name}`);
```

এতে string এর ভিতরে variable সহজে ব্যবহার করা যায়।