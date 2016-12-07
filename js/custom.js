$(document).ready(function(){
    // Functionality for program
    //--------------------------
    // Options and active submit
    $('.answer').on('click', function(){
       $(this).siblings().children('.tickbox').removeClass('ticked');
       $(this).children('.tickbox').addClass('ticked');
       $('.testsubmit').addClass('active');
    })
    
    // Show Feedback panel and active arrows
    var positive="<h4>Correct. Select the Next arrow &gt; to continue.</h4><p>The broker is being reasonable in asking for better terms in a softening market. His prime concern should be to act in the best interests of the policyholder. It is important to build and maintain your long-term                         relationship with the broker, who is your direct client, but not at the expense of the ultimate insured and not by offering or receiving personal inducements. These are examples of conduct risk.</p>"
    var negative="<h4>Incorrect. Select the Next arrow &gt; to continue.</h4><p>The broker is being reasonable in asking for better terms in a softening market. His prime concern should be to act in the best interests of the policyholder. It is important to build and maintain your long-term                       relationship with the broker, who is your direct client, but not at the expense of the ultimate insured and not by offering or receiving personal inducements. These are examples of conduct risk</p>"
    var correctAnswer; //from JSON
    $('.testsubmit').on('click', function(){
        var open = $(".testpanel").animate({
                height: '170px',
                opacity: '1'
        },500,function(){$(".testpanel").css('height','auto')})
        var answerNo = $('.ticked').parent().attr("id");
        if(answerNo == correctAnswer){
            $('.testpanel').append(positive);
            open;
        }else{
            $('.testpanel').append(negative);
            open;
        }
        $('.content').css('pointer-events', 'none');
        $('.testsubmit').removeClass('active');
        $('footer').children().addClass('activefooter');
    })

    // Loading content from JSON
    var pageNo = 0;
    function loader(){
        $.ajax({
            url: 'js/text.json',
            dataType: 'json',
            type: 'get',
            success: function (data){
                $(data.pages[pageNo]).each(function(key, value){
                    correctAnswer = value.correctanswer
                    $("#question").html(value.question)
                    $("#1 p").html(value.answer1)
                    $("#2 p").html(value.answer2)
                    $("#3 p").html(value.answer3)
                    $("#4 p").html(value.answer4)
                })
            }
        });
    }
    loader()
    $(".next").on('click', function(){
        $(".testpanel").animate({height: '0px', opacity: '0'}).html("");
        $('footer').children().removeClass('activefooter');
        $('.content').css('pointer-events', 'inherit');
        $('.testsubmit').removeClass('active');
        $('.answer').children('.tickbox').removeClass('ticked');
        pageNo ++
        loader()    
    });

    // For Css, HTML, Exstra
    //----------------------
    // Reload page
    $(window).resize(function(){location.reload();});

    // Setting width for elements
    // 'questionbox'
    var mq = window.matchMedia( "(min-width: 767px)" );
    var elWidth = $('.testheader').width();
    if(mq.matches){
        $('.questionbox').css('width', function(){
        return elWidth - 128 +"px";
        })
    }

    // 'testpanel'
    var panelWidth = $('.testbox').width();
    $('.testpanel').css('width', function(){
    return panelWidth - 92 +"px";
    })
})