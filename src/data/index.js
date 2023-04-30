import backendOrigin from "../config/origins";
import uuid from "react-uuid";

export default class Database {
	static async _getModel(model, params) {
		let time = Date.now();
		const response = await fetch(`${backendOrigin}/${model}`, params)
			.then((res) => res.json())
			.then((json) => {
				return json;
			})
			.catch((err) => {
				console.log(err);
			});
		return response;
	}

	static async getMenuItems() {
		let res = await this._getModel("menu");
		return res;
	}

	static async getMenuItemsForOrder(order_id) {
		let res = await this._getModel(`menu/order/${order_id}`);
		return res;
	}

	static async getInventoryItems() {
		let res = await this._getModel("inventory");
		return res;
	}

	static async getOrders() {
		let res = await this._getModel("orders");
		return res;
	}

	static async getRecentOrders() {
		let res = await this._getModel("orders/recent");
		return res;
	}

	static async makeOrder(cost_total, timestamp, customer_id, staff_id, menu_items) {
		const response = await fetch(`${backendOrigin}/orders/makeorder`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cost_total: cost_total,
				timestamp: timestamp,
				customer_id: customer_id,
				staff_id: staff_id,
				menu_items: menu_items,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	static async addMenuItem(name, price, type, inventory_items) {
		const response = await fetch(`${backendOrigin}/menu/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				price: price,
				type: type,
				inventory_items: inventory_items,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	static async updateMenuPriceByName(name, newPrice) {
		const response = await fetch(`${backendOrigin}/menu/edit/price`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				newPrice: newPrice,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	static async updateInventoryQuantityByName(name, quantity) {
		const response = await fetch(
			`${backendOrigin}/inventory/edit/quantity`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					quantity: quantity,
				}),
			}
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	static async postGoogleAuth(params) {
		const message = await fetch(`${backendOrigin}/auth/google-login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return message;
	}

	static async addMessage(params) {
		const message = await fetch(`${backendOrigin}/messages/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return message;
	}

	static async getRestockReport(minimumQty) {
		// console.log(minimumQty);
		const response = await fetch(
			`${backendOrigin}/restaurant/restockreport?minimumQty=${minimumQty}`
		)
			.then((res) => res.json())
			.then((json) => {
				return json;
			})
			.catch((err) => {
				console.log(err);
			});
		return response;
	}

	static async getSalesReport(sDate, eDate) {
		const response = await fetch(
			`${backendOrigin}/restaurant/salesreport?sDate=${sDate}&eDate=${eDate}`
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	static async getExcessReport(timestamp) {
		const response = await fetch(
			`${backendOrigin}/restaurant/excessreport?timestamp=${timestamp}`
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	static async getXReport() {
		const response = await fetch(`${backendOrigin}/restaurant/xreport`)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	static async getZReport() {
		const response = await fetch(`${backendOrigin}/restaurant/zreport`)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}
}

export const handleUID = () => {
	let uid = localStorage.getItem("uid");
	if (!uid) {
		uid = uuid();
		localStorage.setItem("uid", uid);
	}
};

export const getUID = () => {
	handleUID();
	let uid = localStorage.getItem("uid");
	return uid;
};
