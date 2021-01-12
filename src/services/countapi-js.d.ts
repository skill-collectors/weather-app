declare module 'countapi-js' {
  export interface HitResult {
    status: number,
    path: string,
    value: number,
  }
  export function hit(namespace: string, key: string): Promise<HitResult>
}
