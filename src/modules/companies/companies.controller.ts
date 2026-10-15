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
import { Company } from 'src/models/company'
import { CompaniesService } from './companies.service'
import { CompanyDto } from './dto/company.dto'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

@Controller({ path: 'companies', version: '1' })
@UseGuards(JwtAuthGuard)
@UseInterceptors(ValidateIdInterceptor)
@Serializer(Company)
@ApiCookieAuth(ACCESS_TOKEN)
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  @ApiPaginatedResponse(CompanyDto)
  @Paginator()
  async getAll(@QueryPaginator() query?: QueryDto) {
    return await this.companiesService.getAll(query)
  }

  @Get(':companyId')
  @ApiResponse({ type: CompanyDto, status: HttpStatus.OK })
  @ValidateId()
  async get(@Param('companyId', ParseUUIDPipe) id: string) {
    return await this.companiesService.get(id)
  }

  @Post()
  @ApiResponse({ type: CompanyDto, status: HttpStatus.CREATED })
  async create(@Body() data: CreateCompanyDto) {
    return await this.companiesService.create(data)
  }

  @Put(':companyId')
  @ApiResponse({ type: CompanyDto, status: HttpStatus.OK })
  @ValidateId()
  async update(@Param('companyId', ParseUUIDPipe) id: string, @Body() data: UpdateCompanyDto) {
    return await this.companiesService.update(id, data)
  }

  @Delete(':companyId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateId()
  async delete(@Param('companyId', ParseUUIDPipe) id: string) {
    return await this.companiesService.delete(id)
  }
}
