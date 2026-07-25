---
title: How this site publishes articles
description: A short note on the setup, and how to write the next one
date: 2026-07-25
tags: [meta, workflow]
lang: en
draft: false
---

This is a placeholder so the writing section has something in it. Delete it once you have written something real.

## Publishing a new article

Create a file in `src/content/articles/`. The filename becomes the URL, so `scheduler-design.md` is served at `/writing/scheduler-design`. Commit it, push, and Vercel does the rest — there is no database, no admin panel, and nothing to log into.

Every file opens with a frontmatter block:

```
---
title: Writing a scheduler that does not lie to you
description: On why naive round-robin is a trap
date: 2026-08-01
tags: [systems, os]
lang: en
draft: false
---
```

Set `draft: true` while you are still working. Drafts render on your local dev server and are stripped from the production build, so you can push work in progress without publishing it.

## What you can write

Standard markdown. Headings, lists, links, blockquotes, and fenced code blocks. Code renders in a bordered block with the language shown in the corner — there is no token colouring, which keeps the bundle small. Say the word if you want it added:

```go
func (s *Server) handle(conn net.Conn) {
	defer conn.Close()
	for {
		msg, err := s.read(conn)
		if err != nil {
			return
		}
		s.route(msg)
	}
}
```

> Blockquotes are styled with a rule on the leading edge, and they flip to the right side automatically in Arabic.

Set `lang: ar` in the frontmatter for an Arabic article and the reader switches to right-to-left with the Arabic typeface. Reading time is calculated from the word count, so you never have to set it yourself.
