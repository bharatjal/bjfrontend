import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import SideBar from "../../common/sidebar";

export default function AdminLayout(props) {

	const [isSidebarOpen, isSidebarOpenSet] = React.useState(true);        

	const toggleChange = () => {
		isSidebarOpenSet(!isSidebarOpen);
	};

	// Need to add class toggled to sidebar

	return (
		<div className="d-flex" id="wrapper">
			{/* {isSidebarOpen ? <SideBar /> : ""} */}
			<SideBar open={isSidebarOpen} />
			<div id="page-content-wrapper">
				<Button
					variant="primary"
					onClick={toggleChange}
					className="m-1"
				>
					{isSidebarOpen ? "<" : ">"}
				</Button>
				<Container fluid>{props.children}</Container>
			</div>
		</div>
	);
}
