export class QueryDto {
  skip: number
  take: number
  orderBy: Record<string, 'asc' | 'desc'>
  where: Record<string, string>
}
