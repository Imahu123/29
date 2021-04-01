// source --> https://kebaptorodi.gr/wp-content/plugins/woofood-plugin/js/autocomplete.js?ver=2.6.2 

var RpCheckoutAutocomplete = RpCheckoutAutocomplete || {};
var RpCheckoutAutocomplete_shipping = RpCheckoutAutocomplete_shipping || {};
RpCheckoutAutocomplete.event = {};
RpCheckoutAutocomplete_shipping.event = {};
RpCheckoutAutocomplete.method = {
    placeSearch: "",
    IdSeparator: "",
    autocomplete : "",
    streetNumber : "",
    japanAddress:"",
    formFields : {
        'billing_address_1': '',
        'billing_address_2': '',
        'billing_city': '',
        'billing_state': '',
        'billing_postcode': '',
        'billing_country' : ''
    },
    formFieldsValue : {
        'billing_address_1': '',
        'billing_address_2': '',
        'billing_city': '',
        'billing_state': '',
        'billing_postcode': '',
        'billing_country' : ''
    },
    component_form : "",

    initialize: function(){
        this.getIdSeparator();
        this.initFormFields();

        this.autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('billing_address_1')),
            {
                types: ['geocode']
            });
        google.maps.event.addListener(this.autocomplete, 'place_changed', function( event ) {
            RpCheckoutAutocomplete.method.fillInAddress()
        });
        var billing_address = document.getElementById("billing_address_1");
        if(billing_address != null){
            var billing_address_1_element = jQuery('#billing_address_1');

            billing_address.addEventListener("focus", function( event ) {
                RpCheckoutAutocomplete.method.setAutocompleteCountry();
                var pacContainer = jQuery('.pac-container');
  jQuery(billing_address_1_element.parent()).append(pacContainer);
            }, true);





        } 

        var billing_country = document.getElementById("billing_country");
        if(billing_country != null){
            billing_country.addEventListener("change", function( event ) {
                RpCheckoutAutocomplete.method.setAutocompleteCountry()
            }, true);
        }
       

    },
    getIdSeparator : function() {
        if (!document.getElementById('billing_address_1')) {
            this.IdSeparator = "_";
            return "_";
        }
        this.IdSeparator = ":";
        return ":";
    },
    initFormFields: function ()
    {
        for (var field in this.formFields) {
            this.formFields[field] = (field);
        }
        this.component_form =
        {
            'street_number': ['billing_address_1', 'short_name'],
            'route': ['billing_address_1', 'long_name'],
/*            'sublocality': ['billing_city', 'short_name'],
*/
            'locality': ['billing_city', 'long_name'],
            'administrative_area_level_1': ['billing_state', 'short_name'],
            'country': ['billing_country', 'long_name'],
            'postal_code': ['billing_postcode', 'short_name']
        };


        this.component_form_japan =
        {
            //'street_number': ['billing_address_1', 'short_name'],
            'sublocality_level_2': ['billing_address_1', 'short_name'],
            'sublocality_level_3': ['billing_address_1', 'short_name'],
            'sublocality_level_4': ['billing_address_1', 'short_name'],
            'premise': ['billing_address_1', 'short_name'],

           // 'route': ['billing_address_1', 'long_name'],

            'locality': ['billing_city', 'long_name'],
            'administrative_area_level_1': ['billing_state', 'short_name'],
            'country': ['billing_country', 'long_name'],
            'postal_code': ['billing_postcode', 'short_name']
        };
    },
    
    fillInAddress : function () {
        this.clearFormValues();
        var place = this.autocomplete.getPlace();
        console.log(place);
        this.resetForm();
        var type = '';
        for (var field in place.address_components) {
            for (var t in  place.address_components[field].types)
            {
                

                if(document.getElementById("billing_country").value=="JP")
                {


                       for (var f in this.component_form_japan) {
                    var types = place.address_components[field].types;
                    
                    
                    
                    if(f == types[t])
                    {
                        
                        
                        
                        
                        if(f == "premise")
                        {
                            this.japanAddress = place.address_components[3]['short_name']+' '+place.address_components[2]['short_name']+'-'+place.address_components[1]['short_name']+'-'+place.address_components[0]['short_name'];
                        }else{

                            
                            if(["KR", "ES", "GR", "AT", "SE"].indexOf(document.getElementById("billing_country").value) > -1){
                                this.streetNumber=place.address_components[0]['short_name'];
                                this.streetNumber+=","+place.address_components[1]['long_name'];
                            }
                        }

                           

                        var prop = this.component_form_japan[f][1];
                        if(place.address_components[field].hasOwnProperty(prop)){
                            this.formFieldsValue[this.component_form_japan[f][0]] = place.address_components[field][prop];
                        }

                    }
                }

                }

                else
                {
                              for (var f in this.component_form) {
                    var types = place.address_components[field].types;
                    
                    
                    
                    if(f == types[t])
                    {
                        
                        
                        
                        
                        if(f == "street_number")
                        {
                            this.streetNumber = place.address_components[field]['short_name'];
                        }else{

                            
                            if(["KR", "ES", "GR", "AT", "SE"].indexOf(document.getElementById("billing_country").value) > -1){
                                
                                if(this.streetNumber.length > 0)
                                {

                                    this.streetNumber=place.address_components[0]['short_name'];

                                }
                               // this.streetNumber+=","+place.address_components[1]['long_name'];
                            }
                        }

                           

                        var prop = this.component_form[f][1];
                        if(place.address_components[field].hasOwnProperty(prop)){
                            this.formFieldsValue[this.component_form[f][0]] = place.address_components[field][prop];
                        }

                    }
                }

                }

      




            }
        }

        this.appendStreetNumber();
        this.fillForm();
        $=jQuery.noConflict();
        $("#billing_state").trigger("change");
        if(typeof  FireCheckout !== 'undefined')
        {
            checkout.update(checkout.urls.billing_address);
        }
    },

    clearFormValues: function ()
    {
        for (var f in this.formFieldsValue) {
            this.formFieldsValue[f] = '';
        }
    },
    appendStreetNumber : function ()
    {
        if(this.streetNumber != '')
        {

            if(["KR", "ES", "GR", "AT", "SE"].indexOf(document.getElementById("billing_country").value) > -1)
            {
                
                     this.formFieldsValue['billing_address_1'] = this.formFieldsValue['billing_address_1'] + ' ' + this.streetNumber ;
                }
             else{
             
                      this.formFieldsValue['billing_address_1'] =  this.streetNumber + ' '
            + this.formFieldsValue['billing_address_1'];
                    
            
               
                
            }
           
        }

        if(this.japanAddress!="")
        {
             if(document.getElementById("billing_country").value=="JP" )
                {
                this.formFieldsValue['billing_address_1'] = this.japanAddress ;

                }

        }
    },
    fillForm : function()
    {
        for (var f in this.formFieldsValue) {
            if(f == 'billing_country' )
            {
                this.selectRegion( f,this.formFieldsValue[f]);
            }
            else
            {
                if(document.getElementById((f)) === null){
                    continue;
                }
                else
                {
                    document.getElementById((f)).value = this.formFieldsValue[f];
                }
              
            }
        } 
    },
    selectRegion:function (id,regionText)
    {
        if(document.getElementById((id)) == null){
            return false;
        } 
        var el = document.getElementById((id));
        if(el.options)
        {
            for(var i=0; i<el.options.length; i++) {
            if ( el.options[i].text == regionText ) {
                el.selectedIndex = i;
                break;
            }
        }

        }
        
    },
    resetForm :function ()
    {
        if(document.getElementById(('billing_address_2')) !== null){
            document.getElementById(('billing_address_2')).value = '';
        }   
    },


    setAutocompleteCountry : function () {
        
        if(document.getElementById('billing_country') === null){
            country = 'US';
        }
        else
        {
            var country = document.getElementById('billing_country').value;
        }
        this.autocomplete.setComponentRestrictions({
            'country': country
        });
    }


}


