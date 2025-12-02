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
import BottomBar from "../components/BottomBar";
import { colors } from "../theme/colors";
import { TMB_STORAGE_KEY } from "../constants/tmb";
import { calculateTmb } from "../utils/tmb";
import { parseLocaleNumber } from "../utils/number";

const SEX_OPTIONS = [
  { key: "female", label: "Feminino" },
  { key: "male", label: "Masculino" },
];

const initialForm = {
  age: "",
  weight: "",
  height: "",
  sex: "female",
};

const TmbScreen = ({ onMenu, onProfile, onExit }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(TMB_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar TMB", err);
      }
    };
    load();
  }, []);

  const handleFieldChange = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss();
    setError("");

    const age = parseLocaleNumber(form.age);
    const weight = parseLocaleNumber(form.weight);
    const height = parseLocaleNumber(form.height);

    if (!age || age <= 0) return setError("Idade invalida.");
    if (!weight || weight <= 0) return setError("Peso invalido.");
    if (!height || height <= 0) return setError("Altura invalida.");

    const tmb = calculateTmb({
      ageYears: age,
      weightKg: weight,
      heightCm: height,
      sex: form.sex,
    });

    const payload = {
      tmb,
      age,
      weight,
      height,
      sex: form.sex,
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(TMB_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar TMB", err);
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
          <View style={styles.header}>
            <Text style={styles.kicker}>Base para o GET</Text>
            <Text style={styles.title}>TMB · Taxa Metabolica Basal</Text>
            <Text style={styles.subtitle}>
              Estime o gasto energetico em repouso com Harris-Benedict (sexo, idade, peso, altura).
              A TMB e a fundacao para calcular o GET multiplicando por um fator de atividade.
            </Text>
          </View>

          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados do calculo</Text>
            </View>
            <View style={styles.row}>
              <TextField
                placeholder="Idade (anos)"
                keyboardType="decimal-pad"
                value={form.age}
                onChangeText={handleFieldChange("age")}
                style={styles.half}
              />
              <TextField
                placeholder="Peso (kg)"
                keyboardType="decimal-pad"
                value={form.weight}
                onChangeText={handleFieldChange("weight")}
                style={styles.half}
              />
            </View>
            <TextField
              placeholder="Altura (cm)"
              keyboardType="decimal-pad"
              value={form.height}
              onChangeText={handleFieldChange("height")}
            />

            <Text style={styles.label}>Sexo</Text>
            <View style={styles.optionsRow}>
              {SEX_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.key}
                  style={[
                    styles.pill,
                    form.sex === opt.key && styles.pillSelected,
                  ]}
                  onPress={() => setForm((prev) => ({ ...prev, sex: opt.key }))}
                >
                  <Text
                    style={[
                      styles.pillText,
                      form.sex === opt.key && styles.pillTextSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular TMB" onPress={handleCalculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {form.sex === "female" ? "Feminino" : "Masculino"}
                </Text>
              </View>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <Text style={styles.highlightValue}>{result.tmb} kcal/dia</Text>
                <Text style={styles.highlightLabel}>Energia em repouso</Text>
                <ResultRow label="Idade" value={`${result.age} anos`} />
                <ResultRow label="Peso" value={`${result.weight.toFixed(1)} kg`} />
                <ResultRow label="Altura" value={`${result.height.toFixed(1)} cm`} />
                <ResultRow
                  label="Sexo"
                  value={result.sex === "female" ? "Feminino" : "Masculino"}
                />
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Insira os dados e calcule para ver a TMB.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias e uso</Text>
            <Text style={styles.helperText}>
              • Harris-Benedict (revisado) diferencia sexo, idade, peso e altura.
            </Text>
            <Text style={styles.helperText}>
              • Para obter o GET diario, multiplique a TMB pelo fator de atividade (sedentario ate muito ativo).
            </Text>
            <Text style={styles.helperText}>
              • TMB e uma estimativa: bioimpedancia ou calorimetria podem refinar o valor real.
            </Text>
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias</Text>
            <Text style={styles.helperText}>
              • Harris JA, Benedict FG. A biometric study of human basal metabolism. Proc Natl Acad Sci. 1918.
            </Text>
            <Text style={styles.helperText}>
              • Roza AM, Shizgal HM. The Harris-Benedict equation reevaluated. Am J Clin Nutr. 1984.
            </Text>
          </SectionCard>
        </ScrollView>
        <BottomBar onMenu={onMenu} onProfile={onProfile} onExit={onExit} />
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
    paddingBottom: 140,
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
  label: {
    color: colors.ink,
    fontWeight: "700",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  pillSelected: {
    backgroundColor: `${colors.primary}12`,
    borderColor: `${colors.primary}66`,
  },
  pillText: {
    color: colors.inkMuted,
    fontWeight: "700",
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

export default TmbScreen;
