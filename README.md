# Nulltriverso - Ecossistema de calculos nutricionais

Aplicacao mobile Expo/React Native que une o conceito de "Null" da programacao com o universo da nutricao. Traz um multiverso de calculadoras offline usadas por nutricionistas, estudantes e pessoas interessadas em bem-estar, com identidade visual consistente e todas as formulas citadas na tela.

## Funcionalidades

- **Menu ilustrado** com 12 cards tematicos (logos autorais) e efeito de estrelas.  
- **IMC** (OMS) com badge colorida, barra de progresso, gauge semicircular e linha de tendencia mockada.  
- **RCEst / WHtR** e **RCQ** para risco cardiometabolico (cintura/estatura e cintura/quadril).  
- **Peso estimado em acamados** (Chumlea) com CPA, altura do joelho, CB e dobra subescapular por sexo.  
- **TMB (Harris-Benedict)**, **EER (IOM + bonus gestacional)** e **GET** (GEB x NAF).  
- **NAF** detalhado (sedentario a muito ativo) com intervalo de GET a partir da TMB informada.  
- **% Gordura corporal** (Jackson & Pollock 3/7 dobras + Siri ou circunferencias US Navy).  
- **Massa muscular do braco (MAMA)** com CB + PCT em mm ou cm, exibindo CMB e area.  
- **Distribuicao de macronutrientes** (kcal -> gramas) e **necessidade hidrica** (30-35 ml/kg, 1 ml/kcal ou Holliday-Segar).  
- Persistencia local via AsyncStorage em todas as telas, aceitando ponto ou virgula nos numeros.

## Fluxo do app

1. O app abre no **Menu** e cada card leva a uma calculadora.  
2. Cada tela valida entradas, mostra erros curtos e executa o calculo.  
3. O resultado e salvo/local e recarregado ao reabrir.  
4. Visual padrao: gradiente, cards `SectionCard`, botoes verdes e `ResultRow` para resumo.  
5. A barra inferior facilita voltar ao menu, acessar perfil (stub) e sair (stub).

## Stack

- React Native 0.81 + Expo 54  
- AsyncStorage para armazenamento local  
- react-native-svg para gauge/linha do IMC  
- expo-linear-gradient para identidade visual

## Como executar

```bash
cd Nulltriverso/frontend
npm install
npm start   # Expo menu (a = Android, i = iOS, w = Web)
```

Requisitos: Node.js 18+ e Expo Go (dispositivo real ou emulador). Recomendo testar em aparelho real para validar teclados decimais e animacoes do menu.

## Estrutura

- `Nulltriverso/frontend/src/components` - inputs, botoes, cards, gauge e linha IMC.  
- `Nulltriverso/frontend/src/screens` - menu + calculadoras (IMC, RCQ, RCEst, Peso acamado, TMB, EER, GET, NAF, %GC, MI, Macro, Hidrica).  
- `Nulltriverso/frontend/src/constants` - faixas/cores, fatores, protocolos e chaves de storage.  
- `Nulltriverso/frontend/src/utils` - funcoes de calculo e parse numerico.  
- `Docs/` - documentacao funcional, tecnica, testes e apresentacao.  
- `Apresentacao/` - roteiro de demo.  
- `Nulltriverso/backend` - reservado para futuras integracoes (vazio).

## Documentacao
- `Docs/01-Documentacao de Contexto.md`
- `Docs/02-Especificacao do Projeto.md`
- `Docs/03-Metodologia.md`
- `Docs/04-Projeto de Interface.md`
- `Docs/05-Arquitetura da Solucao.md`
- `Docs/06-Template Padrao da Aplicacao.md`
- `Docs/07-Programacao de Funcionalidades.md`
- `Docs/08-Plano de Testes de Software.md`
- `Docs/09-Registro de Testes de Software.md`
- `Docs/10-Plano de Testes de Usabilidade.md`
- `Docs/11-Registro de Testes de Usabilidade.md`
- `Docs/12-Apresentacao do Projeto.md`
- `Docs/13-Referencias.md`

## Contato
Projeto pessoal para portfolio profissional, desenvolvido por Helbert Miranda Benicio (Analista/Dev e Nutricionista CRN9 21602 - CFN).
