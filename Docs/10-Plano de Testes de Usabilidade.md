# Plano de Testes de Usabilidade

## Objetivos
- Verificar se a tela de boas-vindas/login e compreendida (sem autenticacao real) e se o menu com 12 cards e compreendido sem instrucao.  
- Avaliar clareza de mensagens de erro, textos de formula e faixas de risco (IMC/RCQ/RCEst/%GC).  
- Entender se cores/badges e o resumo em `ResultRow` ajudam na interpretacao.  
- Garantir que usuarios encontrem os ultimos resultados salvos ao reabrir.

## Perfil dos participantes
- 3 a 5 usuarios finais (iniciante e habituado a apps de saude).  
- 1 nutricionista ou estudante de nutricao/EF.  
- Android e iOS.

## Roteiro
1. Abrir o app, observar a tela de boas-vindas/login e pedir para avançar ao menu (CTA "Seja bem-vindo!").  
2. Escolher qualquer calculadora do menu (observando compreensao dos nomes).  
2. Concluir um calculo simples (IMC ou RCEst) sem ajuda.  
3. Concluir um calculo com selecao (EER com atividade, %GC escolhendo protocolo, MAMA trocando unidade ou Peso acamado escolhendo sexo).  
4. Induzir erro (campo vazio ou zero) e observar entendimento da mensagem.  
5. Calcular macros ou hidrica para avaliar textos de apoio e limites de faixa.  
6. Fechar/reabrir e pedir para localizar o ultimo resultado salvo.  
7. Perguntar o significado das cores/badges exibidas.

## Metricas
- Taxa de sucesso na primeira tentativa por calculadora.  
- Tempo ate completar cada fluxo (cronometro).  
- Numero de mensagens de erro exibidas.  
- Clareza percebida (Likert 1-5) para cores/faixas e textos de formula.  
- Compreensao do menu (identificacao correta da funcao de cada card).

## Criterios de aceite
- >= 80% completam IMC ou RCEst sem ajuda.  
- >= 90% entendem mensagens de erro.  
- >= 70% avaliam que cores/badges ajudam na leitura do resultado.  
- Participantes identificam para que servem os principais cards (IMC, RCQ, RCEst, EER, TMB, GET, %GC, MAMA, Peso acamado, Macros, Hidrica).

## Instrumentos
- Expo Go com gravacao de tela opcional.  
- Roteiro impresso/digital para notas.  
- Questionario curto pos-teste (3-5 perguntas).  
- Planilha para consolidar tempos, erros e percepcoes.
