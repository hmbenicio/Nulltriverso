# Projeto de Interface

## Visão geral
O app possui uma única tela (Home) que concentra entrada de dados e retorno do resultado. A hierarquia é curta para reduzir fricção: header com texto guia, cartão de formulário, cartão de resultado e duas visualizações (gauge e linha).

## Identidade visual
- **Paleta**: verdes e tons terrosos (`#0f482f` primário, `#22c55e` sucesso, `#f59e0b` alerta, `#ef4444` crítico) com fundos claros (`#f7f4ef` / `#ebe2d9`) para legibilidade.
- **Tipografia**: uso da família padrão do sistema com pesos fortes para títulos e contraste moderado para texto de apoio.
- **Iconografia/ilustrações**: gauge semicircular com faixas coloridas e labels, mais linha evolutiva simulada.

## Componentes-chave
- **SectionCard**: cartão com padding e borda sutil, usado para formulário e resultados.
- **TextField**: entrada com borda clara, suporte a teclado numérico/decimal e autocapitalização para nome.
- **PrimaryButton**: botão verde com texto em alto contraste.
- **ResultRow**: linha chave/valor para exibir dados calculados.
- **ImcGauge**: velocímetro SVG animado mostrando a faixa do IMC.
- **ImcLineChart**: linha de tendência usando dados mockados para ilustrar evolução.

## Fluxo da tela
1. **Header**: título “Calculadora de IMC” e subtítulo orientativo.
2. **Dados do paciente**: campos de nome, peso (kg) e altura (cm); mensagem de erro logo abaixo se validação falhar; botão “Calcular IMC”.
3. **Resultado**: badge de status colorido, barra de progresso proporcional ao IMC, valores formatados (1 casa para peso/altura e 2 para IMC).
4. **Visualizações**: gauge semicircular com faixas de IMC e ponteiro animado; linha de evolução com pontos pré-definidos para demonstrar tendência.

## Acessibilidade e UX
- Campos usam teclado apropriado e validação imediata.
- Cores refletem estados (azul/verde/âmbar/vermelho) e texto acompanha para não depender só de cor.
- Layout em rolagem única, com `KeyboardAvoidingView` para evitar sobreposição do teclado.
- Mensagens curtas e em português simples para facilitar entendimento pelo público amplo.
