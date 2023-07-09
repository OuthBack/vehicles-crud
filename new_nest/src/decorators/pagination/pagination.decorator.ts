import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationType {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationType => {
    const request = ctx.switchToHttp().getRequest();
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 10;

    return {
      page,
      limit,
    };
  },
);
