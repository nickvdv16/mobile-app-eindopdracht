import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import AppHeader from "../components/AppHeader.js";
import AppFooter from "../components/AppFooter.js";

const GAME_DURATION = 30;
const ANSWER_VISIBLE_TIME = 3000;
const NEXT_ROUND_DELAY = 1000;

const GameScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameActive, setGameActive] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answersVisible, setAnswersVisible] = useState(true);
  const [roundLocked, setRoundLocked] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let timer = null;

    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((previousTime) => previousTime - 1);
      }, 1000);
    }

    if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setGameFinished(true);
      setAnswersVisible(false);
      setRoundLocked(true);
      setFeedback("Tijd is om!");
    }

    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    let hideAnswersTimer = null;

    if (gameActive && !roundLocked && answersVisible) {
      hideAnswersTimer = setTimeout(() => {
        setAnswersVisible(false);
        setFeedback("Antwoorden verborgen. Je kan nog raden!");
      }, ANSWER_VISIBLE_TIME);
    }

    return () => {
      clearTimeout(hideAnswersTimer);
    };
  }, [gameActive, question, roundLocked, answersVisible]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const createQuestion = () => {
    const operators = ["+", "-", "x"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let numberOne = Math.floor(Math.random() * 10) + 1;
    let numberTwo = Math.floor(Math.random() * 10) + 1;
    let answer = 0;

    if (operator === "+") {
      answer = numberOne + numberTwo;
    }

    if (operator === "-") {
      if (numberTwo > numberOne) {
        const temporaryNumber = numberOne;
        numberOne = numberTwo;
        numberTwo = temporaryNumber;
      }

      answer = numberOne - numberTwo;
    }

    if (operator === "x") {
      numberOne = Math.floor(Math.random() * 9) + 1;
      numberTwo = Math.floor(Math.random() * 9) + 1;
      answer = numberOne * numberTwo;
    }

    return {
      questionText: `${numberOne} ${operator} ${numberTwo} = ?`,
      answer,
    };
  };

  const createAnswerOptions = (answer) => {
    const wrongAnswers = [];

    while (wrongAnswers.length < 2) {
      const difference = Math.floor(Math.random() * 10) - 5;
      const wrongAnswer = answer + difference;

      if (
        wrongAnswer !== answer &&
        wrongAnswer >= 0 &&
        !wrongAnswers.includes(wrongAnswer)
      ) {
        wrongAnswers.push(wrongAnswer);
      }
    }

    return shuffleArray([answer, ...wrongAnswers]);
  };

  const createNewRound = () => {
    if (!gameActive || timeLeft <= 0) {
      return;
    }

    const newQuestion = createQuestion();
    const newAnswers = createAnswerOptions(newQuestion.answer);

    setQuestion(newQuestion.questionText);
    setCorrectAnswer(newQuestion.answer);
    setAnswers(newAnswers);
    setAnswersVisible(true);
    setRoundLocked(false);
    setFeedback("");
  };

  const startGame = () => {
    const newQuestion = createQuestion();
    const newAnswers = createAnswerOptions(newQuestion.answer);

    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameActive(true);
    setGameFinished(false);
    setQuestion(newQuestion.questionText);
    setCorrectAnswer(newQuestion.answer);
    setAnswers(newAnswers);
    setAnswersVisible(true);
    setRoundLocked(false);
    setFeedback("");
  };

  const handleAnswerPress = (selectedAnswer) => {
    if (!gameActive || roundLocked) {
      return;
    }

    setRoundLocked(true);

    if (selectedAnswer === correctAnswer) {
      setScore((previousScore) => previousScore + 1);
      setFeedback("Juist!");
    } else {
      setScore((previousScore) => {
        if (previousScore === 0) {
          return 0;
        }

        return previousScore - 1;
      });

      setFeedback(`Fout! Het juiste antwoord was ${correctAnswer}.`);
    }

    setTimeout(() => {
      createNewRound();
    }, NEXT_ROUND_DELAY);
  };

  return (
    <ScrollView style={styles.page}>
      <AppHeader navigation={navigation} />

      <View style={styles.gameSection}>
        <Text style={styles.label}>MINI-GAME</Text>

        <Text style={styles.title}>Quick Maths</Text>

        <Text style={styles.description}>
          Los de som op. De antwoorden zijn maar even zichtbaar. Daarna worden
          ze verborgen, maar je kan nog steeds raden waar het juiste antwoord
          stond.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Score</Text>
            <Text style={styles.statValue}>{score}</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Timer</Text>
            <Text style={styles.statValue}>{timeLeft}s</Text>
          </View>
        </View>

        <View style={styles.gameCard}>
          {!gameActive && !gameFinished && (
            <View style={styles.startBox}>
              <Text style={styles.startTitle}>Klaar voor de uitdaging?</Text>
              <Text style={styles.startText}>
                Je krijgt telkens een nieuwe som. Onthoud de antwoorden voordat
                ze verdwijnen.
              </Text>

              <TouchableOpacity style={styles.primaryButton} onPress={startGame}>
                <Text style={styles.primaryButtonText}>Start game</Text>
              </TouchableOpacity>
            </View>
          )}

          {gameActive && (
            <>
              <Text style={styles.questionText}>{question}</Text>

              <View style={styles.answersRow}>
                {answers.map((answer) => (
                  <TouchableOpacity
                    key={answer}
                    style={[
                      styles.answerCard,
                      !answersVisible && styles.answerCardHidden,
                    ]}
                    disabled={roundLocked}
                    onPress={() => handleAnswerPress(answer)}
                  >
                    <Text style={styles.answerText}>
                      {answersVisible ? answer : "?"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {feedback ? (
                <Text style={styles.feedbackText}>{feedback}</Text>
              ) : (
                <Text style={styles.helpText}>
                  Onthoud de juiste plek voordat de antwoorden verdwijnen!
                </Text>
              )}
            </>
          )}

          {gameFinished && (
            <View style={styles.startBox}>
              <Text style={styles.startTitle}>Game over!</Text>

              <Text style={styles.startText}>
                Je eindscore is {score}.{" "}
                {score >= 10
                  ? "Sterk gewerkt, je bent een echte rekenkampioen!"
                  : "Probeer opnieuw en haal een hogere score."}
              </Text>

              <TouchableOpacity style={styles.primaryButton} onPress={startGame}>
                <Text style={styles.primaryButtonText}>Herstart game</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backButtonText}>Terug naar home</Text>
        </TouchableOpacity>
      </View>

      <AppFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  gameSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 70,
  },

  label: {
    color: "#86BC25",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 14,
  },

  title: {
    color: "#111111",
    fontSize: 46,
    fontWeight: "800",
    lineHeight: 52,
    marginBottom: 18,
  },

  description: {
    color: "#555555",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 32,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  statBox: {
    width: "48%",
    backgroundColor: "#f5faed",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 18,
  },

  statLabel: {
    color: "#555555",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  statValue: {
    color: "#111111",
    fontSize: 32,
    fontWeight: "800",
  },

  gameCard: {
    minHeight: 360,
    backgroundColor: "#f1f1f1",
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 32,
    justifyContent: "center",
    marginBottom: 24,
  },

  startBox: {
    alignItems: "center",
    justifyContent: "center",
  },

  startTitle: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 14,
  },

  startText: {
    color: "#555555",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
  },

  questionText: {
    color: "#111111",
    fontSize: 42,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 34,
  },

  answersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  answerCard: {
    width: "31%",
    backgroundColor: "#86BC25",
    borderRadius: 14,
    paddingVertical: 24,
    alignItems: "center",
  },

  answerCardHidden: {
    backgroundColor: "#dddddd",
  },

  answerText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
  },

  feedbackText: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  helpText: {
    color: "#555555",
    fontSize: 15,
    textAlign: "center",
  },

  primaryButton: {
    backgroundColor: "#86BC25",
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  backButton: {
    borderWidth: 1,
    borderColor: "#111111",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },

  backButtonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default GameScreen;