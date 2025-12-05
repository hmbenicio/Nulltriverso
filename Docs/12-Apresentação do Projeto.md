# Apresentacao do Projeto

## Narrativa
Nulltriverso combina o "Null" da programacao com um universo de calculos nutricionais. Esta entrega final traz 12 calculadoras offline (IMC, RCEst, RCQ, Peso acamado, TMB, EER, GET, NAF, %GC, MI, Macros, Hidrica), tela de boas-vindas/login animada e identidade visual autoral com transparencia de formulas. Projeto pessoal de Helbert Miranda Benicio (Analista/Dev e Nutricionista CRN9 21602 - CFN) para portfolio profissional.

## Destaques da solucao
- Tela inicial com gradiente roxo/ambar, campo de estrelas e animacao de "buraco negro"; CTA "Seja bem-vindo!" leva direto ao menu.  
- Menu ilustrado com 12 logos proprias e animacao de entrada (PNG otimizados).  
- Formularios curtos, validacao imediata e suporte a virgula/ponto.  
- Resultados com badges/cores e resumos em `ResultRow`; IMC inclui gauge semicircular e linha mockada.  
- Equacoes explicitas: OMS, WHO/ASHWELL para RCQ/RCEst, Harris-Benedict, IOM, Siri, US Navy, Chumlea, Holliday-Segar e faixas de macros/NAF recomendadas.  
- Persistencia local por modulo (AsyncStorage) para retomar a sessao rapidamente.

## Roteiro de demonstracao
1) Abrir o app na tela de boas-vindas/login para mostrar animacoes e gradiente; tocar em "Seja bem-vindo!" e acessar o menu.  
2) IMC: validar campos, mostrar gauge/linha e faixa.  
3) RCEst e RCQ: inserir medidas e comparar faixas de risco.  
4) Peso acamado: selecionar sexo e preencher medidas; destacar equacao de Chumlea.  
5) TMB -> GET: calcular Harris-Benedict e aplicar NAF; comentar diferencas para EER.  
6) EER: escolher atividade e (opcional) gestacao para mostrar bonus.  
7) NAF: selecionar nivel e inserir TMB para ver intervalo de GET.  
8) %GC: executar Jackson & Pollock (dobras) e US Navy (circunferencias) para comparar.  
9) MI: usar CB + PCT em mm para mostrar conversao e area.  
10) Macros e Hidrica: demonstrar validacao de faixas e resultado em gramas/ml.  
11) Fechar e reabrir o app mostrando resultados carregados.

## Proximas entregas
- Bioimpedancia e historico completo de calculos.  
- Exportacao/compartilhamento de resultados e analytics opt-in.  
- Internacionalizacao (ingles/espanhol) e unidades imperiais.
