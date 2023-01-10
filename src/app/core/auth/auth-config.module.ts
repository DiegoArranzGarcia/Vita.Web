
import { NgModule } from '@angular/core';
import { Configuration } from '../configuration/configuration.model';
import { ConfigurationService } from '../configuration/configuration.service';
import { AuthInterceptor, AuthModule, LogLevel, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const httpLoaderFactory = (configurationService: ConfigurationService) => {
  const config$ = configurationService.loadConfiguration().pipe(
    map((configuration: Configuration) => {
      return {
        authority: configuration.oidcEndpoint,
        stsServer: configuration.oidcEndpoint,
        redirectUrl: window.location.origin + '/login',
        postLogoutRedirectUri: window.location.origin + '/login',
        clientId: 'vita.spa',
        scope: 'openid profile goals',
        responseType: 'code',
        silentRenew: false,
        useRefreshToken: false,
        logLevel: LogLevel.Debug,
        secureRoutes: [configuration.vitaApiEndpoint],
        forbiddenRoute: '/forbidden',
        postLoginRoute: '/goals',
        unauthorizedRoute: '/unauthorized',
        startCheckSession: true,    
        maxIdTokenIatOffsetAllowedInSeconds: 10,
        historyCleanupOff: true,
      };
    })
  );

  return new StsConfigHttpLoader(config$);
};

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: httpLoaderFactory,
        deps: [ConfigurationService],
      },
    }),
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [AuthModule],
})

export class AuthConfigModule {}