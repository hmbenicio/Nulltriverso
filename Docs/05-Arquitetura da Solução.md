# Arquitetura da Solução

## Visão macro
- **Cliente móvel**: app React Native com Expo 54.
- **Persistência local**: `@react-native-async-storage/async-storage` guarda o último cálculo.
- **Visualizações**: `react-native-svg` para gauge e linha.
- **Backend**: inexistente nesta fase; toda lógica ocorre no dispositivo.

## Camadas e responsabilidades
- **Tela (`screens/HomeScreen.js`)**: orquestra o fluxo, gerencia estado do formulário/resultado, controla interação com teclado e rolagem.
- **Componentes (`components/`)**: cartões, botões, inputs e visualizações isoladas para reuso em módulos futuros.
- **Constantes (`constants/imc.js`)**: faixas de IMC, cores e dados mockados de evolução.
- **Utilidades (`utils/imc.js`)**: cálculo, classificação, clamp de valores e parsing de números com vírgula/ponto.
- **Tema (`theme/colors.js`)**: paleta centralizada para manter consistência visual.

## Fluxo de dados
1. Usuário preenche campos → `HomeScreen` valida e normaliza números (`parseLocaleNumber`).
2. Lógica de negócio (`calculateImc`, `statusFromImc`, `colorFromImc`) calcula e classifica.
3. Resultado é armazenado no estado local e salvo no `AsyncStorage` usando a chave `imc:last`.
4. Na abertura, `HomeScreen` lê a chave e popula o painel de resultados, mantendo a experiência consistente.
5. Componentes visuais recebem apenas os dados necessários (IMC atual, status, faixas) para permanecerem desacoplados.

## Decisões técnicas
- **Sem backend nesta fase** para acelerar validação de UX; facilita testes offline e reduz custo de manutenção.
- **Expo** para build rápida e distribuição via QR Code; reduz atrito para testes em diferentes dispositivos.
- **SVG para gauge** pela precisão e controle de faixas; animação moderada para não penalizar aparelhos básicos.

## Evoluções previstas do Nulltriverso
- Sincronização com backend para histórico real de medidas.
- Criação de módulos de metas, cardápios e gamificação reutilizando componentes atuais.
- Telemetria/analytics para medir conversão e tempo de resposta.
- Testes automatizados (unitários para utilidades de IMC e testes de UI via Detox/Expo E2E).
