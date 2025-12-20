import { db } from '../lib/db'
import { videos } from '../lib/db/schema'

async function clearVideosTable() {
  try {
    console.log('Clearing videos table...\n')
    
    const result = await db.delete(videos)
    
    console.log('✅ Videos table cleared successfully!')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    process.exit(0)
  }
}

clearVideosTable()
