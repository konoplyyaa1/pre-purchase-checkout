const hasOfferInCart = (lines, product) => {
	const cartLineProductVariantIds = lines.map(item => item.merchandise.id)
	const isProductVariantInCart = product?.variants.nodes.some(({ id }) =>
		cartLineProductVariantIds.includes(id)
	)

	return product
}

export default hasOfferInCart
