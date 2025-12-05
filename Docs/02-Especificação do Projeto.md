# Especificacao do Projeto

Versao atual entrega menu completo com 12 calculadoras, fluxo 100% client-side e persistencia local. Uma tela de boas-vindas/login animada antecede o menu apenas para reforcar a identidade; nao existe autenticacao real. Todas as formulas sao expostas na interface e repetidas na documentacao.

## Personas

- **Helena (30, nutricionista clinica)**: IMC, RCQ/RCEst, %GC e peso acamado em consulta rapida sem travar em cadastro.  
- **Carlos (45, professor ativo)**: TMB, GET e macros para planejar treino/dieta, conferindo coerencia dos numeros.  
- **Lia (26, estudante)**: protocolos Jackson & Pollock, US Navy e MAMA para estudo; checa referencia de cada formula.  
- **Joao (52, cuidador)**: estima peso de acamado com fita e dobra subescapular para ajustar medicacao/dieta.

## Historias de usuario

| EU COMO | QUERO | PARA |
| ------- | ----- | ---- |
| Pessoa usuaria | Entrar rapidamente no app sem criar conta | Chegar ao menu pelo CTA "Seja bem-vindo!" |
| Pessoa usuaria | Calcular IMC com feedback visual | Entender a faixa rapidamente |
| Profissional | Medir RCEst/RCQ e ver faixa de risco | Avaliar gordura abdominal de forma simples |
| Estudante | Selecionar protocolo de %GC | Comparar metodos (dobras x circunferencias) |
| Nutricionista | Estimar peso acamado (Chumlea) | Dosar dieta/medicacao sem balanca |
| Gestante | Aplicar bonus no EER por semana | Ajustar plano energetico |
| Pessoa ativa | Classificar NAF e estimar GET a partir da TMB | Planejar treino e dieta |
| Paciente | Converter kcal em gramas de macros | Seguir plano alimentar mais tangivel |
| Familia/cuidador | Estimar hidratacao diaria | Evitar hipo/hiper-hidratacao |
| Usuario recorrente | Reabrir e ver ultimo resultado | Nao redigitar dados |

## Modelagem resumida

1. Tela de boas-vindas/login com gradiente, campo de estrelas e animacao de "buraco negro"; CTA "Seja bem-vindo!" abre o menu (sem backend).  
2. Menu em grade com 3 colunas, logos otimizados e animacao de entrada.  
3. Formularios validam numeros (ponto ou virgula), campos obrigatorios e unidades quando aplicavel.  
4. Funcoes puras em `utils/` executam cada equacao com constantes separadas em `constants/`.  
5. Resultado em `SectionCard` com `ResultRow`, badge/cores e dicas do metodo.  
6. Ultimo calculo de cada tela salvo em AsyncStorage e carregado no `useEffect` inicial.

## Indicadores de desempenho

| Indicador | Objetivo | Fonte |
| --------- | -------- | ----- |
| Conversao de calculo por tela | >= 90% dos formularios iniciados concluidos | Telemetria futura |
| Reuso no menu | >= 2 calculadoras por sessao | Telemetria futura |
| Persistencia local | 100% dos ultimos calculos recarregados sem erro | Testes manuais |
| Mensagens claras | < 5% de erros repetidos apos validacao | Observacao em usabilidade |

## Requisitos

### Funcionais

