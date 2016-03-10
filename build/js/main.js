var isReplyOpen = false;
$(document).on('click', '.reply' ,function(event){
	event.preventDefault();
	if (!isReplyOpen) {
		$(this).after('<form action="#" class="form-reply">'
							+'<span class="to">'+$(this).parent().find('.comm-author').html()+'</span>'
							+'<a href="#" class="cancel">Cancel</a>'
							+'<textarea name="reply" class="text-reply" placeholder="Your Message"></textarea>'
						    +'<button id="add-reply">Send</button>'
						+'</form> ');
        $(this).addClass('reply-open');
		isReplyOpen = true;
	};
});
function convDate(d){
    var dateString = d.substr(0,10)+' at '+d.substr(11, 5);
    // console.log(dateString);
    return(dateString);
}
$(document).on('click', '.cancel', function(event){ 
    event.preventDefault();
    $('.form-reply').remove();
    isReplyOpen = false;
    $('.reply').removeClass('reply-open');
});
$(document).on('click', '.delete', function(event){ 
    event.preventDefault();
    var id = $(this).closest('article').attr('id');
    $.ajax({
        url: 'http://frontend-test.pingbull.com/pages/arsenii.derkach@gmail.com/comments/'+id,
        type: 'POST',
        dateType: 'json',
        data: {
            _method: 'DELETE'
        }
    })
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
    var id = $(this).closest('article').attr('id');
    $.ajax({
        url: 'http://frontend-test.pingbull.com/pages/arsenii.derkach@gmail.com/comments/'+id,
        type: 'POST',
        dateType: 'json',
        data: {
            _method: 'PUT',
            content: editedText
        },
        success: function(data){
        },
        error: function(data){
        }
    })
    editForm.remove();
});
var myId = 1;
function findById(id){
    $.getJSON(
        'http://frontend-test.pingbull.com/pages/arsenii.derkach@gmail.com/comments/'+id,
        function(comment){
        })
};
var $comments=$('.comments');
var count;
var offset;
function load(count, offset){
    $.ajax({
        type: 'GET',
        url: 'http://frontend-test.pingbull.com/pages/arsenii.derkach@gmail.com/comments',
        success: function(comments){
            var flag = 0;
            var tmp = parseInt($('.num-loaded').html());
            tmp+=count;
            $('.num-loaded').html(tmp);
            $.each(comments, function(i,comment){
                if (i>=offset) {
                    flag++;
                    if (flag>count) {
                        return;
                    };
                    if (myId === comment.author.id) {
                        $comments.find('.load-more').before(      
                            '<article class="comment" id="'+comment.id+'">'
                            +'<img src="'+comment.author.avatar+'" alt="" class="user-avatar">'
                            +'<a href="#" class="comm-author">'+comment.author.name+'</a>'
                            +'<span class="date-added">'+convDate(comment.created_at)+'</span>'
                            +'<p>'+comment.content+'</p>'
                            +'<a href="#" class="reply">Reply</a>' 
                            +'<a href="#" class="edit">Edit</a>'
                            +'<a href="#" class="delete">Delete</a>'
                            +'</article>');
                    }
                    else {
                        $comments.find('.load-more').before(
                        '<article class="comment" id="'+comment.id+'">'
                        +'<img src="'+comment.author.avatar+'" alt="" class="user-avatar">'
                        +'<a href="#" class="comm-author">'+comment.author.name+'</a>'
                        +'<span class="date-added">'+convDate(comment.created_at)+'</span>'
                        +'<p>'+comment.content+'</p>'
                        +'<a href="#" class="reply">Reply</a>'     
                        +'</article>')
                    };
                    for (var j = 0; j <= comment.children.length - 1; j++) {
                        $comments.find('#'+comment.id).append(
                            '<article class="replied">'
                        +'<img src="'+comment.children[j].author.avatar+'" alt="" class="user-avatar reply-avatar">'
                        +'<a href="#" class="comm-author who-replied">'+comment.children[j].author.name+'</a>'
                        +'<br>'
                        +'<span class="replied-to">'+comment.author.name+'</span>'
                        +'<span class="date-added">'+convDate(comment.children[j].created_at)+'</span>'
                        +'<p>'+comment.children[j].content+'</p>'
                    +'</article>');
                    };
                };
            });
        }
    });
};
$(document).on('click', '.load-more', function(event){
    event.preventDefault();
    var offset= parseInt($('.num-loaded').html());
    load(5,offset);
});
load(5,0);
var d = new Date();
var author = {
    id:1,
name:'Kurt Thompson',
avatar:'http://api.randomuser.me/portraits/thumb/men/69.jpg',
created_at:'2015-08-11 at 13:08:25',
updated_at:'2015-08-11 at 13:08:25'
};

function addComment(comment){
        $.ajax({
        type: 'POST',
        url: 'http://frontend-test.pingbull.com/pages/arsenii.derkach@gmail.com/comments',
        data: comment,
        success: function(data){
            if (data.parent == null) {
            $('.new-comment').after(
                '<article class="comment" id="'+data.id+'">'
                            +'<img src="'+author.avatar+'" alt="" class="user-avatar">'
                            +'<a href="#" class="comm-author">'+author.name+'</a>'
                            +'<span class="date-added">'+d+'</span>'
                            +'<p>'+data.content+'</p>'
                            +'<a href="#" class="reply">Reply</a>' 
                            +'<a href="#" class="edit">Edit</a>'
                            +'<a href="#" class="delete">Delete</a>'
                            +'</article>');
            }
            else {
                $('#'+data.parent).append(
                    '<article class="replied">'
                    +'<img src="'+author.avatar+'"" alt="" class="user-avatar reply-avatar">'
                    +'<a href="#" class="comm-author who-replied">'+author.name+'</a>'
                    +'<br>'
                    +'<span class="replied-to">'+$('.reply-open').parent().find('.to').html()+'</span>'
                    +'<span class="date-added">'+d.toTimeString()+'</span>'
                    +'<p>'+data.content+'</p>'
                    +'</article>');
            };
        },
        error: function() {
        }
    });
}
$('#add-new').on('click', function(event){
    event.preventDefault();
    var newComment= {
        content: $('#new').val(),
        parent: null
    };
    addComment(newComment);
    $('.new-comment')[0].reset();
});

$(document).on('click', '#add-reply', function(event){
    event.preventDefault();
    var p = $('.reply-open').closest('article').attr("id");
    var newReply = {
        content: $('.text-reply').val(),
        parent: p
    };
    addComment(newReply);
});