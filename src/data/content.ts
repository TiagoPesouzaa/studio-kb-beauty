import type { FaqItem, GalleryImage, Testimonial } from "@/types";
import { siteConfig } from "@/config/site";

/**
 * Galeria. Para adicionar fotos: salve em /public/images/galeria/
 * e preencha `src` (ex.: "/images/galeria/01.jpg").
 */
export const gallery: GalleryImage[] = [
  { alt: "Extensão de cílios, resultado 1" },
  { alt: "Extensão de cílios, resultado 2" },
  { alt: "Design de sobrancelhas, resultado 1" },
  { alt: "Lash lifting, resultado 1" },
  { alt: "Brow lamination, resultado 1" },
  { alt: "Microblading, resultado 1" },
];

export const about = {
  title: "Sobre o estúdio",
  // TODO: trocar por um texto dela, em primeira pessoa (trajetória, cursos, o que ama no trabalho)
  paragraphs: [
    `O ${siteConfig.name} é dedicado a cílios e sobrancelhas: técnicas de extensão, lash lifting, design, brow lamination e micropigmentação.`,
    "Cada atendimento começa entendendo o seu rosto e o efeito que você quer, para chegar a um resultado que combine com você.",
  ],
  image: undefined as string | undefined, // ex.: "/images/sobre/perfil.jpg"
};

/** Depoimentos reais de clientes. Enquanto a lista estiver vazia, a seção não aparece. */
export const testimonials: Testimonial[] = [];

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
