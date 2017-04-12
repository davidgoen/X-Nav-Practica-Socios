$(document).ready(function() {
    $( "#mens").tabs();
    $.getJSON("myline.json").done(function(messages){
        imprimeMensj(messages,0);
    });
    $.getJSON("timeline.json").done(function(messages){
        imprimeMensj(messages,1);
    });
    $.getJSON("update.json").done(function(messages){
        imprimeMensj(messages,2);
    });

    function imprimeMensj(messages,x){

        var html = "";
        var html2 = "";

        if (x==3){
          $("#update").html("");   //esto quita el boton de actualizar
          html2 = $("#accordion-timeline").val();
          $("#accordion-timeline").accordion("destroy");
        }

        messages.forEach(function(message,i){
            html += "<h3>" +
                    "<img src='" + message.avatar + "'>" +
                    "<span class='autor'>" + message.autor + "</span>" +
                    "<span class='titulo'>" + message.titulo + "</span>" +
                    "</h3>";
            html += "<div>"+"<p><span class='contenido'>" + message.contenido + "</span></p>" + message.fecha +
                    
                    "</div>";
        });

        html = html2 + html;

        if (x==0){ //myline.json

          $("#accordion-myline").append(html);
          $("#accordion-myline").accordion({ active: true },{ collapsible: true }, { heightStyle: "content" });

        }else if (x==1 || x==3){  //timeline.json

          $("#accordion-timeline").append(html);
          $("#accordion-timeline").accordion({ active: true },{ collapsible: true }, { heightStyle: "content" });

        }else if (x==2){  //alertar que hay update.json
          if (messages!=""){

            $("#update").append("<button id='button'>Actualizar</button>");
            $( "#button" ).button();
            $( "#button" ).click(function(){
              $.getJSON("update.json").done(function(messages){
                  imprimeMensj(messages,3);
              });
            });
          }
        }
    };
});
