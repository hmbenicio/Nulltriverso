# Introducao

Nulltriverso e um ecossistema de bem-estar que une nutricao, tecnologia e a ideia de multiplos universos de saude. A versao atual entrega um app mobile Expo com varias calculadoras offline: IMC, EER, TMB, GET, percentual de gordura corporal e indice de muscularidade do braco (MAMA). Cada calculadora roda localmente, com feedback claro, cores consistentes e salvando o ultimo resultado no aparelho.

# Problema

Profissionais e estudantes de nutricao precisam validar medidas basicas (peso, altura, dobras, circunferencias, fatores de atividade) de forma rapida e sem depender de internet. Apps existentes costumam exigir login, nao explicam as formulas ou nao guardam o ultimo calculo. Para o time do Nulltriverso isso impede testar fluxos, identidade visual e componentes que serao a base de futuros modulos (cardapios, metas, agenda).

# Objetivos

**Objetivo geral:** entregar um conjunto de calculadoras nutricionais mobile, offline e coerentes entre si, servindo como prova de conceito do ecossistema Nulltriverso.

**Objetivos especificos**
- Validar fluxos curtos de entrada de dados e mensagens de erro em portugues simples.
- Disponibilizar calculos principais: IMC, EER (IOM adulto), TMB (Harris-Benedict), GET (GEB x NAF), %GC (Jackson & Pollock/Siri e US Navy) e MAMA.
- Persistir o ultimo calculo de cada modulo com AsyncStorage para consulta rapida.
- Reutilizar componentes (cards, botoes, inputs, pills, badges) e paleta unificada para acelerar novos modulos.

# Publico-alvo

1. **Pessoa usuaria final (bem-estar)** - quer um app sem cadastro para saber IMC, gasto e tendencia geral.  
2. **Nutricionistas e educadores fisicos** - precisam de referencia rapida em consultas, com formulas explicitas para auditoria.  
3. **Estudantes de nutricao/EF** - usam o app como apoio de estudo e para comparar protocolos.  
4. **Time de produto/engenharia** - valida a base de UI, persistencia local e navegacao em varias calculadoras.

Principais stakeholders e expectativas:

| Stakeholder | Interesse | Expectativa |
| ----------- | --------- | ----------- |
| Usuarios finais | Rapidez e clareza | Fluxo curto, mensagens simples, sem login |
| Profissionais de saude | Confiabilidade das formulas | Equacoes citadas e faixas corretas |
| Engenharia | Base escalavel | Componentes e utils desacoplados, sem backend |
| Produto/UX | Identidade consistente | Mesma paleta, navegacao fluida entre calculadoras |
| Marketing | Narrativa Nulltriverso | Mostra do conceito de multiverso de saude |
