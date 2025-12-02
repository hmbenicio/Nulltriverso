# Template Padrao da Aplicacao

Guia de padroes visuais e de codigo que sustentam todas as calculadoras do Nulltriverso.

## Layout e espacamentos
- Padding horizontal de 24 px; cards com padding generoso e `gap` entre elementos.  
- Scroll unico por tela com `KeyboardAvoidingView` para manter inputs visiveis.  
- Headers com kicker maiusculo, titulo curto e subtitulo explicativo.

## Componentizacao
- **SectionCard**: contenedor base para formularios, resultados e dicas; aceita `style` extra.  
- **TextField**: input com borda suave, teclado decimal, aceita virgula/ponto.  
- **PrimaryButton**: botao principal verde ocupando toda a largura do card.  
- **Pills/tiles**: seletores de sexo, nivel de atividade, protocolo ou unidade; mudam cor de borda e fundo quando ativos.  
- **ResultRow**: pares chave/valor alinhados para resumos.  
- **ImcGauge/ImcLineChart**: visualizacoes SVG plugaveis, desacopladas do estado global.

## Paleta e tokens
- Centralizada em `src/theme/colors.js`; evitar hardcode de cores.  
- Bordas e fundos usam `border` e `surfaceMuted`; texto usa `ink`, `inkMuted`, `inkSoft`; badges usam `primary` ou `warn`.

## Mensagens e textos
- Linguagem direta e curta: "Peso invalido.", "Preencha para ver o resultado."  
- Titulo das calculadoras com nome e sigla explicita (ex.: "EER - Necessidade Energetica").  
- Dicas de rodape listam formulas/metodos usados.

## Estados e feedback
- Erros proximo aos inputs; pills mudam cor quando selecionadas.  
- Badges e barras usam a mesma cor da faixa/status quando aplicavel (IMC).  
- Resultados exibem valores com formatacao minima (1 casa para peso/altura, 2 para IMC, 0-1 casa para kcal quando arredondado).

## Boas praticas de codigo
- Separar constantes (faixas, fatores, protocolos) de logica (utils) e apresentacao (screens/components).  
- Funcoes de calculo puras, sem efeitos colaterais; AsyncStorage apenas na tela.  
- Evitar duplicacao: reaproveitar `parseLocaleNumber` para inputs com ponto/virgula.  
- Manter mensagens e rotulos na propria tela para facilitar revisao de UX.
