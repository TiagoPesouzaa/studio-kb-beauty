/**
 * Tipos do domínio do site.
 * Eles descrevem o formato do conteúdo; os componentes só aceitam dados nesse formato.
 */

export type Service = {
  /** Identificador único, usado em links e no nome da foto (ex.: "volume-4d"). */
  slug: string;
  name: string;
  /** Opcional: serviços sem descrição mostram apenas o nome. */
  description?: string;
  /** Caminho da foto dentro de /public (ex.: "/images/servicos/volume-4d.jpg"). */
  image?: string;
  comingSoon?: boolean;
};

export type ServiceCategory = {
  id: string;
  title: string;
  services: Service[];
};

export type GalleryImage = {
  /** Sem `src`, o site mostra um espaço reservado no lugar da foto. */
  src?: string;
  alt: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  author: string;
  text: string;
};

export type NavLink = {
  href: string;
  label: string;
};

/** Imagem com dimensões conhecidas (evita o layout "pular" enquanto carrega). */
export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
