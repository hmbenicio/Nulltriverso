# Arquitetura da Solucao

## Visao macro
- **Cliente mobile**: React Native 0.81 com Expo 54.  
- **Persistencia local**: `@react-native-async-storage/async-storage` salva o ultimo calculo de cada modulo.  
- **Visualizacoes**: `react-native-svg` para gauge e linha do IMC.  
- **Identidade**: gradientes definidos em `theme/gradients`, campo de estrelas (`StarField`) e animacoes leves na tela de login/menu.  
- **Backend**: inexistente nesta fase; todo o processamento ocorre no dispositivo.

## Camadas e responsabilidades
- **Navegacao**: `useAppNavigation` em `App.js` controla a troca entre login, menu e calculadoras; `BottomBar` padroniza menu/perfil/sair (volta ao login).  
- **Telas (`src/screens/`)**: `LoginScreen`, `MenuScreen` e 11 calculadoras (`HomeScreen`, `RceScreen`, `WhtrScreen`, `RcqScreen`, `BedriddenWeightScreen`, `TmbScreen`, `EerScreen`, `GetScreen`, `NafScreen`, `GcScreen`, `MiScreen`, `MacroScreen`, `HidricaScreen`). Cada tela valida inputs, chama `utils/` e monta o resumo.  
- **Componentes (`src/components/`)**: cards, botoes, inputs, ResultRow, gauge, grafico de linha, barra inferior e `StarField` reutilizavel no fundo da tela inicial e do menu.  
- **Constantes (`src/constants/`)**: faixas/cores de IMC, RCQ, WHtR, fatores de atividade, NAFs, protocolos de %GC, metodos de hidratacao/macros e chaves de storage.  
- **Utilidades (`src/utils/`)**: funcoes puras para IMC, WHtR/RCQ, peso acamado, TMB/GET, EER, %GC, MAMA, macros, hidratacao e parse numerico.  
- **Tema (`src/theme/colors.js`)**: tokens centralizados para fundo, texto, borda e estados; `src/theme/gradients.js` concentra gradientes de login/menu.

## Fluxo de dados (exemplos)
- **IMC**: inputs -> `utils/imc` (IMC + cor/status) -> salva em `imc:last` -> recarrega no `useEffect`.  
- **RCEst/RCQ**: cintura + altura/quadril -> `utils/wht` ou `utils/rcq` -> faixa de risco -> salva em `whtr:last` ou `rcq:last`.  
- **Peso acamado**: sexo + CPA + AJ + CB + DCSE -> `utils/bedridden` (Chumlea) -> salva em `bed:last`.  
- **TMB/EER/GET**: dados basicos -> `utils/tmb`, `utils/eer` (IOM + gestacao) e `utils/get` (GEB x NAF) -> chaves `tmb:last`, `eer:last`, `get:last`.  
- **NAF**: nivel selecionado + TMB opcional -> intervalo GET min/max -> `naf:last`.  
- **%GC**: protocolo em `constants/gc` -> `utils/gc` aplica Jackson & Pollock + Siri ou US Navy -> `gc:last`.  
- **MAMA**: CB + PCT (mm/cm) -> `utils/mi` calcula CMB/area -> `mi:last`.  
- **Macros**: kcal + % -> valida faixas -> gramas/dia -> `@nulltriverso/macros`.  
- **Hidrica**: peso (+ GET se 1 ml/kcal) -> `hidrica:last`.

## Decisoes tecnicas
- **Funcoes puras** e desacopladas para facilitar testes e reuso futuro (backend/web).  
- **Chaves de storage separadas** evitam colisao e permitem carregar cada modulo isoladamente.  
- **Assets locais** garantem operacao offline e identidade controlada.  
- **Animacoes leves** (Animated) para manter performance em aparelhos de entrada.  
- **Tela de login sem autenticacao real**: CTA apenas navega para o menu, mantendo a experiencia offline e sem bloqueio.

## Evolucoes previstas
- Historico completo e sincronizacao opcional com backend.  
- Testes automatizados das funcoes em `utils/`.  
- Bioimpedancia, compartilhamento/exportacao e analytics de uso.  
- Internacionalizacao e unidades imperiais conforme necessidade.
