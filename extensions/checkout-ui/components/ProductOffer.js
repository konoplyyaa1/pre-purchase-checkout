import {
	Divider,
	Image,
	Heading,
	Button,
	InlineLayout,
	BlockStack,
	Text,
} from '@shopify/ui-extensions-react/checkout'
import ErrorBanner from '../components/ErrorBanner'

const ProductOffer = ({
	product,
	i18n,
	adding,
	handleAddToCart,
	showError,
}) => {
	const { images, title, variants } = product
	const renderPrice = i18n.formatCurrency(variants.nodes[0].price.amount)
	const imageUrl = images.nodes[0]?.url

	return (
		<BlockStack spacing='loose'>
			<Divider />
			<Heading level={2}>You might also like</Heading>
			<BlockStack spacing='loose'>
				<InlineLayout
					spacing='base'
					columns={[64, 'fill', 'auto']}
					blockAlignment='center'
				>
					<Image
						border='base'
						borderWidth='base'
						borderRadius='loose'
						source={imageUrl}
						description={title}
						aspectRatio={1}
					/>
					<BlockStack spacing='none'>
						<Text size='medium' emphasis='strong'>
							{title}
						</Text>
						<Text appearance='subdued'>{renderPrice}</Text>
					</BlockStack>
					<Button
						kind='secondary'
						loading={adding}
						accessibilityLabel={`Add ${title} to cart`}
						onPress={() => handleAddToCart(variants.nodes[0].id)}
					>
						Add
					</Button>
				</InlineLayout>
			</BlockStack>
			{showError && <ErrorBanner />}
		</BlockStack>
	)
}

export default ProductOffer
