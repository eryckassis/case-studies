export type HeaderBrandProps = Readonly<{
  brand: readonly [firstLine: string, secondLine: string];
}>;

export type HeaderNavProps = Readonly<{
  menuHref: string;
  contactHref: string;
}>;

export type LocalTimeProps = Readonly<{
  label?: string;
}>;

export type SiteHeaderProps = HeaderBrandProps & HeaderNavProps;
