import coupons from '../data/coupons'

interface ICoupon {
  type: string,
  title: string,
  discountRate?: number,
  discountAmount?: number
}

function getCoupons (): ICoupon[] {
  return coupons
}

export { getCoupons }
export type { ICoupon }
