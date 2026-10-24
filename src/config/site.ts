/**
 * Identidade e contatos do negócio.
 * Para reaproveitar o template em outro cliente, comece trocando este arquivo.
 */
export const siteConfig = {
  name: "Studio KB Beauty",
  shortName: "KB Beauty",
  tagline: "Cílios e sobrancelhas feitos sob medida para o seu olhar.",
  description:
    "Studio KB Beauty: extensão de cílios, lash lifting, design de sobrancelhas, brow lamination e microblading na Zona Leste de São Paulo. Agendamento pelo WhatsApp.",
  url: "https://studio-kb-beauty.tiago22-p-s.workers.dev", // TODO: trocar quando tiver domínio próprio
  locale: "pt_BR",
  /** Tipo do negócio para o Google (schema.org): BeautySalon, Restaurant, BarberShop... */
  schemaType: "BeautySalon",

  theme: {
    /** Cor da barra do navegador no celular (use o --color-surface) */
    color: "#ffe6f2",
    /** Fontes do Google usadas em --font-display e --font-sans */
    fontsHref:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Montserrat:wght@400;500;600&display=swap",
  },

  region: "Zona Leste de São Paulo",
  regionNote: "O endereço é enviado no momento do agendamento.",

  contact: {
    whatsapp: "5511985105286", // formato internacional: 55 + DDD + número
    whatsappDisplay: "(11) 98510-5286",
    instagram: "desiigner__kb",
  },

  /** Crédito discreto no rodapé: leva para o WhatsApp de quem fez o site. */
  credits: {
    label: "Tiago Pereira",
    whatsapp: "5511972793305",
  },
} as const;
