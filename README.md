# Nulltriverso · Calculadora de IMC móvel

O Nulltriverso é um ecossistema de bem-estar que combina tecnologia, nutrição e um olhar de multiverso para a saúde. A primeira entrega é um módulo de **IMC** desenvolvido em **React Native com Expo**, focado em:

- Calcular IMC com nome, peso (kg) e altura (cm), validando números com ponto ou vírgula.
- Classificar o resultado conforme faixas da OMS e exibir cores consistentes em toda a UI.
- Persistir o último cálculo localmente (`AsyncStorage`) para abrir já preenchido, mesmo offline.
- Visualizar o status em um gauge semicircular e em uma linha de tendência mockada.

## Stack principal
- Expo 54 / React Native 0.81 / React 19.
- AsyncStorage para persistência local.
- `react-native-svg` para gauge e linha.
- `expo-linear-gradient` para o plano de fundo.

## Estrutura do repositório
- `Nulltriverso/frontend`: app Expo com telas, componentes, constantes, tema e utilidades de IMC.
- `Nulltriverso/backend`: reservado para futuras integrações (sem código nesta entrega).
- `Docs/`: documentação do projeto (contexto, requisitos, arquitetura, testes, apresentação).
- `Apresentação/`: guia de apresentação da solução.

## Como executar rapidamente
1. `cd Nulltriverso/frontend`
2. `npm install` (ou `npm ci` se preferir o `package-lock.json`)
3. `npm start` para abrir o Expo Go (use `npm run android` ou `npm run ios` para direcionar).

## Links úteis
- Código fonte: `Nulltriverso/frontend/src` (guia em `Src/README.md`)
- Documentação detalhada:
  1. `Docs/01-Documentação de Contexto.md`
  2. `Docs/02-Especificação do Projeto.md`
  3. `Docs/03-Metodologia.md`
  4. `Docs/04-Projeto de Interface.md`
  5. `Docs/05-Arquitetura da Solução.md`
  6. `Docs/06-Template Padrão da Aplicação.md`
  7. `Docs/07-Programação de Funcionalidades.md`
  8. `Docs/08-Plano de Testes de Software.md`
  9. `Docs/09-Registro de Testes de Software.md`
  10. `Docs/10-Plano de Testes de Usabilidade.md`
  11. `Docs/11-Registro de Testes de Usabilidade.md`
  12. `Docs/12-Apresentação do Projeto.md`
  13. `Docs/13-Referências.md`
- Apresentação: `Apresentação/README.md`
