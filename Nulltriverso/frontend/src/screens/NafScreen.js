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
import { StatusBar } from "expo-status-bar";
import ScreenBackground from "../components/ScreenBackground";
import SectionCard from "../components/SectionCard";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import BackToMenuButton from "../components/BackToMenuButton";
import ResultRow from "../components/ResultRow";
import { colors } from "../theme/colors";
import { NAF_LEVELS_EXTENDED, NAF_STORAGE_KEY } from "../constants/naf";
import { parseLocaleNumber } from "../utils/number";

const NafScreen = ({ onMenu, onProfile, onInfo }) => {
  const [selected, setSelected] = useState(NAF_LEVELS_EXTENDED[0].key);
  const [tmb, setTmb] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(NAF_STORAGE_KEY);
        if (stored) setResult(JSON.parse(stored));
      } catch (err) {
        console.warn("Erro ao carregar NAF", err);
      }
    };
    load();
  }, []);

  const level = useMemo(
    () => NAF_LEVELS_EXTENDED.find((lvl) => lvl.key === selected) || NAF_LEVELS_EXTENDED[0],
    [selected]
  );

  const parsedTmb = useMemo(() => parseLocaleNumber(tmb), [tmb]);

  const getMinMax = useMemo(() => {
    if (!parsedTmb || parsedTmb <= 0) return null;
    const min = parsedTmb * level.min;
    const max = parsedTmb * level.max;
    return { min, max };
  }, [parsedTmb, level]);

  const handleCalculate = useCallback(async () => {
    const payload = {
      levelKey: level.key,
      levelLabel: level.label,
      factorRange: level.factorRange,
      tmb: parsedTmb > 0 ? parsedTmb : null,
      getRange: getMinMax
        ? { min: getMinMax.min, max: getMinMax.max }
        : null,
      updatedAt: new Date().toISOString(),
    };
    setResult(payload);
    try {
      await AsyncStorage.setItem(NAF_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Erro ao salvar NAF", err);
    }
  }, [getMinMax, level, parsedTmb]);

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
            <Text style={styles.kicker}>ENERGIA & METABOLISMO</Text>
            <Text style={styles.title}>NAF · Nivel de Atividade Fisica</Text>
            <Text style={styles.subtitle}>
              Selecione o perfil de atividade e, opcionalmente, informe sua TMB para ver o intervalo estimado de GET (TMB x fator).
            </Text>
          </View>
          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Escolha o nivel</Text>
            </View>
            <View style={styles.levelList}>
              {NAF_LEVELS_EXTENDED.map((item) => {
                const active = item.key === selected;
                return (
                  <Pressable
                    key={item.key}
                    style={[
                      styles.levelCard,
                      active && styles.levelCardActive,
                    ]}
                    onPress={() => setSelected(item.key)}
                  >
                    <View style={styles.levelHeader}>
                      <Text style={[styles.levelTitle, active && styles.levelTitleActive]}>
                        {item.label}
                      </Text>
                      <Text style={[styles.levelFactor, active && styles.levelFactorActive]}>
                        {item.factorRange}
                      </Text>
                    </View>
                    <Text style={styles.levelDesc}>{item.description}</Text>
                  </Pressable>
                );
              })}
            </View>
          </SectionCard>

          <SectionCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>TMB (opcional)</Text>
            </View>
            <TextField
              placeholder="Informe sua TMB (kcal/dia) para estimar GET"
              keyboardType="decimal-pad"
              value={tmb}
              onChangeText={setTmb}
            />
            {getMinMax ? (
              <View style={styles.getBox}>
                <Text style={styles.getLabel}>GET estimado</Text>
                <Text style={styles.getValue}>
                  {getMinMax.min.toFixed(0)} a {getMinMax.max.toFixed(0)} kcal/dia
                </Text>
                <Text style={styles.getHelper}>
                  Calculado como TMB x {level.factorRange}
                </Text>
              </View>
            ) : (
              <Text style={styles.helperText}>Sem TMB, exibimos apenas o fator.</Text>
            )}
            <PrimaryButton label="Calcular NAF" onPress={handleCalculate} />
          </SectionCard>

          <SectionCard style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.cardTitle}>Resumo</Text>
            </View>
            {result ? (
              <View style={styles.resultBody}>
                <ResultRow label="Nivel" value={result.levelLabel} />
                <ResultRow label="Fator de atividade" value={result.factorRange} />
                {result.tmb ? (
                  <>
                    <ResultRow label="TMB informada" value={`${result.tmb.toFixed(0)} kcal`} />
                    {result.getRange ? (
                      <ResultRow
                        label="GET estimado"
                        value={`${result.getRange.min.toFixed(0)} - ${result.getRange.max.toFixed(0)} kcal/dia`}
                      />
                    ) : null}
                  </>
                ) : (
                  <Text style={styles.helperText}>Nenhuma TMB informada.</Text>
                )}
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Selecione o nivel e calcule para visualizar aqui.
              </Text>
            )}
          </SectionCard>

          <SectionCard style={styles.helperCard}>
            <Text style={styles.legendTitle}>Referencias e uso</Text>
            <Text style={styles.helperText}>
              • Escala OMS para adultos: sedentario (1,0-1,39), leve (1,4-1,59), moderado (1,6-1,89), muito ativo (1,9-2,5).
            </Text>
            <Text style={styles.helperText}>
              • GET = TMB x NAF. TMB pode ser estimada com Harris-Benedict ou calorimetria indireta.
            </Text>
            <Text style={styles.helperText}>
              • Questionarios como IPAQ ou MET-min/dia refinam a classificacao.
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
  levelList: {
    gap: 10,
  },
  levelCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 14,
    padding: 14,
  },
  levelCardActive: {
    backgroundColor: `${colors.primary}0f`,
    borderColor: `${colors.primary}55`,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelTitle: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16,
  },
  levelTitleActive: {
    color: colors.primary,
  },
  levelFactor: {
    color: colors.inkMuted,
    fontWeight: "700",
  },
  levelFactorActive: {
    color: colors.primary,
  },
  levelDesc: {
    color: colors.inkSoft,
    marginTop: 6,
  },
  getBox: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  getLabel: {
    color: colors.inkMuted,
    fontWeight: "700",
  },
  getValue: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 18,
  },
  getHelper: {
    color: colors.inkSoft,
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

export default NafScreen;







