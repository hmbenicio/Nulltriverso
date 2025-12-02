# Projeto de Interface

## Visao geral
O app abre em um **menu em grade** com cards ilustrados para cada calculadora. Cada tela usa a mesma base visual: gradiente de fundo, header com kicker/titulo/subtitulo, `SectionCard` para formulario e resultados, botoes primarios verdes e `ResultRow` para resumo. Layout scroll unico com `KeyboardAvoidingView`.

## Identidade visual
- **Paleta**: verdes e tons terrosos (`#0f482f` primario, `#22c55e` sucesso, `#f59e0b` alerta, `#ef4444` critico, fundos `#f7f4ef` / `#ebe2d9`).  
- **Tipografia**: fontes do sistema com pesos fortes para titulos e contraste moderado para textos de apoio.  
- **Iconografia**: cards do menu usam ilustracoes/cores unificadas; gauge semicircular no IMC e linha de tendencia mockada.

## Componentes-chave
- **SectionCard**: contenedor com borda sutil; recebe `style` extra.  
- **TextField**: input com borda clara, teclado decimal quando necessario, aceita virgula/ponto.  
- **PrimaryButton**: botao verde, ocupa toda a largura do card.  
- **Pills/tiles**: pressables para sexo, fatores, protocolos e unidades.  
- **ResultRow**: linhas chave/valor para organizacao dos resultados.  
- **ImcGauge / ImcLineChart**: visualizacoes SVG plugaveis.

## Fluxos por tela
- **Menu**: cards responsivos em 3 colunas; alguns cards sem acao estao marcados como futuros (RCQ, RCEst, Bio, NAF, Macros, Hidrica).  
- **IMC**: campos de nome, peso (kg), altura (cm); erro proximo aos inputs; badge de status e progress bar; gauge e linha mockada.  
- **EER**: idade/peso/altura, sexo, nivel de atividade (lista com descricao e fator por sexo), opcao gestante + semanas; resultado com total, base e bonus.  
- **TMB**: idade/peso/altura, sexo; resultado com kcal/dia e dados informados.  
- **GET**: idade/peso/altura, sexo e lista de NAF; resultado mostra GEB (Harris-Benedict), fator e total.  
- **%GC**: escolha de protocolo (Jackson3, Jackson7, US Navy); campos dinamicos (soma das dobras ou pescoco/cintura/quadril); resultado exibe metodo e, se aplicavel, densidade corporal.  
- **MAMA**: circunferencia do braco e PCT; pill de unidade mm/cm; resultado traz CMB e area do braco.

## Acessibilidade e UX
- Teclados apropriados (decimal) e `KeyboardAvoidingView` em todas as telas.  
- Cores acompanham texto para nao depender apenas de cor.  
- Mensagens curtas e diretas; botoes com verbos de acao.  
- Layouts com espaco entre elementos (`gap`) e padding consistente (24 px lateral).
