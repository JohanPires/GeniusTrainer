import React, { useEffect, useState } from "react";
import "./showTraining.css";
import jsPDF from "jspdf";
import axios from "axios";

function ShowTraining({ training }) {
  const [formatDate, setFormatDate] = useState("");
  const [template, setTemplate] = useState("normal");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const day = training.created_at.split("T")[0].split("-")[2];
    const month = training.created_at.split("T")[0].split("-")[1];
    setFormatDate(`${day}/${month}`);
  }, []);

  const [sessionName, setSessionName] = useState("");
  const [exercises, setExercises] = useState([
    { id: "", name: "", description: "", repetitions: "", sets: "" },
  ]);

  const updateTraining = () => {
    const token = localStorage.getItem("authToken");

    axios
      .put(
        `${process.env.REACT_APP_BACK_URL_LARAVEL}api/training/${training.id}`,
        {
          name: sessionName,
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
            if (execice.id !== undefined) {
              axios.put(
                `${process.env.REACT_APP_BACK_URL_LARAVEL}api/exercices/${execice.id}`,
                {
                  name: execice.name,
                  advice: execice.description,
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
            } else {
              axios.post(
                `${process.env.REACT_APP_BACK_URL_LARAVEL}api/exercices`,
                {
                  name: execice.name,
                  advice: execice.description,
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
          }
        });
      })
      .then(() => {
        setTemplate("normal");
      });
  };

  const deleteTraining = (id) => {
    setDeleted(true);
    const token = localStorage.getItem("authToken");
    axios.delete(
      `${process.env.REACT_APP_BACK_URL_LARAVEL}api/training/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: "", description: "", repetitions: "", sets: "" },
    ]);
  };

  const updateExercise = (index, field, value) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );

    setExercises(updatedExercises);
  };

  const deleteExercise = (id) => {
    const token = localStorage.getItem("authToken");
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
    if (id !== undefined) {
      axios.delete(
        `${process.env.REACT_APP_BACK_URL_LARAVEL}api/exercices/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Centrer le titre de la séance en haut
    doc.setFontSize(22);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(sessionName);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(sessionName, xOffset, 20);

    // Ajouter le tableau des exercices avec autoTable
    doc.autoTable({
      startY: 30, // Positionner le tableau en dessous du titre
      head: [["Exercice", "Description", "Répétitions", "Séries"]],
      body: exercises.map((exercise) => [
        exercise.name,
        exercise.description,
        exercise.repetitions,
        exercise.sets,
      ]),
    });

    doc.save(`${sessionName}.pdf`);

    updateTraining();
  };

  useEffect(() => {
    setSessionName(training.name);
    setExercises(() => {
      const newExercises = training.exercices.map((exercice) => ({
        id: exercice.id,
        name: exercice.name,
        description: exercice.advice,
        repetitions: exercice.repetitions,
        sets: exercice.series,
      }));
      return newExercises;
    });
  }, [training]);

  return (
    <div>
      {deleted === false && (
        <div className="showTraining-container w-11/12 mx-auto my-5 shadow-md p-4 sm:p-8">
          {template === "normal" && (
            <div className="showTraining-container-normal flex justify-between">
              <div className="showTraining-left flex flex-col md:flex-row md:items-center items-start gap-2 md:gap-10 w-1/2 text-sm sm:text-md">
                <h3>{sessionName}</h3>
                <p className="">créé le: {formatDate}</p>
              </div>
              <div className="showTraining-rigth">
                <button
                  className="w-24 sm:w-36 border-2 border-gray-300 text-gray-500 rounded-full py-1 sm:py-2 text-sm font-bold hover:bg-gray-100"
                  onClick={() => setTemplate("edit")}
                >
                  Modifier
                </button>
              </div>
            </div>
          )}

          {template === "edit" && (
            <div className="showTraining-container-edit flex flex-col gap-5">
              <div className="createName">
                <input
                  className="border-b border-gray-300 focus:outline-none w-full"
                  type="text"
                  placeholder="Nom de la séance"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                />
              </div>

              <div className="exercices-container flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Exercices :</h2>
                <div className="exercices flex flex-col gap-2">
                  {exercises &&
                    exercises.map((exercise, index) => (
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
                          />

                          <input
                            className="border-b border-gray-300 focus:outline-none w-14 sm:w-24 sm:text-lg text-xs"
                            type="number"
                            min="0"
                            placeholder="Répétitions"
                            value={exercise.repetitions}
                            onChange={(e) =>
                              updateExercise(
                                index,
                                "repetitions",
                                e.target.value
                              )
                            }
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
                          />
                        </div>
                        <input
                          className="border-b border-gray-300 focus:outline-none w-full sm:text-lg text-xs"
                          type="text"
                          placeholder="Description"
                          value={exercise.description}
                          onChange={(e) =>
                            updateExercise(index, "description", e.target.value)
                          }
                        />
                        <button onClick={() => deleteExercise(exercise.id)}>
                          Supprimer l'exercice
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <button
                className="w-48 border-2 border-gray-300 text-gray-500 rounded-full py-2 text-sm sm:font-bold hover:bg-gray-100 m-auto sm:m-0"
                onClick={addExercise}
              >
                Ajouter un exercice
              </button>

              <div className="button-container flex gap-3 justify-center">
                <button
                  className="w-48 sm:border-2 sm:border-gray-300 text-gray-500 rounded-full py-2 text-sm sm:font-bold sm:hover:bg-gray-100 hover:text-gray-300 sm:hover:text-gray-500 "
                  onClick={() => setTemplate("normal")}
                >
                  Retour
                </button>
                <button
                  className="w-48 sm:border-2 sm:border-gray-300 text-gray-500 rounded-full py-2 text-sm sm:font-bold sm:hover:bg-gray-100 hover:text-gray-300 sm:hover:text-gray-500  "
                  onClick={updateTraining}
                >
                  Enregistrer
                </button>
                <button
                  className="w-48 sm:border-2 sm:border-gray-300 text-gray-500 rounded-full py-2 text-sm sm:font-bold sm:hover:bg-gray-100 hover:text-gray-300 sm:hover:text-gray-500 "
                  onClick={generatePDF}
                >
                  Générer le PDF
                </button>
              </div>

              <div className="text-center text-red-500 hover:text-red-400">
                <button onClick={() => deleteTraining(training.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShowTraining;
