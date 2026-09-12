import { SetMetadata } from '@nestjs/common'
import { VALIDATE_ID } from 'src/consts'

export const ValidateId = (...args: string[]) => SetMetadata(VALIDATE_ID, args)
