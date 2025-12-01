# Introdução

Nulltriverso é um ecossistema de bem‑estar que une tecnologia (o “Null” da programação), nutrição e um olhar de multiverso para jornadas de saúde personalizadas. O módulo de IMC é a primeira entrega desse universo: uma calculadora móvel, construída em React Native com Expo, que valida dados básicos do paciente, calcula o Índice de Massa Corporal e exibe status, gauge ilustrativo e evolução simulada. Os dados ficam gravados localmente no aparelho, permitindo reuso imediato mesmo sem conectividade.

# Problema

Pessoas que desejam acompanhar o próprio peso ou orientar pacientes nem sempre têm uma ferramenta simples, offline e coerente entre dispositivos. Aplicativos existentes costumam exigir cadastro complexo, depender de internet ou não exibem os resultados de forma didática. Para o time de produto, isso impede validar rapidamente a linguagem visual e os fluxos que serão reaproveitados em futuros módulos do Nulltriverso (cardápios, agenda e metas nutricionais).

# Objetivos

**Objetivo geral:** entregar um módulo móvel de IMC pronto para uso que sirva como prova de conceito para o ecossistema Nulltriverso.

**Objetivos específicos**
- Validar o fluxo base de coleta de nome, peso (kg) e altura (cm) com feedback imediato e mensagens de erro claras.
- Persistir o último cálculo no dispositivo para consulta rápida.
- Exibir status do IMC com cores padronizadas e visualizações (gauge e linha evolutiva) que serão reaproveitadas em outros módulos.
- Demonstrar um código front-end desacoplado (componentes reutilizáveis, constantes e utilidades) pronto para crescer com novas features do Nulltriverso.

# Justificativa

O IMC é uma métrica universal, simples de explicar ao usuário e barata de validar tecnicamente. Entregar essa funcionalidade primeiro permite:
- Testar a identidade visual e a camada de componentes antes de acoplar backends ou integrações clínicas.
- Coletar feedback rápido sobre mensagens, ergonomia de formulários e persistência local.
- Manter o escopo enxuto (sem backend) enquanto definimos padrões de arquitetura, testes e analytics para os próximos módulos (dietas, metas, gamificação).

# Público-alvo

Perfis priorizados na primeira entrega:

1. **Aline, 32, dev em home office** — quer um app rápido, sem cadastro, para acompanhar peso e discutir metas com a nutricionista.
2. **Carlos, 45, professor com pouco tempo livre** — precisa de mensagens diretas e memória local para revisar o último cálculo sem depender de internet.
3. **Profissionais de saúde parceiros** — usam o app como vitrine do futuro Nulltriverso e avaliam clareza das faixas e do vocabulário.

Principais stakeholders e expectativas:

| Stakeholder          | Interesse principal                     | Expectativa-chave                        |
| -------------------- | --------------------------------------- | ---------------------------------------- |
| Usuários finais      | Simplicidade e clareza do resultado     | Fluxo rápido, mensagens amigáveis        |
| Nutricionistas       | Linguagem e faixas corretas de IMC      | Classificação conforme OMS               |
| Time de produto      | Validação de UX e componentes           | Base reaproveitável para novos módulos   |
| Engenharia           | Padrões de código e armazenagem local   | Simplicidade, baixo acoplamento          |
| Marketing/Parcerias  | Narrativa do “Null + Nutri + Multiverso”| Demonstração tangível do conceito        |

Entregar valor rápido a esses grupos é essencial para escalar o Nulltriverso para outros “universos” de saúde.
