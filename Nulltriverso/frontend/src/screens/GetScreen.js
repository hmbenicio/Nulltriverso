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
import { GET_STORAGE_KEY, NAF_LEVELS } from "../constants/get";
import { calculateGet } from "../utils/get";
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
  naf: "sedentary",
};

const GetScreen = ({ onMenu, onProfile, onExit }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(GET_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar GET", err);
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

    const calculation = calculateGet({
      ageYears: age,
      weightKg: weight,
      heightCm: height,
      sex: form.sex,
      nafKey: form.naf,
    });

    const payload = {
      ...calculation,
      age,
      weight,
      height,
      sex: form.sex,
      nafKey: form.naf,
      nafLabel: calculation.naf.label,
      nafFactor: calculation.naf.factor,
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(GET_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar GET", err);
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
            <Text style={styles.kicker}>ENERGIA & METABOLISMO</Text>
            <Text style={styles.title}>GET · Gasto Energetico Total</Text>
            <Text style={styles.subtitle}>
              Usa GEB (Harris-Benedict), multiplica pelo NAF e ja inclui o efeito termico dos alimentos
              dentro do fator de atividade.
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

            <Text style={styles.label}>Nivel de atividade (NAF)</Text>
            <View style={styles.activityList}>
              {NAF_LEVELS.map((level) => {
                const active = form.naf === level.key;
                return (
                  <Pressable
                    key={level.key}
                    style={[
                      styles.activityCard,
                      { borderColor: active ? colors.primary : colors.border },
                      active && styles.activityCardSelected,
                    ]}
                    onPress={() => setForm((prev) => ({ ...prev, naf: level.key }))}
                  >
                    <Text
                      style={[
                        styles.activityTitle,
                        active && { color: colors.primary },
                      ]}
                    >
                      {level.label} · {level.factor}
                    </Text>
                    <Text style={styles.activityDescription}>{level.description}</Text>
                  </Pressable>
                );
              })}
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular GET" onPress={handleCalculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{result ? result.nafLabel : "NAF"}</Text>
              </View>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <Text style={styles.highlightValue}>{result.get} kcal/dia</Text>
                <Text style={styles.highlightLabel}>Gasto energetico total estimado</Text>
                <ResultRow label="GEB (Harris-Benedict)" value={`${result.geb} kcal`} />
                <ResultRow label="Fator de atividade" value={`${result.nafFactor} (${result.nafLabel})`} />
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
                Preencha os dados e escolha o NAF para calcular o GET.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Observações</Text>
            <Text style={styles.helperText}>
              • GEB via Harris-Benedict (peso, altura, idade, sexo).
            </Text>
            <Text style={styles.helperText}>
              • GET = GEB x NAF. O efeito termico dos alimentos ja esta contemplado no fator.
            </Text>
            <Text style={styles.helperText}>
              • Escolha o NAF conforme rotina: sedentario (1.2) ate extremamente ativo (1.9).
            </Text>
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referências Bibliográficas</Text>
            <Text style={styles.helperText}>
              • FAO/WHO/UNU Expert Consultation. Human energy requirements. Rome, 2004.
            </Text>
            <Text style={styles.helperText}>
              • Harris JA, Benedict FG. A biometric study of human basal metabolism. Proc Natl Acad Sci. 1918.
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
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
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
  activityList: {
    gap: 10,
  },
  activityCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 14,
    padding: 12,
  },
  activityCardSelected: {
    backgroundColor: `${colors.primary}0f`,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  activityTitle: {
    color: colors.ink,
    fontWeight: "800",
  },
  activityDescription: {
    color: colors.inkSoft,
    marginTop: 2,
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

export default GetScreen;
