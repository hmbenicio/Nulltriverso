import React, { useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import SectionCard from "../components/SectionCard";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import ResultRow from "../components/ResultRow";
import { colors } from "../theme/colors";
import { MI_STORAGE_KEY } from "../constants/mi";
import { calculateMama } from "../utils/mi";
import { parseLocaleNumber } from "../utils/number";

const UNIT_OPTIONS = [
  { key: "mm", label: "PCT em mm" },
  { key: "cm", label: "PCT em cm" },
];

const initialForm = {
  armCircumference: "",
  tricepsFold: "",
  tricepsUnit: "mm",
};

const MiScreen = ({ onBack }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(MI_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar MAMA", err);
      }
    };
    load();
  }, []);

  const handleFieldChange = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss();
    setError("");

    const cb = parseLocaleNumber(form.armCircumference);
    const pctRaw = parseLocaleNumber(form.tricepsFold);

    if (!cb || cb <= 0) return setError("Circunferencia do braco invalida.");
    if (!pctRaw || pctRaw <= 0) return setError("Prega tricipital invalida.");

    const pctCm = form.tricepsUnit === "mm" ? pctRaw / 10 : pctRaw;

    const { cmb, area } = calculateMama({
      armCircumferenceCm: cb,
      tricepsFoldCm: pctCm,
    });

    const payload = {
      cb,
      pct: pctRaw,
      pctCm,
      cmb,
      area,
      tricepsUnit: form.tricepsUnit,
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(MI_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar MAMA", err);
    }
  }, [form]);

  return (
    <LinearGradient colors={[colors.backgroundLight, colors.background]} style={styles.screen}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {onBack ? <PrimaryButton label="Voltar para o menu" onPress={onBack} /> : null}

          <View style={styles.header}>
            <Text style={styles.kicker}>Massa muscular</Text>
            <Text style={styles.title}>Indice de Muscularidade (MAMA)</Text>
            <Text style={styles.subtitle}>
              Calcula a area muscular do braco (cm²) usando circunferencia do braco (CB) e prega tricipital (PCT).
              Se medir PCT em mm, escolha a unidade para converter automaticamente.
            </Text>
          </View>

          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Medidas</Text>
            </View>
            <TextField
              placeholder="Circunferencia do braco (cm)"
              keyboardType="decimal-pad"
              value={form.armCircumference}
              onChangeText={handleFieldChange("armCircumference")}
            />
            <View style={styles.row}>
              <TextField
                placeholder="Prega tricipital"
                keyboardType="decimal-pad"
                value={form.tricepsFold}
                onChangeText={handleFieldChange("tricepsFold")}
                style={styles.half}
              />
              <View style={[styles.optionsRow, styles.half]}>
                {UNIT_OPTIONS.map((opt) => (
                  <Pressable
                    key={opt.key}
                    style={[
                      styles.pill,
                      form.tricepsUnit === opt.key && styles.pillSelected,
                    ]}
                    onPress={() => setForm((prev) => ({ ...prev, tricepsUnit: opt.key }))}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        form.tricepsUnit === opt.key && styles.pillTextSelected,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular MAMA" onPress={handleCalculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado</Text>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <Text style={styles.highlightValue}>{result.area.toFixed(2)} cm²</Text>
                <Text style={styles.highlightLabel}>Area muscular do braco (MAMA)</Text>
                <ResultRow label="CMB (CB - π x PCT)" value={`${result.cmb.toFixed(2)} cm`} />
                <ResultRow
                  label="Circunferencia do braco"
                  value={`${result.cb.toFixed(1)} cm`}
                />
                <ResultRow
                  label="Prega tricipital"
                  value={
                    result.tricepsUnit === "mm"
                      ? `${result.pct.toFixed(1)} mm (${result.pctCm.toFixed(2)} cm)`
                      : `${result.pct.toFixed(2)} cm`
                  }
                />
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Informe CB e PCT para calcular a MAMA.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias</Text>
            <Text style={styles.helperText}>
              • Formula: MAMA = [CB - (π × PCT)]² / (4π), unidades em centimetros.
            </Text>
            <Text style={styles.helperText}>
              • PCT em mm? Selecione "PCT em mm" para converter automaticamente (divide por 10).
            </Text>
            <Text style={styles.helperText}>
              • Compare com tabelas de referencia por idade/sexo para interpretar o indice de muscularidade.
            </Text>
          </SectionCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingVertical: 42,
    gap: 22,
  },
  header: {
    gap: 6,
  },
  kicker: {
    color: colors.ink,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  subtitle: {
    color: colors.inkMuted,
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
  row: {
    flexDirection: "row",
    gap: 12,
  },
  half: {
    flex: 1,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    flex: 1,
    alignItems: "center",
  },
  pillSelected: {
    backgroundColor: `${colors.primary}12`,
    borderColor: `${colors.primary}66`,
  },
  pillText: {
    color: colors.inkMuted,
    fontWeight: "700",
    textAlign: "center",
  },
  pillTextSelected: {
    color: colors.primary,
  },
  error: {
    color: colors.error,
    fontWeight: "600",
  },
  resultsCard: {
    gap: 12,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultBody: {
    gap: 4,
  },
  highlightValue: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "800",
  },
  highlightLabel: {
    color: colors.inkMuted,
    marginBottom: 8,
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
});

export default MiScreen;
