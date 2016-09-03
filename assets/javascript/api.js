
window.onload = function() 
{

	var api = "http://api.giphy.com/v1/stickers/search?";
	var key = "&api_key=dc6zaTOxFJmzC";
	var querryItems = ["space invaders","frogger","super mario brothers",
	"defender","pac man","donkey kong","galaga","1942","dig dug","Q-bert",
	"zelda","Tron","metroid","pong","gauntlet","zaxxon","centipede","tetris",
	"pole position","moon patrol","duck hunt"];
	

	 
    populateButtons();
	 function getAPI()
	 {
	 	$('#giphyView').empty();
        var giphy = $(this).attr('data-name')
        console.log(giphy + 'giphy');
     //   var apiURL = api + key + "&q" + giphy;
         var apiURL = api + key + "&q=" + giphy;

		 $.ajax({url: apiURL, method: 'GET'})
		 .done(function(response)
		 {
		 	

		 	for(var i = 0; i<11; i++)
		    {	
			    var sDiv = $('<div>');
			 	sDiv.addClass('imgGiphy');	
		        var results = response.data[i];
		      //  console.log(results);
		      //  console.log(results.rating);
		       // console.log(results.bitly_gif_url);
		       
		         var searchImg = $('<img>');
		         searchImg.attr('src',results.images.fixed_height_still.url);
		         searchImg.attr('data-still',results.images.fixed_height_still.url);
		         searchImg.attr('data-animate', results.images.fixed_height.url);
		         searchImg.attr('data-state','still');
		         searchImg.attr('id','giphyImg');
		         searchImg.addClass('giphyImg');

		         sDiv.append(searchImg);
		         $('#giphyView').append(sDiv);
             }
		 });

     }
    
    

	function populateButtons()
	{
		$('#buttonsView').empty();
		for(var i = 0; i < querryItems.length; i ++)
		{	
		   var b = $('<button>');
		   b.addClass('searchButton');
		   b.attr( 'id','sButton');
		   b.attr('data-name', querryItems[i]);
		   b.text(querryItems[i]);
	       $('#buttonsView').append(b);  
		}
	}
    
	


	
     $( "#addGiphy" ).click(function() 
     {
      
         	console.log('work???');
         	var g = $('#giphyInput').val().trim();
            querryItems.push(g);
         	console.log(g);
         	populateButtons();
         	console.log(querryItems + "querryItemse");

      });

      $(document).on('click', '.searchButton', getAPI);

	 $('#giphyView').on('click','img', function()
	  {
	  	var state = $(this).attr('data-state');
	  	console.log(state + "  state");
	    console.log(this);
	    console.log("fucking work");
        
        if(state == 'still')
        {
           $(this).attr('src', $(this).data('animate'));
           $(this).attr('data-state', 'animate');
        }
        else
        {
        	 $(this).attr('src', $(this).data('still'));
             $(this).attr('data-state', 'still');
        }

	  });




}