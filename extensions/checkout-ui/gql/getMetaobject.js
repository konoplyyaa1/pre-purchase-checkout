export const GET_METAOBJECT_QUERY = `
query getMetaObject($id: ID!) {
	metaobject(id: $id) {
		fields {
			key
			value
			type
		}
	}
}
`

export const METAOBJECT_VARIABLES = {
	variables: { id: 'gid://shopify/Metaobject/42567565450' },
}
