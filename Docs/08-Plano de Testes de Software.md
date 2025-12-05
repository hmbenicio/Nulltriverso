# Plano de Testes de Software

## Objetivo
Garantir que todas as calculadoras funcionem offline, apliquem corretamente as formulas descritas e persistam o ultimo resultado sem erros, iniciando a partir da tela de boas-vindas/login (sem autenticacao).

## Estrategia
- Smoke manual no Expo Go (Android/iOS) seguindo casos definidos.  
- Validacao visual de faixas/cores, pills e gauge/linha no IMC.  
- Registro de resultados e valores esperados para facilitar reexecucao.  
- Checar carregamento de assets otimizados (logos/menu/login) sem atrasar a primeira tela.  
- Futuro: automatizar funcoes puras em `src/utils/`.

## Casos de teste (resumo)

| ID | Cenario | Passos resumidos | Resultado esperado |
| -- | ------- | ---------------- | ------------------ |
| TS-LOGIN-01 | Entrar no app | Abrir app, tocar em "Seja bem-vindo!" | Navegar para o menu sem exigir credenciais |
| TS-IMC-01 | Campos obrigatorios | Nome vazio, calcular | Erro "Informe seu nome." |
| TS-IMC-02 | Calculo IMC | Peso 80, altura 180 | IMC 24.69, faixa "Peso normal", gauge verde |
| TS-IMC-03 | Persistencia IMC | Calcular, fechar e reabrir | Resultado carregado de `imc:last` |
| TS-RCE-01 | WHtR/RCEst | Cintura 82, altura 165 | WHtR 0.497, faixa "Saudavel" |
| TS-RCQ-01 | RCQ | Feminino, cintura 82, quadril 96 | RCQ 0.854, faixa "Elevado" |
| TS-PESO-01 | Peso acamado | Fem, CPA 34, AJ 48, CB 28, DCSE 12 | ~52.6 kg (Chumlea fem) salvo em `bed:last` |
| TS-TMB-01 | Harris-Benedict | Masc, 35a, 80kg, 180cm | TMB ~1825 kcal/dia |
| TS-EER-01 | IOM + PA | Fem, 30a, 60kg, 165cm, PA leve | Base ~2117 kcal (PA 1.12) |
| TS-EER-02 | Gestacao | Mesmos dados, 20 semanas gestantes | Bonus 340 kcal aplicado (total ~2457 kcal) |
| TS-GET-01 | GET x NAF | Masc, 35a, 80kg, 180cm, NAF 1.55 | GET ~2836 kcal/dia |
| TS-NAF-01 | Intervalo GET | Selecionar nivel "Ativo" (1.6-1.89) e TMB 1500 | GET 2400-2835 kcal |
| TS-GC-01 | Jackson & Pollock 3 | Masc, soma 65mm, 30a, 175cm | %GC ~19% (DC + Siri) |
| TS-GC-02 | US Navy | Fem, pescoco 36, cintura 82, quadril 96, 165cm | %GC conforme formula log10 US Navy |
| TS-MI-01 | MAMA | CB 32cm, PCT 12mm | CMB ~28.2 cm; area ~63.5 cm^2 |
| TS-MACRO-01 | Distribuicao | 2000 kcal, 50/20/30 | 250 g carb, 100 g prot, 67 g gord |
| TS-HIDR-01 | Hidratacao 30-35 ml/kg | 70 kg | 2100-2450 ml/dia |
| TS-PER-01 | Persistencia geral | Calcular em todas as telas, reabrir | Todos os ultimos resultados carregados |

## Criterios de aceite
- Todos os casos criticos (TS-LOGIN-01, TS-IMC-01/02/03, TS-RCE-01, TS-RCQ-01, TS-PESO-01, TS-TMB-01, TS-EER-01/02, TS-GET-01, TS-GC-01, TS-MI-01, TS-PER-01) aprovados.  
- Nenhum crash ao abrir, calcular ou reabrir.  
- Erros exibidos para campos vazios ou valores nao positivos.

## Ambiente de teste
- Expo Go 54, Android 12+ e iOS 16+.  
- Sem conexao necessaria apos instalacao.  
- Testar em dispositivo intermediario e observar desempenho em aparelhos de entrada, verificando fluidez das animacoes.
