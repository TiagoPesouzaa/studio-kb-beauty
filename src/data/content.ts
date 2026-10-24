import type { FaqItem, GalleryImage, ImageAsset, NavLink, Testimonial } from "@/types";
import { siteConfig } from "@/config/site";

/**
 * Todos os textos e imagens das seções.
 * Os componentes não têm texto de cliente: tudo que muda de um site para outro fica aqui.
 */

export const navigation: NavLink[] = [
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#sobre", label: "Sobre" },
  { href: "#duvidas", label: "Dúvidas" },
];

export const cta = {
  label: "Agendar pelo WhatsApp",
  shortLabel: "Agendar",
};

export const hero = {
  /** Cada item vira uma linha do título */
  titleLines: ["Studio", "KB Beauty"],
  /** Foto recortada (fundo transparente), gerada por scripts/optimize_photos.py */
  image: {
    src: "/images/hero/kb.webp",
    alt: "Profissional do Studio KB Beauty",
    width: 750,
    height: 1000,
  } satisfies ImageAsset,
};

export const servicesSection = {
  title: "Serviços",
  subtitle: "Escolha o serviço e agende direto pelo WhatsApp. Os valores são passados na conversa.",
};

export const gallerySection = {
  title: "Galeria",
  subtitle: "Alguns resultados do estúdio.",
};

/** Galeria (fotos em retrato 4:5), geradas por scripts/optimize_photos.py */
export const gallery: GalleryImage[] = [
  { src: "/images/galeria/01.webp", alt: "Microblading: antes e depois" },
  { src: "/images/galeria/02.webp", alt: "Extensão de cílios com volume" },
  { src: "/images/galeria/03.webp", alt: "Cílios e sobrancelhas, resultado finalizado" },
  { src: "/images/galeria/04.webp", alt: "Cílios e sobrancelhas, resultado finalizado" },
  { src: "/images/galeria/05.webp", alt: "Design de sobrancelhas em duas clientes" },
  { src: "/images/galeria/06.webp", alt: "Design de sobrancelhas, resultado finalizado" },
];

export const about = {
  title: "Sobre o estúdio",
  // TODO: trocar por um texto dela, em primeira pessoa (trajetória, cursos, o que ama no trabalho)
  paragraphs: [
    `O ${siteConfig.name} é dedicado a cílios e sobrancelhas: técnicas de extensão, lash lifting, design, brow lamination e micropigmentação.`,
    "Cada atendimento começa entendendo o seu rosto e o efeito que você quer, para chegar a um resultado que combine com você.",
  ],
  image: {
    src: "/images/sobre/perfil.webp",
    alt: "Profissional do Studio KB Beauty com pinça e cílios na mão",
  } as GalleryImage,
};

export const testimonialsSection = {
  title: "Quem já passou por aqui",
};

/** Depoimentos reais de clientes. Enquanto a lista estiver vazia, a seção não aparece. */
export const testimonials: Testimonial[] = [];

export const faqSection = {
  title: "Dúvidas frequentes",
};

export const faq: FaqItem[] = [
  {
    question: "Como faço para agendar?",
    answer:
      "Pelo WhatsApp. Escolha o serviço aqui no site e toque em Agendar: a mensagem já vai pronta.",
  },
  {
    question: "Onde é o atendimento?",
    answer: `Na ${siteConfig.region}. ${siteConfig.regionNote}`,
  },
  {
    question: "Quanto custa cada serviço?",
    answer: "Os valores são passados pelo WhatsApp, junto com os horários disponíveis.",
  },
  {
    question: "Não sei qual técnica de cílios escolher. E agora?",
    answer:
      "Sem problema. Conte no WhatsApp o efeito que você gosta, mais natural ou mais marcado, e eu indico a técnica ideal para você.",
  },
];

export const footer = {
  title: "Vamos cuidar do seu olhar?",
};
