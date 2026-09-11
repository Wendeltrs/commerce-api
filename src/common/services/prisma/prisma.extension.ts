import { Prisma } from 'prisma/generated/prisma/browser'

type FindManyArgs<T, A> = Prisma.Exact<A, Prisma.Args<T, 'findMany'>>
type FindManyAndCountResult<T, A> = [Prisma.Result<T, A, 'findMany'>, number]

export async function findManyAndCount<T, A>(
  this: T,
  args: FindManyArgs<T, A>,
): Promise<FindManyAndCountResult<T, A>> {
  return Promise.all([
    (this as any).findMany(args),
    (this as any).count({ where: (args as any).where }),
  ])
}
