import React, { memo, useRef, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, BackGround, Content, AnimationContainer } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidateErros from '../../utils/getValidatationErros';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SignUpFromDate {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: SignUpFromDate) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatorio'),
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('Digite um e-mail valido '),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        history.push('/');
        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description: 'Você já pode fazer seu logon no Gobaber',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidateErros(err);

          formRef.current?.setErrors(erros);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro no cadastro tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <BackGround />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBaber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input icon={FiUser} name="name" placeholder="Digite seu nome" />
            <Input icon={FiMail} name="email" placeholder="Digite seu E-mail" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Digite sua senha"
            />
            <Button type="submit">Cadastrar</Button>
            <a href="forgot">Esquecir minha senha</a>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default memo(SignUp);
