import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger'
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response/api-paginated-response.decorator'
import { Paginator } from 'src/common/decorators/paginator/paginator.decorator'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { QueryPaginator } from 'src/common/decorators/query/query.decorator'
import { Serializer } from 'src/common/decorators/serializer/serializer.decorator'
import { User } from 'src/models/user'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiPaginatedResponse(UserDto)
  @Paginator()
  @Serializer(User)
  public async getAll(@QueryPaginator() query?: QueryDto) {
    return await this.usersService.getAll(query)
  }

  @Get(':userId')
  @ApiResponse({ type: UserDto, status: HttpStatus.OK })
  public async getById(@Param('userId', ParseUUIDPipe) id: string) {
    return await this.usersService.getById(id)
  }

  @Get('/email/:email')
  @ApiResponse({ type: UserDto, status: HttpStatus.OK })
  public async getByEmail(@Param('email') email: string) {
    return await this.usersService.getByEmail(email)
  }

  @Post()
  @ApiResponse({ type: UserDto, status: HttpStatus.CREATED })
  public async create(@Body() data: CreateUserDto) {
    return await this.usersService.create(data)
  }

  @Post('avatar')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: UserDto, description: 'Upload user avatar', status: HttpStatus.OK })
  @ApiResponse({ description: 'Error uploading user avatar', status: HttpStatus.BAD_REQUEST })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return await this.usersService.uploadAvatar(file)
  }

  @Put(':userId')
  @ApiResponse({ type: UserDto, status: HttpStatus.OK })
  public async update(@Param('userId', ParseUUIDPipe) id: string, @Body() data: UpdateUserDto) {
    return await this.usersService.update(id, data)
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('userId', ParseUUIDPipe) id: string) {
    await this.usersService.delete(id)
  }
}
