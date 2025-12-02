# Programacao de Funcionalidades

## Escopo entregue

| Item | Descricao | Status |
| ---- | --------- | ------ |
| Menu de calculadoras | Grid responsivo com cards e gradiente de fundo | Concluido |
| IMC | Peso/altura/nome, parse com virgula, status OMS, gauge e linha mockada, persistencia `imc:last` | Concluido |
| EER | IOM adulto com fator de atividade por sexo, opcao gestante (bonus 8 kcal/sem + 180), persistencia `eer:last` | Concluido |
| TMB/BMR | Harris-Benedict revisado por sexo; resultado em kcal/dia, persistencia `tmb:last` | Concluido |
| GET | GEB (Harris-Benedict) x NAF selecionado, mostrando fator e descricao, persistencia `get:last` | Concluido |
| % Gordura corporal | Protocolos Jackson & Pollock (3 ou 7 dobras + Siri) e US Navy (circunferencias), persistencia `gc:last` | Concluido |
| MAMA | CB e PCT em mm ou cm, calcula CMB e area do braco, persistencia `mi:last` | Concluido |
| Componentes e paleta | Cards, botoes, inputs, pills e ResultRow reutilizaveis; paleta em `theme/colors.js` | Concluido |
| Placeholders futuros | RCQ, RCEst, Bio, NAF detalhado, Macros, Hidrica no menu (sem logica) | Pendente |

## Detalhes de implementacao
- **HomeScreen (IMC)**: valida campos, calcula IMC via `utils/imc`, colore badge e barra conforme faixa; gauge e linha usam dados mockados.  
- **EerScreen**: coleta sesso, atividade (lista em `constants/eer`), gestacao opcional; `utils/eer` retorna base, bonus e total arredondados.  
- **TmbScreen**: usa `utils/tmb` (Harris-Benedict) com sexo/idade/peso/altura.  
- **GetScreen**: `utils/get` calcula GEB e multiplica pelo NAF (lista em `constants/get`).  
- **GcScreen**: protocolos em `constants/gc`; `utils/gc` aplica Jackson & Pollock + Siri ou formula US Navy em cm; campos dinamicos por protocolo.  
- **MiScreen**: `utils/mi` converte PCT mm->cm quando escolhido e calcula CMB/area.  
- **Persistencia**: cada tela carrega ultimo resultado no `useEffect` inicial; erros de IO sao logados com `console.warn`.

## Pendencias/roadmap
- Implementar logica dos cards futuros (RCQ, RCEst, Bioimpedancia, Macros, Hidrica, NAF detalhado).  
- Historico completo de calculos por usuario.  
- Compartilhamento/exportacao dos resultados.  
- Internacionalizacao e unidades alternativas (imperial).
