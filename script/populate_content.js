function populate_content() {

	document.title = header_content.name;

	//Clear out any old data
	document.getElementById("pg2").style.display = "none";
	var container = document.getElementById("pg1");
	container.innerHTML = "";

	var header = createDiv({"cn":"header section"});
	header.appendChild(createSpan({"txt":header_content.name,"cn":"name"}));
	header.appendChild(createSpan({"txt":header_content.credentials,"cn":"credentials"}));
	
	var contact = createSpan({"cn":"contact container"});
	contact.appendChild(createSpan({"txt":header_content.contact.email,"cn":"contact email"}));
	contact.appendChild(createSpan({"txt":header_content.contact.phone, "cn":"contact phone"}));
	contact.appendChild(createElement("br",""));
	contact.appendChild(createSpan({"txt":header_content.contact.address, "cn":"contact address"}));
	contact.appendChild(createElement("br",""));
	contact.appendChild(createSpan({"txt":header_content.contact.location, "cn":"contact location"}));
	
	header.appendChild(contact);

	container.appendChild(header);
	container.appendChild(createDiv({"txt":header_content.title, "cn":"title"}));
	
	for (var s=0; s<view.content.sections.length; s++) {
		var section_data = view.content.sections[s];
		
		if (section_data.page_break) {
			container = document.getElementById("pg2");
			container.innerHTML = "";
			container.style.display = "block";
			var header2 = header.cloneNode(true);
			
			header2.setAttribute("id", "");
			header2.setAttribute("class", "header small section");
			
			container.appendChild(header2);
		}
		
		var section = createDiv({"cn":"section"});
		
		section.appendChild(createDiv({"txt":section_data.name,"cn":"header"}));
		if (section_data.details) {
			section.appendChild(createDetails(section_data.details));			
		}
		if (section_data.subsections) {
			section.appendChild(createSubsections(section_data.subsections));
		}
		container.appendChild(section);
	}
}

function createElement(tag, contents) {
	var element = document.createElement(tag);
	
	if (contents.txt) element.innerHTML = contents.txt;
	if (contents.cn) element.setAttribute("class", contents.cn);
	if (contents.id) element.setAttribute("id", contents.id);
	
	return element;
}

function createDiv(contents) {
	return createElement("div", contents);
}

function createSpan(contents) {
	return createElement("span", contents);
}

function createDetails(details_data) {
	var list = createElement("ul", {"cn":"details"});

	for (var d=0; d<details_data.length; d++) {
		list.appendChild(createElement("li",{"txt":details_data[d]}));
	}

	var details = createDiv({"cn":"details"});
	details.appendChild(list);
	return details;
}

function createSubsections(subsections_data) {
	var subsections = createDiv({"cn":"subsections"});
	for (var ss=0; ss<subsections_data.length; ss++) {
		var subsection_data = subsections_data[ss];
		if (subsection_data.show) {
			var subsection = createDiv({"cn":"subsection"});

			var subheader = createDiv({"cn":"subheader"});
			subheader.appendChild(createSpan({"txt":subsection_data.name,"cn":"name"}));
			if (subsection_data.location) {
				subheader.appendChild(createSpan({"txt":subsection_data.location,"cn":"location"}));
			}
			if (subsection_data.dates) {
				subheader.appendChild(createSpan({"txt":subsection_data.dates,"cn":"dates"}));
			}
			subsection.appendChild(subheader);
			
			if (subsection_data.foci) {
				for (var f=0; f<subsection_data.foci.length; f++) {
					var focus = subsection_data.foci[f];
					if (focus.show == undefined || focus.show == true) {
						subsection.appendChild(createDiv({"txt":focus.heading,"cn":"focus"}));
						if (focus.details) {
							subsection.appendChild(createDetails(focus.details));
						}
					}
				}
			}
			
			if (subsection_data.focus) {
				subsection.appendChild(createDiv({"txt":subsection_data.focus,"cn":"focus"}));
			}
			if (subsection_data.details) {
				subsection.appendChild(createDetails(subsection_data.details));
			}				
			subsections.appendChild(subsection);
		}
	}
	return subsections;
}