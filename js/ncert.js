function getUrlVars() {
	var vars = [],
		hash;
	var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split("=");
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

$(document).ready(function () {
	const htmlArray = [];
	const searchString = getUrlVars();
	const eachClass = searchString?.class;
	if (eachClass) {
		const word = eachClass.replace("-", " ");
		const className = word.charAt(0).toUpperCase() + word.slice(1);
		// $(".breadcrumb-item.text-white.active").html(className);
		$(".breadcrumb-item.text-white.active,.container-fluid h1 span.class").html(className);
		$.getJSON("js/urls.json", function (data, textStatus, jqXHR) {
			if (data[eachClass]) {
				data[eachClass].map((book, index) => {
					const bookName = book["name"].replace("Book", "").replace("NCERT", "").replace(className, "");
					const archiveUrl = book["url"].replace("https://ncert.nic.in/textbook/pdf/", "").replace(".zip", "").slice(0, 5);
					htmlArray.push(`<div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                    <div class="blog-item border h-100 p-4">
                        <img class="img-fluid mb-4" src="img/NCERT-1024x576.jpg" alt="" />
                        <a href="${
							"https://archive.org/details/ncert-" + archiveUrl
						}" target='_blank' class="h5 lh-base d-inline-block">${bookName}</a>
                        <p class="mb-4">${book["name"]}</p>
                        <a href="${
							"https://archive.org/details/ncert-" + archiveUrl
						}" target='_blank' class="btn btn-outline-primary px-3">Read More</a>
                    </div>
                </div>`);
				});
			}
			if (htmlArray.length === 0) {
				$("#allBooks").html(
					`<div class='text-center'>No books available please try again with <strong>class-XX</strong> as search query</div>`
				);
			} else {
				$("#allBooks").html(htmlArray);
			}
		});
	}
});
