import { useState } from "react";

export enum MrStates {
  Opened = "OPENED",
  Closed = "CLOSED",
  Merged = "MERGED",
  Locked = "LOCKED",
  All = "ALL",
}

export interface UseMrState {
  selectedMrState: MrStates;
  selectMrState: (mrState: MrStates) => void;
}
export const useMrState = (): UseMrState => {
  const [selectedMrState, setSelectedMrState] = useState<MrStates>(
    MrStates.Opened
  );

  const selectMrState = (mrState: MrStates) => setSelectedMrState(mrState);

  return {
    selectMrState,
    selectedMrState,
  };
};
