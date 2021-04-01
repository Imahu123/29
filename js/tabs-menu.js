jQuery(document).ready(function($) {
	"use strict";

  jQuery(document).on('click', '.woofood-tabs-menu a', function(e){
  var tab  = jQuery(this),
      tabPanel = jQuery(this).parent().parent().parent(),
      selected_tab = jQuery(this).attr("target"),

      tabPane = jQuery(this+' '+selected_tab);
         console.log(selected_tab);
                  console.log(tab);

      tabPanel.find('.active').removeClass('active');
    jQuery('.woofood-tabs-menu').find('.active').removeClass('show active');

  tab.addClass('active');
   
  tabPane.addClass('show active');
  return false;
});








});

  jQuery(document).on('click', '.woofood-tabs-menu a', function(e){
  var tab  = jQuery(this),
      tabPanel = jQuery(this).parent().parent().parent(),
      selected_tab = jQuery(this).attr("target"),

      tabPane = jQuery(this+' '+selected_tab);
         console.log(selected_tab);
                  console.log(tab);

      tabPanel.find('.active').removeClass('active');
    jQuery('.woofood-tabs-menu').find('.active').removeClass('show active');

  tab.addClass('active');
   
  tabPane.addClass('show active');
  return false;
});



/*jQuery(document).on('click', '.woofood-side-menu a', function(e){
  var tab  = jQuery(this),
      tabPanel = jQuery(this).closest('.woofood-side-menu'),
      selected_tab = jQuery(this).attr("href"),
      tabPane = jQuery(selected_tab);

      jQuery([document.documentElement, document.body]).animate({
        scrollTop: jQuery(selected_tab).offset().top 
    }, 1000);




     /* tabPanel.find('.active').removeClass('active');
    jQuery('.woofood-side-menu').parent().find('.active').removeClass('show active');

  tab.addClass('active');

 // tabPane.addClass('show active');
  return false;
});*/
