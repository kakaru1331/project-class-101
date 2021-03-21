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

interface IPaginationOptions {
  pageSize: number
}

function getProductItemsUsingPaging (options: IPagingOptions): IProductItem[] | null {
  const { pageNumber, pageSize = 5 } = options

  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = pageNumber * pageSize

  const pagedProductItems = productItems.slice(startIndex, endIndex)

  return pagedProductItems
}

function getPaginationOfProductItems (options: IPaginationOptions) {
  const { pageSize = 5 } = options
  const totalPage = Math.ceil(productItems.length / pageSize)

  return totalPage
}

export { getProductItemsUsingPaging, getPaginationOfProductItems }

export type { IProductItem, IPagingOptions, IPaginationOptions }
