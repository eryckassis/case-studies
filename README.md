# Case Studies

Documentação de trabalho do portfólio de projetos: arquitetura, organização do conteúdo e orientações para desenvolvimento e manutenção.

<div class="readme-image-frame readme-image-frame--cover" align="center">
  <p><strong>Imagem de apresentação</strong></p>
  <p>Espaço reservado para uma captura da página inicial.</p>
  <!-- Substitua por: <img src="docs/images/home.png" alt="Página inicial do portfólio" width="100%"> -->
</div>

## Navegação

- [Visão geral](#visão-geral)
- [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento)
- [Mapa do projeto](#mapa-do-projeto)
- [Arquitetura](#arquitetura)
- [Experiência visual](#experiência-visual)
- [Guias de manutenção](#guias-de-manutenção)
- [Processo de desenvolvimento](#processo-de-desenvolvimento)
- [Referência rápida](#referência-rápida)
- [Imagens desta documentação](#imagens-desta-documentação)

## Visão geral

A aplicação apresenta uma galeria de cases, páginas individuais de projeto e uma página sobre. Os dados dos projetos ficam no próprio código; a rota de cada case é montada a partir dessa coleção.

| Tecnologia | Papel no projeto |
| --- | --- |
| Next.js 16 e React 19 | Rotas, renderização e composição da interface |
| TypeScript | Tipos e contratos dos componentes e dados |
| Tailwind CSS 4 e CSS global | Utilitários, tokens e estilos compartilhados |
| Framer Motion | Animações e transições |
| Lenis | Dependência de rolagem suave e seus estilos |
| pnpm | Gerenciador de pacotes declarado pelo projeto |

As versões declaradas e os comandos estão em [package.json](package.json); o lockfile registra as versões resolvidas.

## Ambiente de desenvolvimento

Execute os comandos a partir da pasta que contém o `package.json` e este README. Tenha Node.js compatível com a versão instalada do Next.js e o pnpm disponível; o projeto declara `pnpm@12.11.2`.

```bash
pnpm install
pnpm dev
```

Abra [localhost:3000](http://localhost:3000). Para conferir uma versão de produção local:

```bash
pnpm build
pnpm start
```

Outros comandos úteis:

```bash
pnpm lint
pnpm exec tsc --noEmit
```

`lint` executa o ESLint; a verificação de tipos usa o TypeScript diretamente. O servidor de produção depende de um build concluído.

## Mapa do projeto

```text
app/                         Rotas, layout raiz e estilos globais
  about/page.tsx             Entrada da página About
  work/[projectId]/page.tsx  Entrada de cada case
components/
  case-gallery/              Galeria, cards e mídia
  header/                    Cabeçalho, menu e relógio
  page-transition/           Transições entre páginas e projetos
  pages/                     Composição das páginas Cases e About
  preloader/                 Experiência de carregamento inicial
  project/                   Hero, seções e próximo case
  theme/                     Tema baseado no horário
  grain/                     Textura visual
data/case-studies.ts         Coleção local de projetos
types/                       Tipos de projetos, galeria e interface
public/                      Fontes, imagens, vídeos e SVGs
```

O alias `@/` aponta para a raiz da aplicação, conforme [tsconfig.json](tsconfig.json). Arquivos em `public/` são referenciados a partir de `/`, por exemplo `/images/cases/arquivo.jpg`.

## Arquitetura

### Rotas e composição

| Rota | Entrada | Conteúdo |
| --- | --- | --- |
| `/` | [app/page.tsx](app/page.tsx) | Renderiza `CasesPage` e a galeria. |
| `/about` | [app/about/page.tsx](app/about/page.tsx) | Renderiza `AboutPage` e define seus metadados. |
| `/work/[projectId]` | [app/work/[projectId]/page.tsx](app/work/%5BprojectId%5D/page.tsx) | Busca o projeto pelo ID e monta seu conteúdo. |

O [layout raiz](app/layout.tsx) carrega a fonte local, os estilos e os metadados gerais. Ele compõe `ThemeProvider`, `Preloader`, `TransitionProvider` e `MenuProvider` em torno das páginas; `Grain` também é renderizado dentro do tema. O menu recebe prévias das páginas Cases e About.

### Dados dos cases

```text
data/case-studies.ts
       ├── CasesPage → CaseGallery → cards
       ├── Preloader → imagens ou posters
       └── /work/[projectId] → hero → seções → próximo case
```

Os contratos estão em [types/case-study.ts](types/case-study.ts) e [types/project.ts](types/project.ts). `ProjectDetails` reúne os dados da galeria e os detalhes da página: título dividido em linhas, cliente, ano, categoria, serviços, descrição e pelo menos uma seção. Cada seção tem ID, título e imagem com texto alternativo.

A rota usa `id` para encontrar o projeto, gera parâmetros estáticos a partir da coleção e retorna a página de não encontrado quando o ID não existe. O título e a descrição do projeto alimentam os metadados. O próximo case segue a ordem do array e, ao chegar ao fim, volta ao primeiro.

<div class="readme-image-frame readme-image-frame--architecture" align="center">
  <p><strong>Mapa visual da arquitetura</strong></p>
  <p>Espaço reservado para um diagrama de rotas, dados e componentes.</p>
  <!-- Exemplo: <img src="docs/images/arquitetura.png" alt="Diagrama da arquitetura do projeto" width="100%"> -->
</div>

## Experiência visual

### Tema e estilos

[app/globals.css](app/globals.css) importa o Tailwind e concentra variáveis de cor, layout, dimensões e estilos globais. Os componentes também utilizam classes utilitárias. A fonte Helvetica Now é carregada localmente no layout.

[ThemeProvider.tsx](components/theme/ThemeProvider.tsx) interpola a cor de fundo conforme o horário local e ajusta as variáveis de primeiro plano e seleção. O relógio no cabeçalho permite selecionar outro horário e retornar ao horário local. Ao alterar cores, verifique o contraste nos horários claros e escuros.

### Preloader, menu e transições

- **Preloader:** [Preloader.tsx](components/preloader/Preloader.tsx) usa as imagens ou os posters dos cases na entrada inicial da Home. Possui tempo máximo de espera para imagens e considera a preferência por movimento reduzido.
- **Menu:** [MenuProvider.tsx](components/header/MenuProvider.tsx) coordena o menu e suas prévias; o cabeçalho fica em `components/header/`.
- **Navegação animada:** `components/page-transition/` concentra o provider, os componentes e o hook de transição. Cards e links de próximo case participam desse fluxo; preserve os atributos e referências usados pela animação ao alterar sua marcação.
- **Textura:** `components/grain/` renderiza a camada de granulação compartilhada.

<div class="readme-image-frame readme-image-frame--experience" align="center">
  <p><strong>Experiência e detalhes visuais</strong></p>
  <p>Espaço reservado para capturas do menu, de um case ou dos temas.</p>
  <!-- Exemplo: <img src="docs/images/experiencia.png" alt="Detalhes da experiência visual" width="100%"> -->
</div>

## Guias de manutenção

### Adicionar um case

1. Coloque as mídias em `public/`, seguindo a organização existente em `images/` e `videos/`.
2. Adicione um objeto à coleção em [data/case-studies.ts](data/case-studies.ts), seguindo os exemplos existentes e o contrato `ProjectDetails`.
3. Defina um `id` único e mantenha o `href` correspondente, como `id: "novo-projeto"` e `href: "/work/novo-projeto"`.
4. Preencha título, `titleLines`, cliente, ano, categoria, serviços e descrição. Adicione ao menos uma seção com `id`, título e imagem com `src` e `alt`.
5. Forneça a mídia principal: `image` com `src` e `alt` ou `video` com `src` e um `poster` válido. O preloader atual depende da imagem ou do poster de cada entrada; confira seu funcionamento se modificar essa estrutura.
6. Verifique a ordem da coleção: ela também determina a sequência do próximo case. Teste a galeria, a rota direta e a navegação entre projetos.

O tipo permite mídia opcional, mas a implementação atual do preloader acessa diretamente a imagem ou o poster. Ao introduzir um novo formato ou um projeto sem essas mídias, adapte e valide também o preloader.

### Ajustar uma página de projeto

- Altere conteúdo e ordem das seções em `data/case-studies.ts`.
- Para mudar a estrutura compartilhada, comece por `components/project/` e pela rota dinâmica.
- Para mudar o comportamento do próximo projeto, examine `ProjectNextCase.tsx`, a seleção na rota e o provider de transição.
- Ao editar imagens ou vídeos, confira caminhos, texto alternativo, cortes e carregamento em telas diferentes.

### Alterar elementos compartilhados

| Objetivo | Onde começar |
| --- | --- |
| Dados e ordem dos projetos | `data/case-studies.ts` |
| Tipos de dados | `types/case-study.ts` e `types/project.ts` |
| Galeria e cards | `components/case-gallery/` |
| Cabeçalho, menu e relógio | `components/header/` |
| Cor por horário | `components/theme/ThemeProvider.tsx` e `app/globals.css` |
| Entrada e transições | `components/preloader/` e `components/page-transition/` |
| Fonte e composição global | `app/layout.tsx` |

Alguns conteúdos ainda são provisórios, incluindo descrições, nomes de cliente e o endereço `you@example.com` presente no cabeçalho. Revise-os antes de publicar.

## Processo de desenvolvimento

O fluxo abaixo é uma recomendação para manter o projeto fácil de evoluir:

1. Identifique a rota, os dados e os componentes envolvidos antes de alterar a interface.
2. Confira os contratos em `types/` e as variáveis existentes antes de criar novos formatos ou valores visuais.
3. Faça a alteração no ponto responsável e revise seus efeitos nas páginas que compartilham o componente.
4. Execute `pnpm lint` e `pnpm exec tsc --noEmit`; use `pnpm build` quando a alteração exigir validar a compilação de produção.
5. Confira no navegador a Home, a rota direta do case, o retorno, o próximo case, o menu e os tamanhos de tela afetados. Para alterações de animação, inclua movimento reduzido; para cores, teste horários claros e escuros.
6. Registre neste README mudanças de arquitetura, comandos e decisões que ajudem na manutenção futura.

Essas verificações são um roteiro; sua presença aqui não indica que foram executadas para a versão atual.

## Referência rápida

| Arquivo | Responsabilidade |
| --- | --- |
| [package.json](package.json) | Dependências, scripts e versão declarada do pnpm |
| [next.config.ts](next.config.ts) | Configuração do Next.js, cache de componentes, prefetch e processamento CSS |
| [app/layout.tsx](app/layout.tsx) | Fonte, metadados gerais e providers |
| [app/globals.css](app/globals.css) | Tailwind, variáveis e estilos globais |
| [data/case-studies.ts](data/case-studies.ts) | Conteúdo e ordem dos cases |
| [types/project.ts](types/project.ts) | Contrato dos detalhes e seções de projeto |

## Imagens desta documentação

Os blocos `readme-image-frame` ao longo do arquivo são pontos reservados para imagens. Para preenchê-los, crie uma pasta como `docs/images/`, adicione os arquivos e substitua o comentário HTML do bloco por uma tag `<img>` com caminho relativo e texto `alt` descritivo. Ajuste a largura conforme necessário.

As classes servem como identificadores para uma apresentação personalizada. Renderizadores de Markdown podem ignorar classes e estilos próprios; por isso, os textos dos espaços reservados continuam legíveis sem formatação adicional.
