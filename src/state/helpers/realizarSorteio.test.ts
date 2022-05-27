import { realizarSorteio } from './realizarSorteio';

describe('Dado um sorteio de um amigo secreto', () => {
  test('Cada participante  não sorteie o próprio nome', () => {
    const participantes = ['Bowie',  'Elliot', 'Rami', 'Malek', 'Mercury'];
    const sorteio = realizarSorteio(participantes);
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});