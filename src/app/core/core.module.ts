import { Optional, SkipSelf, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { ConfigurationService } from './configuration/configuration.service';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [    
    ConfigurationService,
    UserService,
    AuthConfigModule 
  ],
  exports: [AuthConfigModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) throw new Error('Core is already loaded. Import it in the AppModule only');
  }
}
