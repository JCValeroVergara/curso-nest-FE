import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';


export class UpdateCarDto {

  @IsString()
  @IsUUID()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  readonly model?: string;

  @IsInt()
  @IsOptional()
  readonly year?: string;
} 