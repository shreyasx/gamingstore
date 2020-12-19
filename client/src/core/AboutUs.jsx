import React from "react";
import { Link } from "react-router-dom";

const redirect = () => (window.location.href = "https://shreyasx.github.io/");

const AboutUs = () => {
	return (
		<div
			style={{ width: "90%", textAlign: "center", margin: "auto" }}
			className="text-white"
		>
			<h2 style={{ margin: "20px 0" }}>A Project By:</h2>
			<div className="row" style={{ margin: "100px 0" }}>
				<div className="col-lg-4">
					<h3>Tanay Gargate</h3>
					<p>USN: 2GI19CS140</p>
				</div>
				<div
					onClick={redirect}
					style={{ cursor: "pointer", fontSize: "1.1em" }}
					className="col-lg-4"
				>
					<h3 style={{ fontSize: "1.8em" }}>Shreyas Jamkhandi</h3>
					<p>USN: 2GI19CS140</p>
					<p style={{ fontSize: "smaller", fontWeight: "lighter" }}>
						Click to know more!
					</p>
				</div>
				<div className="col-lg-4">
					<h3>Shrikrishna Keeliputti</h3>
					<p>USN: 2GI19CS141</p>
				</div>
			</div>
			<h4
				style={{
					margin: "50px auto",
					lineHeight: "1.5em",
					width: "80%",
					textAlign: "left",
				}}
			>
				This is a simple Game-Store project made for Web Development course in
				KLS Gogte Institue of Technology. It allows users to make accounts and
				saves the products they add to their cart in the database.
			</h4>
			<h4
				style={{
					margin: "0 auto",
					marginBottom: "50px",
					lineHeight: "1.5em",
					textAlign: "left",
					width: "80%",
				}}
			>
				This app saves games into categories, and games can be filtered using
				categories. The user could search based on the category they select.
				This has not been implememnted yet, but will be soon. There's also an
				admin panel to make/update categories/products. The source code is
				available on{" "}
				<a target="blank" href="https://github.com/shreyasx/gamingstore">
					GitHub
				</a>
				.
			</h4>
			<Link
				style={{
					fontSize: "1.5em",
					border: "2px solid white",
					borderRadius: "10px",
					padding: "10px",
					color: "white",
				}}
				to="/"
			>
				Back to store!
			</Link>
		</div>
	);
};

export default AboutUs;
