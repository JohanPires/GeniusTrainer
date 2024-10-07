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
          `${process.env.REACT_APP_BACK_URL_LARAVEL}api/training`,
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
                `${process.env.REACT_APP_BACK_URL_LARAVEL}api/exercices`,
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

      doc.setFontSize(22);
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(trainingName);
      const xOffset = (pageWidth - textWidth) / 2;
      doc.text(trainingName, xOffset, 20);

      doc.autoTable({
        startY: 30,
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
      <div className=" w-11/12 mx-auto my-5 shadow-md p-2 sm:p-8 flex flex-col gap-8">
        <div className="createName">
          <h1 className="text-2xl font-bold">Créer une Séance</h1>
          <input
            className="border-b border-gray-300 focus:outline-none w-full mt-3 sm:text-lg text-xs"
            type="text"
            placeholder="Nom de la séance"
            value={trainingName}
            onChange={(e) => setTrainingName(e.target.value)}
            aria-label="Champ de séance"
          />
        </div>

        <div className="createExercices">
          <h2 className="text-lg font-semibold">Exercices</h2>
          <div className="exercices flex flex-col gap-5 mt-3">
            {exercises.map((exercise, index) => (
              <div className="flex flex-col gap-3" key={index}>
                <div className="flex gap-2">
                  <input
                    className="border-b border-gray-300 focus:outline-none w-full sm:text-lg text-xs"
                    type="text"
                    placeholder="Nom de l'exercice"
                    value={exercise.name}
                    onChange={(e) =>
                      updateExercise(index, "name", e.target.value)
                    }
                    aria-label="Champ nom d'exercices"
                  />

                  <input
                    className="border-b border-gray-300 focus:outline-none w-14 sm:w-24 sm:text-lg text-xs"
                    type="number"
                    min="0"
                    placeholder="Répétitions"
                    value={exercise.repetitions}
                    onChange={(e) =>
                      updateExercise(index, "repetitions", e.target.value)
                    }
                    aria-label="Champ répétitions d'exercices"
                  />
                  <input
                    className="border-b border-gray-300 focus:outline-none w-14 sm:w-24 sm:text-lg text-xs"
                    type="number"
                    min="0"
                    placeholder="Séries"
                    value={exercise.sets}
                    onChange={(e) =>
                      updateExercise(index, "sets", e.target.value)
                    }
                    aria-label="Champ séries d'exercices"
                  />
                </div>
                <input
                  className="border-b border-gray-300 focus:outline-none w-full sm:text-lg text-xs"
                  type="text"
                  placeholder="Description"
                  value={exercise.advice}
                  onChange={(e) =>
                    updateExercise(index, "advice", e.target.value)
                  }
                  aria-label="Champ description d'exercices"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="w-48 border-2 border-gray-300 text-gray-500 rounded-full py-2 text-xs sm:text-sm font-bold hover:bg-gray-100"
          onClick={addExercise}
        >
          Ajouter un exercice
        </button>

        <div className="button-container flex gap-3 justify-center">
          <button
            className="w-48 border-2 border-gray-300 text-gray-500 rounded-full py-2 text-xs sm:text-sm font-bold hover:bg-gray-100"
            onClick={sendTraining}
          >
            Enregistrer
          </button>
          <button
            className="w-48 border-2 border-gray-300 text-gray-500 rounded-full py-2 text-xs sm:text-sm font-bold hover:bg-gray-100"
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
