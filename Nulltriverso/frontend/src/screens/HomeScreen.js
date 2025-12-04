import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { STORAGE_KEY } from "../constants/imc";
import {
  calculateImc,
  clampImc,
  colorFromImc,
  parseLocaleNumber,
  statusFromImc,
} from "../utils/imc";
import { colors } from "../theme/colors";
import SectionCard from "../components/SectionCard";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import ResultRow from "../components/ResultRow";
import ImcGauge from "../components/ImcGauge";
import BottomBar from "../components/BottomBar";

const initialForm = {
  weight: "",
  height: "",
};

const HomeScreen = ({ onMenu, onProfile, onExit }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar historico", err);
      }
    };
    load();
  }, []);

  const statusBadgeColor = useMemo(
    () => (result ? colorFromImc(result.imc) : colors.badge),
    [result]
  );

  const imcProgress = useMemo(() => {
    if (!result) return 0;
    const imc = clampImc(result.imc, 16, 40);
    return (imc - 16) / (40 - 16);
  }, [result]);

  const handleFieldChange = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss();
    setError("");

    const parsedWeight = parseLocaleNumber(form.weight);
    const parsedHeight = parseLocaleNumber(form.height);

    if (!parsedWeight || parsedWeight <= 0)
      return setError("Peso invalido.");
    if (!parsedHeight || parsedHeight <= 0)
      return setError("Altura invalida.");

    const imcValue = calculateImc({
      weightKg: parsedWeight,
      heightCm: parsedHeight,
    });

    const payload = {
      weight: parsedWeight,
      height: parsedHeight,
      imc: imcValue,
      status: statusFromImc(imcValue),
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar dados", err);
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
            <Text style={styles.kicker}>ANTROPOMETRIA & MEDIDAS</Text>
            <Text style={styles.title}>Calculadora de IMC</Text>
            <Text style={styles.subtitle}>
              IMC usa a mesma formula para homens e mulheres: peso dividido pela altura em metros ao quadrado.
            </Text>
          </View>

          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados do paciente</Text>
            </View>
            <View style={styles.row}>
              <TextField
                placeholder="Peso (kg)"
                keyboardType="decimal-pad"
                value={form.weight}
                onChangeText={handleFieldChange("weight")}
                blurOnSubmit
                style={styles.half}
              />
              <TextField
                placeholder="Altura (cm)"
                keyboardType="decimal-pad"
                value={form.height}
                onChangeText={handleFieldChange("height")}
                blurOnSubmit
                style={styles.half}
              />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular IMC" onPress={handleCalculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resultado</Text>
              <View
                style={[styles.badge, { backgroundColor: statusBadgeColor }]}
              >
                <Text style={styles.badgeText}>
                  {result ? result.status : "Sem calculo"}
                </Text>
              </View>
            </View>
            {result ? (
              <View>
                <View
                  style={[
                    styles.progressTrack,
                    { backgroundColor: statusBadgeColor },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${imcProgress * 100}%` },
                      { backgroundColor: statusBadgeColor },
                    ]}
                  />
                </View>
                <ResultRow
                  label="Peso"
                  value={`${result.weight.toFixed(1)} kg`}
                />
                <ResultRow
                  label="Altura"
                  value={`${result.height.toFixed(1)} cm`}
                />
                <ResultRow label="IMC" value={result.imc.toFixed(2)} />
                <ResultRow label="Status" value={result.status} />
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Calcule para ver o resultado.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.chartCard}>
            <Text style={styles.legendTitle}>Grafico ilustrativo</Text>
            <Text style={styles.chartSubtitle}>
              Velocimetro inspirado nas faixas de IMC.
            </Text>
            <ImcGauge currentImc={result?.imc} />
          </SectionCard>

          <SectionCard style={styles.referenceCard}>
            <Text style={styles.legendTitle}>Observacoes</Text>
            <Text style={styles.referenceText}>
              IMC = peso (kg) / altura (m)^2. Exemplo: 70 kg e 1,60 m -> 70/2,56 = 27,3.
            </Text>
            <Text style={styles.referenceText}>
              A formula e a mesma para homens e mulheres; a interpretacao pode considerar composicao corporal media de cada sexo.
            </Text>
            <Text style={styles.referenceText}>
              Classificacao OMS: abaixo 18,5 (abaixo do peso); 18,5-24,9 (normal); 25-29,9 (sobrepeso); 30-34,9 (obesidade I); 35-39,9 (obesidade II); acima 40 (obesidade III).
            </Text>
            <Text style={styles.referenceText}>
              Para avaliacao completa, procure medico ou nutricionista que considere fatores como massa magra, gordura e idade.
            </Text>
            <Text style={[styles.legendTitle, styles.referencesTitle]}>Referencias</Text>
            <Text style={styles.referenceText}>
              Organizacao Mundial da Saude (OMS). Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894, 2000. Faixas de IMC para adultos.
            </Text>
            <Text style={styles.referenceText}>
              WHO. Body mass index - BMI classification. Acesso em 2024. Disponivel em https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index
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
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.inkMuted,
    lineHeight: 21,
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
  placeholder: {
    color: colors.inkSoft,
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
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  chartCard: {
    gap: 10,
    alignItems: "center",
  },
  chartSubtitle: {
    color: colors.inkSoft,
  },
  legendTitle: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16,
  },
  referencesTitle: {
    marginTop: 6,
  },
  referenceCard: {
    gap: 8,
  },
  referenceText: {
    color: colors.inkMuted,
    lineHeight: 20,
  },
});

export default HomeScreen;
