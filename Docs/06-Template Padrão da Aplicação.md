# Template Padrao da Aplicacao

Guia de padroes visuais e de codigo que sustentam todas as calculadoras do Nulltriverso.

## Layout e espacamentos
- Padding horizontal de 24 px, cards com padding generoso e `gap` consistente.  
- Scroll unico por tela com `KeyboardAvoidingView` para manter inputs visiveis com o teclado aberto.  
- Headers com kicker maiusculo, titulo curto e subtitulo que cita a logica da tela.  
- Tela de login/boas-vindas ocupa toda a viewport com animação constante e CTA centralizado.

## Componentizacao
- **SectionCard** para formularios, resultados e dicas; aceita `style` extra.  
- **TextField** com borda suave, teclado decimal e suporte a virgula/ponto.  
- **PrimaryButton** verde ocupando toda a largura do card.  
- **Pills/tiles** para sexo, fator de atividade, protocolo, metodo ou unidade; alteram borda/fundo quando ativos.  
- **ResultRow** para pares chave/valor nos resumos.  
- **ImcGauge/ImcLineChart** plugaveis e desacoplados do estado global.  
- **BottomBar** fixa com botoes de menu, perfil (stub) e sair (stub).  
- **Cards ilustrados** do menu usam assets locais `assets/0X_Icone_*.png`.  
- **StarField + gradientes** (`menuGradient` e `loginGradient`) para fundir tela inicial e menu na mesma identidade.  
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
- Tela de login usa copy de boas-vindas e helper "Criar conta"/"Esqueci minha senha" apenas como rótulos estéticos.

## Estados e feedback
- Erros proximos aos inputs; pills mudam cor quando selecionadas.  
- Badge/cores acompanham a faixa de risco (IMC/RCQ/WHtR) e metodos (hidrica, macros).  
- Valores arredondados conforme contexto: 2 casas para IMC/razoes, 0-1 casa para kcal/ml/gramas.  
- CTA do login retorna ao menu sem validar credencial; botao "Sair" na BottomBar retorna ao login.

## Boas praticas de codigo
- Separar constantes (faixas, fatores, protocolos) de logica (`utils`) e apresentacao (`screens`/`components`).  
- Funcoes de calculo puras; AsyncStorage apenas na camada de tela.  
- Reutilizar `parseLocaleNumber` para entradas numericas.  
- Manter chaves de storage em `constants` para compatibilidade de evolucao.  
- Documentar referencias na tela e repetir nos arquivos de docs para auditoria.  
- Priorizar assets otimizados (PNG 512-700 px) para manter startup leve.
