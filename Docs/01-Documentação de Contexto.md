# Introducao

Nulltriverso e um ecossistema pessoal de calculos nutricionais criado por Helbert Miranda Benicio (Analista/Dev e Nutricionista CRN9 21602 - CFN). A proposta mistura o "Null" da programacao com um universo de calculadoras offline, identidade visual proprietaria (gradientes, campo de estrelas e logos otimizados) e transparencia total das formulas usadas em cada tela.

# Problema

Profissionais, estudantes e curiosos precisam validar rapidamente indicadores como IMC, RCEst/RCQ, gordura corporal, TMB/GET, NAF, macros e hidratacao sem depender de conexao, cadastro ou interfaces confusas. Apps existentes costumam esconder equacoes, nao guardam o ultimo resultado e variam o visual entre telas; ate a tela de login costuma bloquear o uso. Aqui o fluxo e livre, com login apenas ilustrativo e calculadoras consistentes.

# Objetivos

**Objetivo geral:** entregar um multiverso mobile de calculadoras nutricionais offline e coerentes, citando referencias cientificas e pronto para portfolio profissional.

**Objetivos especificos**
- Manter fluxos curtos com validacao imediata e mensagens diretas em portugues.
- Disponibilizar 12 calculadoras: IMC (OMS), RCEst/WHtR, RCQ, peso estimado de acamados (Chumlea), TMB (Harris-Benedict), EER (IOM + gestacao), GET (GEB x NAF), NAF detalhado, %GC (Jackson & Pollock + Siri / US Navy), MAMA, distribuicao de macronutrientes e necessidade hidrica.
- Persistir o ultimo calculo de cada modulo com AsyncStorage para reuso instantaneo.
- Manter tela inicial de boas-vindas/login apenas para ambientacao visual, sem bloquear acesso ao menu ou exigir cadastro.
- Reutilizar componentes, paleta e chaves de storage para facilitar expansoes futuras (bioimpedancia, historico, agenda).
- Documentar contexto, formulas, testes e referencias de forma auditavel.

# Publico-alvo

1. **Nutricionistas e estudantes**: apoio rapido em consulta ou estudo, com equacao explicita e faixa de risco visivel.  
2. **Pessoas interessadas em bem-estar**: IMC, gasto, macros e hidratacao sem login.  
3. **Educadores fisicos e enfermeiros**: composicao corporal, NAF e peso acamado para conduta imediata.  
4. **Time de produto/engenharia**: base tecnica e visual reutilizavel em novos modulos.

Stakeholders e expectativas:

| Stakeholder | Interesse | Expectativa |
| ----------- | --------- | ----------- |
| Usuarios finais | Usabilidade e rapidez | Fluxo curto, teclado adequado e feedback colorido |
| Profissionais de saude | Confiabilidade | Formulas citadas, faixas OMS/WHO/IOM e referencias visiveis |
| Engenharia | Reuso e clareza | Utils puros, chaves de storage por modulo, sem backend |
| Portfolio | Narrativa Nulltriverso | Mostrar identidade autoral e relacao Null + nutricao |
