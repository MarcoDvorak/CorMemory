/**
 * Simple test script to verify Supabase database connection
 * Run this in the browser console or as a Node.js script to test the connection
 */

import { supabase } from './supabase'

export async function testDatabaseConnection() {
  console.log('🔍 Testing Supabase database connection...')
  
  try {
    // Test 1: Check if we can connect to Supabase
    console.log('1. Testing basic connection...')
    const { data: healthCheck, error: healthError } = await supabase
      .from('memories')
      .select('count', { count: 'exact', head: true })
    
    if (healthError) {
      throw new Error(`Connection failed: ${healthError.message}`)
    }
    
    console.log('✅ Connection successful!')
    console.log(`📊 Total memories in database: ${healthCheck?.length || 0}`)
    
    // Test 2: Try to fetch a few memories
    console.log('2. Testing data retrieval...')
    const { data: memories, error: fetchError } = await supabase
      .from('memories')
      .select('id, location_name, created_at')
      .limit(3)
    
    if (fetchError) {
      throw new Error(`Data fetch failed: ${fetchError.message}`)
    }
    
    console.log('✅ Data retrieval successful!')
    console.log('📝 Sample memories:', memories)
    
    // Test 3: Test search functionality
    console.log('3. Testing search functionality...')
    const { data: searchResults, error: searchError } = await supabase
      .from('memories')
      .select('id, location_name, tags')
      .contains('tags', ['travel'])
      .limit(2)
    
    if (searchError) {
      console.warn('⚠️ Search test failed:', searchError.message)
    } else {
      console.log('✅ Search functionality working!')
      console.log('🔍 Travel memories found:', searchResults?.length || 0)
    }
    
    console.log('🎉 All database tests passed!')
    return {
      success: true,
      totalMemories: healthCheck?.length || 0,
      sampleMemories: memories || [],
      searchResults: searchResults || []
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
    console.log('\n🔧 Troubleshooting tips:')
    console.log('1. Check your .env.local file has the correct Supabase credentials')
    console.log('2. Verify your Supabase project is active')
    console.log('3. Make sure you ran the database migration')
    console.log('4. Check the browser network tab for detailed error messages')
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Auto-run test if in browser environment
if (typeof window !== 'undefined') {
  console.log('🚀 CorMemory Database Test')
  console.log('Run testDatabaseConnection() to test your database setup')
}