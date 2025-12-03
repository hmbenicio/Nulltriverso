# Especificacao do Projeto

Esta versao entrega o menu completo de calculadoras do Nulltriverso (12 cards) com logica client-side e persistencia local. Todas as formulas sao exibidas nos textos de apoio e referenciadas na documentacao.

## Personas

- **Helena (30, nutricionista clinica)**: precisa de IMC, RCQ/RCEst, %GC e peso acamado em consulta rapida, sem login.  
- **Carlos (45, professor ativo)**: quer saber TMB, GET e macros para planejar treinos e dieta, validando se valores fazem sentido.  
- **Lia (26, estudante de nutricao)**: usa protocolos Jackson & Pollock, US Navy e MAMA para estudo; confere de onde vem cada formula.  
- **Joao (52, cuidando da mae acamada)**: estima peso com fita e dobra subescapular para ajustar medicamentos e dieta domiciliar.

## Historias de usuario

| EU COMO | QUERO | PARA |
| ------- | ----- | ---- |
| Pessoa usuaria | Calcular IMC com feedback visual | Entender minha faixa rapidamente |
| Profissional | Medir RCEst/RCQ e ver faixa de risco | Avaliar gordura abdominal de forma simples |
| Estudante | Selecionar protocolo de %GC | Comparar metodos (dobras x circunferencias) |
| Nutricionista | Estimar peso acamado (Chumlea) | Dosar dieta/medicacao sem balanca |
| Gestante | Aplicar bonus no EER por semana | Ajustar plano energetico |
| Pessoa ativa | Classificar NAF e estimar GET a partir da TMB | Planejar treino e dieta |
| Paciente | Converter kcal em gramas de macros | Seguir plano alimentar mais tangivel |
| Familia/cuidador | Estimar hidratacao diaria | Evitar hipo/hiper-hidratacao |
| Usuario recorrente | Reabrir e ver ultimo resultado | Nao redigitar dados |

## Modelagem resumida

1. Menu em grade com 3 colunas, logos autorais e animacao de entrada.  
2. Formularios validam numeros (ponto ou virgula), campos obrigatorios e unidades quando aplicavel.  
3. Funcoes puras em `utils/` executam cada equacao com constantes separadas em `constants/`.  
4. Resultado aparece em `SectionCard` com `ResultRow`, badge/cores e dicas do metodo.  
5. Ultimo calculo de cada tela e salvo em AsyncStorage e carregado no `useEffect` inicial.

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

## Restricoes

| ID | Restricao |
| -- | --------- |
| R-01 | Sem backend nesta versao; somente armazenamento local. |
| R-02 | Resultados sao estimativas e nao substituem avaliacao clinica. |
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
| Calcular IMC | RF-02, RF-03, RNF-02 | TS-IMC-01, TS-IMC-02 |
| Avaliar RCEst/RCQ | RF-02, RF-04, RNF-02 | TS-RCE-01, TS-RCQ-01 |
| Estimar peso acamado | RF-02, RF-05 | TS-PESO-01 |
| TMB/EER/GET | RF-02, RF-06 | TS-TMB-01, TS-EER-01, TS-GET-01 |
| Classificar NAF | RF-02, RF-07 | TS-NAF-01 |
| %GC por protocolo | RF-02, RF-08 | TS-GC-01, TS-GC-02 |
| MAMA | RF-02, RF-09 | TS-MI-01 |
| Macros e Hidrica | RF-02, RF-10, RF-11 | TS-MACRO-01, TS-HIDR-01 |
| Persistencia local | RF-12, RNF-02 | TS-PER-01 |
