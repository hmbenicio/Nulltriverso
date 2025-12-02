# Metodologia

## Abordagem
- **Iteracoes curtas em Kanban enxuto**: cada calculadora entregue de ponta a ponta (UI + validacao + persistencia).  
- **Definicao de pronto**: entrada validada, calculo correto, feedback visual, ultimo resultado salvo e carregado.  
- **Feedback rapido**: revisao com nutricionista/estudante para nomenclatura e fatores; ajustes de texto direto na tela.

## Ferramentas
- **Codigo**: React Native + Expo 54; AsyncStorage; react-native-svg; expo-linear-gradient.  
- **Versao**: GitHub; branches curtas por modulo; `main` sempre executavel no Expo Go.  
- **Qualidade**: testes manuais guiados pelo plano; logs leves no console; lint/format padrao Expo quando aplicavel.  
- **Comunicacao**: issues/projetos no GitHub, compartilhamento via QR do Expo Go.

## Organizacao do repositorio
- `Nulltriverso/frontend`: app mobile. Pastas por dominio (`components`, `constants`, `screens`, `theme`, `utils`).  
- `Docs`: documentacao viva (contexto, requisitos, arquitetura, testes, apresentacao).  
- `Apresentacao`: materiais visuais.  
- `Nulltriverso/backend`: reservado para futuras integracoes.

## Fluxo de trabalho
- **To Do**: texto/UX, formulas, fatores de atividade/protocolo, mensagens de erro.  
- **Doing**: implementacao em tela, validacao, salvamento local.  
- **Review**: testes em aparelho/emulador, checagem de copys e cores.  
- **Done**: merge com docs atualizados e chaves de storage definidas.

## Riscos e mitigacao
- **Ausencia de backend**: dados limitados ao dispositivo; comunicamos escopo local e planejamos sincronizacao futura.  
- **Perf em aparelhos basicos**: componentes leves, sem animacoes pesadas; SVG em tamanho moderado.  
- **Formula interpretada incorretamente**: textos trazem citacao de metodo (IOM, Harris-Benedict, Siri, US Navy, Chumlea); revisao com profissional.  
- **Escalabilidade de UI**: uso de componentes e paleta centralizados; novos modulos reutilizam pills, cards e ResultRow.

## Entregaveis desta fase
- Menu com calculadoras IMC, EER, TMB, GET, %GC, MAMA e peso acamado funcionando offline.  
- Documentacao atualizada (contexto, especificacao, arquitetura, testes, apresentacao).  
- Plano de evolucao para modulos futuros (RCQ, RCEst, Bioimpedancia, Macros, Hidrica, NAF detalhado).
