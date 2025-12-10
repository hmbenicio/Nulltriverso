# Arquitetura da Solucao

## Visao macro
- **Cliente mobile**: React Native 0.81 com Expo 54.  
- **Persistencia local**: `@react-native-async-storage/async-storage` salva o ultimo calculo de cada modulo.  
- **Visualizacoes**: `react-native-svg` para gauge do IMC.  
- **Identidade**: gradientes definidos em `theme/gradients`, campo de estrelas (`StarField`) e animacoes leves na tela de login/menu com logos otimizados.  
- **Backend**: inexistente nesta fase; todo o processamento ocorre no dispositivo.

- **Navegacao**: `AppNavigator` usa `useAppNavigation`, `navigationActions` e `screenRegistry` para resolver tela corrente (login, cadastro, reset, perfil, menu e calculadoras); menu bar fixa em `MenuScreen` aciona Perfil/Menu/Sair.  
- **Telas (`src/screens/`)**: `LoginScreen`, `RegisterScreen`, `ResetPasswordScreen`, `ProfileScreen`, `MenuScreen` e 12 calculadoras (`ImcScreen`, `RceScreen`, `WhtrScreen`, `RcqScreen`, `BedriddenWeightScreen`, `TmbScreen`, `EerScreen`, `GetScreen`, `NafScreen`, `GcScreen`, `MiScreen`, `MacroScreen`, `HidricaScreen`). Cada tela valida inputs, chama `utils/` e monta o resumo.  
- **Componentes (`src/components/`)**: cards, botoes, inputs, ResultRow, gauge, barra de menu/atalho, BackToMenuButton, `StarField` reutilizavel no fundo da tela inicial/menu/perfil.  
- **Constantes (`src/constants/`)**: faixas/cores de IMC, RCQ, WHtR, fatores de atividade, NAFs, protocolos de %GC, metodos de hidratacao/macros e chaves de storage.  
- **Utilidades (`src/utils/`)**: funcoes puras para IMC, WHtR/RCQ, peso acamado, TMB/GET, EER, %GC, MAMA, macros, hidratacao e parse numerico.  
- **Tema (`src/theme/colors.js`)**: tokens centralizados para fundo, texto, borda e estados; `src/theme/gradients.js` concentra gradientes de login/menu.
- **Assets (`assets/`)**: logos e icones PNG reduzidos (512-700 px) para carregamento rapido no menu/login e nos docs.

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
- **Assets locais otimizados** garantem operacao offline, tamanho menor e identidade controlada.  
- **Animacoes leves** (Animated) para manter performance em aparelhos de entrada.  
- **Tela de login sem autenticacao real**: CTA apenas navega para o menu, mantendo a experiencia offline e sem bloqueio.
- **Fluxos auxiliares sem backend**: cadastro, recuperacao e perfil sao mockados e servem apenas para narrativa visual.

## Evolucoes previstas
- Historico completo e sincronizacao opcional com backend.  
- Testes automatizados das funcoes em `utils/`.  
- Bioimpedancia, compartilhamento/exportacao e analytics de uso.  
- Internacionalizacao e unidades imperiais conforme necessidade.
