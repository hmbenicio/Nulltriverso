# Introducao

Nulltriverso e um ecossistema pessoal de calculos nutricionais, criado por Helbert Miranda Benicio (Analista/Dev e Nutricionista CRN9 21602 - CFN). O conceito une o "Null" da programacao com um universo de possibilidades da nutricao: varias calculadoras offline, identidade visual unica e transparencia sobre cada formula aplicada.

# Problema

Profissionais e estudantes precisam validar rapidamente indicadores como IMC, RCEst/RCQ, gordura corporal, TMB/GET, NAF, macros e hidratacao sem depender de conexao, cadastros ou telas confusas. Apps existentes costumam esconder as equacoes, nao guardam o ultimo resultado e misturam estilos, o que dificulta uso em consulta e estudo.

# Objetivos

**Objetivo geral:** entregar um multiverso de calculadoras nutricionais mobile, offline e coerentes, com referencias cientificas claras e prontas para portfolio profissional.

**Objetivos especificos**
- Garantir fluxos curtos com validacao imediata e mensagens diretas em portugues.
- Disponibilizar calculos-chave: IMC (OMS), RCEst/WHtR, RCQ, peso estimado de acamados (Chumlea), TMB (Harris-Benedict), EER (IOM + gestacao), GET (GEB x NAF), NAF detalhado, %GC (Jackson & Pollock + Siri / US Navy), MAMA, distribuicao de macronutrientes e necessidade hidrica.
- Persistir o ultimo calculo de cada modulo com AsyncStorage para consulta instantanea.
- Reutilizar componentes e paleta unificada para acelerar futuras expansoes (bioimpedancia, historico, agenda).
- Documentar todo o contexto, formulas e referencias para auditoria e aprendizado.

# Publico-alvo

1. **Nutricionistas e estudantes** - apoio rapido em consulta ou estudo, com equacao explicita e faixa de risco.  
2. **Pessoas interessadas em bem-estar** - querem medir IMC, gasto, macros e hidratacao sem login.  
3. **Educadores fisicos e enfermeiros** - precisam de calculos de composicao corporal, NAF e peso acamado para conduta imediata.  
4. **Time de produto/engenharia** - valida base tecnica e visual reutilizavel em novos modulos.

Stakeholders e expectativas:

| Stakeholder | Interesse | Expectativa |
| ----------- | --------- | ----------- |
| Usuarios finais | Usabilidade e rapidez | Fluxo curto, teclado adequado e feedback colorido |
| Profissionais de saude | Confiabilidade | Formulas citadas, faixas OMS/WHO/IOM e referencias visiveis |
| Engenharia | Reuso e clareza | Utils puros, chaves de storage por modulo, sem backend |
| Portfolio | Narrativa Nulltriverso | Mostrar identidade autoral e relacao Null + nutricao |
