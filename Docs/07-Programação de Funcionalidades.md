# Programacao de Funcionalidades

## Escopo entregue

| Item | Descricao | Status |
| ---- | --------- | ------ |
| Login/boas-vindas | Gradiente roxo/ambar, campo de estrelas, animacao de discos giratorios e CTA "Seja bem-vindo!" (sem autenticacao) | Concluido |
| Menu de calculadoras | Grid 3 colunas com 12 cards ilustrados e animacao de entrada | Concluido |
| IMC | Peso/altura/nome, gauge e linha mockada, faixas OMS, persistencia `imc:last` | Concluido |
| RCEst / WHtR | Cintura/estatura, faixas <0,4 ate >0,6, persistencia `whtr:last` | Concluido |
| RCQ | Cintura/quadril com faixas por sexo (WHO), persistencia `rcq:last` | Concluido |
| Peso acamado | Equacoes de Chumlea por sexo (CPA, AJ, CB, DCSE), persistencia `bed:last` | Concluido |
| TMB | Harris-Benedict revisado, persistencia `tmb:last` | Concluido |
| EER | IOM adulto + bonus gestacional (8 kcal/sem + 180), persistencia `eer:last` | Concluido |
| GET | GEB (Harris-Benedict) x NAF, persistencia `get:last` | Concluido |
| NAF | Escala OMS (1,0-2,5) com intervalo GET baseado na TMB informada, persistencia `naf:last` | Concluido |
| % Gordura corporal | Jackson & Pollock 3/7 dobras + Siri ou US Navy (circunferencias), persistencia `gc:last` | Concluido |
| Massa muscular (MAMA) | CB + PCT em mm/cm -> CMB e area do braco, persistencia `mi:last` | Concluido |
| Macros | Distribuicao kcal -> g/dia respeitando faixas (45-60/15-25/20-35), persistencia `@nulltriverso/macros` | Concluido |
| Hidrica | 30-35 ml/kg, 1 ml/kcal ou Holliday-Segar, persistencia `hidrica:last` | Concluido |
| Identidade visual | Logos/gradientes otimizados, campo de estrelas, animacoes leves e BottomBar comum | Concluido |

## Detalhes de implementacao
- **LoginScreen**: combina `LinearGradient`, `Animated` (rotacao/pulso) e `StarField`; campos de email/senha sao ilustrativos e o botao navega direto para o menu via `useAppNavigation`.  
- **HomeScreen (IMC)**: `utils/imc` calcula IMC/status/cor; gauge/linha com dados mockados; salva e recarrega automaticamente.  
- **RceScreen/WhtrScreen**: `utils/wht` calcula razao cintura/estatura e `statusFromWhtr` define cor/faixa.  
- **RcqScreen**: `utils/rcq` calcula razao cintura/quadril; `statusFromRcq` aplica thresholds por sexo.  
- **BedriddenWeightScreen**: `utils/bedridden` aplica Chumlea por sexo; resume medidas usadas.  
- **TmbScreen/GetScreen/EerScreen**: usam `utils/tmb`, `utils/get` e `utils/eer`; fatores em `constants/*`.  
- **NafScreen**: lista `constants/naf`; intervalo GET e salvamento mesmo sem TMB (mantem fator).  
- **GcScreen**: protocolos em `constants/gc`; campos dinamicos por metodo (dobras ou circunferencias).  
- **MiScreen**: converte PCT mm->cm quando necessario; mostra CMB e area.  
- **MacroScreen**: valida soma 100% e faixas recomendadas antes de converter kcal -> g/dia.  
- **HidricaScreen**: tres metodos; ml_min/max calculados conforme peso ou kcal.  
- **Persistencia**: `useEffect` em cada tela carrega ultimo resultado; falhas de IO geram `console.warn`.  
- **BottomBar**: atalhos para menu/perfil/sair (perfil stub, sair volta ao login).  
- **Assets**: PNG de menu/login comprimidos (512-700 px) para reduzir bundle sem perder identidade.

## Pendencias/roadmap
- Bioimpedancia e historico completo de calculos por usuario.  
- Compartilhamento/exportacao de resultados (PDF/link).  
- Testes automatizados de `utils/` e pipeline de CI.  
- Internacionalizacao e unidades imperiais (lb/in, fl oz).  
- Analytics opcional para medir uso por calculadora.
