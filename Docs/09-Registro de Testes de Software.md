# Registro de Testes de Software

## Sessão 2025-12-01 (manual, Expo Go)

| ID | Resultado | Observações |
| -- | --------- | ----------- |
| TS-01 | Aprovado | Mensagem “Informe seu nome.” exibida ao submeter sem nome |
| TS-02 | Aprovado | Peso/altura 0 retornam mensagens “Peso inválido.” / “Altura inválida.” |
| TS-03 | Aprovado | 80 kg, 180 cm → IMC 24.69 (renderizado 24.69) e status “Peso normal” |
| TS-04 | Aprovado | IMCs simulados 17/23/28/33/37 mostraram faixas corretas e cores coerentes |
| TS-05 | Aprovado | Último cálculo carregado após fechar e reabrir app |
| TS-06 | Aprovado | Gauge moveu ponteiro para a faixa correspondente; barra de status acompanhou cor |
| TS-07 | Aprovado | Entrada “70,5” e “175,5” parseadas corretamente |
| TS-08 | Aprovado | `KeyboardAvoidingView` manteve campos visíveis; scroll funcional |

## Resumo
- Nenhum bug crítico encontrado.
- Performance aceitável em aparelho intermediário; animação do gauge dentro do esperado.

## Pendências para próxima rodada
- Validar em aparelho de entrada com 2 GB RAM.
- Incluir automação mínima para funções de cálculo (`utils/imc.js`) em futura suíte de testes.
