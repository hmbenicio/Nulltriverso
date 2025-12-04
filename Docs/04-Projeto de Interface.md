# Projeto de Interface

## Visao geral
O app abre em uma **tela de boas-vindas/login** com gradiente roxo/ambar, animacao de "buraco negro" (discos giratorios), campo de estrelas e CTA "Seja bem-vindo!" que libera o menu (sem autenticacao). Em seguida, surge um **menu em grade** com 3 colunas, gradiente de fundo e campo de estrelas. Cada card tem ilustracao autoral e leva a uma calculadora. As calculadoras compartilham o mesmo esqueleto: header com kicker/titulo/subtitulo, `SectionCard` para formulario/resultado, `PrimaryButton` para acao e `ResultRow` para resumo. Layout unico com `KeyboardAvoidingView` para manter inputs visiveis.

## Identidade visual
- **Paleta**: verdes e tons terrosos nas calculadoras (primario `#0f482f`, sucesso `#22c55e`, alerta `#f59e0b`, critico `#ef4444`, fundos `#f7f4ef`/`#ebe2d9`) e gradientes roxo/ambar na tela de login/menu (`loginGradient` e `menuGradient`).  
- **Tipografia**: fontes do sistema com pesos fortes em titulos e contraste moderado no corpo.  
- **Iconografia**: 12 logos autorais nos cards do menu; gauge semicircular e linha mockada na tela de IMC; logo central em orbita na tela inicial.

## Componentes-chave
- **SectionCard**: container com borda suave para formularios, resultados e dicas.  
- **TextField**: input com borda clara, teclado decimal, aceita virgula/ponto.  
- **PrimaryButton**: botao verde em largura total do card.  
- **Pills/tiles**: seletores de sexo, fator de atividade, protocolo, metodo ou unidade (mudam borda/fundo quando ativos).  
- **ResultRow**: linha chave/valor para organizar o resumo.  
- **ImcGauge / ImcLineChart**: componentes SVG plugaveis usados no IMC.  
- **BottomBar**: barra fixa para menu, perfil (stub) e sair (stub).  
- **StarField**: campo de estrelas em `LoginScreen` e `MenuScreen`, reforcando a identidade "Nulltriverso".  
- **Vortex login**: combinacao de `Animated` + `LinearGradient` para discos giratorios na tela inicial.

## Fluxos por tela e formulas resumidas
- **Login/boas-vindas**: animacao + dois campos (email e senha ficticios) e CTA "Seja bem-vindo!" que abre o menu sem validar credenciais.  
- **IMC**: peso/altura -> IMC = peso / (altura em m)^2 -> faixa OMS, gauge e linha de tendencia mockada.  
- **RCEst / WHtR**: cintura/altura em cm -> razao -> faixas de risco (<0,4 muito baixo, 0,4-0,5 saudavel, 0,5-0,6 aumentado, >0,6 muito alto).  
- **RCQ**: cintura/quadril em cm -> razao -> faixas por sexo (OMS/WHO).  
- **Peso acamado**: Chumlea por sexo usando CPA, altura do joelho, CB e dobra subescapular (mm).  
- **TMB**: Harris-Benedict revisado com sexo, idade, peso, altura.  
- **EER**: IOM adulto com fator de atividade por sexo + bonus gestacional (8 kcal/sem + 180).  
- **GET**: GEB (Harris-Benedict) multiplicado pelo NAF escolhido.  
- **NAF**: escala OMS (1,0-1,39 ate 1,9-2,5) com opcao de informar TMB para ver GET minimo/maximo.  
- **% Gordura corporal**: Jackson & Pollock 3/7 dobras + Siri ou circunferencias US Navy (pescoco/cintura/quadril/altura).  
- **Massa muscular do braco (MAMA)**: CMB = CB - pi*PCT, area = (CMB^2)/(4*pi), aceita PCT em mm ou cm.  
- **Macros**: kcal diario + % de carbo/proteina/gordura (faixas 45-60 / 15-25 / 20-35) -> gramas/dia (4/4/9 kcal/g).  
- **Hidrica**: 30-35 ml/kg, 1 ml/kcal ou Holliday-Segar (100/50/20 ml/kg).

## Imagens por tela
![Menu / Logo](../Nulltriverso/frontend/assets/Logo_00_WS_1.png)  
![IMC](../Nulltriverso/frontend/assets/01_Icone_IMC.png)  
![RCEst / WHtR](../Nulltriverso/frontend/assets/02_Icone_RCE.png)  
![RCQ](../Nulltriverso/frontend/assets/03_Icone_RCQ.png)  
![Peso acamado](../Nulltriverso/frontend/assets/04_Icone_PESO.png)  
![TMB](../Nulltriverso/frontend/assets/05_Icone_TMB.png)  
![EER](../Nulltriverso/frontend/assets/06_Icone_EER.png)  
![GET](../Nulltriverso/frontend/assets/07_Icone_GET.png)  
![NAF](../Nulltriverso/frontend/assets/08_Icone_NAF.png)  
![Percentual de gordura](../Nulltriverso/frontend/assets/09_Icone_GC.png)  
![Massa muscular (MI)](../Nulltriverso/frontend/assets/10_Icone_MI.png)  
![Macros](../Nulltriverso/frontend/assets/11_Icone_MACRO.png)  
![Hidrica](../Nulltriverso/frontend/assets/12_Icone_HIDRO.png)

## Acessibilidade e UX
- Teclados decimais e `KeyboardAvoidingView` em todas as telas.  
- Mensagens curtas ("Peso invalido.", "As porcentagens devem somar 100%.").  
- Cores sempre acompanhadas de texto para nao depender apenas de cor.  
- Padding lateral de 24 px, espacamento consistente entre elementos e cards largos para leitura.  
- Animacao suave de entrada nos cards do menu, feedback de press (spring) e tela de login que nao bloqueia o uso.