RpCheckoutAutocomplete_shipping.method = {
    placeSearch: "",
    IdSeparator: "",
    autocomplete : "",
    streetNumber : "",
    formFields : {
        'shipping_address_1': '',
        'shipping_address_2': '',
        'shipping_city': '',
        'shipping_state': '',
        'shipping_postcode': '',
        'shipping_country' : ''
    },
    formFieldsValue : {
        'shipping_address_1': '',
        'shipping_address_2': '',
        'shipping_city': '',
        'shipping_state': '',
        'shipping_postcode': '',
        'shipping_country' : ''
    },
    component_form : "",

    initialize: function(){
        if (this.autocomplete) return;
        this.getIdSeparator();
        this.initFormFields();

        this.autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('shipping_address_1')),
            {
                types: ['geocode']
            });
                this.autocomplete.setFields(["address_components"]);


        google.maps.event.addListener(this.autocomplete, 'place_changed', function( event ) {
            RpCheckoutAutocomplete_shipping.method.fillInAddress()
        });
        var shipping_address = document.getElementById("shipping_address_1");
        if(shipping_address != null){
            shipping_address.addEventListener("focus", function( event ) {
                RpCheckoutAutocomplete_shipping.method.setAutocompleteCountry()
            }, true);
        } 

        var shipping_country = document.getElementById("shipping_country");
        if(shipping_country != null){
            shipping_country.addEventListener("change", function( event ) {
                RpCheckoutAutocomplete_shipping.method.setAutocompleteCountry()
            }, true);
        }
       

    },
    getIdSeparator : function() {
        if (!document.getElementById('shipping_address_1')) {
            this.IdSeparator = "_";
            return "_";
        }
        this.IdSeparator = ":";
        return ":";
    },
    initFormFields: function ()
    {
        for (var field in this.formFields) {
            this.formFields[field] = (field);
        }
        this.component_form =
        {
            'street_number': ['shipping_address_1', 'short_name'],
            'route': ['shipping_address_1', 'long_name'],
/*                        'sublocality': ['shipping_city', 'short_name'],
*/
            'locality': ['shipping_city', 'long_name'],
            'administrative_area_level_1': ['shipping_state', 'short_name'],
            'country': ['shipping_country', 'long_name'],
            'postal_code': ['shipping_postcode', 'short_name']
        };
    },
    
    fillInAddress : function () {
        this.clearFormValues();
        var place = this.autocomplete.getPlace();
        this.resetForm();
        var type = '';
        for (var field in place.address_components) {
            for (var t in  place.address_components[field].types)
            {
                for (var f in this.component_form) {
                    var types = place.address_components[field].types;
                    if(f == types[t])
                    {
                        if(f == "street_number")
                        {
                            this.streetNumber = place.address_components[field]['short_name'];
                        }else{
                            
                            if(["KR", "ES", "GR", "AT", "SE"].indexOf(document.getElementById("shipping_country").value) > -1){
                                if(this.streetNumber.length > 0)
                                {

                                    this.streetNumber=place.address_components[0]['short_name'];

                                }
                                //this.streetNumber=place.address_components[0]['short_name'];
                              //  this.streetNumber+=","+place.address_components[1]['long_name'];
                            }
                        }

                        var prop = this.component_form[f][1];
                        if(place.address_components[field].hasOwnProperty(prop)){
                            this.formFieldsValue[this.component_form[f][0]] = place.address_components[field][prop];
                        }

                    }
                }
            }
        }

        this.appendStreetNumber();
        this.fillForm();
        
        
        $=jQuery.noConflict();
        $("#shipping_state").trigger("change");
        if(typeof  FireCheckout !== 'undefined')
        {
            checkout.update(checkout.urls.shipping_address);
        }
    },

    clearFormValues: function ()
    {
        for (var f in this.formFieldsValue) {
            this.formFieldsValue[f] = '';
        }
    },
    appendStreetNumber : function ()
    {
        if(this.streetNumber != '')
        {
                            if(["KR", "ES", "GR", "AT", "SE"].indexOf(document.getElementById("shipping_country").value) > -1){
                
                   
                             this.formFieldsValue['shipping_address_1'] =  this.formFieldsValue['shipping_address_1'] + ' ' + this.streetNumber;

                    
                }
            else{
                  this.formFieldsValue['shipping_address_1'] =  this.streetNumber + ' '
            + this.formFieldsValue['shipping_address_1'];
            }
           
        }
    },
    fillForm : function()
    {
        for (var f in this.formFieldsValue) {
            if(f == 'shipping_country' )
            {
                this.selectRegion( f,this.formFieldsValue[f]);
            }
            else
            {
                if(document.getElementById((f)) === null){
                    continue;
                }
                else
                {
                    document.getElementById((f)).value = this.formFieldsValue[f];
                }
              
            }
        } 
    },
    selectRegion:function (id,regionText)
    {
        if(document.getElementById((id)) == null){
            return false;
        } 
        var el = document.getElementById((id));
        for(var i=0; i<el.options.length; i++) {
            if ( el.options[i].text == regionText ) {
                el.selectedIndex = i;
                break;
            }
        }
    },
    resetForm :function ()
    {
        if(document.getElementById(('shipping_address_2')) !== null){
            document.getElementById(('shipping_address_2')).value = '';
        }   
    },


    setAutocompleteCountry : function () {
        
        if(document.getElementById('shipping_country') === null){
            country = 'US';
        }
        else
        {
            var country = document.getElementById('shipping_country').value;
        }
        this.autocomplete.setComponentRestrictions({
            'country': country
        });
    }


}


