
import { db } from '../lib/db';
import { chats } from '../lib/db/schema';
import { count } from 'drizzle-orm';

async function runTest() {
  console.log('🧪 Starting Database Connection Test...');
  
  try {
    // Check if we can connect and query
    const result = await db.select({ count: count() }).from(chats);
    console.log('✅ Database connection successful!');
    console.log(`📊 Current chat count: ${result[0].count}`);
    
    console.log('✅ Schema validation passed (imports worked)');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
}

runTest();
