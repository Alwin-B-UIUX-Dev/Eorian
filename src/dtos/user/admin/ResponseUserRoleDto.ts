import { z } from 'zod';

const ResponseUserRoleSchema = z.object({
  id: z.string(),
  roleName: z.string(),
  description: z.string().optional(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()])
});

export type ResponseUserRoleSchemaType = z.infer<typeof ResponseUserRoleSchema>;

export class ResponseUserRoleDto {
  public readonly id: string;
  public readonly roleName: string;
  public readonly description?: string | undefined;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  constructor(data: unknown) {
    const v = ResponseUserRoleSchema.parse(data);
    this.id = v.id;
    this.roleName = v.roleName;
    this.description = v.description;
    this.createdAt = typeof v.createdAt === 'string' ? v.createdAt : v.createdAt.toISOString();
    this.updatedAt = typeof v.updatedAt === 'string' ? v.updatedAt : v.updatedAt.toISOString();
  }
}
