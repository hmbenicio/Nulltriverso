import React, { useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import ScreenBackground from "../components/ScreenBackground";
import SectionCard from "../components/SectionCard";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import BackToMenuButton from "../components/BackToMenuButton";
import ResultRow from "../components/ResultRow";
import { colors } from "../theme/colors";
import { MACRO_STORAGE_KEY } from "../constants/macros";
import { parseLocaleNumber } from "../utils/number";

const CAL_PER_GRAM = {
  carb: 4,
  protein: 4,
  fat: 9,
};


const MacroScreen = ({ onMenu, onProfile, onInfo }) => {
  const [totalKcal, setTotalKcal] = useState("");
  const [carbPct, setCarbPct] = useState("50");
  const [proteinPct, setProteinPct] = useState("20");
  const [fatPct, setFatPct] = useState("30");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(MACRO_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setResult(parsed);
          setTotalKcal(String(parsed.totalKcal));
          setCarbPct(String(parsed.ratios?.carb ? parsed.ratios.carb * 100 : 50));
          setProteinPct(String(parsed.ratios?.protein ? parsed.ratios.protein * 100 : 20));
          setFatPct(String(parsed.ratios?.fat ? parsed.ratios.fat * 100 : 30));
        }
      } catch (err) {
        console.warn("Erro ao carregar distribuicao de macros", err);
      }
    };
    load();
  }, []);

  const calculate = useCallback(async () => {
    Keyboard.dismiss();
    setError("");

    const kcal = parseLocaleNumber(totalKcal);
    const carb = parseLocaleNumber(carbPct);
    const protein = parseLocaleNumber(proteinPct);
    const fat = parseLocaleNumber(fatPct);

    if (!kcal || kcal <= 0)
      return setError("Informe o total de calorias (kcal/dia).");
    if (carb == null || protein == null || fat == null)
      return setError("Preencha os tres macronutrientes em %.");
    const totalPct = carb + protein + fat;
    if (Math.abs(totalPct - 100) > 0.5)
      return setError("As porcentagens devem somar 100% (tolerancia 0,5%).");
    if (carb < 45 || carb > 60)
      return setError("Carboidratos devem ficar entre 45-60%.");
    if (fat < 20 || fat > 35) return setError("Gorduras devem ficar entre 20-35%.");
    if (protein < 15 || protein > 25)
      return setError("Proteinas devem ficar entre 15-25%.");

    const payload = {
      ratios: {
        carb: carb / 100,
        protein: protein / 100,
        fat: fat / 100,
      },
      totalKcal: kcal,
      macros: {
        carb: {
          kcal: (kcal * carb) / 100,
          grams: (kcal * carb) / 100 / CAL_PER_GRAM.carb,
        },
        protein: {
          kcal: (kcal * protein) / 100,
          grams: (kcal * protein) / 100 / CAL_PER_GRAM.protein,
        },
        fat: {
          kcal: (kcal * fat) / 100,
          grams: (kcal * fat) / 100 / CAL_PER_GRAM.fat,
        },
      },
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(MACRO_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar distribuicao de macros", err);
    }
  }, [totalKcal, carbPct, proteinPct, fatPct]);

  return (
    <ScreenBackground>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.kicker}>DIETA & HIDRATACAO</Text>
          <View style={styles.titleRow}>
            <BackToMenuButton onPress={onMenu} style={styles.homeButton} />
            <Text style={styles.title}>Distribuicao de macronutrientes</Text>
          </View>
            <Text style={styles.subtitle}>
              1) Defina o total de calorias diario (TDEE), 2) escolha a proporcao de macros e 3) converta em gramas.
            </Text>
          </View>
          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>1. Total diario (TDEE)</Text>
            </View>
            <TextField
              placeholder="Total diario (kcal)"
              keyboardType="decimal-pad"
              value={totalKcal}
              onChangeText={setTotalKcal}
            />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>2. Proporcao desejada (%)</Text>
            </View>
            <Text style={styles.helperText}>
              Faixas sugeridas: carbo 45-60%, proteina 15-25%, gordura 20-35%. O total deve somar 100%.
            </Text>
            <View style={styles.row}>
              <TextField
                placeholder="Carbo (%)"
                keyboardType="decimal-pad"
                value={carbPct}
                onChangeText={setCarbPct}
                style={styles.third}
              />
              <TextField
                placeholder="Proteina (%)"
                keyboardType="decimal-pad"
                value={proteinPct}
                onChangeText={setProteinPct}
                style={styles.third}
              />
              <TextField
                placeholder="Gordura (%)"
                keyboardType="decimal-pad"
                value={fatPct}
                onChangeText={setFatPct}
                style={styles.third}
              />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular distribuicao" onPress={calculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado (gramas/dia)</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>4 kcal/g (carb/prot) · 9 kcal/g (gord)</Text>
              </View>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <ResultRow
                  label="Total"
                  value={`${result.totalKcal.toFixed(0)} kcal`}
                />
                <ResultRow
                  label="Carboidratos"
                  value={`${result.macros.carb.grams.toFixed(0)} g (${result.macros.carb.kcal.toFixed(0)} kcal)`}
                />
                <ResultRow
                  label="Proteinas"
                  value={`${result.macros.protein.grams.toFixed(0)} g (${result.macros.protein.kcal.toFixed(0)} kcal)`}
                />
                <ResultRow
                  label="Gorduras"
                  value={`${result.macros.fat.grams.toFixed(0)} g (${result.macros.fat.kcal.toFixed(0)} kcal)`}
                />
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Informe as calorias e escolha um perfil para ver os macros em gramas.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias e notas</Text>
            <Text style={styles.helperText}>
               TDEE: pode ser estimado com calculadoras online que usam peso, altura, idade, sexo e nivel de atividade.
            </Text>
            <Text style={styles.helperText}>
               Distribuicoes comuns: 50/20/30 (balanceado), 40/30/30 (rico em proteina) e 25/30/45 (baixo carboidrato).
            </Text>
            <Text style={styles.helperText}>
               Proteina pode variar de 0,8 a 2,0 g/kg conforme objetivo e treino; personalize com profissional de saude.
            </Text>
          </SectionCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
};


const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingVertical: 42,
    paddingBottom: 140,
    gap: 22,
  },
  header: {
    gap: 6,
  },
  kicker: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: "800",
    flexShrink: 1,
    letterSpacing: -0.4,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "800",
  },
  presetList: {
    gap: 10,
  },
  presetCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 14,
    padding: 14,
  },
  presetCardActive: {
    backgroundColor: `${colors.primary}0f`,
    borderColor: `${colors.primary}55`,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  presetTitle: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16,
  },
  presetTitleActive: {
    color: colors.primary,
  },
  presetDesc: {
    color: colors.inkSoft,
    marginTop: 6,
  },
  error: {
    color: colors.error,
    fontWeight: "600",
  },
  resultsCard: {
    gap: 12,
  },
  resultsHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  third: {
    flex: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.warn,
  },
  badgeText: {
    color: colors.surface,
    fontWeight: "700",
  },
  resultBody: {
    gap: 6,
  },
  placeholder: {
    color: colors.inkSoft,
  },
  helperCard: {
    gap: 8,
  },
  legendTitle: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16,
  },
  helperText: {
    color: colors.inkMuted,
    lineHeight: 20,
  },
  homeButton: {
    marginRight: 4,
  },
});

export default MacroScreen;








