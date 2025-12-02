# Apresentacao do Projeto

## Narrativa
Nulltriverso combina a precisao do "Null" da programacao com a pratica da nutricao, criando um multiverso de calculadoras rapidas e offline. A versao atual entrega um menu mobile com IMC, EER, TMB, GET, %GC e MAMA, reutilizando a mesma identidade visual e persistindo o ultimo resultado de cada modulo.

## Destaques da solucao
- Menu ilustrado com cards tematicos e gradiente.
- Formulario enxuto em cada calculadora, com validacao imediata e suporte a virgula/ponto.
- Resultados com badge/cores, linhas chave-valor e, no IMC, gauge + linha mockada.
- Equacoes explicitas: IOM, Harris-Benedict, Siri, US Navy, MAMA (CB/PCT).
- Persistencia local por modulo (AsyncStorage) para retomar a sessao rapidamente.

## Roteiro de demonstracao
1) Abrir o menu e acessar IMC; mostrar validacao e gauge.  
2) Ir para EER, escolher atividade e (opcional) gestacao; destacar bonus aplicado.  
3) Calcular TMB e depois GET com um NAF diferente; observar resumo.  
4) Mostrar %GC escolhendo protocolo Jackson & Pollock e, depois, US Navy.  
5) Calcular MAMA com PCT em mm e converter automaticamente.  
6) Reabrir o app e exibir ultimos resultados carregados.

## Proximas entregas
- Implementar logica dos cards RCQ, RCEst, Bioimpedancia, Macros, Hidrica, NAF detalhado.  
- Historico completo de calculos e compartilhamento/exportacao.  
- Analytics e sincronizacao com backend para multiplos dispositivos.
