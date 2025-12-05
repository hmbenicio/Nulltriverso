import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
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
import { HIDRICA_METHODS, HIDRICA_STORAGE_KEY } from "../constants/hidrica";
import { parseLocaleNumber } from "../utils/number";

const HidricaScreen = ({ onMenu, onProfile, onInfo }) => {
  const [method, setMethod] = useState(HIDRICA_METHODS[0].key);
  const [weight, setWeight] = useState("");
  const [kcal, setKcal] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(HIDRICA_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar necessidade hidrica", err);
      }
    };
    load();
  }, []);

  const selectedMethod = useMemo(
    () => HIDRICA_METHODS.find((m) => m.key === method) || HIDRICA_METHODS[0],
    [method]
  );

  const calculate = useCallback(async () => {
    setError("");
    const weightKg = parseLocaleNumber(weight);
    const kcalTotal = parseLocaleNumber(kcal);

    if (!weightKg || weightKg <= 0) return setError("Peso invalido.");

    let minMl = 0;
    let maxMl = 0;
    let note = "";

    if (method === "ml_per_kg") {
      minMl = weightKg * 30;
      maxMl = weightKg * 35;
      note = "Faixa comum para adultos saudaveis.";
    } else if (method === "ml_per_kcal") {
      if (!kcalTotal || kcalTotal <= 0)
        return setError("Informe o gasto calorico para 1 ml/kcal.");
      minMl = maxMl = kcalTotal;
      note = "Equivalente ao GET informado.";
    } else if (method === "holliday_segar") {
      if (weightKg <= 10) {
        minMl = weightKg * 100;
      } else if (weightKg <= 20) {
        minMl = 1000 + (weightKg - 10) * 50;
      } else {
        minMl = 1500 + (weightKg - 20) * 20;
      }
      maxMl = minMl;
      note = "Metodo pediatrico (Holliday-Segar).";
    }

    const payload = {
      method,
      methodLabel: selectedMethod.label,
      weightKg,
      kcalTotal: kcalTotal > 0 ? kcalTotal : null,
      minMl,
      maxMl,
      note,
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(HIDRICA_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar necessidade hidrica", err);
    }
  }, [method, weight, kcal, selectedMethod]);

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
            <Text style={styles.kicker}>DIETA & HIDRATAÇÃO</Text>
          <View style={styles.titleRow}>
            <BackToMenuButton onPress={onMenu} style={styles.homeButton} />
            <Text style={styles.title}>Necessidade hidrica</Text>
          </View>
            <Text style={styles.subtitle}>
              Estime a ingestao diaria com 30-35 ml/kg, 1 ml/kcal ou Holliday-Segar (pediatrico).
            </Text>
          </View>
          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Metodo</Text>
            </View>
            <View style={styles.methodList}>
              {HIDRICA_METHODS.map((item) => {
                const active = item.key === method;
                return (
                  <Pressable
                    key={item.key}
                    style={[
                      styles.methodCard,
                      active && styles.methodCardActive,
                    ]}
                    onPress={() => setMethod(item.key)}
                  >
                    <Text style={[styles.methodTitle, active && styles.methodTitleActive]}>
                      {item.label}
                    </Text>
                    <Text style={styles.methodDesc}>{item.description}</Text>
                  </Pressable>
                );
              })}
            </View>
          </SectionCard>

          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados</Text>
            </View>
            <TextField
              placeholder="Peso (kg)"
              keyboardType="decimal-pad"
              value={weight}
              onChangeText={setWeight}
            />
            {method === "ml_per_kcal" ? (
              <TextField
                placeholder="Gasto calorico total (kcal/dia)"
                keyboardType="decimal-pad"
                value={kcal}
                onChangeText={setKcal}
              />
            ) : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular necessidade" onPress={calculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{selectedMethod.label}</Text>
              </View>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <ResultRow label="Peso" value={`${result.weightKg.toFixed(1)} kg`} />
                {result.kcalTotal ? (
                  <ResultRow label="GET informado" value={`${result.kcalTotal.toFixed(0)} kcal`} />
                ) : null}
                {result.minMl === result.maxMl ? (
                  <ResultRow label="Necessidade" value={`${result.minMl.toFixed(0)} ml/dia`} />
                ) : (
                  <ResultRow
                    label="Necessidade"
                    value={`${result.minMl.toFixed(0)} - ${result.maxMl.toFixed(0)} ml/dia`}
                  />
                )}
                {result.note ? <Text style={styles.helperText}>{result.note}</Text> : null}
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Informe os dados e calcule para ver a recomendacao.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias e notas</Text>
            <Text style={styles.helperText}>
              • Adultos: 30-35 ml/kg como faixa geral; ajuste por clima, febre, exercicio.
            </Text>
            <Text style={styles.helperText}>
              • 1 ml/kcal se voce souber o gasto calorico total.
            </Text>
            <Text style={styles.helperText}>
              • Pediatria: Holliday-Segar (100/50/20 ml/kg). Avalie clinica e monitoramento.
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
  methodList: {
    gap: 10,
  },
  methodCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 14,
    padding: 14,
  },
  methodCardActive: {
    backgroundColor: `${colors.primary}0f`,
    borderColor: `${colors.primary}55`,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  methodTitle: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16,
  },
  methodTitleActive: {
    color: colors.primary,
  },
  methodDesc: {
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
    gap: 4,
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

export default HidricaScreen;








