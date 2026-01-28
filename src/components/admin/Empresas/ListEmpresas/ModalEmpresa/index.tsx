import { useEffect } from 'react';

type tInput = {
  cod?: number;
};

const ModalEmpresa = ({ cod }: tInput) => {
  const onInit = async () => {
    console.log('cod', cod);
  };
  useEffect(() => {
    void onInit();
  }, []);
  return <></>;
};

export default ModalEmpresa;
