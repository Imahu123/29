(function($) { 
  "use strict";
$(document).ready(function($){
						MicroModal.init({  scrollBehaviour: 'enable'});

							//MicroModal.init();

/*****    Ajax call on button click      *****/	
function woofood_quickview_ajax(product_id,anim_type,direction,anim_class){
		$(".wf_quickview_loading").css("display","block");


		var ajax_data ={};
		ajax_data['action'] = 'woofood_quickview_ajax';
		ajax_data['product_id'] = product_id;
		//ajax_data['security'] = wfquickajax.ajax_nonce;




		$.ajax({

		url: wfquickajax.ajaxurl,
		type: 'POST',
		data: ajax_data,
		success: function(response){
			if(response)
			{
							MicroModal.show('product_view');

							//document.getElementById('product_view').getElementsByClassName("content")[0].innerHTML = response.html;

							jQuery('#product_view .content').html(response);
							if(jQuery('.wf_product_view .composite_form').length)
							{
								jQuery( '.wf_product_view .composite_form .composite_data' ).each( function() {
									jQuery( this ).wc_composite_form();
									
									
								} );
								
							}
							jQuery( "#product_view .content .single_add_to_cart_button" ).appendTo( "#product_view .content .modal__footer" );



			}


						//

						//$('#product_view').fadeIn(250);
						//MicroModal.init({  disableScroll: true});

				$(".wf_quickview_loading").css("display","none");

					return false;
		
			 
		},
	})
}


function woofood_quickview_category_ajax(category_slug,anim_type,direction,anim_class){
		$(".wf_quickview_category_loading").css("display","block");

		var ajax_data ={};
		ajax_data['action'] = 'woofood_quickview_category_ajax';
		ajax_data['category_slug'] = category_slug;

		                  console.log(ajax_data);

		jQuery.ajax({
		url: wfquickajax.ajaxurl,
		type: 'POST',
		data: ajax_data,
		success: function(response){
	
			$('#category_view .content').html(response);
						//MicroModal.init({  disableScroll: true});

					MicroModal.show('category_view');
						//$('#category_view').fadeIn(250);

				$(".wf_quickview_category_loading").css("display","none");

			
			 
		},
	})
}
            


// Main Quickview Button
$('body').on('click','.woofood-quickview-button',function(e){
		       e.preventDefault();


		var p_id	  = $(this).attr('qv-id');

		woofood_quickview_ajax(p_id);
		return false;

});



// Category Quickview Button
$('body').on('click','.woofood-quickview-category-button',function(e){
		       e.preventDefault();


		var p_slug	  = $(this).attr('qv-id');

		woofood_quickview_category_ajax(p_slug);

});



$('body').on('click','#wf_quickview_close',function(e){
		       e.preventDefault();


		$('#product_view').css("display", "none");
   						 $("#product_view").fadeOut(250);



});


$('body').on('click','#wf_quickview_category_close',function(e){
		       e.preventDefault();



   						 $("#category_view").fadeOut(250);



});

jQuery(document).keypress(function(e) { 
    if (e.keyCode === 27) { 
        jQuery("#product_view").fadeOut(250);
     
      
    } 
});


});

    })(jQuery);
