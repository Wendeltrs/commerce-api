import { Module } from '@nestjs/common'
import { createClient } from 'redis'
import { REDIS_CLIENT } from 'src/consts'

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        const client = createClient({
          url: process.env.REDIS_URL,
        })

        await client.connect()

        return client
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
