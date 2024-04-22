import { SetMetadata } from '@nestjs/common'
import {Role} from '../enums/role.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles:Role[]) => SetMetadata('roles',roles); // receberá vários roles e com setmetadate vai criar vários objetos. O primeiro roles se refere a chave, e o segundo é valor.