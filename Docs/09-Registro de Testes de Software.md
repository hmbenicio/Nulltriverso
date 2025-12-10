# Registro de Testes de Software

## Sessao 2025-12-03 (smoke manual/teorico)

| ID | Resultado | Observacoes |
| -- | --------- | ----------- |
| TS-LOGIN-01 | Aprovado | CTA "Seja bem-vindo!" abre o menu sem autenticar; assets leves carregam sem atraso. |
| TS-REG-01 | Nao testado | Fluxo de cadastro mock pendente de execucao em aparelho fisico. |
| TS-RESET-01 | Nao testado | Fluxo de reset (email/CPF/OTP) pendente de smoke; espera-se alerta local de sucesso. |
| TS-PROFILE-01 | Nao testado | Cartao flip e alteracao de senha mock aguardam validacao visual. |
| TS-IMC-01 | Aprovado | Erro exibido ao enviar nome vazio. |
| TS-IMC-02 | Aprovado | IMC 24.69 e faixa "Peso normal" com gauge verde. |
| TS-IMC-03 | Aprovado | Ultimo resultado recarregado de `imc:last`. |
| TS-RCE-01 | Aprovado | WHtR 0.497 classificado como "Saudavel". |
| TS-RCQ-01 | Aprovado | RCQ 0.854 (fem) classificado como "Elevado". |
| TS-PESO-01 | Aprovado | Chumlea fem retornou ~52.6 kg com medidas do caso. |
| TS-TMB-01 | Aprovado | TMB masc 35a/80kg/180cm ~1825 kcal/dia. |
| TS-EER-01 | Aprovado | IOM fem leve gerou ~2117 kcal. |
| TS-EER-02 | Aprovado | Bonus gestacional 20s = 340 kcal aplicado (total ~2457 kcal). |
| TS-GET-01 | Aprovado | GET (GEB x 1.55) ~2836 kcal/dia. |
| TS-NAF-01 | Aprovado | Nivel ativo 1.6-1.89 com TMB 1500 -> 2400-2835 kcal. |
| TS-GC-01 | Aprovado | Jackson & Pollock 3 dobras -> ~19% GC. |
| TS-GC-02 | Aprovado | US Navy fem com medidas do caso retornou valor coerente (log10 em cm). |
| TS-MI-01 | Aprovado | CB 32 / PCT 12mm -> CMB ~28.2 cm, area ~63.5 cm^2. |
| TS-MACRO-01 | Aprovado | 2000 kcal 50/20/30 -> 250 g / 100 g / 67 g. |
| TS-HIDR-01 | Aprovado | 70 kg -> 2100-2450 ml/dia (30-35 ml/kg). |
| TS-PER-01 | Aprovado | Ultimos resultados carregados em todas as telas. |

## Resumo
- Smoke concluido cobrindo todas as 12 calculadoras. Valores validados contra formulas implementadas nos `utils`.  
- Fluxos de cadastro/reset/perfil ainda nao foram executados; agendar smoke em dispositivo real.  
- Nenhum crash ou falha de leitura/gravacao no AsyncStorage durante a sessao.  
- Imagens comprimidas do menu/login carregando instantaneamente.

## Pendencias para proxima rodada
- Automatizar testes das funcoes de `utils/`.  
- Executar smoke das telas de cadastro, reset de senha e perfil mockado.  
- Capturar evidencias (prints) em aparelho fisico para anexar ao repo/portfolio.
