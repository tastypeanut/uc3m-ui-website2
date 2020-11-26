<kbd><a href="https://uc3m.es"><img src="https://upload.wikimedia.org/wikipedia/commons/8/88/Acronimo_nombre3l.jpg" alt="logo UC3M" height="60"/></a></kbd>

# uc3m-ui-website2 

*uc3m-ui-website2* is my second User Interfaces course project. It's a static website written in HTML, CSS and Javascript + jQuery that simulates an online academy. It uses cookies to store registered users' information and the browser's `localStorage` property to determine who's logged in. The page is hosted on GitHub Pages and can be accessed here: [https://tastypeanut.github.io/uc3m-ui-website2](https://tastypeanut.github.io/uc3m-ui-website2)

## ⬇️ Installation & Usage

You can clone the project by running the following command in your terminal:
```
git clone https://github.com/tastypeanut/uc3m-ui-website2.git
```

After this, you can spin up a quick temporary web server with:

```bash
cd uc3m-ui-website2 && php -S localhost:8080
```

Go to `http://localhost:8080` & you should see the website!

## 💡 Additional Info

### Form input conversion to JSON
As said previously, all user information is stored in cookies. To be able to confortably store, retrieve, and manipulate this information, the page stores it in the user's respective cookie as a Base64 encoded JSON object. HTML forms don't do this by default, so with jQuery we call a function that will do it for us:

 ```javascript
$("#register_form").submit(function(){
    form_register();
});
 ```
 
`form_register()` disables the form's default action, and uses the [jQuery.serializeJSON()](https://github.com/marioizquierdo/jquery.serializeJSON) plugin to convert the input to a JSON object that we later stringify and encode with Base64. It also check that the email is not already registered before creating the cookie and setting what cookie is in use.

```javascript
function form_register(){
    event.preventDefault();
    var obj = $('#register_form').serializeJSON();
    var value = btoa(JSON.stringify(obj));
    if(getCookie(obj['email']) == null){
        setCookie(obj['email'], value, 100);
        localStorage.setItem('cookie_in_use', obj['email']);
        window.location.href = "index.html";
    } else {
        alert("The email " + obj['email'] + " is already registered. Please choose a new one.");
    }
}
```

### List of jQuery plugins used
* [serializeJSON](https://github.com/marioizquierdo/jquery.serializeJSON)
* [datepicker](https://jqueryui.com/datepicker/)
* [TableExport](https://github.com/clarketm/TableExport)
* [FileSaver](https://github.com/clarketm/FileSaver.js)
* [sheetjs](https://github.com/SheetJS/sheetjs)
* [fullcalendar](https://github.com/fullcalendar/fullcalendar)

## 📄 License: **[GPLv3](https://github.com/tastypeanut/uc3m-ui-website2/blob/main/LICENSE.txt)**
License does not include jQuery or any jQuery plugins used. They have their own licenses.
