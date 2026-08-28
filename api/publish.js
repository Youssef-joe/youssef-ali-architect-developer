/**
 * Vercel Serverless Function to publish a markdown article directly to GitHub.
 * 
 * Required Environment Variables:
 * - ADMIN_PASSWORD
 * - GITHUB_TOKEN (Needs repo access)
 * - GITHUB_REPO (e.g. "youssef-joe/youssef-ali-architect-developer")
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, title, description, tags, lang, body, slug } = req.body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!title || !body || !slug) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!repo || !token) {
    return res.status(500).json({ error: 'Server configuration missing (GITHUB_REPO or GITHUB_TOKEN)' });
  }

  // Format tags array to YAML string
  const tagsString = Array.isArray(tags) 
    ? `[${tags.map(t => `"${t.trim()}"`).join(', ')}]` 
    : `[]`;

  // Construct Markdown Frontmatter
  const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const content = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${(description || '').replace(/"/g, '\\"')}"
date: ${dateStr}
tags: ${tagsString}
lang: ${lang || 'en'}
draft: false
---

${body}
`;

  const path = `src/content/articles/${slug}.md`;
  
  // GitHub API requires base64 encoded content
  const encodedContent = Buffer.from(content).toString('base64');

  try {
    // Check if file already exists (to get SHA for updating, though we expect a new file usually)
    const checkRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Vercel-Serverless-Function'
      }
    });

    let sha = undefined;
    if (checkRes.ok) {
      const fileData = await checkRes.json();
      sha = fileData.sha;
    }

    // Create or Update file
    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Serverless-Function'
      },
      body: JSON.stringify({
        message: `Publish article: ${title}`,
        content: encodedContent,
        sha: sha // Only included if file exists
      })
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      console.error('GitHub API Error:', errData);
      return res.status(putRes.status).json({ error: 'Failed to commit to GitHub', details: errData });
    }

    return res.status(200).json({ success: true, message: 'Article published successfully' });
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
