import React from 'react'
import { Banner } from '@shopify/ui-extensions-react/checkout'

const ErrorBanner = () => {
	return (
		<Banner status='critical'>
			There was an issue adding this product. Please try again.
		</Banner>
	)
}

export default ErrorBanner
