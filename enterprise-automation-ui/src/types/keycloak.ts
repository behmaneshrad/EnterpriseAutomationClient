export interface KeycloakProfile {
  sub: string;
  name?: string;
  email?: string;
  preferred_username?: string;
  realm_access?: {
    roles: string[];
  };
}

export interface KeycloakAccount {
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
}
