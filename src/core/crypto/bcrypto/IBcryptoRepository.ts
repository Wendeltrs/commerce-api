export abstract class IBcryptoRepository {
  abstract hash(value: string): Promise<string>
  abstract compare(value: string, hash: string): Promise<boolean>
}