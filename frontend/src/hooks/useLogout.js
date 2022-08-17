import React from "react";
import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

export default function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
}
