# Metodologia

## Abordagem de trabalho
- **Iterações curtas (Kanban enxuto)**: backlog enxuto focado em IMC, priorizando fluxos completos antes de novas ideias.
- **Definição de pronto**: cálculo validando entradas, feedback visual e persistência local funcionando em Android/iOS.
- **Feedback rápido**: validação constante com usuária-alvo (Aline) e nutricionista (Bianca) para linguagem e cores.

## Ferramentas
- **Código**: React Native + Expo 54; armazenamento local com `@react-native-async-storage/async-storage`; visualizações com `react-native-svg`.
- **Controle de versão**: GitHub; branches curtas por feature; main sempre executável no Expo Go.
- **Qualidade**: lint/format do Expo (quando habilitado), testes manuais guiados pelo Plano de Testes; logs no console para rastrear validação.
- **Comunicação**: Issues/Projects no GitHub, compartilhamento de builds via Expo Go/QR.

## Organização do repositório
- `Nulltriverso/frontend`: app móvel (Expo). Estrutura por domínio: `components`, `constants`, `screens`, `theme`, `utils`.
- `Docs`: documentação viva deste módulo e base para futuras expansões do Nulltriverso.

## Controle de tarefas (exemplo de quadro)
- **To Do**: ajuste de mensagens de erro, refino da paleta, preparo de testes.
- **Doing**: implementação/ajuste de componentes e validações.
- **Review**: testes em aparelho físico/Expo Go.
- **Done**: merge em `main` com documentação atualizada.

## Riscos e mitigação
- **Ausência de backend**: risco de perda de dados entre dispositivos → mantemos claro que o escopo é local; próxima fase deve introduzir sincronização.
- **Perf em aparelhos básicos**: gauge SVG pode ser custoso → mantido tamanho e animação moderados; monitorar uso de memória.
- **Mensagens pouco claras**: validado texto com nutricionista; revisar após cada rodada de feedback.

## Entregáveis desta fase
- App Expo com cálculo de IMC, gauge e persistência local.
- Documentação atualizada (contexto, requisitos, arquitetura, testes).
- Plano para expansão do Nulltriverso (novos módulos plugáveis sobre a base de UI e padrões criados aqui).
