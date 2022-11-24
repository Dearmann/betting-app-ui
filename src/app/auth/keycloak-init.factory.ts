import { KeycloakService } from "keycloak-angular";
import { from, switchMap } from "rxjs";
import { ConfigService } from "../config/config.service";

export function keycloakInit(keycloak: KeycloakService, configService: ConfigService) {

  return () =>
    configService.getConfig()
      .pipe(
        switchMap<any, any>((config) => {
          return from(keycloak.init({
            config: {
              url: config['KEYCLOAK_URL'],
              realm: config['KEYCLOAK_REALM'],
              clientId: config['KEYCLOAK_CLIENT_ID'],
            },
            initOptions: {
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri:
                window.location.origin + '/assets/silent-check-sso.html'
            }
          }))
        })
      ).toPromise()
}