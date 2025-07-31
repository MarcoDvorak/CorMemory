import type { Memory, Photo } from '@/app/types/memory'
import type { Database } from './database.types'

type MemoryRow = Database['public']['Tables']['memories']['Row']
type MemoryInsert = Database['public']['Tables']['memories']['Insert']

/**
 * Convert a database row to a Memory object
 */
export function dbRowToMemory(row: MemoryRow): Memory {
  const additionalPhotos = row.additional_photos 
    ? (row.additional_photos as Photo[])
    : undefined

  return {
    id: row.id,
    coverPhoto: {
      url: row.cover_photo_url,
      aspectRatio: row.cover_photo_aspect_ratio
    },
    additionalPhotos,
    note: row.note || undefined,
    tags: row.tags,
    location: {
      name: row.location_name,
      coordinates: {
        lat: row.location_lat,
        lng: row.location_lng
      },
      placeId: row.location_place_id
    },
    collection: row.collection as Memory['collection'],
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at)
  }
}

/**
 * Convert a Memory object to a database insert object
 */
export function memoryToDbInsert(memory: Memory): MemoryInsert {
  return {
    id: memory.id,
    cover_photo_url: memory.coverPhoto.url,
    cover_photo_aspect_ratio: memory.coverPhoto.aspectRatio,
    additional_photos: memory.additionalPhotos || null,
    note: memory.note || null,
    tags: memory.tags,
    location_name: memory.location.name,
    location_lat: memory.location.coordinates.lat,
    location_lng: memory.location.coordinates.lng,
    location_place_id: memory.location.placeId,
    collection: memory.collection || null,
    created_at: memory.createdAt.toISOString(),
    updated_at: memory.updatedAt.toISOString()
  }
}

/**
 * Convert a Memory object to a database update object
 */
export function memoryToDbUpdate(memory: Partial<Memory>): Database['public']['Tables']['memories']['Update'] {
  const update: Database['public']['Tables']['memories']['Update'] = {}

  if (memory.id) update.id = memory.id
  if (memory.coverPhoto) {
    update.cover_photo_url = memory.coverPhoto.url
    update.cover_photo_aspect_ratio = memory.coverPhoto.aspectRatio
  }
  if (memory.additionalPhotos !== undefined) {
    update.additional_photos = memory.additionalPhotos || null
  }
  if (memory.note !== undefined) {
    update.note = memory.note || null
  }
  if (memory.tags) update.tags = memory.tags
  if (memory.location) {
    update.location_name = memory.location.name
    update.location_lat = memory.location.coordinates.lat
    update.location_lng = memory.location.coordinates.lng
    update.location_place_id = memory.location.placeId
  }
  if (memory.collection !== undefined) {
    update.collection = memory.collection || null
  }
  if (memory.updatedAt) {
    update.updated_at = memory.updatedAt.toISOString()
  }

  return update
}