// $(document).ready(function() {
// 	$(".form").submit(function(event) {
// 		event.preventDefault();
// 		console.log("preventdefault works")
//
//
// 	});
// });

$(document).ready(function() {
	for (var i = 0; i < localStorage.length; i++) {
		prepend(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}
});

// Clear input fields on click
$('#input-title').on('click', function() {
	$('#input-title').val(" ")
})
$('#input-body').on('click', function() {
	$('#input-body').val(" ")
})

//constructor function
function Idea(title, body) {
	this.title = title;
	this.body = body;
	this.quality = "swill"
	this.id = Date.now();
}

// On click, grab the input fields and prepend to section
$(".button-save").on("click", function() {
	var title = $('#input-title').val();
	var body = $("#input-body").val();
	var idea = new Idea(title, body)
	console.log(idea);
	prepend(idea);
	sendToStorage(idea);
})

function grabObject(id) {
	var parsedObject = JSON.parse(localStorage.getItem(id))
	return parsedObject;
}

function storeObject(id, newObject) {
	localStorage.setItem(id, JSON.stringify(newObject))
}


$("#new-idea-article").on("click", ".upvote-image", function() {
	var id = $(this).parent().parent().prop('id');
	var newObject = grabObject(id)
	var objectQuality = grabObject(id).quality


	if (objectQuality == "swill") {
		newObject.quality = "plausible"
		$(this).siblings().last().text("plausible")
		storeObject(id, newObject)

	} else if (objectQuality == "plausible") {
		newObject.quality = "genius"
		$(this).siblings().last().text("genius")
		storeObject(id, newObject)

	}
})

$("#new-idea-article").on("click", ".downvote-image", function() {
	var id = $(this).parent().parent().prop('id');
	var newObject = grabObject(id)
	var objectQuality = grabObject(id).quality

	if (objectQuality == "genius") {
		newObject.quality = "plausible"
		$(this).siblings().last().text("plausible")
		storeObject(id, newObject)

	} else if (objectQuality == "plausible") {
		newObject.quality = "swill"
		$(this).siblings().last().text("swill")
		storeObject(id, newObject)
	}
})

// trashcan delete
$("#new-idea-article").on('click', '.delete-image', function() {

	localStorage.removeItem($(this).parent().parent().prop('id'));
	$(this).parent().parent().remove('.new-idea-article');
});

function prepend(idea) {
	console.log(idea.id);
	$("#new-idea-article").prepend(`
    <div id="${idea.id}" class="new-idea-article">
	    <section>
	    	<input type="text" class='new-idea-header' value='${idea.title}' maxlength="30" size="35">
	    	<button id='delete-image' class="delete-image" type="button" name="button"></button>
	    </section>
	      <textarea rows="4" cols="50" class='new-idea-body' placeholder="Body" value="${idea.body}"></textarea>
	    <section class="new-idea-footer">
				<button id="upvote-image" class="upvote-image" type="button" name="button"></button>
				<button class="downvote-image" type="button" name="button"></button>
	    	<h3 class="h3-footer">quality:</h3><h3 id="quality">${idea.quality}</h3>
	    </section>
    </div>
    `);
	$('#input-title').val("Title")
	$('#input-body').val("Body")
}

function sendToStorage(idea) {
	localStorage.setItem(idea.id, JSON.stringify(idea))
}


// $("#new-idea-article").on("input", function() {
// 	console.log("This shit works")
// 	var id = $(this).parent().parent().prop('id');
//
//
// })
