import React, { useEffect, useState } from 'react'
import {
	reactExtension,
	useCartLines,
	useApplyCartLinesChange,
	useApi,
} from '@shopify/ui-extensions-react/checkout'
import hasOfferInCart from '../utils/hasOfferInCart'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ProductOffer from '../components/ProductOffer'
import {
	GET_METAOBJECT_QUERY,
	METAOBJECT_VARIABLES,
} from '../gql/getMetaobject'
import { GET_PRODUCT_QUERY, PRODUCT_VARIABLES } from '../gql/getProduct'

export default reactExtension('purchase.checkout.block.render', () => <App />)

function App() {
	const { query, i18n } = useApi()
	const applyCartLinesChange = useApplyCartLinesChange()
	const [product, setProduct] = useState()
	const [loading, setLoading] = useState(false)
	const [adding, setAdding] = useState(false)
	const [showError, setShowError] = useState(false)
	const lines = useCartLines()

	const fetchProduct = async () => {
		setLoading(true)
		try {
			const metaobject = await query(GET_METAOBJECT_QUERY, METAOBJECT_VARIABLES)

			const productData = await query(
				GET_PRODUCT_QUERY,
				PRODUCT_VARIABLES(metaobject.data.metaobject.fields[1].value)
			)

			setProduct(productData.data.product)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProduct()
	}, [])

	useEffect(() => {
		if (showError) {
			const timer = setTimeout(() => setShowError(false), 3000)
			return () => clearTimeout(timer)
		}
	}, [showError])

	const handleAddToCart = async variantId => {
		setAdding(true)

		const result = await applyCartLinesChange({
			type: 'addCartLine',
			merchandiseId: variantId,
			quantity: 1,
		})

		setAdding(false)

		if (result.type === 'error') {
			setShowError(true)
			console.error(result.message)
		}
	}

	if (loading) {
		return <LoadingSkeleton />
	}

	if (!loading && !product) {
		return null
	}

	const productOnOffer = hasOfferInCart(lines, product)

	if (!productOnOffer) {
		return null
	}

	return (
		<ProductOffer
			product={productOnOffer}
			i18n={i18n}
			adding={adding}
			handleAddToCart={handleAddToCart}
			showError={showError}
		/>
	)
}
