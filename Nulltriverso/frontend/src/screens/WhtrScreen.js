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
import ScreenBackground from "../components/ScreenBackground";
import SectionCard from "../components/SectionCard";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import BackToMenuButton from "../components/BackToMenuButton";
import ResultRow from "../components/ResultRow";
import { colors } from "../theme/colors";
import { WHTR_STORAGE_KEY } from "../constants/wht";
import { calculateWhtr, statusFromWhtr } from "../utils/wht";
import { parseLocaleNumber } from "../utils/number";

const initialForm = {
  waist: "",
  height: "",
};


const WhtrScreen = ({ onMenu, onProfile, onInfo }) => {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(WHTR_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar WHtR", err);
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
    const height = parseLocaleNumber(form.height);

    if (!waist || waist <= 0) return setError("Cintura invalida.");
    if (!height || height <= 0) return setError("Altura invalida.");

    const whtr = calculateWhtr({ waistCm: waist, heightCm: height });
    const segment = statusFromWhtr(whtr);

    const payload = {
      waist,
      height,
      whtr,
      segment,
      updatedAt: new Date().toISOString(),
    };
    setResult(payload);
    try {
      await AsyncStorage.setItem(WHTR_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar WHtR", err);
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
            <Text style={styles.kicker}>Risco cardiometabolico</Text>
          <View style={styles.titleRow}>
            <BackToMenuButton onPress={onMenu} style={styles.homeButton} />
            <Text style={styles.title}>Razao Cintura/Estatura (WHtR)</Text>
          </View>
            <Text style={styles.subtitle}>
              Cintura/altura em centimetros. Alerta quando a cintura ultrapassa metade da altura (WHtR ≥ 0,5).
            </Text>
          </View>
          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados do calculo</Text>
            </View>
            <TextField
              placeholder="Circunferencia da cintura (cm)"
              keyboardType="decimal-pad"
              value={form.waist}
              onChangeText={handleFieldChange("waist")}
            />
            <TextField
              placeholder="Altura (cm)"
              keyboardType="decimal-pad"
              value={form.height}
              onChangeText={handleFieldChange("height")}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Calcular WHtR" onPress={handleCalculate} />
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
                <Text style={styles.highlightValue}>{result.whtr.toFixed(3)}</Text>
                <Text style={styles.highlightLabel}>Razao Cintura/Estatura</Text>
                <ResultRow label="Cintura" value={`${result.waist.toFixed(1)} cm`} />
                <ResultRow label="Altura" value={`${result.height.toFixed(1)} cm`} />
                <ResultRow label="Faixa de risco" value={`${result.segment.label} (${result.segment.range})`} />
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Preencha os campos e calcule para ver o WHtR.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias e uso</Text>
            <Text style={styles.helperText}>
              • WHtR = cintura / altura (mesma unidade). Ideal manter abaixo de 0,50.
            </Text>
            <Text style={styles.helperText}>
              • Faixas indicativas: &lt;0,40 muito baixo; 0,40-0,50 saudavel; 0,50-0,60 risco aumentado; &gt;0,60 risco muito alto.
            </Text>
            <Text style={styles.helperText}>
              • Indicador simples e mais sensivel que o IMC para gordura abdominal e risco cardiometabolico.
            </Text>
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias</Text>
            <Text style={styles.helperText}>
              • Ashwell M, Hsieh SD. Six reasons why the waist-to-height ratio is a rapid and effective global indicator for health risks. Int J Food Sci Nutr. 2005.
            </Text>
            <Text style={styles.helperText}>
              • Browning LM et al. A systematic review of waist-to-height ratio as a screening tool. Nutr Res Rev. 2010.
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
    fontSize: 24,
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
  homeButton: {
    marginRight: 4,
  },
});

export default WhtrScreen;








