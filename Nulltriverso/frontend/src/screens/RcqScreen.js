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
import { RCQ_STORAGE_KEY } from "../constants/rcq";
import { calculateRcq, statusFromRcq } from "../utils/rcq";
import { parseLocaleNumber } from "../utils/number";

const SEX_OPTIONS = [
  { key: "female", label: "Feminino" },
  { key: "male", label: "Masculino" },
];


const initialForm = {
  waist: "",
  hip: "",
  sex: "female",
};


const RcqScreen = ({ onMenu, onProfile, onInfo }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(RCQ_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar RCQ", err);
      }
    };
    load();
  }, []);

  const handleFieldChange = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const badgeColor = useMemo(
    () => (result ? result.segment.color : colors.badge),
    [result]
  );

  const handleCalculate = useCallback(async () => {
    setError("");
    const waist = parseLocaleNumber(form.waist);
    const hip = parseLocaleNumber(form.hip);

    if (!waist || waist <= 0) return setError("Cintura invalida.");
    if (!hip || hip <= 0) return setError("Quadril invalido.");

    const rcq = calculateRcq({ waistCm: waist, hipCm: hip });
    const segment = statusFromRcq(rcq, form.sex);

    const payload = {
      waist,
      hip,
      rcq,
      segment,
      sex: form.sex,
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(RCQ_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar RCQ", err);
    }
  }, [form]);

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
            <Text style={styles.kicker}>ANTROPOMETRIA & MEDIDAS</Text>
            <Text style={styles.title}>RCQ · Cintura / Quadril</Text>
            <Text style={styles.subtitle}>
              Relacao simples para risco cardiometabolico. Medidas em centimetros, fita nivelada.
            </Text>
          </View>
          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados do calculo</Text>
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

            <TextField
              placeholder="Circunferencia da cintura (cm)"
              keyboardType="decimal-pad"
              value={form.waist}
              onChangeText={handleFieldChange("waist")}
            />
            <TextField
              placeholder="Circunferencia do quadril (cm)"
              keyboardType="decimal-pad"
              value={form.hip}
              onChangeText={handleFieldChange("hip")}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular RCQ" onPress={handleCalculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado</Text>
              <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                <Text style={styles.badgeText}>
                  {result ? result.segment.label : "Sem calculo"}
                </Text>
              </View>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <Text style={styles.highlightValue}>{result.rcq.toFixed(3)}</Text>
                <Text style={styles.highlightLabel}>Relacao Cintura/Quadril</Text>
                <ResultRow label="Cintura" value={`${result.waist.toFixed(1)} cm`} />
                <ResultRow label="Quadril" value={`${result.hip.toFixed(1)} cm`} />
                <ResultRow
                  label="Faixa de risco"
                  value={`${result.segment.label} (${result.segment.range})`}
                />
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Preencha as medidas para ver o RCQ.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias rapidas</Text>
            <Text style={styles.helperText}>
              • RCQ = cintura / quadril (mesma unidade). Medir com fita nivelada.
            </Text>
            <Text style={styles.helperText}>
              • OMS: risco elevado a partir de 0,85 (mulheres) e 0,90 (homens); muito elevado &gt; 1,0.
            </Text>
            <Text style={styles.helperText}>
              • Complementa IMC e WHtR para avaliar distribuicao de gordura abdominal.
            </Text>
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias</Text>
            <Text style={styles.helperText}>
              • WHO. Waist circumference and waist-hip ratio: report of a WHO expert consultation. 2008.
            </Text>
            <Text style={styles.helperText}>
              • Yusuf S et al. Obesity and the risk of myocardial infarction in 27,000 participants. Lancet. 2005.
            </Text>
          </SectionCard>
          <View style={styles.footer}>
            <BackToMenuButton onPress={onMenu} />
          </View>
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
  title: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: "800",
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
  label: {
    color: colors.ink,
    fontWeight: "700",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
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
    backgroundColor: colors.primary,
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
  footer: {
    marginTop: 4,
    alignItems: "center",
  },
});

export default RcqScreen;







