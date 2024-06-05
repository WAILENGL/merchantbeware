const shopifyApiConfig = require('../config/shopifyApiConfig');

const adminApiHandler = (req, res) => {
	shopifyApiConfig.order
		.list({ limit: 5 })
		.then((orders) => res.status(200).json(orders))
		.catch((err) => res.status(500).json(err.message));
};

const customersInfo = (req, res) => {
	fetch(
		'https://merchantbeware.myshopify.com/admin/api/2024-04/customers.json?',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Access-Token': process.env.accessToken,
			},
		}
	)
		.then((response) => response.json())
		.then((data) => {
			if (data?.customers?.length > 0) {
				fetch(
					'https://merchantbeware.myshopify.com/admin/api/2024-04/orders.json?status=any',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-Shopify-Access-Token': process.env.accessToken,
						},
					}
				)
					.then((response2) => response2.json())
					.then((ordersData) => {
						if (ordersData?.orders?.length > 0) {
							const gettingdata = data?.customers?.map((customer) => {
								const ordersDataFilter = ordersData?.orders?.filter(
									(items) => items?.contact_email === customer?.email
								);

								return {
									customerInfo: customer,
									orderInfo: ordersDataFilter,
								};
							});
							console.log({ gettingdata });
							res.status(200).json(gettingdata);
						}
					});
			}
		})
		.catch((err) => console.log(err.message));
};

module.exports = { adminApiHandler, customersInfo };