| ID | Descricao | Prioridade |
| -- | --------- | ---------- |
| RF-00 | Tela inicial de boas-vindas/login com CTA "Seja bem-vindo!" levando ao menu, sem autenticacao real | Media |
| RF-01 | Menu com 12 cards (IMC, RCEst, RCQ, Peso acamado, TMB, EER, GET, NAF, %GC, MI, Macro, Hidrica) | Alta |
| RF-02 | Validar campos obrigatorios e numeros positivos; aceitar ponto ou virgula | Alta |
| RF-03 | IMC com faixas OMS, gauge e linha | Alta |
| RF-04 | RCEst (WHtR) e RCQ com classificacao por sexo/faixa | Alta |
| RF-05 | Peso acamado por Chumlea (equacoes por sexo) | Alta |
| RF-06 | TMB (Harris-Benedict), EER (IOM + gestacao) e GET (GEB x NAF) | Alta |
| RF-07 | NAF detalhado com intervalo de GET a partir da TMB informada | Alta |
| RF-08 | %GC por Jackson & Pollock (3/7 dobras + Siri) ou US Navy | Alta |
| RF-09 | MAMA com CB + PCT (mm ou cm), exibindo CMB e area | Alta |
| RF-10 | Distribuicao de macros (kcal -> gramas) dentro de faixas recomendadas | Media |
| RF-11 | Necessidade hidrica por 30-35 ml/kg, 1 ml/kcal ou Holliday-Segar | Media |
| RF-12 | Persistir ultimo resultado de cada modulo em AsyncStorage | Alta |

### Nao funcionais

| ID | Descricao | Prioridade |
| --- | --------- | ---------- |
| RNF-01 | App em React Native 0.81 + Expo 54, Android/iOS | Alta |
| RNF-02 | Operacao offline; nenhum dado enviado para servidor | Alta |
| RNF-03 | Paleta centralizada em `src/theme/colors.js` e componentes reutilizaveis | Media |
| RNF-04 | Funcoes de calculo puras separadas das telas | Alta |
| RNF-05 | Resposta de calculo em < 200 ms em aparelho medio | Media |
| RNF-06 | Assets locais otimizados para carregamento rapido | Media |

## Restricoes

| ID | Restricao |
| -- | --------- |
| R-01 | Sem backend nesta versao; somente armazenamento local. |
| R-02 | Tela de login nao autentica nem bloqueia uso; e apenas narrativa visual. |
| R-03 | Somente dependencias suportadas pelo Expo 54 (sem nativos adicionais). |
| R-04 | Icones e imagens locais (sem download em tempo de execucao). |

## Casos de uso (texto)

- **IMC**: preencher nome/peso/altura -> validar -> calcular -> mostrar faixa, gauge e linha -> salvar.  
- **RCEst/RCQ**: preencher medidas -> calcular razao -> mostrar faixa de risco e salvar.  
- **Peso acamado**: selecionar sexo -> informar CPA/AJ/CB/dobra -> aplicar Chumlea -> salvar.  
- **TMB/EER/GET**: preencher idade/peso/altura/sexo (e semanas gestacionais) -> calcular -> salvar.  
- **NAF**: escolher nivel e opcionalmente TMB -> exibir fator e intervalo de GET -> salvar.  
- **%GC**: escolher protocolo -> preencher dobras ou circunferencias -> calcular Siri ou US Navy -> salvar.  
- **MAMA**: informar CB + PCT (mm ou cm) -> calcular CMB e area -> salvar.  
- **Macros**: inserir kcal e percentuais -> validar faixas -> converter para g/dia -> salvar.  
- **Hidrica**: escolher metodo -> preencher peso (e GET, se preciso) -> estimar ml/dia -> salvar.

## Matriz de rastreabilidade (trecho)

| Historia | RF/RNF | Teste previsto |
| -------- | ------ | -------------- |
| Entrar sem cadastro | RF-00, RNF-02 | TS-LOGIN-01 |
| Calcular IMC | RF-02, RF-03, RNF-02 | TS-IMC-01, TS-IMC-02 |
| Avaliar RCEst/RCQ | RF-02, RF-04, RNF-02 | TS-RCE-01, TS-RCQ-01 |
| Estimar peso acamado | RF-02, RF-05 | TS-PESO-01 |
| TMB/EER/GET | RF-02, RF-06 | TS-TMB-01, TS-EER-01, TS-GET-01 |
| Classificar NAF | RF-02, RF-07 | TS-NAF-01 |
| %GC por protocolo | RF-02, RF-08 | TS-GC-01, TS-GC-02 |
| MAMA | RF-02, RF-09 | TS-MI-01 |
| Macros e Hidrica | RF-02, RF-10, RF-11 | TS-MACRO-01, TS-HIDR-01 |
| Persistencia local | RF-12, RNF-02 | TS-PER-01 |
