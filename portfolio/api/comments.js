import { CosmosClient } from '@azure/cosmos'

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
})

const container = client
  .database(process.env.COSMOS_DB_NAME || 'radumitreadb')
  .container(process.env.COSMOS_CONTAINER_NAME || 'comments')

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // ── GET — fetch approved comments for a slug ─────────────────────────────
  if (req.method === 'GET') {
    const { slug } = req.query
    if (!slug) return res.status(400).json({ error: 'slug is required' })

    try {
      const { resources } = await container.items
        .query({
          query: `SELECT c.id, c.author, c.message, c.createdon
                  FROM c
                  WHERE c.slug = @slug AND c.approved = true
                  ORDER BY c.createdon ASC`,
          parameters: [{ name: '@slug', value: slug }],
        })
        .fetchAll()

      return res.status(200).json(resources)
    } catch (err) {
      console.error('[Comments GET]', err)
      return res.status(500).json({ error: 'Failed to fetch comments' })
    }
  }

  // ── POST — submit a new comment ──────────────────────────────────────────
  if (req.method === 'POST') {
    const { slug, author, email, message } = req.body ?? {}

    // Validation
    if (!slug || !author?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }
    if (message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' })
    }
    if (author.trim().length > 100 || message.trim().length > 2000) {
      return res.status(400).json({ error: 'Input exceeds maximum length' })
    }

    const comment = {
      id: crypto.randomUUID(),
      slug: slug.trim(),
      author: author.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      approved: null,
      createdon: new Date().toISOString(),
    }

    try {
      await container.items.create(comment)
      return res.status(201).json({ success: true })
    } catch (err) {
      console.error('[Comments POST]', err)
      return res.status(500).json({ error: 'Failed to submit comment' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
