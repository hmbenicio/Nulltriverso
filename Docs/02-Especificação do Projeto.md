# Especificação do Projeto

O módulo de IMC do Nulltriverso valida dados básicos de um paciente e retorna seu status nutricional de forma rápida, offline e visualmente clara. A seguir estão as personas, histórias de usuário, requisitos e restrições que guiam a primeira entrega.

## Personas

- **Aline (32, dev em home office)**: usa o app entre reuniões, prefere preencher poucos campos e quer respostas claras para discutir com a nutricionista. Dói ler mensagens técnicas ou ter de criar conta.
- **Carlos (45, professor)**: consulta o IMC eventualmente; precisa de fonte legível, cores objetivas e lembrar o último cálculo sem depender de internet.
- **Dra. Bianca (nutricionista)**: avalia se as faixas de IMC estão corretas e se o vocabulário evita alarmismo; quer uma visualização rápida para explicar ao paciente.

## Histórias de Usuário

| EU COMO | QUERO | PARA |
| ------ | ----- | ---- |
| Usuário de primeira viagem | Calcular IMC apenas com nome, peso (kg) e altura (cm) | Saber rapidamente meu status e próxima ação |
| Usuário recorrente | Ver o último resultado ao abrir o app | Comparar com medidas anteriores sem recálculo |
| Usuário visual | Enxergar o status com cores e gauge | Entender em que faixa estou sem ler muito texto |
| Dra. Bianca | Validar se o cálculo segue a tabela OMS | Garantir que a recomendação ao paciente é segura |
| Time de produto | Reaproveitar componentes e constantes de IMC | Evoluir para novos módulos sem refazer UI |

## Modelagem do Processo de Negócio

**Estado atual**: cálculo feito manualmente ou em sites que pedem cadastro e não guardam o histórico.

**Proposta**:
1) Usuário insere nome, peso (kg) e altura (cm).  
2) App valida formato/valores; exibe erro imediato se algo estiver vazio ou inválido.  
3) App calcula IMC, determina status (abaixo, normal, sobrepeso, obesidades 1-3).  
4) Resultado é salvo no armazenamento local (`AsyncStorage`) e exibido com gauge e linha evolutiva simulada.  
5) Na reabertura, o último resultado é carregado automaticamente.

## Indicadores de Desempenho

| Indicador | Objetivo | Cálculo/Fonte |
| --------- | -------- | ------------- |
| Conversão de cálculo | 90% dos usuários que começam o formulário completam o cálculo | Nº cálculos / Nº sessões que interagem com inputs |
| Erro de validação | < 5% de tentativas com erros repetidos | Nº erros exibidos / Nº cliques em “Calcular IMC” |
| Tempo de resposta | < 200 ms do clique até exibir resultado | Medido via logs locais/perf de render |
| Retenção do último cálculo | 100% de persistência local em reabertura | Nº sessões com resgate de dados / Nº sessões com cálculo prévio |

## Requisitos

### Funcionais

| ID | Descrição | Prioridade |
| -- | --------- | ---------- |
| RF-01 | Permitir entrada de nome, peso em kg e altura em cm com máscara decimal simples | Alta |
| RF-02 | Validar campos obrigatórios e valores positivos, exibindo mensagem de erro contextual | Alta |
| RF-03 | Calcular IMC usando peso/(altura²) e classificar conforme faixas OMS (abaixo, normal, sobrepeso, obesidades 1-3) | Alta |
| RF-04 | Salvar o último cálculo no dispositivo e recarregar automaticamente na abertura | Alta |
| RF-05 | Exibir resultado numérico, status colorido, gauge semicircular e linha evolutiva simulada | Média |
| RF-06 | Funcionar offline após instalado | Alta |

### Não Funcionais

| ID | Descrição | Prioridade |
| --- | --------- | ---------- |
| RNF-01 | App em React Native com Expo 54 e compatibilidade Android/iOS | Alta |
| RNF-02 | Operar sem backend; dados restritos ao armazenamento local | Alta |
| RNF-03 | Interface responsiva, com contraste adequado e fontes legíveis | Média |
| RNF-04 | Código modular (componentes, constantes, utilidades separadas) | Alta |
| RNF-05 | Tempo de render do resultado abaixo de 200 ms em aparelhos medianos | Média |

## Restrições

| ID | Restrição |
| -- | --------- |
| R-01 | Não há backend; nenhuma informação sai do dispositivo nesta versão. |
| R-02 | Apenas cálculo de IMC está no escopo inicial; demais módulos (metas, cardápio, agenda) ficam para fases futuras. |
| R-03 | Uso de dependências aprovadas do Expo; sem libs nativas fora do ecossistema suportado. |

## Casos de Uso (visão textual)

- **Calcular IMC**: ator Usuário fornece nome, peso, altura → sistema valida → calcula IMC → exibe status e visualizações → persiste resultado.
- **Reabrir app**: ator Usuário abre app → sistema lê `AsyncStorage` → popula painel de resultados.

## Matriz de Rastreabilidade (trecho)

| História | RF/RNF associados | Testes previstos |
| -------- | ----------------- | ---------------- |
| Calcular IMC com 3 campos | RF-01, RF-02, RF-03 | TS-01 Validação; TS-02 Cálculo correto |
| Reabrir com último resultado | RF-04, RNF-02 | TS-03 Persistência local |
| Visualizar gauge e linha | RF-05, RNF-03 | TS-04 Renderização das visualizações |

Essa base será expandida conforme novos módulos do Nulltriverso forem adicionados.
