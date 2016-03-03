// all buttons
var isReplyOpen = false
$(".reply").click(function(event){
	event.preventDefault();
	if (!isReplyOpen) {
		$(this).after('<form action="#" class="form-reply">\
							<span class="to">Kurt Thompson</span>\
							<a href="#" class="cancel">Cancel</a>\
							<textarea name="reply" class="text-reply" placeholder="Your Message"></textarea>\
							<input type="submit" value="Send">\
						</form> ');
		isReplyOpen = true;
	};
});
$(document).on('click', '.cancel', function(event){ 
    event.preventDefault();
    $('.form-reply').remove();
 });
$(document).on('click', '.delete', function(event){ 
    event.preventDefault();
    $(this).parent().remove();
});
$(document).on('click', '.edit', function(event){ 
    event.preventDefault();
    var text = $(this).parent().children('p');

    text.after('<form name="editcomment"><textarea name="edit-comment" id="edit" placeholder="Your Message">'+text.html()+'</textarea>\<input type="submit" name="edit" value="Edit"></form>');
    text.remove();
 });
$(document).on("click","input[name='edit']", function(event){
    event.preventDefault();
    var editedText = $('#edit').val();
    var editForm = $(this).parent();
    editForm.after('<p>'+editedText+'</p>');
    editForm.remove();
});