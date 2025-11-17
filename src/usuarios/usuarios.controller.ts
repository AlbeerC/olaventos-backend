import { Controller, Get, Post, Put, Delete, Patch, Param, Body, UseGuards } from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { Usuario } from './usuario.entity'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/dto.update'
import { ChangePasswordDto } from './dto/cambiar-contraseña.dto'
import { Req } from '@nestjs/common'

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll()
  }

  @Get('organizadores')
  findOrganizadores() {
    return this.usuariosService.findOrganizadores()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id)
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Usuario>) {
    return this.usuariosService.update(+id, updateData)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id)
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.usuariosService.approve(+id)
  }

  // PATCH /usuarios/me
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(@Req() req, @Body() dto: UpdateUserDto) {
    return this.usuariosService.updateUser(req.user.userId, dto)
  }

  // PATCH /usuarios/me/password
  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    return this.usuariosService.changePassword(req.user.userId, dto)
  }
}
