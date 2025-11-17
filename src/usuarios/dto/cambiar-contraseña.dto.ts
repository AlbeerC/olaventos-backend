import { IsString, MinLength } from 'class-validator'

export class ChangePasswordDto {
  @IsString()
  actual: string

  @IsString()
  @MinLength(6)
  nueva: string
}
