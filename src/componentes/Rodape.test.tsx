import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../state/hooks/useListaDeParticipantes';
import Rodape from './Rodape';

jest.mock('../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  };
});

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('../state/hooks/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  };
});

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  };
});

describe('Caso não exista participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test('O botão deve estar desabilitado', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    const botao = screen.getByRole('button');
    expect(botao).toBeDisabled();
  });
});

describe('Quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Júlia', 'Gustavo', 'Bowie']);
  });

  test('O botão deve estar habilitado', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    const botao = screen.getByRole('button');
    expect(botao).not.toBeDisabled();
  });

  test('O botão foi acionado', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    const botao = screen.getByRole('button');
    fireEvent.click(botao);
    expect(mockNavegacao).toHaveBeenCalledTimes(1);
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');  
    expect(mockSorteio).toHaveBeenCalledTimes(1);
  });
});