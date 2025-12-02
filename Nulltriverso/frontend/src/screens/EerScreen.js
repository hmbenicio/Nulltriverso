import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
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
import { ACTIVITY_LEVELS, EER_STORAGE_KEY } from "../constants/eer";
import { calculateEer } from "../utils/eer";
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
  activity: "sedentary",
  isPregnant: false,
  gestationalWeeks: "",
};

const EerScreen = ({ onBack }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(EER_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar dados de EER", err);
      }
    };
    load();
  }, []);

  const handleFieldChange = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedActivity = useMemo(
    () => ACTIVITY_LEVELS.find((lvl) => lvl.key === form.activity),
    [form.activity]
  );

  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss();
    setError("");

    const age = parseLocaleNumber(form.age);
    const weight = parseLocaleNumber(form.weight);
    const height = parseLocaleNumber(form.height);
    const gestWeeks = parseLocaleNumber(form.gestationalWeeks || 0);

    if (!age || age <= 0) return setError("Idade invalida.");
    if (!weight || weight <= 0) return setError("Peso invalido.");
    if (!height || height <= 0) return setError("Altura invalida.");

    if (form.isPregnant && form.sex !== "female")
      return setError("Selecione sexo feminino para gestacao.");

    if (form.isPregnant && (!gestWeeks || gestWeeks < 0)) {
      return setError("Informe as semanas de gestacao (>= 0).");
    }

    const calculation = calculateEer({
      ageYears: age,
      weightKg: weight,
      heightCm: height,
      sex: form.sex,
      activityLevel: form.activity,
      isPregnant: form.isPregnant,
      gestationalWeeks: form.isPregnant ? gestWeeks : 0,
    });

    const payload = {
      ...calculation,
      age,
      weight,
      height,
      sex: form.sex,
      activity: form.activity,
      activityLabel: selectedActivity?.label,
      updatedAt: new Date().toISOString(),
      gestationalWeeks: form.isPregnant ? gestWeeks : 0,
      isPregnant: form.isPregnant,
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(EER_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar EER", err);
    }
  }, [form, selectedActivity]);

  return (
    <LinearGradient colors={[colors.backgroundLight, colors.background]} style={styles.screen}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {onBack ? (
            <PrimaryButton label="Voltar para o menu" onPress={onBack} />
          ) : null}

          <View style={styles.header}>
            <Text style={styles.kicker}>Nutricionistas e pacientes</Text>
            <Text style={styles.title}>EER · Necessidade Energetica</Text>
            <Text style={styles.subtitle}>
              Calcule a estimativa diaria (kcal/dia) baseada em sexo, idade, peso,
              altura e nivel de atividade. Adultos usam a equacao IOM; gestantes somam
              8 kcal/semana + 180 kcal.
            </Text>
          </View>

          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados para o calculo</Text>
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
                  onPress={() => setForm((prev) => ({ ...prev, sex: opt.key, isPregnant: false }))}
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

            <Text style={styles.label}>Nivel de atividade</Text>
            <View style={styles.activityList}>
              {ACTIVITY_LEVELS.map((level) => {
                const active = form.activity === level.key;
                return (
                  <Pressable
                    key={level.key}
                    style={[
                      styles.activityCard,
                      { borderColor: active ? colors.primary : colors.border },
                      active && styles.activityCardSelected,
                    ]}
                    onPress={() => setForm((prev) => ({ ...prev, activity: level.key }))}
                  >
                    <Text
                      style={[
                        styles.activityTitle,
                        active && { color: colors.primary },
                      ]}
                    >
                      {level.label}
                    </Text>
                    <Text style={styles.activityDescription}>{level.description}</Text>
                    <Text style={styles.activityFactor}>
                      Fator: {level.key === "sedentary" ? "1.0" : `${level.femaleFactor}/${level.maleFactor}`} (F/M)
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {form.sex === "female" ? (
              <View style={styles.toggleRow}>
                <Text style={styles.label}>Gestante?</Text>
                <Switch
                  value={form.isPregnant}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      isPregnant: value,
                      gestationalWeeks: value ? prev.gestationalWeeks : "",
                    }))
                  }
                  thumbColor={form.isPregnant ? colors.primary : "#d6d6d6"}
                  trackColor={{ true: `${colors.primary}55`, false: colors.surfaceMuted }}
                />
              </View>
            ) : null}

            {form.isPregnant ? (
              <TextField
                placeholder="Idade gestacional (semanas)"
                keyboardType="decimal-pad"
                value={form.gestationalWeeks}
                onChangeText={handleFieldChange("gestationalWeeks")}
              />
            ) : null}

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular EER" onPress={handleCalculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {selectedActivity ? selectedActivity.label : "Atividade"}
                </Text>
              </View>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <Text style={styles.highlightValue}>{result.total} kcal/dia</Text>
                <Text style={styles.highlightLabel}>Necessidade energetica estimada</Text>
                <ResultRow label="Idade" value={`${result.age} anos`} />
                <ResultRow label="Peso" value={`${result.weight.toFixed(1)} kg`} />
                <ResultRow label="Altura" value={`${result.height.toFixed(1)} cm`} />
                <ResultRow label="Sexo" value={result.sex === "female" ? "Feminino" : "Masculino"} />
                <ResultRow
                  label="Nivel de atividade"
                  value={result.activityLabel || result.activity}
                />
                <ResultRow
                  label="Fator de atividade"
                  value={result.activityFactor.toFixed(2)}
                />
                <ResultRow label="EER base (adulto)" value={`${result.base} kcal`} />
                {result.isPregnant ? (
                  <>
                    <ResultRow
                      label="Bonus gestacional"
                      value={`${result.gestationalBonus} kcal (${result.gestationalWeeks} sem.)`}
                    />
                    <ResultRow
                      label="Total gestante"
                      value={`${result.total} kcal`}
                    />
                  </>
                ) : null}
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Preencha os dados e toque em calcular para ver o EER.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias rapidas</Text>
            <Text style={styles.helperText}>
              • Adultos: equacao IOM com fator de atividade (PA) por sexo.
            </Text>
            <Text style={styles.helperText}>
              • Gestantes: soma-se 8 kcal por semana de gestacao + 180 kcal ao EER pre-gestacional.
            </Text>
            <Text style={styles.helperText}>
              • Para criancas, utilize as equacoes especificas por faixa etaria (fora do escopo desta tela).
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
  activityFactor: {
    color: colors.inkMuted,
    marginTop: 4,
    fontWeight: "700",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

export default EerScreen;
