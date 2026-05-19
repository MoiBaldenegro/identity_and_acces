import { Module } from '@nestjs/common';
import { GlobalModule } from './global/global.module';
import { SharedModule } from './modules/shared/shared.module';
import { BoundedModule } from './modules/bounded/bounded.module';

@Module({
  imports: [GlobalModule, SharedModule, BoundedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
