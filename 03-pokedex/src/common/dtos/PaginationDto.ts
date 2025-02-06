import {  } from '@nestjs/common';
import { IsPositive, Min, IsOptional } from 'class-validator';


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;
    
    
    @IsOptional()
    @IsPositive()
    offset?: number;
}