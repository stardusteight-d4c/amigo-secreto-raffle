import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Formulario from './Formulario';

describe('Comportamento do Formulario.tsx', () => {
  test('Quando o input estiver vazio, novos participantes não devem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(botao).toBeDisabled();
  });
  
  test('Adicionar partipante caso exista um nome inserido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');
    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);
    expect(input).toHaveFocus();
    expect(input).toHaveValue('');
  });
  
  test('Mensagem de erro deve ser exibida com nomes duplicados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');
  
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);
  
    const mensagemDeErro = screen.getByRole('alert');
    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!');
  });
  
  test('A mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');
  
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);
  
    let mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeInTheDocument();
  
    // esperar n segundos
    act(() => {
      jest.runAllTimers();
    });
  
    mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeNull();
  });
});


