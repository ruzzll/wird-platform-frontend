import type { SnackbarKey } from "notistack"
import { useSnackbar } from "notistack"
import type { ReactElement } from "react"
import type React from "react"

type VariantType = "default" | "success" | "warning" | "info" | "error"

interface SnackbarUtilsConfiguratorProps {
  setUseSnackbarRef: (useSnackbarRefProp: any) => void // Adjust 'any' if useSnackbarRefProp type is known
}

const InnerSnackbarUtilsConfigurator: React.FC<
  SnackbarUtilsConfiguratorProps
> = ({ setUseSnackbarRef }: SnackbarUtilsConfiguratorProps): null => {
  setUseSnackbarRef(useSnackbar())
  return null
}

let useSnackbarRef: {
  enqueueSnackbar: (
    message: string,
    options?: { variant?: VariantType },
  ) => SnackbarKey
}

const setUseSnackbarRef = (useSnackbarRefProp: {
  enqueueSnackbar: (
    message: string,
    options?: { variant?: VariantType },
  ) => SnackbarKey
}): void => {
  useSnackbarRef = useSnackbarRefProp
}

export const SnackbarUtilsConfigurator: React.FC = (): ReactElement => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  )
}

export const snackActions = {
  success: (msg: string): void => {
    snackActions.toast(msg, "success")
  },
  warning: (msg: string): void => {
    snackActions.toast(msg, "warning")
  },
  info: (msg: string): void => {
    snackActions.toast(msg, "info")
  },
  error: (msg: string): void => {
    snackActions.toast(msg, "error")
  },
  toast: (msg: string, variant: VariantType = "default"): void => {
    if (useSnackbarRef) {
      useSnackbarRef.enqueueSnackbar(msg, { variant })
    }
  },
}
