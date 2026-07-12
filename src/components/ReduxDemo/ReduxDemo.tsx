import { Button, Typography } from "@mui/material";
import { update } from "../../store/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const ReduxDemo = () => {

  const dispatch = useAppDispatch();
  const text = useAppSelector(state => state.string.value);

  return (
      <>
        <Typography>
          {text}
        </Typography>

        <Button
          variant="contained"
          onClick={() => dispatch(update("Updated by Redux Toolkit"))}
        >
          Change text
        </Button>
      </>
    );
}

export default ReduxDemo;
