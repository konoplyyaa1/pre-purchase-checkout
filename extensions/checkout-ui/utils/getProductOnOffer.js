const getProductsOnOffer = (lines, products) => {
	const cartLineProductVariantIds = lines.map(item => item.merchandise.id)
	return products.filter(product => {
		const isProductVariantInCart = product.variants.nodes.some(({ id }) =>
			cartLineProductVariantIds.includes(id)
		)
		return !isProductVariantInCart
	})
}

export default getProductsOnOffer
