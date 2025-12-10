# Template Padrao da Aplicacao

Guia de padroes visuais e de codigo que sustentam todas as calculadoras do Nulltriverso.

## Layout e espacamentos
- Padding horizontal de 24 px, cards com padding generoso e `gap` consistente.  
- Scroll unico por tela com `KeyboardAvoidingView` para manter inputs visiveis com o teclado aberto.  
- Headers com kicker maiusculo, titulo curto e subtitulo que cita a logica da tela.  
- Telas de login/cadastro/reset ocupam toda a viewport com animacao constante e CTA centralizado; calculadoras usam o mesmo fundo/gradiente.

## Componentizacao
- **SectionCard** para formularios, resultados e dicas; aceita `style` extra.  
- **TextField** com borda suave, teclado decimal e suporte a virgula/ponto.  
- **PrimaryButton** verde ocupando toda a largura do card.  
- **Pills/tiles** para sexo, fator de atividade, protocolo, metodo ou unidade; alteram borda/fundo quando ativos.  
- **ResultRow** para pares chave/valor nos resumos.  
- **ImcGauge** plugavel e desacoplado do estado global.  
- **BackToMenuButton** em cada calculadora; barra fixa no menu (Perfil/Menu/Sair) e barra compacta no Perfil.  
- **Cards ilustrados** do menu usam assets locais `assets/0X_Icone_*.png`.  
- **StarField + gradientes** (`menuGradient` e `loginGradient`) para fundir tela inicial, cadastro/reset, menu e perfil na mesma identidade.  
- **Animacoes de login** usando `Animated` (rotacao/pulso) sobre `LinearGradient` e imagem da logo.

## Paleta e tokens
- Centralizada em `src/theme/colors.js` e `src/theme/gradients.js`; evitar hardcode de cores.  
- Fundos e bordas: `background`, `backgroundLight`, `surfaceMuted`, `border`.  
- Texto: `ink`, `inkMuted`, `inkSoft`; estados: `primary`, `warn`, `error`.  
- Badges herdando a cor da faixa (IMC/RCQ/WHtR) quando aplicavel.  
- Login/menu usam gradientes proprios e overlays translucidos para manter legibilidade do formulario.

## Mensagens e textos
- Linguagem direta: "Peso invalido.", "As porcentagens devem somar 100%.".  
- Titulos trazem nome + sigla (ex.: "NAF - Nivel de Atividade Fisica").  
- Dicas de rodape sempre citam o metodo usado (IOM, Harris-Benedict, Siri, US Navy, Chumlea, Holliday-Segar etc.).  
- Login/cadastro/reset usam copies de boas-vindas e helpers ("Criar conta", "Esqueci minha senha") como narrativa visual; perfil exibe dados mockados e call-to-actions ilustrativos.

## Estados e feedback
- Erros proximos aos inputs; pills mudam cor quando selecionadas.  
- Badge/cores acompanham a faixa de risco (IMC/RCQ/WHtR) e metodos (hidrica, macros).  
- Valores arredondados conforme contexto: 2 casas para IMC/razoes, 0-1 casa para kcal/ml/gramas.  
- CTA do login retorna ao menu sem validar credencial; botoes de reset/perfil exibem alertas locais de sucesso.

## Boas praticas de codigo
- Separar constantes (faixas, fatores, protocolos) de logica (`utils`) e apresentacao (`screens`/`components`).  
- Funcoes de calculo puras; AsyncStorage apenas na camada de tela.  
- Reutilizar `parseLocaleNumber` para entradas numericas.  
- Manter chaves de storage em `constants` para compatibilidade de evolucao.  
- Documentar referencias na tela e repetir nos arquivos de docs para auditoria.  
- Priorizar assets otimizados (PNG 512-700 px) para manter startup leve.
