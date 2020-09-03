export default interface ICreatePropostaDTO {
  valor: number;
  fundoId: number;
  clienteId: number;
  tipoPagamento: 'boleto' | 'debito';
}
