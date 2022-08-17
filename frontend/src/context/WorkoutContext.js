import React, { useReducer, createContext } from "react";

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  const allWorkouts = { workouts: [] };
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      allWorkouts["workouts"] = [action.payload, ...state.workouts.workouts];
      return { workouts: allWorkouts };
    case "DELETE_WORKOUT":
      allWorkouts["workouts"] = state.workouts.workouts.filter(
        (w) => w._id !== action.payload._id
      );
      return {
        workouts: allWorkouts,
      };
    default:
      return state;
  }
};

export function WorkoutsContextProvider({ children }) {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}
