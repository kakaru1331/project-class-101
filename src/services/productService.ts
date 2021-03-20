import productItems from '../data/productItems'

interface IProductItem {
  id: string,
  title: string,
  coverImage: string,
  price: number,
  score: number,
  availableCoupon?: boolean
}

interface IPagingOptions {
  pageNumber: number,
  pageSize?: number
}

function getProductItemsUsingPaging (options: IPagingOptions): IProductItem[] | null {
  const { pageNumber, pageSize = 5 } = options

  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = pageNumber * pageSize

  const pagedProductItems = productItems.slice(startIndex, endIndex)

  return pagedProductItems
}

export { getProductItemsUsingPaging }

export type { IProductItem, IPagingOptions }
