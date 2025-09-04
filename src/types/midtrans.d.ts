/* eslint-disable @typescript-eslint/no-explicit-any */
interface MidtransSnap {
  pay: (
    token: string,
    options: {
      onSuccess?: (result: any) => void;
      onPending?: (result: any) => void;
      onError?: (result: any) => void;
      onClose?: () => void;
    }
  ) => void;
}

interface Window {
  snap: MidtransSnap;
}
