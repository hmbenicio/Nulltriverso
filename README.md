# Nulltriverso · Calculadora de IMC móvel

Aplicação mobile de bem-estar que integra nutrição, tecnologia e visual de “multiverso”.  
A primeira entrega do ecossistema Nulltriverso é um módulo completo de **IMC** desenvolvido em **React Native com Expo**, totalmente client-side: cálculo, classificação, persistência local e visualizações modernas — tudo no dispositivo, sem backend nesta versão.

## Principais funcionalidades

- Cálculo de IMC com **nome, peso (kg) e altura (cm)**, aceitando números com **ponto ou vírgula**.  
- Classificação automática conforme **faixas da OMS**, com **cores unificadas na UI**.  
- Persistência local via **AsyncStorage**, reabrindo o último cálculo automaticamente.  
- Visualização do estado físico por meio de:
  - **Gauge semicircular** (SVG).  
  - **Linha de tendência mockada** (SVG).  
- Interface com gradientes e identidade visual temática do Nulltriverso.

## Fluxo atual da aplicação

1. App inicia em `HomeIMCPage` (ou tela principal definida no projeto).  
2. Usuário informa nome, peso e altura para gerar o resultado.  
3. Gauge e linha de tendência atualizam com base no cálculo.  
4. Último cálculo permanece salvo para consultas futuras.

## Tecnologias utilizadas

- **React Native 0.81 + Expo 54**  
- **AsyncStorage** para armazenamento local  
- **react-native-svg** para gauge e gráficos  
- **expo-linear-gradient** para identidade visual  

## Como executar o projeto

```bash
cd Nulltriverso/frontend
npm install
npm start   # Expo menu (a = Android, i = iOS, w = Web)
```

## Requisitos:

- Node.js 18+
- App Expo Go instalado em dispositivo ou emulador

## Estrutura do repositório

Nulltriverso/
│
├── frontend/               # Aplicação móvel (Expo / React Native)
│   ├── src/pages/          # Telas principais (Home, IMC, Histórico etc.)
│   ├── src/components/     # Componentes reutilizáveis (inputs, cards, gauge)
│   ├── src/constants/      # Faixas da OMS, temas, textos fixos
│   ├── src/utils/          # Funções de cálculo, conversões e validações
│   ├── src/theme/          # Paleta, gradientes e estilos globais
│   └── app.json            # Configurações do projeto Expo
│
├── backend/                # Estrutura reservada para futuras integrações (vazio)
│
├── Docs/                   # Documentação funcional, técnica e de testes
│
└── Apresentação/           # Materiais de apresentação do projeto (slides, assets)


## Documentação
- <a href="Docs/01-Documentação de Contexto.md">Documentação de Contexto</a>
- <a href="Docs/02-Especificação do Projeto.md">Especificação do Projeto</a>
- <a href="Docs/03-Metodologia.md">Metodologia</a>
- <a href="Docs/04-Projeto de Interface.md">Projeto de Interface</a>
- <a href="Docs/05-Arquitetura da Solução.md">Arquitetura da Solução</a>
- <a href="Docs/06-Template Padrão da Aplicação.md">Template Padrão da Aplicação</a>
- <a href="Docs/07-Programação de Funcionalidades.md">Programação de Funcionalidades</a>
- <a href="Docs/08-Plano de Testes de Software.md">Plano de Testes de Software</a>
- <a href="Docs/09-Registro de Testes de Software.md">Registro de Testes de Software</a>
- <a href="Docs/10-Plano de Testes de Usabilidade.md">Plano de Testes de Usabilidade</a>
- <a href="Docs/11-Registro de Testes de Usabilidade.md">Registro de Testes de Usabilidade</a>
- <a href="Docs/12-Apresentação do Projeto.md">Apresentação do Projeto</a>
- <a href="Docs/13-Referências.md">Referências</a>

## Contatos e equipe
Projeto desenvolvido para portfólio pessoal.
