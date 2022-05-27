import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../state/hooks/useListaDeParticipantes';
import { useResultadoSorteio } from '../state/hooks/useResultadoSorteio';
import Sorteio from './Sorteio';

jest.mock('../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  };
});

jest.mock('../state/hooks/useResultadoSorteio', () => {
  return {
    useResultadoSorteio: jest.fn()
  };
});

describe('Na pagina de sorteio', () => {
  const participantes = ['Pedro', 'Joel', 'Bowie'];
  const resultado = new Map([
    ['Pedro', 'Bowie'],
    ['Bowie', 'Joel'],
    ['Joel', 'Pedro']
  ]);

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });
  test('Todos participantes podem exibir seu amigo secreto', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.queryAllByRole('option');
    expect(opcoes).toHaveLength(participantes.length + 1);
  });

  test('O amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText('Selecione seu nome');
    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    });
    
    const botao = screen.getByRole('button');
    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole('alert');
    expect(amigoSecreto).toBeInTheDocument();
  });
});