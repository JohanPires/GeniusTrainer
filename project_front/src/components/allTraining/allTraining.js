import React, { useEffect, useState } from "react";

import axios from "axios";
import ShowTraining from "../showTraining/showTraining";
import "./allTraining.css";
import { useLocation } from "react-router-dom";

function AllTraining() {
  const [alltrainings, setAlltrainings] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredTraining, setFilteredTraining] = useState([]);
  const url = useLocation();

  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "admin" && url.pathname === "/dashboard/admin") {
      axios
        .get(`http://127.0.0.1:8000/api/training`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setAlltrainings(res.data));
    } else {
      axios
        .get(`http://127.0.0.1:8000/api/training/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setAlltrainings(res.data));
    }
  }, []);

  useEffect(() => {
    setFilteredTraining(
      alltrainings.filter((training) =>
        training.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, alltrainings]);

  return (
    <div className="allTraining">
      <div class="searchBar w-2/5 mx-auto my-5 shadow-md p-5 rounded-full flex gap-2">
        <label htmlFor="search">
          <i class="fa-solid fa-magnifying-glass text-gray-300"></i>
        </label>
        <input
          class="w-4/5 border-b border-gray-300 focus:outline-none text-gray-500"
          type="text"
          name="search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {alltrainings.length > 0 ? (
        filter === "" ? (
          alltrainings.map((training) => (
            <ShowTraining key={training.id} training={training} />
          ))
        ) : (
          filteredTraining.map((training) => (
            <ShowTraining key={training.id} training={training} />
          ))
        )
      ) : (
        <span>Aucune séance enregistré</span>
      )}
    </div>
  );
}

export default AllTraining;
