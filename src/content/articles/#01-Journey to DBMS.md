#01 — Satisfying my curiosity for DBMSs Building a B+Tree from scratch in Go

Fun fact about the diagram below: it has a WRONG path in it. I drew it while implementing the insert flow, and only when I traced it against my code did I notice the leaf path should never flow into "Find Child" — that arrow belongs to internal nodes only. Drawing the diagram taught me more than writing the code did.

Why am I doing this? I've always wanted to go underneath DBMS internals. But a friend gave me advice I keep coming back to: before going deep, get the complete high-level vision first. Why do we even use a DBMS when just storing data isn't that hard? What makes it complex? Why so many variants — OLTP, OLAP, and everything between?

So I put together a path, and one of its resources is "Build Your Own Database From Scratch in Go." I'm implementing a small DB I call "YousDB" — a KV store on top of a B+Tree. The goal isn't the code itself; it's to see exactly how transactions work, and to watch a query move through my own functions the way I'd trace a LeetCode solution. From there: query languages and the relational model.

The path so far: → DB normalization (Mohamed El-Dosoky's playlist on YouTube) → Now: implementing YousDB following the book → Next: linking my implementation to concepts as I meet them, and breaking/editing YousDB to see how it handles real problems

Then I can move into the internals of real systems — PostgreSQL, DuckDB, ClickHouse.

Editing my own DB to see what breaks seems way more fun than just reading about it.

#golang #databases #buildinpublic #dbms