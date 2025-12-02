# Arquitetura da Solucao

## Visao macro
- **Cliente mobile**: React Native 0.81 com Expo 54.  
- **Persistencia local**: `@react-native-async-storage/async-storage` salva o ultimo calculo de cada modulo.  
- **Visualizacoes**: `react-native-svg` para gauge e linha do IMC.  
- **Backend**: inexistente nesta fase; todo processamento ocorre no dispositivo.

## Camadas e responsabilidades
- **Navegacao**: `App.js` troca telas manualmente entre menu e calculadoras; `BottomBar` padroniza botoes de menu/perfil/sair.  
- **Telas (`src/screens/`)**: `MenuScreen`, `HomeScreen` (IMC), `EerScreen`, `TmbScreen`, `GetScreen`, `GcScreen`, `MiScreen`, `BedriddenWeightScreen`. Cada tela orquestra formulario, valida entradas e chama utilidades de calculo.  
- **Componentes (`src/components/`)**: cards, botoes, inputs, rows de resultado, gauge e grafico reutilizaveis.  
- **Constantes (`src/constants/`)**: faixas de IMC, fatores de atividade, NAFs, protocolos de gordura corporal, equacoes de peso acamado e chaves de storage.  
- **Utilidades (`src/utils/`)**: funcoes puras para calculos (IMC, EER, TMB/GET, %GC, MAMA, peso acamado) e parse numerico.  
- **Tema (`src/theme/colors.js`)**: paleta centralizada.

## Fluxo de dados (exemplos)
- **IMC**: tela recebe peso/altura -> `utils/imc` calcula IMC/status/cor -> resultado salvo com chave `imc:last` -> carregado no `useEffect` inicial.  
- **EER**: tela coleta sexo/idade/peso/altura/atividade/gestacao -> `utils/eer` aplica IOM + fator + bonus gestacional -> grava em `eer:last`.  
- **TMB/GET**: `utils/tmb` calcula Harris-Benedict; `utils/get` calcula GEB e multiplica pelo NAF -> chaves `tmb:last` e `get:last`.  
- **%GC**: protocolo escolhido em `constants/gc`; `utils/gc` aplica Jackson & Pollock + Siri ou US Navy -> salva em `gc:last`.  
- **MAMA**: `utils/mi` calcula CMB e area a partir de CB e PCT (convertendo mm para cm) -> salva em `mi:last`.  
- **Peso acamado**: `utils/bedridden` aplica equacoes de Chumlea por sexo com CPA/AJ/CB/DCSE -> salva em `bed:last`.

## Decisoes tecnicas
- **Sem backend** para permitir uso offline e entrega rapida; futuras versoes podem sincronizar historico real.  
- **Funcoes puras de calculo** para facilitar testes e reuso em outros projetos (ex.: backend futuro).  
- **Chaves de storage separadas** evitam colisao e permitem carregar cada modulo de forma independente.  
- **Cards e pills reutilizaveis** reduzem variacao visual entre calculadoras e aceleram novas telas.

## Evolucoes previstas
- Implementar logica para RCQ, RCEst, Bioimpedancia, Macros, Hidrica e NAF detalhado (cards ja presentes no menu).  
- Testes automatizados para utilidades de calculo.  
- Persistencia de historico completo e sincronizacao com backend.  
- Telemetria/analytics para medir conversao e uso por modulo.
