$(document).ready(function()
{"use strict";var header=$('.header');var hamburgerBar=$('.hamburger_bar');var hamburger=$('.hamburger');setHeader();$(window).on('resize',function()
{setHeader();setTimeout(function()
{$(window).trigger('resize.px.parallax');},375);});$(document).on('scroll',function()
{setHeader();});initVideo();initDatePicker();initTimePicker();initMenu();function setHeader()
{if($(window).scrollTop()>91)
{header.addClass('scrolled');hamburgerBar.addClass('scrolled');}
else
{header.removeClass('scrolled');hamburgerBar.removeClass('scrolled');}}
function initMenu()
{if($('.menu').length)
{var menu=$('.menu');hamburger.on('click',function()
{hamburger.toggleClass('active');menu.toggleClass('active');});}}
function initVideo()
{$(".vimeo").colorbox({iframe:true,innerWidth:640,innerHeight:409,maxWidth:'90%'});}
function initDatePicker()
{var dp=$('#datepicker');var date=new Date();var dateM=date.getMonth()+1;var dateD=date.getDate();var dateY=date.getFullYear();var dateFinal=dateM+'/'+dateD+'/'+dateY;dp.val(dateFinal);dp.datepicker();}
function initTimePicker()
{$('.timepicker').timepicker({interval:60,minTime:'10',maxTime:'6:00pm',defaultTime:'11',startTime:'10:00',dynamic:true,dropdown:true,scrollbar:true});}});