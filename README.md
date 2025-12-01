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
<li><a href="Docs/01-Documentacao de Contexto.md">Documentacao de Contexto</a></li>
<li><a href="Docs/02-Especificacao do Projeto.md">Especificacao do Projeto</a></li>
<li><a href="Docs/03-Metodologia.md">Metodologia</a></li>
<li><a href="Docs/04-Projeto de Interface.md">Projeto de Interface</a></li>
<li><a href="Docs/05-Arquitetura da Solucao.md">Arquitetura da Solucao</a></li>
<li><a href="Docs/06-Template Padrao da Aplicacao.md">Template Padrao da Aplicacao</a></li>
<li><a href="Docs/07-Programacao de Funcionalidades.md">Programacao de Funcionalidades</a></li>
<li><a href="Docs/08-Plano de Testes de Software.md">Plano de Testes de Software</a></li>
<li><a href="Docs/09-Registro de Testes de Software.md">Registro de Testes de Software</a></li>
<li><a href="Docs/10-Plano de Testes de Usabilidade.md">Plano de Testes de Usabilidade</a></li>
<li><a href="Docs/11-Registro de Testes de Usabilidade.md">Registro de Testes de Usabilidade</a></li>
<li><a href="Docs/12-Apresentacao do Projeto.md">Apresentacao do Projeto</a></li>
<li><a href="Docs/13-Referencias.md">Referencias</a></li>
- Apresentação: `Apresentação/README.md`
