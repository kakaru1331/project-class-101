import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { getProductItemsUsingPaging, IProductItem, getPaginationOfProductItems } from '../services/productService'
import useQuery from '../utils/useQuery'
import ProductItem from '../components/ProductItem'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}))

function getPageNumberFromQuery (value: string | null): number {
  const DEFAULT_PAGE_NUMBER = 1

  if (value === null) {
    return DEFAULT_PAGE_NUMBER
  }

  const parsed = parseInt(value)

  if (isNaN(parsed)) {
    return DEFAULT_PAGE_NUMBER
  }

  if (parsed < 1) {
    return DEFAULT_PAGE_NUMBER
  }

  return parsed
}

function Products () {
  const classes = useStyles()
  const [productItems, setProductItems] = useState<IProductItem[] | null>(null)
  const [page, setPage] = useState<number>()
  const [totalPage, setTotalPage] = useState<number>()
  const query = useQuery()
  const history = useHistory()
  const location = useLocation()

  const handlePageChange = (event: unknown, pageNumber: number) => {
    history.push(`/products?page=${pageNumber}`)
  }

  useEffect(() => {
    const pageNumber = getPageNumberFromQuery(query.get('page'))

    setProductItems(getProductItemsUsingPaging({ pageNumber }))
    setTotalPage(getPaginationOfProductItems({ pageSize: 5 }))
    setPage(pageNumber)
  }, [location])

  return (
    <main>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {productItems !== null && productItems.map((productItem) => (
            <ProductItem key={productItem.id} productItem={productItem} />
          ))}
          <Grid container justify="center">
            {page &&
            <Pagination color="primary"
              count={totalPage}
              page={page}
              onChange={handlePageChange}
            />
            }
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

export default Products
