# Metodologia

## Abordagem
- **Iteracoes curtas por calculadora**: cada card entregue fim a fim (UI, validacao, calculo, persistencia) precedido pela tela de boas-vindas/login animada que nao exige cadastro.  
- **Definicao de pronto**: campos validados, resultado correto exibido com cores/dicas, ultimo calculo salvo e recarregado.  
- **Revisao rapida**: ajustes de copy e fatores com olhar de nutricionista/estudante; foco em clareza, referencias na tela e consistencia visual.

## Ferramentas
- **Codigo**: React Native + Expo 54, AsyncStorage, react-native-svg, expo-linear-gradient.  
- **Controle de versao**: GitHub com branch curta por tela; `main` sempre executavel via QR do Expo Go.  
- **Qualidade**: smoke manual guiado pelo plano de testes; logs leves (`console.warn`) para IO; formato padrao Expo.  
- **Documentacao**: arquivos Markdown em `Docs/`, roteiro em `Apresentacao/`, imagens otimizadas em `assets/`.

## Organizacao do repositorio
- `Nulltriverso/frontend`: app mobile organizado por dominio (`components`, `constants`, `screens`, `theme`, `utils`) com assets PNG comprimidos.  
- `Docs`: contexto, requisitos, arquitetura, testes e referencias.  
- `Apresentacao`: roteiro de demo com link para video (quando houver).  
- `Nulltriverso/backend`: reservado para integracao futura.

## Fluxo de trabalho
- **To Do**: definir formula e texto de apoio, inputs e validacoes, referencias bibliograficas.  
- **Doing**: implementar tela, conectar util de calculo, aplicar paleta e salvar resultado.  
- **Review**: testar em aparelho/emulador, revisar mensagens e referencias citadas, conferir tamanho de imagens.  
- **Done**: documentacao atualizada, chaves de storage fixadas, codigo integrado ao menu/login e imagens otimizadas.

## Riscos e mitigacao
- **Sem backend**: escopo e comunicado como 100% local; historico e sincronizacao entram no roadmap.  
- **Desempenho em aparelhos basicos**: animacoes leves, uso moderado de SVG e sem bibliotecas nativas extras.  
- **Formula mal interpretada**: telas trazem metodo e referencia; docs listam fontes (OMS, IOM, WHO, Jackson & Pollock, US Navy, Chumlea etc.).  
- **Escalabilidade de UI**: paleta/tokens centralizados, componentes reutilizaveis e utils puros.

## Entregaveis desta fase
- Tela de boas-vindas/login com gradiente, estrelas e animacao de "buraco negro" conduzindo ao menu (CTA "Seja bem-vindo!").  
- Menu completo com 12 calculadoras: IMC, RCEst, RCQ, Peso acamado, TMB, EER, GET, NAF, %GC, MI, Macro e Hidrica.  
- Documentacao revisada (contexto a referencias) com imagens dos cards/telas.  
- Plano de testes atualizado e registro de smoke.  
- Roteiro de apresentacao para portfolio profissional do Nulltriverso.
