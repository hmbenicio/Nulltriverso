# Guia do código · App Expo (IMC)

O módulo de IMC do Nulltriverso é um app **React Native** criado com **Expo**. Ele calcula IMC, classifica o status conforme faixas da OMS, mostra gauge/linha ilustrativa e salva o último resultado localmente.

## Pré-requisitos
- Node.js 18+ (recomendado pela Expo 54).
- NPM (ou outro gerenciador compatível com o `package-lock.json`).
- Expo Go instalado no dispositivo físico ou emulador Android/iOS configurado.

## Como rodar localmente
1. Entre na pasta do app:  
   `cd Nulltriverso/frontend`
2. Instale dependências:  
   `npm install`
3. Inicie o Metro bundler:  
   `npm start`
4. Use `npm run android` ou `npm run ios` para abrir direto no emulador; `npm run web` executa em navegador.

## Scripts disponíveis (`package.json`)
- `start`: abre o Expo DevTools e inicia o bundler.
- `android` / `ios`: mesma inicialização direcionando para o respectivo simulador.
- `web`: renderiza a versão web do React Native.

## Estrutura do front-end
- `App.js`: carrega a `HomeScreen`.
- `src/screens/HomeScreen.js`: fluxo principal de formulário, cálculo e exibição do resultado (salva e lê `imc:last` no `AsyncStorage`).
- `src/components/`: cartões, botões, campos de texto, linha de resultado, gauge (`ImcGauge`) e linha (`ImcLineChart`).
- `src/constants/imc.js`: faixas de IMC, cores e série mockada para evolução.
- `src/utils/imc.js`: cálculo, classificação, clamp e parse de número com vírgula/ponto.
- `src/theme/colors.js`: paleta centralizada para toda a UI.

## Notas de implementação
- Sem backend nesta versão; todos os dados ficam apenas no dispositivo.
- Formulário valida nome, peso e altura (kg/cm) antes de calcular; erros aparecem em linha.
- Gauge e linha são ilustrativos e usam `react-native-svg`; a linha consome dados mockados.
