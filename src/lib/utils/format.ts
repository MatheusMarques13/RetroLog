import { formatDistanceToNow, format } from 'date-fns'

export function timeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy')
}

export function formatDateShort(date: string): string {
  return format(new Date(date), 'MMM yyyy')
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural ?? singular + 's'}`
}
