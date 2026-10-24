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
├── config/site.ts         # identidade do negócio: nome, contatos, região, tema
├── data/                  # conteúdo editável
│   ├── services.ts        #   catálogo de serviços por categoria
│   └── content.ts         #   textos de todas as seções, galeria, sobre, FAQ
├── types/index.ts         # contratos (tipos) do conteúdo
├── lib/links.ts           # funções puras: links de WhatsApp e Instagram
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

**Fotos:** as originais ficam em `fotos/` (fora do Git, organizadas por procedimento). As versões do site são geradas por um script, que gira, recorta e converte para `.webp`:

```bash
python scripts/optimize_photos.py fotos
```

O mapeamento de qual foto vai para onde fica no dicionário `PHOTOS` do script. Para trocar uma foto, ajuste ali e rode de novo. Depois, use o caminho gerado no arquivo de dados:

```ts
// src/data/services.ts
{ slug: "volume-4d", name: "Volume 4D", image: "/images/servicos/volume-4d.webp" }
```

Sem foto, o site mostra um espaço reservado com a mesma proporção.

**Depoimentos:** preencha `testimonials` em `src/data/content.ts`. A seção só aparece quando a lista tem itens. Use apenas depoimentos reais, com autorização das clientes.

## Reaproveitando como template

A regra do projeto: **componentes não têm conteúdo de cliente**. Nenhum texto, cor ou foto do negócio fica dentro de `src/components`. Por isso um site novo nasce trocando só estes arquivos:

| Arquivo | O que trocar |
| --- | --- |
| `src/config/site.ts` | Nome, contatos, região, tipo de negócio, cor da barra e fontes |
| `src/data/content.ts` | Textos das seções, menu, galeria, sobre, FAQ |
| `src/data/services.ts` | Serviços ou produtos |
| `src/styles/global.css` | Bloco `@theme`: cores e fontes |
| `scripts/photos.json` | Mapeamento das fotos |
| `wrangler.jsonc` | Nome do projeto na Cloudflare |

As cores têm nomes semânticos (`primary`, `surface`, `ink`, `muted`...), e não nomes de cor. Assim `bg-primary` continua fazendo sentido quando o primary de outro cliente for azul.

## Pendências

- [ ] Fotos de Divine Bloom 3D, Divine Power, Design com Henna e Design de Sobrancelhas
- [ ] Descrição das técnicas Divine Bloom 3D e Volume 4D
- [ ] Texto do "Sobre" escrito por ela
- [ ] Micro Shadow, quando houver fotos
- [ ] Domínio próprio (atualizar `siteConfig.url`)
