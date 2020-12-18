import React from "react";

const redirect = () => (window.location.href = "https://shreyasx.github.io/");

const AboutUs = () => {
	return (
		<div
			style={{ width: "90%", textAlign: "center", margin: "auto" }}
			className="text-white"
		>
			<h2 style={{ margin: "50px 0" }}>
				This is a simple project made for Web Development course in KLS Gogte
				Institue of Technology.
			</h2>
			<h3 style={{ margin: "20px 0" }}>A Project By:</h3>
			<div className="row" style={{}}>
				<div className="col-lg-4">
					<h3>Tanay Gargate</h3>
					<p>USN: 2GI19CS140</p>
				</div>
				<div
					onClick={redirect}
					style={{ cursor: "pointer" }}
					className="col-lg-4"
				>
					<h3>Shreyas Jamkhandi</h3>
					<p>USN: 2GI19CS140</p>
				</div>
				<div className="col-lg-4">
					<h3>Shrikrishna Keeliputti</h3>
					<p>USN: 2GI19CS141</p>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
