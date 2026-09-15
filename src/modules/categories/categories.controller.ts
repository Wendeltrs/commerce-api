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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger'
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response/api-paginated-response.decorator'
import { Paginator } from 'src/common/decorators/paginator/paginator.decorator'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { QueryPaginator } from 'src/common/decorators/query/query.decorator'
import { Serializer } from 'src/common/decorators/serializer/serializer.decorator'
import { ValidateId } from 'src/common/decorators/validate-id/validate-id.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard'
import { ValidateIdInterceptor } from 'src/common/interceptors/validate-id/validate-id.interceptor'
import { ACCESS_TOKEN } from 'src/consts'
import { Category } from 'src/models/category'
import { CategoriesService } from './categories.service'
import { CategoryDto } from './dto/category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller({ path: 'categories', version: '1' })
@UseInterceptors(ValidateIdInterceptor)
@UseGuards(JwtAuthGuard)
@ApiCookieAuth(ACCESS_TOKEN)
@Serializer(Category)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @Paginator()
  @ApiPaginatedResponse(CategoryDto)
  async getAll(@QueryPaginator() query?: QueryDto) {
    return await this.categoriesService.getAll(query)
  }

  @Get(':categoryId')
  @ValidateId()
  @ApiResponse({ type: CategoryDto, status: HttpStatus.OK })
  async get(@Param('categoryId', ParseUUIDPipe) id: string) {
    return await this.categoriesService.get(id)
  }

  @Post()
  @ApiResponse({ type: CategoryDto, status: HttpStatus.CREATED })
  async create(@Body() data: CreateCategoryDto) {
    return await this.categoriesService.create(data)
  }

  @Put(':categoryId')
  @ValidateId()
  @ApiResponse({ type: CategoryDto, status: HttpStatus.OK })
  async update(@Param('categoryId', ParseUUIDPipe) id: string, @Body() data: UpdateCategoryDto) {
    return await this.categoriesService.update(id, data)
  }

  @Delete(':categoryId')
  @ValidateId()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('categoryId', ParseUUIDPipe) id: string) {
    await this.categoriesService.delete(id)
  }
}
