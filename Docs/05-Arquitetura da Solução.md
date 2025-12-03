# Arquitetura da Solucao

## Visao macro
- **Cliente mobile**: React Native 0.81 com Expo 54.  
- **Persistencia local**: `@react-native-async-storage/async-storage` salva o ultimo calculo de cada modulo.  
- **Visualizacoes**: `react-native-svg` para gauge e linha do IMC.  
- **Backend**: inexistente nesta fase; todo o processamento ocorre no dispositivo.

## Camadas e responsabilidades
- **Navegacao**: `App.js` controla a troca entre Menu e calculadoras; `BottomBar` padroniza menu/perfil/sair.  
- **Telas (`src/screens/`)**: Menu + 11 calculadoras (`HomeScreen`, `RceScreen`, `WhtrScreen`, `RcqScreen`, `BedriddenWeightScreen`, `TmbScreen`, `EerScreen`, `GetScreen`, `NafScreen`, `GcScreen`, `MiScreen`, `MacroScreen`, `HidricaScreen`). Cada tela valida inputs, chama `utils/` e monta o resumo.  
- **Componentes (`src/components/`)**: cards, botoes, inputs, ResultRow, gauge, grafico de linha e barra inferior reutilizaveis.  
- **Constantes (`src/constants/`)**: faixas/cores de IMC, RCQ, WHtR, fatores de atividade, NAFs, protocolos de %GC, metodos de hidratacao/macros e chaves de storage.  
- **Utilidades (`src/utils/`)**: funcoes puras para IMC, WHtR/RCQ, peso acamado, TMB/GET, EER, %GC, MAMA, macros, hidratacao e parse numerico.  
- **Tema (`src/theme/colors.js`)**: tokens centralizados para fundo, texto, borda e estados.

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

## Evolucoes previstas
- Historico completo e sincronizacao opcional com backend.  
- Testes automatizados das funcoes em `utils/`.  
- Bioimpedancia, compartilhamento/exportacao e analytics de uso.  
- Internacionalizacao e unidades imperiais conforme necessidade.
