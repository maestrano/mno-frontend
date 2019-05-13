export interface CacheConfig {
  collection?: boolean
}

export class CacheObject {
  key: string
  value: any
  configuration: CacheConfig

  constructor(key: string, value: any, configuration: CacheConfig = { collection: true }) {
    this.key = key
    this.update(value, configuration)
  }

  public update(value: any, configuration: CacheConfig): void {
    this.value = value
    this.configuration = configuration
  }

  public removeCollectionItem(key: string, value: any): boolean {
    if (!this.configuration.collection) return false
    this.value = this.value.filter((item: any) => item[key] !== value)
    return true
  }
}
