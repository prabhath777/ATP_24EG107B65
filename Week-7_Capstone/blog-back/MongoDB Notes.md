# MongoDB Notes 🍃

## What is MongoDB?

MongoDB is a **NoSQL document database** that stores data as JSON-like documents (called BSON internally). Unlike SQL, there are no tables with fixed schemas — just **collections** of flexible documents.

---

## Core Concepts

| SQL Term | MongoDB Equivalent |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |

---

## CRUD Operations

### Create — `insertOne` vs `insertMany`

```js
// Insert one document
db.users.insertOne({ name: "prabs", age: 19, city: "hyd" })

// Insert multiple documents at once
db.users.insertMany([
  { name: "surya", age: 19, city: "mtm" },
  { name: "sai",   age: 18, city: "mtm" }
])
```

> MongoDB auto-generates `_id` (ObjectId) for every document if you don't provide one.

---

### Read — `findOne` vs `find`

#### `findOne` — returns the FIRST matching document only

```js
db.users.findOne({ city: { $eq: "hyd" } })
// → { _id: ..., name: "prabs", age: 19, city: "hyd" }
```

#### `find` — returns ALL matching documents as a cursor

```js
db.users.find({ city: { $eq: "mtm" } })
// → surya, sai
```

#### Read with chained methods

```js
// Sort by age ascending (1) or descending (-1)
db.users.find().sort({ age: 1 })
db.users.find().sort({ age: -1 })

// Limit results
db.users.find().limit(3)

// Skip first N results (useful for pagination)
db.users.find().skip(2).limit(3)

// Count documents matching a filter
db.users.countDocuments({ city: "hyd" })

// Count all documents in collection
db.users.countDocuments()
```

---

## Query Operators

### Comparison Operators

| Operator | Meaning | Example |
|---|---|---|
| `$eq` | Equal to | `{ age: { $eq: 19 } }` |
| `$ne` | Not equal to | `{ age: { $ne: 18 } }` |
| `$gt` | Greater than | `{ age: { $gt: 18 } }` |
| `$gte` | Greater than or equal | `{ age: { $gte: 19 } }` |
| `$lt` | Less than | `{ age: { $lt: 20 } }` |
| `$lte` | Less than or equal | `{ age: { $lte: 19 } }` |
| `$in` | Value in array | `{ city: { $in: ["hyd", "mtm"] } }` |
| `$nin` | Value NOT in array | `{ city: { $nin: ["hyd"] } }` |

```js
// All users older than 18
db.users.find({ age: { $gt: 18 } })

// Users aged 18 OR 19
db.users.find({ age: { $in: [18, 19] } })

// Users in hyd or mtm
db.users.find({ city: { $in: ["hyd", "mtm"] } })
```

---

### Logical Operators

| Operator | Meaning |
|---|---|
| `$and` | All conditions must be true |
| `$or` | At least one condition must be true |
| `$not` | Negates a condition |
| `$nor` | None of the conditions are true |

```js
// $and — users older than 18 AND in hyd or mtm
db.users.find({
  $and: [
    { age: { $gt: 18 } },
    { city: { $in: ["hyd", "mtm"] } }
  ]
})

// $or — users from hyd OR under 19
db.users.find({
  $or: [
    { city: "hyd" },
    { age: { $lt: 19 } }
  ]
})

// $nor — NOT in hyd AND NOT in mtm
db.users.find({
  $nor: [
    { city: "hyd" },
    { city: "mtm" }
  ]
})

// $not — age NOT greater than 18
db.users.find({ age: { $not: { $gt: 18 } } })
```

> ⚠️ **Common mistake:** double curly braces `{{}}` inside `$and` — each condition needs exactly ONE `{}`

```js
// ❌ Wrong
{ $and: [ { age: { $gt: 18 } }, {{ city: "hyd" }} ] }

// ✅ Correct
{ $and: [ { age: { $gt: 18 } }, { city: "hyd" } ] }
```

---

### Element Operators

```js
// Find documents where a field EXISTS
db.users.find({ phone: { $exists: true } })

// Find documents where a field does NOT exist
db.users.find({ phone: { $exists: false } })

// Check field type
db.users.find({ age: { $type: "int" } })
```

---

