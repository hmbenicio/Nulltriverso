# Plano de Testes de Software

## Objetivo
Validar que o módulo de IMC funciona offline, calcula e classifica corretamente, persiste o último resultado e apresenta feedback claro ao usuário.

## Estratégia
- Testes manuais exploratórios no Expo Go (Android/iOS).
- Testes funcionais focados em validação de campos, cálculo e persistência.
- Inspeção visual das cores/faixas e animações do gauge.

## Casos de teste

| ID | Cenário | Passos resumidos | Resultado esperado |
| -- | ------- | ---------------- | ------------------ |
| TS-01 | Campos obrigatórios | Deixar nome vazio e clicar em “Calcular IMC” | Mensagem “Informe seu nome.” exibida |
| TS-02 | Peso/altura inválidos | Inserir “0” ou valor negativo em peso/altura | Mensagem “Peso inválido.” ou “Altura inválida.” |
| TS-03 | Cálculo correto | Nome “A”, peso 80 kg, altura 180 cm | IMC 24.69 (≈24.7) e status “Peso normal” |
| TS-04 | Classificação por faixa | Testar IMC 17, 23, 28, 33, 37 | Status: Abaixo / Normal / Sobrepeso / Obesidade 1 / Obesidade 2+ |
| TS-05 | Persistência local | Calcular; fechar app; reabrir | Último cálculo carregado automaticamente |
| TS-06 | Gauge e barra de status | Calcular IMC e observar gauge/progress bar | Ponteiro e barra na faixa correta, cor condizente |
| TS-07 | Entrada com vírgula | Inserir peso “70,5” e altura “175,5” | Valores convertidos e cálculo executado |
| TS-08 | Responsividade e teclado | Abrir teclado e rolar | Campos não ficam escondidos; scroll funcional |

## Critérios de aceitação
- 100% dos testes críticos (TS-01 a TS-05) devem passar.
- Nenhum crash ao abrir, calcular ou reabrir o app.

## Ambiente de teste
- Expo Go 54, Android 12+ e iOS 16+.
- Sem conexão exigida após instalação.
