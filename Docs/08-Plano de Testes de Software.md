# Plano de Testes de Software

## Objetivo
Validar que todas as calculadoras funcionam offline, calculam conforme os protocolos definidos, exibem mensagens claras e persistem o ultimo resultado.

## Estrategia
- Testes manuais exploratorios no Expo Go (Android/iOS).  
- Casos funcionais por calculadora + persistencia.  
- Inspecao visual de cores/faixas, pills e gauge.  
- Futuro: automatizar funcoes puras de `utils/`.

## Casos de teste (resumo)

| ID | Cenario | Passos resumidos | Resultado esperado |
| -- | ------- | ---------------- | ------------------ |
| TS-IMC-01 | Campos obrigatorios | Deixar nome vazio e tocar em calcular | Mensagem "Informe seu nome." |
| TS-IMC-02 | Calculo IMC | Peso 80, altura 180 | IMC ~24.69, status "Peso normal", badge/barra verde |
| TS-IMC-03 | Persistencia IMC | Calcular, fechar app e reabrir | Resultado carregado de `imc:last` |
| TS-EER-01 | Fator por sexo | Feminino, 30a, 60kg, 165cm, atividade leve | Total segue equacao IOM com PA feminino 1.12 |
| TS-EER-02 | Gestante | Ativar gestacao 20 semanas | Bonus = 8*20 + 180 somado ao EER base |
| TS-TMB-01 | Harris-Benedict | Masculino, 35a, 80kg, 180cm | TMB conforme formula revisada |
| TS-GET-01 | GET com NAF | Usar dados do TMB, escolher NAF 1.55 | GET = GEB x 1.55, exibindo fator e label |
| TS-GC-01 | Jackson & Pollock 3 dobras | Sexo masc, soma 65mm, 30a, 175cm | %GC calculado via DC + Siri |
| TS-GC-02 | US Navy fem | Pescoco 36, cintura 82, quadril 96, 165cm | %GC conforme log10 US Navy |
| TS-MI-01 | Unidade PCT mm | CB 32cm, PCT 12mm | Conversao para cm, CMB/area calculados |
| TS-PESO-01 | Peso acamado | Feminino, CPA 34, AJ 48, CB 28, DCSE 12 | Peso estimado conforme Chumlea fem |
| TS-PER-01 | Persistencia geral | Realizar calculo em cada modulo e reabrir app | Ultimos resultados carregados sem erro |

## Criterios de aceite
- Testes criticos (TS-IMC-01/02/03, TS-EER-01, TS-TMB-01, TS-GET-01, TS-GC-01, TS-MI-01, TS-PESO-01, TS-PER-01) aprovados.  
- Nenhum crash ao abrir, calcular ou reabrir.  
- Mensagens de erro exibidas para valores vazios ou nao positivos.

## Ambiente de teste
- Expo Go 54, Android 12+ e iOS 16+.  
- Sem conexao exigida apos instalacao.  
- Dispositivos alvo: intermediarios; monitorar performance em aparelhos de entrada.