## Update Operations

### `updateOne` vs `updateMany`

```js
// updateOne — only updates the FIRST match
db.users.updateOne(
  { name: "prabs" },                          // filter
  { $set: { name: "prabhath", age: 18 } }     // update
)
// → modifiedCount: 1

// updateMany — updates ALL matching documents
db.users.updateMany(
  { city: "mtm" },
  { $set: { city: "mahabubnagar" } }
)
// → modifiedCount: 2 (all mtm users updated)
```

### All Update Operators

| Operator | What it does |
|---|---|
| `$set` | Set field to a value (add if doesn't exist) |
| `$unset` | Remove a field completely |
| `$inc` | Increment / decrement a number |
| `$mul` | Multiply a number field |
| `$rename` | Rename a field |
| `$min` | Update only if new value is LESS than current |
| `$max` | Update only if new value is GREATER than current |
| `$push` | Add element to array |
| `$pull` | Remove element(s) from array |
| `$pop` | Remove first or last element of array |
| `$addToSet` | Add to array only if not already present |
| `$pullAll` | Remove all matching values from array |

```js
// Increment age by 1
db.users.updateOne({ name: "prabs" }, { $inc: { age: 1 } })

// Decrement age by 2
db.users.updateOne({ name: "prabs" }, { $inc: { age: -2 } })

// Multiply score by 1.1
db.users.updateOne({ name: "prabs" }, { $mul: { score: 1.1 } })

// Remove the city field entirely
db.users.updateOne({ name: "prabs" }, { $unset: { city: "" } })

// Rename field "city" to "location"
db.users.updateOne({ name: "prabs" }, { $rename: { city: "location" } })
```

---

## insert vs update vs upsert vs replace — KEY DIFFERENCES

This is where people get confused. Mental model:

| Operation | Creates new doc? | Modifies existing? | Replaces entire doc? |
|---|---|---|---|
| `insertOne` | ✅ Always | ❌ No | ❌ No |
| `updateOne` | ❌ No (by default) | ✅ Yes | ❌ No |
| `updateOne` + `upsert:true` | ✅ If not found | ✅ If found | ❌ No |
| `replaceOne` | ❌ No | ✅ Yes | ✅ Entire doc |

```js
// insertOne — ALWAYS creates a new document
db.users.insertOne({ name: "prabs", age: 19 })
// Even if "prabs" already exists → creates ANOTHER document with new _id!

// updateOne — modifies existing, does NOT create if missing
db.users.updateOne({ name: "ghost" }, { $set: { age: 20 } })
// → modifiedCount: 0  (nothing happens, no doc found)

// upsert — update if found, INSERT if not found
db.users.updateOne(
  { name: "ghost" },
  { $set: { age: 20, city: "hyd" } },
  { upsert: true }
)
// ghost doesn't exist → creates new document
// ghost exists       → updates it
// → upsertedCount: 1 OR modifiedCount: 1

// replaceOne — replaces the ENTIRE document (only _id preserved)
db.users.replaceOne(
  { name: "prabs" },
  { name: "prabhath", age: 20, city: "hyd" }
)
// old doc had phone, email, etc → ALL GONE, replaced completely
```

> `$set` inside `updateOne` = surgical, only changes what you specify
> `replaceOne` = nuclear, wipes and replaces entire document

---

## Array Operations (Deep Dive)

### Setup — user with arrays

```js
db.users.insertOne({
  name: "prabs",
  age: 19,
  tags: ["mongodb", "python", "ml"],
  scores: [85, 90, 78]
})
```

---

### Adding elements to array

```js
// $push — add ONE element (allows duplicates)
db.users.updateOne(
  { name: "prabs" },
  { $push: { tags: "nodejs" } }
)
// tags → ["mongodb", "python", "ml", "nodejs"]

// $push with $each — add MULTIPLE elements at once
db.users.updateOne(
  { name: "prabs" },
  { $push: { tags: { $each: ["cuda", "c++"] } } }
)
// tags → ["mongodb", "python", "ml", "nodejs", "cuda", "c++"]

// $push with $each + $position — insert at specific index
db.users.updateOne(
  { name: "prabs" },
  { $push: { tags: { $each: ["sql"], $position: 0 } } }
)
// tags → ["sql", "mongodb", "python", ...]  (inserted at front)

// $push with $each + $sort — auto-sort after pushing
db.users.updateOne(
  { name: "prabs" },
  { $push: { scores: { $each: [95, 70], $sort: -1 } } }
)
// scores sorted descending after push

// $push with $each + $slice — keep only last N elements
db.users.updateOne(
  { name: "prabs" },
  { $push: { scores: { $each: [100], $slice: -3 } } }
)
// only last 3 scores kept (auto-trim)

// $addToSet — add ONLY if not already present (no duplicates)
db.users.updateOne({ name: "prabs" }, { $addToSet: { tags: "python" } })
// "python" already exists → nothing added

db.users.updateOne({ name: "prabs" }, { $addToSet: { tags: "rust" } })
// "rust" doesn't exist → added

// $addToSet with $each
db.users.updateOne(
  { name: "prabs" },
  { $addToSet: { tags: { $each: ["go", "python"] } } }
)
// "go" added, "python" skipped (already exists)
```

> `$push` = always adds, duplicates allowed
> `$addToSet` = only adds if unique (like a Set in Python)

---

### Removing elements from array

```js
// $pop — remove last element (1) or first element (-1)
db.users.updateOne({ name: "prabs" }, { $pop: { tags: 1 } })   // remove last
db.users.updateOne({ name: "prabs" }, { $pop: { tags: -1 } })  // remove first

// $pull — remove elements matching a VALUE
db.users.updateOne(
  { name: "prabs" },
  { $pull: { tags: "python" } }
)
// "python" removed from tags wherever it appears

// $pull with a CONDITION — remove elements matching a rule
db.users.updateOne(
  { name: "prabs" },
  { $pull: { scores: { $lt: 80 } } }  // remove all scores below 80
)

// $pullAll — remove all occurrences of multiple specific values
db.users.updateOne(
  { name: "prabs" },
  { $pullAll: { tags: ["mongodb", "sql"] } }
)
// both "mongodb" and "sql" removed

// $pull on array of objects — remove by matching field
db.users.updateOne(
  { name: "prabs" },
  { $pull: { projects: { title: "API Server" } } }
)
// removes the project object where title = "API Server"
```

---

### Updating specific elements in array

```js
// Update element at a specific INDEX (0-based)
db.users.updateOne(
  { name: "prabs" },
  { $set: { "scores.0": 99 } }   // update index 0
)

// $ positional operator — update the FIRST matched element
// (filter must include the array field to identify the match)
db.users.updateOne(
  { name: "prabs", tags: "ml" },          // ← "ml" is matched
  { $set: { "tags.$": "machine-learning" } }  // $ = that matched element
)
// "ml" → replaced with "machine-learning"

// $[] — update ALL elements in array
db.users.updateOne(
  { name: "prabs" },
  { $inc: { "scores.$[]": 5 } }   // +5 to every score
)

// $[identifier] with arrayFilters — update elements matching a condition
db.users.updateOne(
  { name: "prabs" },
  { $set: { "scores.$[el]": 100 } },
  { arrayFilters: [ { "el": { $lt: 80 } } ] }   // only scores below 80 → set to 100
)
```

---

### Querying arrays

```js
// Contains a specific value
db.users.find({ tags: "python" })

// Exact array match (order matters)
db.users.find({ tags: ["mongodb", "python"] })

// Contains ALL of these values (any order)
db.users.find({ tags: { $all: ["python", "ml"] } })

// Array length equals N
db.users.find({ tags: { $size: 3 } })

// $elemMatch — single element must satisfy ALL conditions
db.users.find({
  projects: { $elemMatch: { tech: "Python", year: 2024 } }
})
```

---

## Nested Objects (Embedded Documents)

### Inserting nested objects

```js
db.users.insertOne({
  name: "prabs",
  age: 19,
  city: "hyd",
  address: {
    street: "123 MG Road",
    pincode: "500001",
    area: "Banjara Hills"
  },
  scores: {
    math: 90,
    science: 85
  }
})
```

### Querying nested fields — dot notation `"parent.child"`

> ⚠️ Must be in **quotes** when used as a key.

```js
db.users.find({ "address.area": "Banjara Hills" })
db.users.find({ "scores.math": { $gt: 80 } })

// Exact match on whole nested object (field ORDER matters!)
db.users.find({
  address: { street: "123 MG Road", pincode: "500001", area: "Banjara Hills" }
})
```

### Updating nested fields

```js
// Update one nested field
db.users.updateOne({ name: "prabs" }, { $set: { "address.pincode": "500034" } })

// Add a new nested field that didn't exist
db.users.updateOne({ name: "prabs" }, { $set: { "address.landmark": "Near Tank Bund" } })

// Remove a nested field
db.users.updateOne({ name: "prabs" }, { $unset: { "address.landmark": "" } })
```

### Arrays of Nested Objects

```js
db.users.insertOne({
  name: "prabs",
  projects: [
    { title: "ML Model", tech: "Python", year: 2024 },
    { title: "API Server", tech: "Node.js", year: 2025 }
  ]
})

// Find users with a Python project
db.users.find({ "projects.tech": "Python" })

// Python project AND from 2024 (same element)
db.users.find({ projects: { $elemMatch: { tech: "Python", year: 2024 } } })

// Update a field inside matching array element
db.users.updateOne(
  { "projects.title": "ML Model" },
  { $set: { "projects.$.year": 2025 } }   // $ = matched element
)

// Add a new project
db.users.updateOne(
  { name: "prabs" },
  { $push: { projects: { title: "CUDA Kernel", tech: "C++", year: 2025 } } }
)

// Remove a project by title
db.users.updateOne(
  { name: "prabs" },
  { $pull: { projects: { title: "API Server" } } }
)
```

---

## Projection — control which fields are returned

```js
// Include only name and city
db.users.find({}, { name: 1, city: 1, _id: 0 })

// Exclude just one field
db.users.find({}, { age: 0 })

// Return a nested field only
db.users.find({}, { name: 1, "address.area": 1, _id: 0 })

// ❌ Can't mix include and exclude (except _id)
db.users.find({}, { name: 1, age: 0 })  // ERROR
```

---

## Collection & Database Operations

```js
show dbs                          // list all databases
use mydb                          // switch to / create db
show collections                  // list all collections
db.createCollection("orders")     // explicitly create collection
db.users.drop()                   // delete a collection
db.dropDatabase()                 // delete the entire database
db.users.stats()                  // collection stats
db.users.getIndexes()             // see all indexes
```

---

## Indexes

Without indexes, MongoDB does a **full collection scan** for every query — very slow on large data.

```js
// Single field index
db.users.createIndex({ name: 1 })         // ascending
db.users.createIndex({ age: -1 })         // descending

// Compound index (multiple fields)
db.users.createIndex({ city: 1, age: -1 })

// Unique index (no duplicates allowed)
db.users.createIndex({ email: 1 }, { unique: true })

// Text index (for full-text search)
db.users.createIndex({ name: "text", bio: "text" })

// Drop an index
db.users.dropIndex({ name: 1 })

// Drop all indexes except _id
db.users.dropIndexes()
```

---

## Aggregation Pipeline (Intro)

Aggregation = transform data through a **pipeline of stages**. Each stage's output is the next stage's input.

```js
db.users.aggregate([
  { $match: { age: { $gt: 18 } } },                         // filter
  { $group: { _id: "$city", count: { $sum: 1 } } },         // group by city
  { $sort: { count: -1 } }                                  // sort by count desc
])
// → number of users per city, highest first
```

### Common Aggregation Stages

| Stage | What it does |
|---|---|
| `$match` | Filter documents (like `find`) |
| `$group` | Group and compute (count, sum, avg, min, max) |
| `$sort` | Sort |
| `$limit` | Keep only N documents |
| `$skip` | Skip N documents |
| `$project` | Reshape / include / exclude / compute fields |
| `$unwind` | Flatten array — one doc per array element |
| `$lookup` | JOIN with another collection |
| `$addFields` | Add computed fields without removing others |
| `$count` | Count remaining documents |

```js
// Average age per city
db.users.aggregate([
  { $group: { _id: "$city", avgAge: { $avg: "$age" } } }
])

// $project — compute new field
db.users.aggregate([
  { $project: { name: 1, upperCity: { $toUpper: "$city" }, _id: 0 } }
])

// $unwind — flatten tags (one doc per tag)
db.users.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
// → most common tags across all users
```

---

## Common Errors & Fixes

```js
// ❌ Dot notation without quotes
db.users.find({ address.area: "hyd" })       // SyntaxError
db.users.find({ "address.area": "hyd" })     // ✅

// ❌ Double braces in $and/$or
{ $and: [ {{ city: "hyd" }}, { age: 19 } ] }  // SyntaxError
{ $and: [ { city: "hyd" }, { age: 19 } ] }    // ✅

// ❌ Missing colon in $in
{ city: { $in["hyd","mtm"] } }               // SyntaxError
{ city: { $in: ["hyd","mtm"] } }             // ✅

// ❌ $push on a scalar field
db.users.updateOne({name:"prabs"}, { $push: { age: 20 } })  // age becomes [20]!
db.users.updateOne({name:"prabs"}, { $set: { age: 20 } })   // ✅

// ❌ insertOne thinking it updates
db.users.insertOne({ name: "prabs", age: 20 })  // creates DUPLICATE document
db.users.updateOne({ name: "prabs" }, { $set: { age: 20 } })  // ✅
```

---

## Quick Reference Cheatsheet

```js
// ── FIND ──────────────────────────────────────────────────
db.col.findOne({ filter })                  // first match
db.col.find({ filter })                     // all matches
db.col.find().sort({ f: 1 })               // sort asc (−1 = desc)
db.col.find().skip(n).limit(n)             // pagination
db.col.countDocuments({ filter })           // count

// ── COMPARISON ────────────────────────────────────────────
{ f: { $gt:v } }   { f: { $gte:v } }       // >  >=
{ f: { $lt:v } }   { f: { $lte:v } }       // <  <=
{ f: { $eq:v } }   { f: { $ne:v } }        // == !=
{ f: { $in:[a,b] } }  { f: { $nin:[a] } }  // in / not in

// ── LOGICAL ───────────────────────────────────────────────
{ $and: [{c1},{c2}] }   { $or: [{c1},{c2}] }
{ $nor: [{c1},{c2}] }   { f: { $not: {op} } }

// ── SCALAR UPDATE ─────────────────────────────────────────
{ $set:    { f: v } }        // set / add field
{ $unset:  { f: "" } }       // delete field
{ $inc:    { f: n } }        // +n (negative = subtract)
{ $mul:    { f: n } }        // multiply
{ $rename: { old: "new" } }  // rename field

// ── ARRAY ADD ─────────────────────────────────────────────
{ $push:     { arr: v } }                     // add (allows dup)
{ $addToSet: { arr: v } }                     // add if unique only
{ $push: { arr: { $each:[a,b], $position:0, $sort:1, $slice:-n } } }

// ── ARRAY REMOVE ──────────────────────────────────────────
{ $pop:     { arr: 1 } }                      // remove last (−1=first)
{ $pull:    { arr: v } }                      // remove by value/condition
{ $pullAll: { arr: [v1,v2] } }               // remove multiple values

// ── ARRAY UPDATE ──────────────────────────────────────────
{ $set: { "arr.0": v } }                     // update by index
{ $set: { "arr.$": v } }                     // update matched element
{ $set: { "arr.$[]": v } }                   // update ALL elements
// arrayFilters for conditional element update

// ── ARRAY QUERY ─────────────────────────────────────────
{ arr: v }                                   // contains value
{ arr: { $all: [a,b] } }                    // contains ALL values
{ arr: { $size: n } }                       // length = n
{ arr: { $elemMatch: {f1:v1,f2:v2} } }     // single element matches all

// ── NESTED ────────────────────────────────────────────────
{ "parent.child": val }                      // dot notation query
{ $set: { "parent.child": val } }           // dot notation update

// ── INSERT vs UPDATE ──────────────────────────────────────
insertOne({doc})                             // always creates new
updateOne({f},{$set:{..}})                  // modifies only
updateOne({f},{$set:{..}},{upsert:true})    // update or create
replaceOne({f},{newDoc})                    // replace entire doc
```

---

*Notes built from live MongoDB shell practice — prabs, 2025*