
<p align="center">
  <img src="Nulltriverso/frontend/assets/logos/Logo_00_1.png" alt="Logo do Nulltriverso" width="320" />
</p>

# Nulltriverso - Ecossistema de calculos nutricionais

Aplicacao mobile em React Native + Expo com 12 calculadoras offline, identidade visual autoral (gradientes, campo de estrelas e logos proprios) e todas as formulas expostas na interface. Nenhum dado sai do dispositivo; o app existe para portfolio profissional de Helbert Miranda Benicio (Analista/Dev e Nutricionista CRN9 21602).

## O que ha no app

- Tela de boas-vindas/login com gradiente e "vortice" animado, campos ilustrativos de email/senha, toggle de visibilidade e links para criar conta ou recuperar acesso (fluxos sem backend).
- Cadastro e recuperacao de senha em telas proprias, com formatacao de CPF/data/telefone, OTP ficticio e trocas de senha apenas ilustrativas.
- Menu ilustrado em grade (3 colunas) com 12 cards: IMC, RCEst/WHtR, RCQ, Peso acamado, TMB, EER, GET, NAF, % Gordura corporal, Massa muscular do braco (MAMA), Distribuicao de macros e Hidrica; barra inferior fixa com Perfil/Menu/Sair.
- Calculadoras validam campos obrigatorios, aceitam ponto ou virgula, exibem mensagens curtas e resumem resultados com `ResultRow`; ultimo calculo salvo em AsyncStorage e recarregado ao abrir a tela.
- IMC exibe gauge semicircular e barra de progresso por faixa; protocolos com pills em RCQ/RCEst/%GC/NAF/Hidrica; macros trazem presets (balanceado, proteico, baixo carbo).
- Tela de Perfil estilizada com cartao flip (dados mockados) e formulario ficticio de troca de senha.

## Stack

- React Native 0.81 + Expo 54
- AsyncStorage para armazenamento local
- react-native-svg para gauge do IMC
- expo-linear-gradient para fundos do login/menu
- Assets locais otimizados (logos e icones reduzidos para carregamento rapido)

## Como executar

```bash
cd Nulltriverso/frontend
npm install
npm start   # Expo DevTools (a = Android, i = iOS, w = Web)
```

Requisitos: Node.js 18+ e Expo Go em um dispositivo real ou emulador. Testes em aparelho real sao recomendados para validar teclados decimais e animacoes.

## Estrutura atualizada (frontend)

- `Nulltriverso/frontend/App.js` controla o fluxo entre login, menu e calculadoras.
- `Nulltriverso/frontend/src/navigation` concentra rotas, actions, hook de navegacao e registry de telas (login, cadastro, reset, perfil, menu e 12 calculadoras).
- `Nulltriverso/frontend/src/screens` reune menu + 12 calculadoras (IMC, RCEst, RCQ, Peso acamado, TMB, EER, GET, NAF, %GC, MI, Macro, Hidrica) e as telas auxiliares (Login, Register, ResetPassword, Profile). Cada tela pode ter subpasta propria para estilos, mocks e subcomponentes (ex.: `screens/profile/profileStyles.js` e `profileMocks.js`).
- `Nulltriverso/frontend/src/components` traz cards, botoes, inputs, gauge do IMC, barra de menu inferior e campo de estrelas. Mantenha apenas itens genericos aqui; itens especificos da tela ficam na pasta da feature.
- `Nulltriverso/frontend/src/constants` guarda faixas, fatores, protocolos e chaves de storage.
- `Nulltriverso/frontend/src/utils` concentra funcoes puras para todos os calculos.
- `Nulltriverso/frontend/src/theme` unifica cores, gradientes e tokens reutilizaveis.
- `Docs/` possui a documentacao completa; `Apresentacao/` traz roteiro de demo.
- `Nulltriverso/backend` permanece reservado para futura integracao.

### Padroes de codigo e organizacao

- Estilos separados em arquivos dedicados por tela (`.../screenNameStyles.js` ou em subpasta `screenName/screenNameStyles.js`); estilos compartilhados ficam em `theme`.
- Dados mockados e constantes especificas de cada tela vivem em arquivos de mock/fixtures ao lado da tela.
- Componentes devem ser pequenos e reutilizaveis; extraia blocos grandes das telas para `components/` ou subcomponentes internos de cada feature.
- Validacoes e calculos permanecem em funcoes puras dentro de `utils`.
- Evite strings magicas: centralize chaves, rotas e protocolos em `constants`.

## Documentacao principal

> <ol>
> <li><a href="Docs/01-Documentação de Contexto.md"> Documentação de Contexto</a></li>
> <li><a href="Docs/02-Especificação do Projeto.md"> Especificação do Projeto</a></li>
> <li><a href="Docs/03-Metodologia.md"> Metodologia</a></li>
> <li><a href="Docs/04-Projeto de Interface.md"> Projeto de Interface</a></li>
> <li><a href="Docs/05-Arquitetura da Solução.md"> Arquitetura da Solução</a></li>
> <li><a href="Docs/06-Template Padrão da Aplicação.md"> Template Padrão da Aplicação</a></li>
> <li><a href="Docs/07-Programação de Funcionalidades.md"> Programação de Funcionalidades</a></li>
> <li><a href="Docs/08-Plano de Testes de Software.md"> Plano de Testes de Software</a></li>
> <li><a href="Docs/09-Registro de Testes de Software.md"> Registro de Testes de Software</a></li>
> <li><a href="Docs/10-Plano de Testes de Usabilidade.md"> Plano de Testes de Usabilidade</a></li>
> <li><a href="Docs/11-Registro de Testes de Usabilidade.md"> Registro de Testes de Usabilidade</a></li>
> <li><a href="Docs/12-Apresentação do Projeto.md"> Apresentação do Projeto</a></li>
> <li><a href="Docs/13-Referências.md"> Referências</a></li>
> <li><a href="Docs/14-Guia de Codigo e Organizacao.md"> Guia de Codigo e Organizacao</a></li>
</ol>

## Desenvolvedor
Helbert Miranda Benicio (Analista/Dev e Nutricionista CRN9 21602).




