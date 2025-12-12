# Guia de codigo e organizacao

Este guia resume como manter o Nulltriverso seguindo clean code e separacao de responsabilidades no frontend.

## Estrutura das features (frontend)

- Cada tela em `src/screens` pode ter subpasta para concentrar estilos (`screenNameStyles.js`), mocks (`screenNameMocks.js`) e subcomponentes proprios.
- Componentes realmente reaproveitaveis permanecem em `src/components`; evite misturar itens especificos de uma tela.
- Tokens compartilhados (cores, gradientes, espacamentos) vivem em `src/theme`; nao replique valores hardcoded.
- Constantes e chaves de storage ficam em `src/constants`; validacoes e calculos permanecem em funcoes puras dentro de `src/utils`.

## Padroes de codigo

- Prefira funcoes pequenas e com nomes descritivos; evite side effects em helpers.
- Centralize texto repetido em constantes e evite strings magicas.
- Separe UI de logica: validacao, mascara e calculo devem ser funcoes isoladas e testaveis.
- Evite numeros/cores inline; consuma tokens de `theme` e fatores de `constants`.
- Use componentes controlados para formularios e trate mensagens de erro curtas e contextuais.

## Fluxo de navegacao

- As rotas e props padrao vivem no registry em `src/navigation/screenRegistry.js`.
- Ao criar nova tela, registre-a no `ROUTES`, mapeie actions no registry e mantenha handlers puros.

## Estilos

- Use `StyleSheet.create` e agrupe estilos por bloco de UI.
- Dê nomes claros (`header`, `cardContainer`, `cta`) e evite duplicar estilos entre telas; mova o que for comum para `theme` ou componentes base.
- Prefira unidades consistentes (padding/margin em 8/12/16) e reutilize gradientes centralizados.

## Mocks e dados locais

- Dados ficticios e placeholders devem ficar em arquivos de mock por tela; limpe mocks quando integrar backend.
- AsyncStorage guarda o ultimo calculo de cada tela; mantenha chaves em `constants/storageKeys`.

## Testes e verificacao

- Priorize testes de formato/validacao das funcoes em `utils`.
- Revise acessibilidade: rotulos, ordem de navegacao e feedback de erro.
- Em revisoes visuais, valide em aparelho real para garantir teclado numerico, mascaras e animacoes.
