# Template Padrão da Aplicação

Este template define padrões visuais e de código que serão reaproveitados nos demais módulos do Nulltriverso.

## Layout e espaçamentos
- Margens horizontais de 24 px na Home; cartões com padding interno generoso para respirabilidade.
- Estrutura em rolagem única; `KeyboardAvoidingView` para manter inputs visíveis.
- Cards empilhados com `gap` consistente; textos de seção usam peso 800.

## Componentização
- **SectionCard**: contêiner padrão para blocos de conteúdo; aceita `style` extra.
- **TextField**: entrada com borda clara, teclado configurável e suporte a `onChangeText`.
- **PrimaryButton**: botão principal verde; sempre com verbos de ação curtos.
- **ResultRow**: pares chave/valor para resumos.
- **ImcGauge/ImcLineChart**: visualizações plugáveis, recebem apenas dados e estilos, sem dependência de estado global.

## Paleta e tokens
- Paleta em `src/theme/colors.js`; nunca hardcode cores fora do arquivo.
- Bordas e superfícies usam `border` e `surfaceMuted`; texto principal usa `ink` e variações.

## Mensagens e textos
- Linguagem direta em português; mensagens de erro no formato “Informe seu nome.”, “Peso inválido.”.
- Títulos curtos (máx. 3 palavras) e subtítulos explicativos com verbos ativos.

## Estados e feedback
- Erros exibidos próximos aos campos; badge de status colorido seguindo as faixas de IMC.
- Progress bar e gauge animado reforçam o status visual.
- Valores numéricos formatados com 1 casa (peso/altura) e 2 casas (IMC).

## Boas práticas de código
- Separar dados (constantes) de lógica (utils) e de apresentação (components/screens).
- Evitar acoplamento: componentes recebem props simples e não acessam armazenamento diretamente.
- Manter validações e parse em utilidades reutilizáveis (`utils/imc.js`).
