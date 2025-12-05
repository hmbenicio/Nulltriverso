# Guia do codigo - App Expo (Nulltriverso completo)

Aplicativo Expo/React Native com 12 calculadoras nutricionais offline, tela de boas-vindas/login apenas ilustrativa e identidade visual proprias (gradientes, campo de estrelas e logos).

## Pre-requisitos
- Node.js 18+ (Expo 54).
- NPM (ou outro gerenciador compatibilizado com `package-lock.json`).
- Expo Go em dispositivo fisico ou emulador Android/iOS configurado.

## Como rodar localmente
1. `cd Nulltriverso/frontend`
2. `npm install`
3. `npm start` para abrir o bundler/DevTools.  
   Opcional: `npm run android`, `npm run ios` ou `npm run web`.

## Scripts (`package.json`)
- `start`: inicia o bundler do Expo.
- `android` / `ios`: inicia e tenta abrir direto no simulador correspondente.
- `web`: renderiza a versao web do React Native.

## Estrutura do front-end
- `App.js`: controla navegacao entre login, menu e calculadoras via `useAppNavigation`.
- `src/screens/`: telas de Login, Menu e 12 calculadoras (IMC, RCEst, RCQ, Peso acamado, TMB, EER, GET, NAF, %GC, MI, Macro, Hidrica).
- `src/components/`: cards, botoes, inputs, seletores, ResultRow, gauge/linha de IMC, barra inferior e StarField.
- `src/constants/`: faixas, fatores, protocolos, chaves de AsyncStorage e textos de apoio.
- `src/utils/`: funcoes puras para todos os calculos e parse de numero com ponto/virgula.
- `src/theme/`: paleta e gradientes reutilizados.

## Notas de implementacao
- Todo processamento e armazenamento sao locais (AsyncStorage); nao existe backend.
- Inputs validam obrigatorios e numeros positivos; mensagens curtas em portugues.
- Gauge e linha do IMC usam `react-native-svg`; demais telas reaproveitam cards e pills para consistencia.
- Assets PNG foram otimizados para menor tamanho, mantendo a identidade original.
