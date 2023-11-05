import React, { useEffect, useState } from 'react';

import {
  ConfigBase
} from '@config/index';

import {
  AreaClientLink,
  Buttons,
} from './styles';

import { apiRebox, newContractStorageService } from '@services/index';

const Thanks: React.FC = () => {
  const [paramsAuth, setParamsAuth] = useState({
    sessionId: '',
    sessionToken: '',
  });
  const [loadingFirstLogin, setLoadingFirstLogin] = useState<boolean>(false);

   const handleLoginFirst = async () => {
    const customer = newContractStorageService.getCustomer();
    try {
      setLoadingFirstLogin(prevState => !prevState);
      const { data: response } = await apiRebox.post('/sessions', {
        email: customer.query,
        password: '123456',
      });
      setParamsAuth({
        sessionId: response.data.id,
        sessionToken: response.data.token,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFirstLogin(prevState => !prevState);
    }
  };

    useEffect(() => {
    handleLoginFirst();
  }, []);

return(
  <>
    <Buttons>
      <AreaClientLink
        to={{
          pathname: `${ConfigBase.rebox.externalLinks.customer}/painel${
            paramsAuth.sessionId === null
              ? ''
              : `?s=${paramsAuth.sessionId}&t=${paramsAuth.sessionToken}`
          }`,
        }}
        target="_blank"
        loadingFirstAuth={loadingFirstLogin}
      >
        <ButtonOutline loading={loadingFirstLogin}>
          Acessar área do cliente
        </ButtonOutline>
      </AreaClientLink>
    </Buttons>
  </>


)}

export default Thanks;