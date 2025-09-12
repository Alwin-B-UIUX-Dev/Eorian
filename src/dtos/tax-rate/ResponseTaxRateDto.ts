import { z } from 'zod';

const ResponseTaxRateSchema = z.object({
  id: z.string(),
  name: z.string(),
  rate: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()])
});

export type ResponseTaxRateSchemaType = z.infer<typeof ResponseTaxRateSchema>;

export class ResponseTaxRateDto {
  public readonly id: string;
  public readonly name: string;
  public readonly rate: string;
  public readonly description: string;
  public readonly isActive: boolean;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  constructor(data: unknown) {
    const v = ResponseTaxRateSchema.parse(data);
    this.id = v.id;
    this.name = v.name;
    this.rate = v.rate;
    this.description = v.description;
    this.isActive = v.isActive;
    this.createdAt = typeof v.createdAt === 'string' ? v.createdAt : v.createdAt.toISOString();
    this.updatedAt = typeof v.updatedAt === 'string' ? v.updatedAt : v.updatedAt.toISOString();
  }
}
