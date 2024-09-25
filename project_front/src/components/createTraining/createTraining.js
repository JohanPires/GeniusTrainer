import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./createTraining.css";
import axios from "axios";

function CreateTraining() {
  const [trainingName, setTrainingName] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", advice: "", repetitions: "", sets: "" },
  ]);

  const sendTraining = () => {
    const token = localStorage.getItem("authToken");

    if (
      trainingName !== "" &&
      exercises[0].name !== "" &&
      exercises[0].repetitions !== "" &&
      exercises[0].sets !== ""
    ) {
      axios
        .post(
          "http://127.0.0.1:8000/api/training",
          {
            name: trainingName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          exercises.forEach((execice) => {
            if (
              execice.name !== "" &&
              execice.repetitions !== "" &&
              execice.sets !== ""
            ) {
              axios.post(
                "http://127.0.0.1:8000/api/exercices",
                {
                  name: execice.name,
                  advice: execice.advice,
                  repetitions: execice.repetitions,
                  series: execice.sets,
                  id_training: res.data.id,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }
          });
        })
        .then(() => {
          setTrainingName("");
          setExercises([{ name: "", advice: "", repetitions: "", sets: "" }]);
        });
    } else {
      alert(
        "Pour Enregistrer où créer un PDF de votre séance vous devez rentrer au moins le nom de la séance et un exercice"
      );
    }
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: "", advice: "", repetitions: "", sets: "" },
    ]);
  };

  const updateExercise = (index, field, value) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  const generatePDF = () => {
    if (
      trainingName !== "" &&
      exercises[0].name !== "" &&
      exercises[0].repetitions !== "" &&
      exercises[0].sets !== ""
    ) {
      const doc = new jsPDF();

      // Centrer le titre de la séance en haut
      doc.setFontSize(22);
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(trainingName);
      const xOffset = (pageWidth - textWidth) / 2;
      doc.text(trainingName, xOffset, 20);

      // Ajouter le tableau des exercices avec autoTable
      doc.autoTable({
        startY: 30, // Positionner le tableau en dessous du titre
        head: [["Exercice", "Description", "Répétitions", "Séries"]],
        body: exercises
          .filter(
            (exercise) => exercise.name && exercise.repetitions && exercise.sets
          )
          .map((exercise) => [
            exercise.name,
            exercise.advice,
            exercise.repetitions,
            exercise.sets,
          ]),
      });

      doc.save(`${trainingName}.pdf`);

      sendTraining();
    } else {
      alert("Entrer des valeur pour enregistrer où créer un PDF de la séance");
    }
  };

  return (
    <div className="createTraining">
      <div class=" w-11/12 mx-auto my-5 shadow-md p-2 sm:p-8 flex flex-col gap-8">
        <div class="createName">
          <h1 class="text-2xl font-bold">Créer une Séance</h1>
          <input
            class="border-b border-gray-300 focus:outline-none w-full mt-3 sm:text-lg text-xs"
            type="text"
            placeholder="Nom de la séance"
            value={trainingName}
            onChange={(e) => setTrainingName(e.target.value)}
          />
        </div>

        <div class="createExercices">
          <h2 class="text-lg font-semibold">Exercices</h2>
          <div class="exercices flex flex-col gap-5 mt-3">
            {exercises.map((exercise, index) => (
              <div class="flex flex-col gap-3" key={index}>
                <div className="flex gap-2">
                  <input
                    class="border-b border-gray-300 focus:outline-none w-full sm:text-lg text-xs"
                    type="text"
                    placeholder="Nom de l'exercice"
                    value={exercise.name}
                    onChange={(e) =>
                      updateExercise(index, "name", e.target.value)
                    }
                  />

                  <input
                    class="border-b border-gray-300 focus:outline-none w-14 sm:w-24 sm:text-lg text-xs"
                    type="number"
                    min="0"
                    placeholder="Répétitions"
                    value={exercise.repetitions}
                    onChange={(e) =>
                      updateExercise(index, "repetitions", e.target.value)
                    }
                  />
                  <input
                    class="border-b border-gray-300 focus:outline-none w-14 sm:w-24 sm:text-lg text-xs"
                    type="number"
                    min="0"
                    placeholder="Séries"
                    value={exercise.sets}
                    onChange={(e) =>
                      updateExercise(index, "sets", e.target.value)
                    }
                  />
                </div>
                <input
                  class="border-b border-gray-300 focus:outline-none w-full sm:text-lg text-xs"
                  type="text"
                  placeholder="Description"
                  value={exercise.advice}
                  onChange={(e) =>
                    updateExercise(index, "advice", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <button
          class="w-48 border-2 border-gray-300 text-gray-500 rounded-full py-2 text-xs sm:text-sm font-bold hover:bg-gray-100"
          onClick={addExercise}
        >
          Ajouter un exercice
        </button>

        <div class="button-container flex gap-3 justify-center">
          <button
            class="w-48 border-2 border-gray-300 text-gray-500 rounded-full py-2 text-xs sm:text-sm font-bold hover:bg-gray-100"
            onClick={sendTraining}
          >
            Enregistrer
          </button>
          <button
            class="w-48 border-2 border-gray-300 text-gray-500 rounded-full py-2 text-xs sm:text-sm font-bold hover:bg-gray-100"
            onClick={generatePDF}
          >
            Générer le PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTraining;
