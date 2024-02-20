import React from 'react'
import {
	Divider,
	Heading,
	Button,
	InlineLayout,
	BlockStack,
	SkeletonText,
	SkeletonImage,
} from '@shopify/ui-extensions-react/checkout'

const LoadingSkeleton = () => {
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
					<SkeletonImage aspectRatio={1} />
					<BlockStack spacing='none'>
						<SkeletonText inlineSize='large' />
						<SkeletonText inlineSize='small' />
					</BlockStack>
					<Button kind='secondary' disabled={true}>
						Add
					</Button>
				</InlineLayout>
			</BlockStack>
		</BlockStack>
	)
}

export default LoadingSkeleton
