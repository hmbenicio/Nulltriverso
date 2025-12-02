import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { GC_PROTOCOLS, GC_STORAGE_KEY } from "../constants/gc";
import { calculateBodyFat } from "../utils/gc";
import { parseLocaleNumber } from "../utils/number";

const SEX_OPTIONS = [
  { key: "female", label: "Feminino" },
  { key: "male", label: "Masculino" },
];

const initialForm = {
  age: "",
  height: "",
  sex: "female",
  protocol: "jackson3",
  sumFolds: "",
  neck: "",
  waist: "",
  hip: "",
};

const GcScreen = ({ onMenu, onProfile, onExit }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(GC_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar %GC", err);
      }
    };
    load();
  }, []);

  const handleFieldChange = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedProtocol = useMemo(
    () => GC_PROTOCOLS.find((p) => p.key === form.protocol) || GC_PROTOCOLS[0],
    [form.protocol]
  );

  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss();
    setError("");

    const age = parseLocaleNumber(form.age);
    const height = parseLocaleNumber(form.height);

    if (!age || age <= 0) return setError("Idade invalida.");
    if (!height || height <= 0) return setError("Altura invalida.");

    if (selectedProtocol.key === "us_navy") {
      const neck = parseLocaleNumber(form.neck);
      const waist = parseLocaleNumber(form.waist);
      const hip = parseLocaleNumber(form.hip);

      if (!neck || neck <= 0) return setError("Pescoco invalido.");
      if (!waist || waist <= 0) return setError("Cintura invalida.");
      if (form.sex === "female" && (!hip || hip <= 0))
        return setError("Quadril invalido.");

      const calculation = calculateBodyFat({
        protocolKey: selectedProtocol.key,
        ageYears: age,
        sex: form.sex,
        heightCm: height,
        neckCm: neck,
        waistCm: waist,
        hipCm: form.sex === "female" ? hip : 0,
      });

      const payload = {
        ...calculation,
        age,
        height,
        sex: form.sex,
        neck,
        waist,
        hip: form.sex === "female" ? hip : null,
        protocolKey: selectedProtocol.key,
        updatedAt: new Date().toISOString(),
      };

      setResult(payload);
      try {
        await AsyncStorage.setItem(GC_STORAGE_KEY, JSON.stringify(payload));
      } catch (err) {
        console.warn("Erro ao salvar %GC", err);
      }
      return;
    }

    const sumFolds = parseLocaleNumber(form.sumFolds);
    if (!sumFolds || sumFolds <= 0) return setError("Soma das dobras invalida.");

    const calculation = calculateBodyFat({
      protocolKey: selectedProtocol.key,
      ageYears: age,
      sex: form.sex,
      sumFolds,
      heightCm: height,
    });

    const payload = {
      ...calculation,
      age,
      height,
      sex: form.sex,
      sumFolds,
      protocolKey: selectedProtocol.key,
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(GC_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar %GC", err);
    }
  }, [form, selectedProtocol]);

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
            <Text style={styles.kicker}>Composicao corporal</Text>
            <Text style={styles.title}>% Gordura Corporal</Text>
            <Text style={styles.subtitle}>
              Estime o %GC por dobras (Jackson & Pollock + Siri) ou circunferencias (US Navy).
              Resultados sao aproximados; consistencia na tecnica e essencial.
            </Text>
          </View>

          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados basicos</Text>
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
                placeholder="Altura (cm)"
                keyboardType="decimal-pad"
                value={form.height}
                onChangeText={handleFieldChange("height")}
                style={styles.half}
              />
            </View>

            <Text style={styles.label}>Sexo</Text>
            <View style={styles.optionsRow}>
              {SEX_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.key}
                  style={[
                    styles.pill,
                    form.sex === opt.key && styles.pillSelected,
                  ]}
                  onPress={() => setForm((prev) => ({ ...prev, sex: opt.key, hip: "" }))}
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

            <Text style={styles.label}>Protocolo</Text>
            <View style={styles.activityList}>
              {GC_PROTOCOLS.map((proto) => {
                const active = form.protocol === proto.key;
                return (
                  <Pressable
                    key={proto.key}
                    style={[
                      styles.activityCard,
                      { borderColor: active ? colors.primary : colors.border },
                      active && styles.activityCardSelected,
                    ]}
                    onPress={() => setForm((prev) => ({ ...prev, protocol: proto.key }))}
                  >
                    <Text
                      style={[
                        styles.activityTitle,
                        active && { color: colors.primary },
                      ]}
                    >
                      {proto.label}
                    </Text>
                    <Text style={styles.activityDescription}>{proto.description}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.dynamicFields}>
              {selectedProtocol.fields.map((field) => {
                if (field.key === "hip" && form.sex !== "female") return null;
                return (
                  <TextField
                    key={field.key}
                    placeholder={field.label}
                    keyboardType="decimal-pad"
                    value={form[field.key] || ""}
                    onChangeText={handleFieldChange(field.key)}
                  />
                );
              })}
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular %GC" onPress={handleCalculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {selectedProtocol ? selectedProtocol.label : "Protocolo"}
                </Text>
              </View>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <Text style={styles.highlightValue}>{result.bodyFat}%</Text>
                <Text style={styles.highlightLabel}>Percentual de gordura estimado</Text>
                <ResultRow label="Metodo" value={result.method} />
                <ResultRow label="Idade" value={`${result.age} anos`} />
                <ResultRow label="Altura" value={`${result.height.toFixed(1)} cm`} />
                <ResultRow label="Sexo" value={result.sex === "female" ? "Feminino" : "Masculino"} />
                {result.protocolKey === "us_navy" ? (
                  <>
                    <ResultRow label="Pescoco" value={`${result.neck.toFixed(1)} cm`} />
                    <ResultRow label="Cintura" value={`${result.waist.toFixed(1)} cm`} />
                    {result.sex === "female" && result.hip ? (
                      <ResultRow label="Quadril" value={`${result.hip.toFixed(1)} cm`} />
                    ) : null}
                  </>
                ) : (
                  <ResultRow label="Soma das dobras" value={`${result.sumFolds.toFixed(1)} mm`} />
                )}
                {Number.isFinite(result.dc) ? (
                  <ResultRow label="Densidade corporal (DC)" value={result.dc.toFixed(4)} />
                ) : null}
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Preencha os campos do protocolo escolhido para ver o %GC.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias e notas</Text>
            <Text style={styles.helperText}>
              • Dobras: Jackson & Pollock (3 ou 7) + Siri para converter DC em %GC.
            </Text>
            <Text style={styles.helperText}>
              • Circunferencias: formula da Marinha dos EUA (log10) em centimetros.
            </Text>
            <Text style={styles.helperText}>
              • Resultados sao estimativas de campo; metodos laboratoriais (DXA, balanca, etc.) sao mais precisos.
            </Text>
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias</Text>
            <Text style={styles.helperText}>
              • Jackson AS, Pollock ML. Generalized equations for predicting body density of men. Br J Nutr. 1978.
            </Text>
            <Text style={styles.helperText}>
              • Jackson AS, Pollock ML, Ward A. Generalized equations for predicting body density of women. Med Sci Sports Exerc. 1980.
            </Text>
            <Text style={styles.helperText}>
              • Siri WE. Body composition from fluid spaces and density. In: Techniques for measuring body composition. 1961.
            </Text>
            <Text style={styles.helperText}>
              • Hodgdon JA, Beckett MB. Prediction of percent body fat for US Navy men and women. 1984.
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
  dynamicFields: {
    marginTop: 4,
    gap: 8,
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

export default GcScreen;
