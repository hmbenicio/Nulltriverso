# Especificacao do Projeto

Esta entrega cobre o menu de calculadoras do Nulltriverso (IMC, EER, TMB, GET, %GC e MAMA), todas client-side com persistencia local.

## Personas

- **Aline (32, dev em home office)**: quer respostas rapidas sem login; usa IMC e GET para conversar com a nutricionista.  
- **Carlos (45, professor)**: consulta TMB/GET e %GC sem internet; precisa de fontes legiveis e avisos claros.  
- **Dra. Bianca (nutricionista)**: confere se formulas e faixas estao corretas; utiliza %GC por dobras/circunferencias no atendimento.  
- **Lucas (estudante de EF)**: usa MAMA e protocolos Jackson & Pollock para estudos; precisa saber qual equacao foi aplicada.

## Historias de usuario

| EU COMO | QUERO | PARA |
| ------- | ----- | ---- |
| Usuaria nova | Calcular IMC com peso/altura e ver status colorido | Entender rapidamente minha faixa |
| Profissional | Estimar EER com sexo, idade, altura, peso e fator de atividade | Definir plano calorico inicial |
| Gestante | Incluir semanas de gestacao | Obter bonus energetico no EER |
| Estudante | Calcular TMB/GET com NAF | Comparar efeitos de atividade no gasto total |
| Avaliador fisico | Calcular %GC por dobras ou circunferencias | Escolher metodo mais pratico no momento |
| Nutricionista | Registrar MAMA com CB e PCT em mm ou cm | Avaliar muscularidade do braco |
| Usuario recorrente | Reabrir e ver ultimo calculo de cada modulo | Nao precisar digitar tudo de novo |

## Modelagem resumida

1. Menu lista calculadoras com card e cor de acento.  
2. Cada tela valida entradas (idade/peso/altura/medidas) e mostra erro imediato.  
3. Funcoes de util calculam valores conforme protocolo selecionado.  
4. Resultado e salvo em AsyncStorage (chaves especificas) e exibido em card com linhas chave/valor e destaques.  
5. Ao reabrir, ultimo resultado e carregado automaticamente.

## Indicadores de desempenho

| Indicador | Objetivo | Fonte |
| --------- | -------- | ----- |
| Conversao de calculo | >= 90% dos formularios iniciados concluidos | Eventos de clique no futuro analytics |
| Reuso de calculadoras | >= 2 modulos usados por sessao | Telemetria futura |
| Erros de validacao | < 5% de tentativas com erro repetido | Logs locais/analytics futuro |
| Persistencia local | 100% dos ultimos calculos recarregados | Testes manuais/automatizados |

## Requisitos

### Funcionais

| ID | Descricao | Prioridade |
| -- | --------- | ---------- |
| RF-01 | Menu com cards para IMC, EER, TMB, GET, %GC, MAMA e placeholders futuros | Alta |
| RF-02 | Validar campos obrigatorios e numeros positivos (aceita virgula ou ponto) | Alta |
| RF-03 | Calcular IMC e classificar segundo faixas OMS; mostrar gauge e linha mockada | Alta |
| RF-04 | Calcular EER adulto (IOM) com fator de atividade por sexo e bonus gestacional | Alta |
| RF-05 | Calcular TMB (Harris-Benedict revisado) com sexo, idade, peso, altura | Alta |
| RF-06 | Calcular GET = GEB x NAF, listando fatores e descricoes | Alta |
| RF-07 | Calcular %GC por Jackson & Pollock (3 ou 7 dobras) + Siri ou circunferencias US Navy | Alta |
| RF-08 | Calcular MAMA com CB e PCT (mm ou cm), exibindo CMB e area | Alta |
| RF-09 | Persistir ultimo calculo de cada modulo em AsyncStorage e recarregar na abertura | Alta |

### Nao funcionais

| ID | Descricao | Prioridade |
| --- | --------- | ---------- |
| RNF-01 | App em React Native 0.81 + Expo 54, Android/iOS | Alta |
| RNF-02 | Operacao 100% offline, sem backend | Alta |
| RNF-03 | Interface responsiva, paleta centralizada em `src/theme/colors.js` | Media |
| RNF-04 | Componentes e utils desacoplados para reuso entre calculadoras | Alta |
| RNF-05 | Feedback em menos de 200 ms apos toque em calcular (dispositivo medio) | Media |

## Restricoes

| ID | Restricao |
| -- | --------- |
| R-01 | Nao ha backend; nenhum dado sai do dispositivo nesta versao. |
| R-02 | Resultados sao estimativas; nao substituem avaliacao clinica. |
| R-03 | Placeholders RCQ/RCEst/Bio/NAF/Macros/Hidrica ainda sem logica. |
| R-04 | Apenas bibliotecas suportadas pelo Expo 54 (sem nativos adicionais). |

## Casos de uso (texto)

- **Calcular IMC**: usuario informa nome/peso/altura -> sistema valida -> calcula -> mostra status/gauge/linha -> salva.  
- **Calcular EER**: usuario escolhe sexo, idade, peso, altura, nivel de atividade (e gestacao opcional) -> calcula IOM + bonus -> salva.  
- **Calcular TMB/GET**: usuario insere dados, escolhe sexo e NAF -> calcula Harris-Benedict e GET -> salva.  
- **Calcular %GC**: usuario escolhe protocolo -> preenche dobras ou circunferencias -> calcula Siri ou US Navy -> salva.  
- **Calcular MAMA**: usuario insere CB e PCT -> app converte unidades se necessario -> calcula CMB/area -> salva.  
- **Reabrir app**: carrega ultimo resultado de cada modulo, se existir.

## Matriz de rastreabilidade (trecho)

| Historia | RF/RNF | Teste previsto |
| -------- | ------ | -------------- |
| Calcular IMC | RF-02, RF-03, RNF-02 | TS-IMC-01, TS-IMC-02 |
| EER com fator e gestacao | RF-02, RF-04, RNF-02 | TS-EER-01, TS-EER-02 |
| TMB e GET | RF-02, RF-05, RF-06 | TS-TMB-01, TS-GET-01 |
| %GC por protocolo | RF-02, RF-07 | TS-GC-01, TS-GC-02 |
| MAMA com unidade PCT | RF-02, RF-08 | TS-MI-01 |
| Persistencia local | RF-09, RNF-02 | TS-PER-01 |
