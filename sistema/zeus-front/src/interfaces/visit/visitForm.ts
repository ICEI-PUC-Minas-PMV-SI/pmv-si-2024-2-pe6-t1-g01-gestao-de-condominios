import type { VisitStatus } from './visitStatus'

export default interface VisitForm {
  id: number | null,
  visitorId: number | null,
  userId: number | null,
  status: VisitStatus,
  visitedAt: Date | null
}