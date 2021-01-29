import React, { Component } from "react";
import {
	ProSidebar,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
	Menu,
	MenuItem,
	SubMenu,
} from "react-pro-sidebar";

import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import img from "./../../img/sidebar-bg.jpg";
class Customer extends React.Component {
	componentWillMount = () => {
		setTimeout(() => {
			localStorage.clear();
		}, 1800000);
	};
	logout = () => {
		localStorage.clear();
		this.props.history.push('/')
	};

	render() {
		return (
			<>
				<ProSidebar
					breakPoint="md"
					// image={img}
					// image={'#fff'}
					id="sidebar-wrapper"
					className={`${this.props.open ? 'sidebar-opened' : 'sidebar-closed'}`}
				>
					<SidebarHeader>
						<div className="p-3">Welcome Admin!</div>
					</SidebarHeader>

					<SidebarContent>
						<Menu iconShape="square">
							<MenuItem>
								Dashboard
								<Link to="/dashboard" />
							</MenuItem>
							<SubMenu title="Drivers">
								<MenuItem>
									Driver Details
									<Link to="/homepage" />
								</MenuItem>
								<MenuItem>
									Create New Driver
									<Link to="/driverCreate" />
								</MenuItem>
							</SubMenu>

							<SubMenu title="Deliveries">
								<MenuItem>
									All Deliveries
									<Link to="/deliveries" />
								</MenuItem>
								<MenuItem>
									Daily Deliveries
									<Link to="/daily-deliveries" />
								</MenuItem>
								<MenuItem>
									Deliveries Sum
									<Link to="/deliveries-sum" />
								</MenuItem>
								{/* <MenuItem>
									Realtime deliveries tracking
									<Link to="/delivery-tracking" />
								</MenuItem> */}
							</SubMenu>

							{/* <SubMenu title="Transactions">
								<MenuItem>
									Transactions Details
									<Link to="/transaction" />
								</MenuItem>
								<MenuItem>
									Create Transaction
									<Link to="/create-transaction" />
								</MenuItem>
							</SubMenu>

							<SubMenu title="Fillups">
								<MenuItem>
									Fillup Details
									<Link to="/fillup" />
								</MenuItem>
								<MenuItem>
									Create Fillup
									<Link to="/create-fillup" />
								</MenuItem>
							</SubMenu>

							<SubMenu title="Transaction and Driver Join"> */}
							{/* <MenuItem>
									New Drivers Detail
									<Link to="/homepage" />
								</MenuItem>
								<MenuItem>
									All Drivers Fillups
									<Link to="/homepage" />
								</MenuItem>
								<MenuItem>
									Single Drivers Fillups
									<Link to="/homepage" />
								</MenuItem>
								<MenuItem>
									Single Drivers Fillups
									<Link to="/homepage" />
								</MenuItem>
							</SubMenu> */}
						</Menu>
						<Button
							block
							variant="danger"
							type="button"
							className="my-2"
							onClick={this.logout}
						>
							Logout
						</Button>
					</SidebarContent>

					<SidebarFooter>

					</SidebarFooter>
				</ProSidebar>
			</>
		);
	}
}

export default withRouter(Customer)