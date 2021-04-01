jQuery(document).ready(function($)
{
var checkout_form = jQuery( 'form.checkout' );


checkout_form.on( 'checkout_place_order', function() {
			
if( (jQuery("input[name='payment_method']:checked").val()!== "authorize_net_cim_credit_card") &&  (jQuery("input[name='payment_method']:checked").val()!== "square_credit_card" ))
{
   //jQuery(".woofood-loading").css('display', 'block');

jQuery(".woofood-loading").addClass("show");
       jQuery(".woofood-loading .loading-content").addClass("show");


if(event.result === false || event.result === null)
	{
           jQuery(".woofood-loading .loading-content").removeClass("show");
			jQuery(".woofood-loading").removeClass("show");

	}

}
if(jQuery("input[name='payment_method']:checked").val()== "square_credit_card")
	{
		
		
		if(event.result !== false)
	{
		  jQuery(".woofood-loading").addClass("show");
       jQuery(".woofood-loading .loading-content").addClass("show");

	}
	else
	{
		  jQuery(".woofood-loading .loading-content").removeClass("show");

	                            jQuery(".woofood-loading").removeClass("show");
	}
		
		
	}
// return true to continue the submission or false to prevent it return true; 
});


checkout_form.on( 'checkout_place_order_success', function() {
			






       



// return true to continue the submission or false to prevent it return true; 
});
checkout_form.on( 'checkout_place_order_'+jQuery("input[name='payment_method']:checked").val()+'', function(event) {
	

if( (jQuery("input[name='payment_method']:checked").val()!== "authorize_net_cim_credit_card") || (jQuery("input[name='payment_method']:checked").val()!== "square_credit_card" ))
{
	if(event.result !== false)
	{
		  jQuery(".woofood-loading").addClass("show");
       jQuery(".woofood-loading .loading-content").addClass("show");

	}
	else
	{
		  jQuery(".woofood-loading .loading-content").removeClass("show");

	                            jQuery(".woofood-loading").removeClass("show");
	}

}
	if(jQuery("input[name='payment_method']:checked").val()== "square_credit_card")
	{
		
		if(event.result !== false)
	{
		  jQuery(".woofood-loading").addClass("show");
       jQuery(".woofood-loading .loading-content").addClass("show");

	}
	else
	{
		  jQuery(".woofood-loading .loading-content").removeClass("show");

	                            jQuery(".woofood-loading").removeClass("show");
	}
		
		
	}
	//alert(event);
	console.log(event);

	
   



	});



jQuery( document.body ).on( 'checkout_error', function() {
                            jQuery(".woofood-loading .loading-content").removeClass("show");

	                            jQuery(".woofood-loading").removeClass("show");




	});




});
