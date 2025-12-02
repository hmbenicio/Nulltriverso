# Nulltriverso - Suite de calculos nutricionais mobile

Aplicacao mobile de bem-estar que integra nutricao, tecnologia e visual de multiverso. Nesta entrega o app Expo traz um menu com calculadoras client-side, todas rodando no dispositivo e salvando o ultimo calculo localmente.

## Funcionalidades hoje

- **IMC**: nome/peso/altura com parse de ponto ou virgula, classificacao OMS, gauge semicircular e linha de tendencia mockada.  
- **EER** (Estimativa de Necessidade Energetica): equacao IOM para adultos, fator de atividade por sexo, bonus gestacional.  
- **TMB/BMR**: Harris-Benedict revisado com sexo, idade, peso e altura.  
- **GET**: usa GEB (Harris-Benedict) multiplicado por NAF selecionado.  
- **% Gordura corporal**: protocolos Jackson & Pollock (3 ou 7 dobras + Siri) ou circunferencias US Navy.  
- **Indice de muscularidade (MAMA)**: calcula CMB e area do braco com CB e PCT em mm ou cm.  
- **Peso acamado (Chumlea)**: estimativa com circunferencia de panturrilha/joelho/braco e dobra subescapular.  
- Persistencia local via AsyncStorage para IMC/EER/TMB/GET/%GC/MAMA/Peso acamado; cards RCQ/RCEst/Bio/NAF/Macros/Hidrica continuam como placeholders.

## Fluxo do app

1. App abre no **Menu**, cada card leva a uma calculadora.  
2. Cada calculadora valida entradas (aceita virgula ou ponto), executa o calculo e exibe resumo em `SectionCard`.  
3. Ultimo resultado de cada calculadora e salvo e recarregado na reabertura.  
4. Visuals: gradiente de fundo, paleta verde/ambar e componentes reutilizaveis (cards, botoes, inputs, badges).  
5. Placeholders futuros ficam no menu em cards ilustrados, sem acao.

## Stack

- React Native 0.81 + Expo 54  
- AsyncStorage para armazenamento local  
- react-native-svg para gauge e graficos  
- expo-linear-gradient para identidade visual

## Como executar

```bash
cd Nulltriverso/frontend
npm install
npm start   # Expo menu (a = Android, i = iOS, w = Web)
```

Requisitos: Node.js 18+ e Expo Go instalado (fisico ou emulador).  
Recomendado testar em aparelho real para validar entradas decimais e animacoes do menu.

## Estrutura

- `Nulltriverso/frontend/src/components` - inputs, botoes, cards, gauge e linha IMC.  
- `Nulltriverso/frontend/src/screens` - menu e calculadoras (IMC, EER, TMB, GET, GC, MAMA, Peso acamado).  
- `Nulltriverso/frontend/src/constants` - faixas, fatores, protocolos e chaves de storage.  
- `Nulltriverso/frontend/src/utils` - funcoes de calculo e parse numerico.  
- `Docs/` - documentacao funcional, tecnica e de testes.  
- `Apresentacao/` - materiais visuais.  
- `Nulltriverso/backend` - reservado para futuras integracoes (vazio nesta versao).

## Documentacao
- Docs/01-Documentacao de Contexto.md
- Docs/02-Especificacao do Projeto.md
- Docs/03-Metodologia.md
- Docs/04-Projeto de Interface.md
- Docs/05-Arquitetura da Solucao.md
- Docs/06-Template Padrao da Aplicacao.md
- Docs/07-Programacao de Funcionalidades.md
- Docs/08-Plano de Testes de Software.md
- Docs/09-Registro de Testes de Software.md
- Docs/10-Plano de Testes de Usabilidade.md
- Docs/11-Registro de Testes de Usabilidade.md
- Docs/12-Apresentacao do Projeto.md
- Docs/13-Referencias.md

## Contato
Projeto de portfolio pessoal do Nulltriverso.
