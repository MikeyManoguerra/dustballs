import { useState } from "react";

export default function useToggle(initial = false): [boolean, (val?: boolean)=> void] {
  const [state, setState] = useState<boolean>(initial);

  function toggle(val?: boolean) {
    setState(val === undefined ? !state : val)
  }

  return [
    state,
    toggle
  ]
}
