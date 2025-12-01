# Programação de Funcionalidades

## Escopo entregue

| Item | Descrição | Status |
| ---- | --------- | ------ |
| Formulário de dados | Campos de nome, peso (kg) e altura (cm) com teclado adequado e parse de vírgula/ponto | Concluído |
| Validação e feedback | Mensagens imediatas para campos vazios ou valores não positivos | Concluído |
| Cálculo e classificação | Funções em `utils/imc.js` que calculam IMC e retornam status e cor da faixa | Concluído |
| Persistência local | Salvamento do último cálculo no `AsyncStorage` e recuperação automática na abertura | Concluído |
| Visualizações | Gauge semicircular com faixas OMS e linha de evolução mockada para demonstração | Concluído |
| Tema e componentes | Paleta centralizada e componentes reutilizáveis para futuras features | Concluído |

## Detalhes de implementação
- **HomeScreen** controla estado do formulário e resultado; usa `useEffect` para carregar dados salvos e `useMemo` para derivar cores/progressos.
- **Utils** concentram cálculo (`calculateImc`), classificação (`statusFromImc`), cor (`colorFromImc`), clamp e parse de número com vírgula (`parseLocaleNumber`).
- **Persistência**: chave `imc:last`; falhas de escrita/leitura são logadas via `console.warn`.
- **Visualizações**: gauge animado com `Animated` e `react-native-svg`; linha usa dados mockados de seis meses para ilustrar tendência.

## Pendências planejadas (próximas iterações)
- Histórico real de cálculos por usuário.
- Exportação/compartilhamento do resultado.
- Telemetria para medir conversão e erros de validação.
- Internacionalização (pt-BR / en-US) e suporte a unidades imperiais, se necessário.
