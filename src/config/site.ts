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
  url: "https://studio-kb-beauty.vercel.app", // TODO: trocar pelo domínio final
  locale: "pt_BR",

  region: "Zona Leste de São Paulo",
  regionNote: "O endereço é enviado no momento do agendamento.",

  contact: {
    whatsapp: "5511985105286", // formato internacional: 55 + DDD + número
    whatsappDisplay: "(11) 98510-5286",
    instagram: "desiigner_kb",
  },

  /** Crédito discreto no rodapé, que também leva clientes até você. */
  credits: {
    label: "Tiago Pereira",
    url: "https://github.com/TiagoPesouzaa",
  },
} as const;
