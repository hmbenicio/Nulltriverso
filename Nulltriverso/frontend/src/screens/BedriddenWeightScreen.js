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
import { StatusBar } from "expo-status-bar";
import ScreenBackground from "../components/ScreenBackground";
import SectionCard from "../components/SectionCard";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import BackToMenuButton from "../components/BackToMenuButton";
import ResultRow from "../components/ResultRow";
import { colors } from "../theme/colors";
import { BED_STORAGE_KEY } from "../constants/bedridden";
import { calculateBedriddenWeight } from "../utils/bedridden";
import { parseLocaleNumber } from "../utils/number";

const SEX_OPTIONS = [
  { key: "female", label: "Feminino" },
  { key: "male", label: "Masculino" },
];


const initialForm = {
  sex: "female",
  calfCircumference: "",
  kneeHeight: "",
  armCircumference: "",
  subscapularFold: "",
};


const BedriddenWeightScreen = ({ onMenu, onProfile, onInfo }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(BED_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar peso estimado", err);
      }
    };
    load();
  }, []);

  const handleFieldChange = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss();
    setError("");

    const calf = parseLocaleNumber(form.calfCircumference);
    const knee = parseLocaleNumber(form.kneeHeight);
    const arm = parseLocaleNumber(form.armCircumference);
    const sub = parseLocaleNumber(form.subscapularFold);

    if (!calf || calf <= 0) return setError("CPA (panturrilha) invalida.");
    if (!knee || knee <= 0) return setError("Altura do joelho invalida.");
    if (!arm || arm <= 0) return setError("Circunferencia do braco invalida.");
    if (!sub || sub <= 0) return setError("Dobra subescapular invalida.");

    const weight = calculateBedriddenWeight({
      sex: form.sex,
      calfCircumferenceCm: calf,
      kneeHeightCm: knee,
      armCircumferenceCm: arm,
      subscapularFoldMm: sub,
    });

    const payload = {
      weight,
      calf,
      knee,
      arm,
      sub,
      sex: form.sex,
      updatedAt: new Date().toISOString(),
    };

    setResult(payload);
    try {
      await AsyncStorage.setItem(BED_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar peso estimado", err);
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
            <Text style={styles.title}>Peso estimado (Chumlea)</Text>
            <Text style={styles.subtitle}>
              Usa equacoes preditivas (Chumlea 1988) com circunferencia da panturrilha (CPA),
              altura do joelho (AJ), circunferencia do braco (CB) e dobra subescapular (mm).
            </Text>
          </View>
          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Medidas</Text>
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
              placeholder="CPA · Circunferencia da panturrilha (cm)"
              keyboardType="decimal-pad"
              value={form.calfCircumference}
              onChangeText={handleFieldChange("calfCircumference")}
            />
            <TextField
              placeholder="AJ · Altura do joelho (cm)"
              keyboardType="decimal-pad"
              value={form.kneeHeight}
              onChangeText={handleFieldChange("kneeHeight")}
            />
            <TextField
              placeholder="CB · Circunferencia do braco (cm)"
              keyboardType="decimal-pad"
              value={form.armCircumference}
              onChangeText={handleFieldChange("armCircumference")}
            />
            <TextField
              placeholder="DCSE · Dobra subescapular (mm)"
              keyboardType="decimal-pad"
              value={form.subscapularFold}
              onChangeText={handleFieldChange("subscapularFold")}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular peso estimado" onPress={handleCalculate} />
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
                <Text style={styles.highlightValue}>{result.weight.toFixed(1)} kg</Text>
                <Text style={styles.highlightLabel}>Peso estimado acamado</Text>
                <ResultRow label="CPA" value={`${result.calf.toFixed(1)} cm`} />
                <ResultRow label="AJ" value={`${result.knee.toFixed(1)} cm`} />
                <ResultRow label="CB" value={`${result.arm.toFixed(1)} cm`} />
                <ResultRow label="DCSE" value={`${result.sub.toFixed(1)} mm`} />
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Informe as medidas para estimar o peso.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Observações</Text>
            <Text style={styles.helperText}>
              • Equacoes de Chumlea et al. (1988) especificas para sexo.
            </Text>
            <Text style={styles.helperText}>
              • Unidades: CPA/AJ/CB em cm; DCSE em mm. Mantenha consistencia de medida.
            </Text>
            <Text style={styles.helperText}>
              • Se houver balanca de cama/cadeira, prefira afericao direta e use a estimativa apenas como apoio.
            </Text>
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referências Bibliográficas</Text>
            <Text style={styles.helperText}>
              • Chumlea WC, Roche AF, Steinbaugh ML. Estimating stature and weight of the elderly from knee height. J Am Geriatr Soc. 1985.
            </Text>
            <Text style={styles.helperText}>
              • Chumlea WC et al. Prediction of body weight for the nonambulatory elderly from anthropometry. J Am Diet Assoc. 1988.
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
    marginBottom: 4,
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
  footer: {
    marginTop: 4,
    alignItems: "center",
  },
});

export default BedriddenWeightScreen;







