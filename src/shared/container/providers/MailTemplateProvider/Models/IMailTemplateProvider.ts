import IParseTempalteDTO from '../dtos/IParseMailTempalteDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseTempalteDTO): Promise<string>;
}
