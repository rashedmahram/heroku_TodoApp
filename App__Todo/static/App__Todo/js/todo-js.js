$(document).ready(function () {
        var input_ = $("#Task");
        var add_ = $("#basic-addon2");
        var crf = $("input[name=csrfmiddlewaretoken]").val();

        refresh_list()

        add_.on('click',function(){
            // console.log(crf)
            $.ajax({
                url: '',
                type: 'POST',
                dataType: 'json',
                data: {
                    task: input_.val(),
                    csrfmiddlewaretoken: crf,
                },
                // succcess add the content to list
                success: function (response) {
                    input_.val(''),
                    refresh_list()
                }
            })
        })

        function refresh_list(){
            $.ajax({
                url: 'Tasks/',
                type: 'GET',
                dataType: 'json',
                data: {                },
                success: function (response) {
                    $('#TaskList li').remove()
                    response.data.forEach(element => $('#TaskList').append('<li class="list-group-item d-flex justify-content-between align-items-center" id=' + element['id'] + '><p>' + element['task'] + '</p><div><button type="button" class="btn btn-primary mx-2" data-toggle="modal" data-target="#exampleModal" id=' + element['id'] + '> edit</button><button class="btn btn-danger del" id=' + element['id'] + '>X</button></div></li>'));
                    $("li div .del").on('click', function () {
                        delete_(this.id)
                    })
                    $("li p").on('click', function () {
                        $(this).toggleClass("done")
                    })
                    $("li").on('click', function () {
                        $(this).dialog("selected")
                    })
                }
            })
        }
        
        function delete_(id){
            var crf1 = $("input[name=csrfmiddlewaretoken]").val();
            $.ajax({
                url: 'del/',
                type: 'POST',
                dataType: 'json',
                data: {
                    taskID: id,
                    csrfmiddlewaretoken: crf1,
                },
                // succcess add the content to list
                success: $('#'+id+'').remove(), // refresh_list(),
                
                error: function (returnval) {
                    $(".message").text(returnval + " failure");
                    $(".message").fadeIn("slow");
                    $(".message").delay(2000).fadeOut(1000);
                },
                
            })
        }
    }
)