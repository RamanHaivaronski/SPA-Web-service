import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../clients/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }