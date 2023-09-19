$(document).ready(function () {
	const htmlArray = [];
	$.getJSON("js/urls.json", function (data, textStatus, jqXHR) {
		const allClasses = Object.keys(data);
		allClasses.map((eachClass, index) => {
			const word = eachClass.replace("-", " ");
			const className = word.charAt(0).toUpperCase() + word.slice(1);
			const allBooks = data[eachClass]
				.map((book) => book.name)
				.join(", ")
				.replaceAll("Book", "")
				.replaceAll("NCERT", "")
				.replaceAll(className, "");
			htmlArray.push(`
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="${(index + 1) * 0.1}s">
            <div class="blog-item border h-100 p-4">
                <img class="img-fluid mb-4" src="img/NCERT-1024x576.jpg" alt="" />
                <a href="" class="h5 lh-base d-inline-block">${className}</a>
                <div class="d-flex text-black-50 mb-2">
                    <div class="pe-3">
                        <small class="fa fa-book me-1"></small>
                        <small>${data[eachClass].length} books</small>
                    </div>
                    <div class="pe-3">
                        <small class="fa fa-language me-1"></small>
                        <small>English, Hindi</small>
                    </div>
                </div>
                <p class="mb-4" title="${allBooks}">${allBooks.length > 190 ? allBooks.slice(0, 190) + "..." : allBooks}</p>
                <a href="${"/all-upsc-ncert/ncert.html?class=" + eachClass}" class="btn btn-outline-primary px-3">Read More</a>
            </div>
        </div>
            `);
		});
		$("#allClass").html(htmlArray.join(""));
	});
});
