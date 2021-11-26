import { useEffect } from "react";
import { message } from "antd";

export const useErrors = (
  errors: { [key: string]: string | undefined },
  clearErrors: () => { payload: undefined; type: string }
): void => {
  useEffect(() => {
    for (let action in errors) {
      if (errors[action]) {
        message.error(errors[action]);
        clearErrors();
      }
    }
  }, [clearErrors, errors]);
};
