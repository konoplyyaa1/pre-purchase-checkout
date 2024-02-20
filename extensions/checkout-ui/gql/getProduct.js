export const GET_PRODUCT_QUERY = `
query ($id: ID!) {
  product(id: $id) {
    id
    title
    images(first: 1) {
      nodes {
        url
      }
    }
    variants(first: 1) {
      nodes {
        id
        price {
          amount
        }
      }
    }
  }
}`

export const PRODUCT_VARIABLES = id => {
	return {
		variables: { id: id },
	}
}
