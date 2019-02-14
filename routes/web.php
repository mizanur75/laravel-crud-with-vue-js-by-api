<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


// Social Login
Route::get('login/facebook', 'Auth\LoginController@redirectToProvider');
Route::get('login/facebook/callback', 'Auth\LoginController@handleProviderCallback');

//Customers
Route::get('customers','CustomerController')->name('customers');

//Invoice
Route::get('invoice','InvoiceController')->name('invoice');
