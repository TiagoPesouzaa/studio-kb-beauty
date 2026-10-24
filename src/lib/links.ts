import { siteConfig } from "@/config/site";

/** Links externos do negócio, montados a partir do siteConfig. */

const DEFAULT_MESSAGE = "Oi! Vim pelo site e quero agendar um horário.";

/**
 * Link do WhatsApp com a mensagem já escrita.
 * `encodeURIComponent` converte espaços e acentos para o formato de URL.
 */
export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Mensagem pronta para um serviço específico. */
export function whatsappLinkForService(serviceName: string): string {
  return whatsappLink(`Oi! Vim pelo site e quero agendar ${serviceName}.`);
}

/** WhatsApp de quem fez o site, já com a mensagem de quem quer um site também. */
export function creditsLink(): string {
  const message = `Oi, Tiago! Vi o site do ${siteConfig.name} e quero um site também.`;
  return `https://wa.me/${siteConfig.credits.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function instagramLink(): string {
  return `https://instagram.com/${siteConfig.contact.instagram}`;
}