window.addEventListener('load', function(){
   

    if(!(document.getElementById('billing_address_1') === null))
        RpCheckoutAutocomplete.method.initialize();

    if(!(document.getElementById('shipping_address_1') === null))
        RpCheckoutAutocomplete_shipping.method.initialize();
});


if(!(document.getElementById('billing_address_1') === null)){
    var billaddr = document.getElementById('billing_address_1');
    google.maps.event.addDomListener(billaddr, 'keydown', function(e) { 
        if (e.keyCode == 13) { 
            e.preventDefault(); 
        }
    }); 
}

if(!(document.getElementById('shipping_address_1') === null)){
    var shipaddr = document.getElementById('shipping_address_1');
    google.maps.event.addDomListener(shipaddr, 'keydown', function(e) { 
        if (e.keyCode == 13) { 
            e.preventDefault(); 
        }
    }); 
};
// source --> https://kebaptorodi.gr/wp-content/plugins/js_composer/assets/js/vendors/woocommerce-add-to-cart.js?ver=6.6.0 
(function ( $ ) {
	'use strict';

	$( document ).ready( function () {
		$( 'body' ).on( 'adding_to_cart', function ( event, $button, data ) {
			if ( $button && $button.hasClass( 'vc_gitem-link' ) ) {
				$button
					.addClass( 'vc-gitem-add-to-cart-loading-btn' )
					.parents( '.vc_grid-item-mini' )
					.addClass( 'vc-woocommerce-add-to-cart-loading' )
					.append( $( '<div class="vc_wc-load-add-to-loader-wrapper"><div class="vc_wc-load-add-to-loader"></div></div>' ) );
			}
		} ).on( 'added_to_cart', function ( event, fragments, cart_hash, $button ) {
			if ( 'undefined' === typeof ($button) ) {
				$button = $( '.vc-gitem-add-to-cart-loading-btn' );
			}
			if ( $button && $button.hasClass( 'vc_gitem-link' ) ) {
				$button
					.removeClass( 'vc-gitem-add-to-cart-loading-btn' )
					.parents( '.vc_grid-item-mini' )
					.removeClass( 'vc-woocommerce-add-to-cart-loading' )
					.find( '.vc_wc-load-add-to-loader-wrapper' ).remove();
			}
		} );
	} );
})( window.jQuery );
// source --> https://kebaptorodi.gr/wp-content/themes/woodmart/js/device.min.js?ver=5.3.6 
!function(a){var b="-",c="";screen.width&&(width=screen.width?screen.width:"",height=screen.height?screen.height:"",c+=width+" x "+height);var d,e,f,g=navigator.appVersion,h=navigator.userAgent,i=navigator.appName,j=""+parseFloat(navigator.appVersion),k=parseInt(navigator.appVersion,10);-1!=(e=h.indexOf("Opera"))&&(i="Opera",j=h.substring(e+6),-1!=(e=h.indexOf("Version"))&&(j=h.substring(e+8))),-1!=(e=h.indexOf("OPR"))?(i="Opera",j=h.substring(e+4)):-1!=(e=h.indexOf("Edge"))?(i="Edge",j=h.substring(e+5)):-1!=(e=h.indexOf("Edg"))?(i="Microsoft Edge",j=h.substring(e+4)):-1!=(e=h.indexOf("MSIE"))?(i="Internet",j=h.substring(e+5)):-1!=(e=h.indexOf("Chrome"))?(i="Chrome",j=h.substring(e+7)):-1!=(e=h.indexOf("Safari"))?(i="Safari",j=h.substring(e+7),-1!=(e=h.indexOf("Version"))&&(j=h.substring(e+8))):-1!=(e=h.indexOf("Firefox"))?(i="Firefox",j=h.substring(e+8)):-1!=h.indexOf("Trident/")?(i="Internet",j=h.substring(h.indexOf("rv:")+3)):(d=h.lastIndexOf(" ")+1)<(e=h.lastIndexOf("/"))&&(i=h.substring(d,e),j=h.substring(e+1),i.toLowerCase()==i.toUpperCase()&&(i=navigator.appName)),-1!=(f=j.indexOf(";"))&&(j=j.substring(0,f)),-1!=(f=j.indexOf(" "))&&(j=j.substring(0,f)),-1!=(f=j.indexOf(")"))&&(j=j.substring(0,f)),k=parseInt(""+j,10),isNaN(k)&&(j=""+parseFloat(navigator.appVersion),k=parseInt(navigator.appVersion,10));var l=/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(g),m=b,n=[{s:"Windows 10",r:/(Windows 10.0|Windows NT 10.0)/},{s:"Windows 8.1",r:/(Windows 8.1|Windows NT 6.3)/},{s:"Windows 8",r:/(Windows 8|Windows NT 6.2)/},{s:"Windows 7",r:/(Windows 7|Windows NT 6.1)/},{s:"Windows Vista",r:/Windows NT 6.0/},{s:"Windows Server 2003",r:/Windows NT 5.2/},{s:"Windows XP",r:/(Windows NT 5.1|Windows XP)/},{s:"Windows 2000",r:/(Windows NT 5.0|Windows 2000)/},{s:"Windows ME",r:/(Win 9x 4.90|Windows ME)/},{s:"Windows 98",r:/(Windows 98|Win98)/},{s:"Windows 95",r:/(Windows 95|Win95|Windows_95)/},{s:"Windows NT 4.0",r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},{s:"Windows CE",r:/Windows CE/},{s:"Windows 3.11",r:/Win16/},{s:"Android",r:/Android/},{s:"Open BSD",r:/OpenBSD/},{s:"Sun OS",r:/SunOS/},{s:"Chrome OS",r:/CrOS/},{s:"Linux",r:/(Linux|X11(?!.*CrOS))/},{s:"iOS",r:/(iPhone|iPad|iPod)/},{s:"Mac OS X",r:/Mac OS X/},{s:"Mac OS",r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},{s:"QNX",r:/QNX/},{s:"UNIX",r:/UNIX/},{s:"BeOS",r:/BeOS/},{s:"OS/2",r:/OS\/2/},{s:"Search Bot",r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}];for(var o in n){var p=n[o];if(p.r.test(h)){m=p.s;break}}var q=b;switch(/Windows/.test(m)&&(q=/Windows (.*)/.exec(m)[1],m="Windows"),m){case"Mac OS":case"Mac OS X":case"Android":q=/(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(h)[1];break;case"iOS":q=/OS (\d+)_(\d+)_?(\d+)?/.exec(g),q=q[1]+"."+q[2]+"."+(0|q[3])}var r="no check";if("undefined"!=typeof swfobject){var s=swfobject.getFlashPlayerVersion();r=s.major>0?s.major+"."+s.minor+" r"+s.release:b}a.jscd={screen:c,browser:i,browserVersion:j,browserMajorVersion:k,mobile:l,os:m,osVersion:q,flashVersion:r}}(this),function(a){var b=a("html");b.addClass("browser-"+jscd.browser),b.addClass("platform-"+jscd.os)}(jQuery);