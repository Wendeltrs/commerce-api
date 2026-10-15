import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated/prisma/client'
import { firstValueFrom } from 'rxjs'
import { CalculateShippingDto } from 'src/modules/orders/dto/calculate-shipping.dto'

@Injectable()
export class ShippingService {
  constructor(private http: HttpService) {}

  async calculate(from: string, to: string, products: CalculateShippingDto[]) {
    const response = await firstValueFrom(
      this.http.post(
        `${process.env.DELIVERY_URL || process.env.DELIVERY_SANDBOX_URL}`,
        {
          from: {
            postal_code: from,
          },
          to: {
            postal_code: to,
          },
          products,
        },
        {
          headers: {
            Authorization: `Bearer ${
              process.env.DELIVERY_ACCESS_TOKEN || process.env.DELIVERY_SANDBOX_ACCESS_TOKEN
            }`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': process.env.DELIVERY_USER_AGENT,
          },
        },
      ),
    )

    return response.data
      .filter((shipping) => !shipping.error)
      .map((shipping) => ({
        serviceId: String(shipping.id),
        name: shipping.name,
        price: Number(shipping.price),
        deliveryTime: shipping.delivery_time,
        companyName: shipping.company.name,
      }))
  }

  async cart(
    company: Prisma.CompanyGetPayload<{
      include: {
        user: true
        address: true
      }
    }>,
    to: Prisma.AddressGetPayload<{
      include: {
        user: true
      }
    }>,
    service: string,
    products: {
      name: string
      unitary_value: number
      quantity: number
    }[],
    volumes: {
      weight: number
      width: number
      height: number
      length: number
    }[],
    insuranceValue: number,
  ): Promise<{ id: string }> {
    if (!company.user || !company.address) {
      throw new Error('Company user or address not found')
    }

    const response = await firstValueFrom(
      this.http.post(
        `${process.env.DELIVERY_CART_URL || process.env.DELIVERY_SANDBOX_CART_URL}`,
        {
          from: {
            name: company.name,
            phone: company.phone,
            document: company.user.document,
            company_document: company.document,
            address: company.address.name,
            complement: company.address.complement,
            number: company.address.number,
            district: company.address.neighborhood,
            city: company.address.city,
            country_id: company.address.country_id,
            postal_code: company.address.zipCode,
            state_abbr: company.address.state_abbr,
          },
          to: {
            name: to.user.name,
            document: to.user.document,
            phone: to.user.phone,
            address: to.name,
            complement: to.complement,
            number: to.number,
            district: to.neighborhood,
            city: to.city,
            country_id: to.country_id,
            postal_code: to.zipCode,
            state_abbr: to.state_abbr,
          },
          options: {
            receipt: true,
            own_hand: true,
            reverse: true,
            non_commercial: true,
            insurance_value: insuranceValue,
          },
          service,
          products,
          volumes,
        },
        {
          headers: {
            Authorization: `Bearer ${
              process.env.DELIVERY_ACCESS_TOKEN || process.env.DELIVERY_SANDBOX_ACCESS_TOKEN
            }`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': process.env.DELIVERY_USER_AGENT,
          },
        },
      ),
    )

    return {
      id: response.data.id,
    }
  }

  async checkout(orderIds: string[]) {
    const response = await firstValueFrom(
      this.http.post(
        `${process.env.DELIVERY_CHECKOUT_URL || process.env.DELIVERY_SANDBOX_CHECKOUT_URL}`,
        {
          orders: orderIds,
        },
        {
          headers: {
            Authorization: `Bearer ${
              process.env.DELIVERY_ACCESS_TOKEN || process.env.DELIVERY_SANDBOX_ACCESS_TOKEN
            }`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': process.env.DELIVERY_USER_AGENT,
          },
        },
      ),
    )

    return response.data
  }
}
