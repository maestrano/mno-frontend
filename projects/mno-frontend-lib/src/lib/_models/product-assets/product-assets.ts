export class ProductAsset {
  created_at: string
  data_content_type: string
  data_file_name: string
  data_file_size: number
  field_name: string
  height: string
  id: string
  position: number
  updated_at: string
  url: string
  width: string

  constructor(attrs?: Partial<ProductAsset>) {
    Object.assign(this, attrs)
  }
}
