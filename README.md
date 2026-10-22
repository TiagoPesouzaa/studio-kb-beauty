# Studio KB Beauty

Site do Studio KB Beauty, estúdio de cílios e sobrancelhas na Zona Leste de São Paulo. Página única, pensada primeiro para o celular e responsiva até o desktop, com agendamento direto pelo WhatsApp.

**Stack:** Astro · Tailwind CSS v4 · TypeScript · deploy na Vercel

## Rodando localmente

Requer Node.js 22.23+ (versão par).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera o site estático em dist/
```

## Arquitetura

O projeto separa **conteúdo**, **regras** e **visual**, para que o mesmo código sirva de template para outros clientes.

```
src/
├── config/site.ts         # identidade do negócio: nome, contatos, região
├── data/                  # conteúdo editável
│   ├── services.ts        #   catálogo de serviços por categoria
│   └── content.ts         #   galeria, sobre, depoimentos e FAQ
├── types/index.ts         # contratos (tipos) do conteúdo
├── lib/whatsapp.ts        # funções puras: links de WhatsApp e Instagram
├── styles/global.css      # design tokens (cores e fontes) do Tailwind
├── layouts/
│   └── BaseLayout.astro   # <head>: SEO, Open Graph, fontes, JSON-LD
├── components/
│   ├── ui/                # peças genéricas e reutilizáveis
│   │   ├── Button.astro
│   │   ├── Container.astro
│   │   ├── Photo.astro    #   foto ou espaço reservado
│   │   └── SectionHeading.astro
│   └── sections/          # seções da página, uma por arquivo
└── pages/index.astro      # monta a página com as seções
public/images/             # fotos (servicos/, galeria/, sobre/)
```

| Camada | Responsabilidade | Muda quando… |
| --- | --- | --- |
| `config` e `data` | O que o site diz | O cliente muda um texto, serviço ou contato |
| `types` | O formato que o conteúdo deve ter | Surge um novo campo (ex.: preço) |
| `lib` | Regras sem visual | Muda uma integração (ex.: link do WhatsApp) |
| `components/ui` | Peças visuais genéricas | Muda o estilo base de botões, títulos etc. |
| `components/sections` | Composição de cada seção | Muda o layout de uma seção |
| `styles/global.css` | Identidade visual (tokens) | Troca de marca ou cliente |

## Como atualizar o conteúdo

**Adicionar fotos:** salve a imagem na pasta certa dentro de `public/images/` e preencha o caminho no arquivo de dados. Sem foto, o site mostra um espaço reservado com a mesma proporção.

```ts
// src/data/services.ts
{ slug: "volume-4d", name: "Volume 4D", image: "/images/servicos/volume-4d.jpg" }
```

Use fotos em `.jpg` ou `.webp`, com até ~1600px no lado maior, para o site continuar leve no celular.

**Adicionar depoimentos:** preencha `testimonials` em `src/data/content.ts`. A seção só aparece quando a lista tem itens. Use apenas depoimentos reais, com autorização das clientes.

## Reaproveitando como template

1. Copie o projeto.
2. Troque `src/config/site.ts` e os arquivos de `src/data/`.
3. Ajuste as cores e fontes no bloco `@theme` de `src/styles/global.css`.

## Pendências

- [ ] Descrições de Volume KB Beauty, Divine Bloom 3D, Volume 4D e Divine Power
- [ ] Confirmar a descrição do Spa das sobrancelhas
- [ ] Texto do "Sobre" escrito por ela
- [ ] Fotos dos serviços, da galeria e do perfil
- [ ] Domínio final em `siteConfig.url`
