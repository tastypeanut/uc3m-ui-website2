//This code allow us to maintain a session across tabs, and selects the session cookie to use until we log out.
//It uses the browser's localstorage to store the cookie ID it's using to authenticate the user.
//If the variable is not set, it means a session isn't being used, so we have to log in.
//I still have to add a check that gets the cookie from the ID and gets all the user's data.
var cookie_in_use = localStorage.getItem('cookie_in_use');
if (cookie_in_use == null || getCookie(cookie_in_use) == null) {
    window.location.href = "auth.html";
}

$(document).ready(function(){

    var cookie_decoded_parsed = JSON.parse(atob(getCookie(cookie_in_use)));

    $("#user_info").html("<img id=\"profile_photo\" src=\"" + "images/ProfilePhotos/" + cookie_in_use + ".jpeg\" alt=\"Profile Photo\" onerror=\"$(&quot;#profile_photo&quot;).attr(&quot;src&quot;, &quot;images/ProfilePhotos/default.jpeg&quot;);\">" + "<p class=\"col-12 col-s-12 col-p-12\">" + cookie_decoded_parsed['username'] + "</p>");

    if(cookie_decoded_parsed['role'] == "Administrator" || cookie_decoded_parsed['role'] == "Teacher"){
      $("#menu2 h3").after(atob("PGlucHV0IGNsYXNzPSJjb2wtMTIgY29sLXMtMTIgU1RVREVOVFNfQUNUSU9OIiB0eXBlPSJidXR0b24iIHZhbHVlPSJTdHVkZW50cyI+"));
    } else if(cookie_decoded_parsed['role'] == "Student"){
      $("#menu2 h3").after(atob("PGlucHV0IGNsYXNzPSJjb2wtMTIgY29sLXMtMTIgTVlfQ09VUlNFU19BQ1RJT04iIHR5cGU9ImJ1dHRvbiIgdmFsdWU9Ik15IENvdXJzZXMiPg=="));
    }


    generateHome();
      
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: '2020-11-01',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
       },
       events: [
         {
            title: 'Assignment: CSRF Usecases',
            start: '2020-11-08'
         },
         {
            title: 'Group Discussion: Public Disclosure: The do\'s and don\'ts',
            start: '2020-11-20T10:30:00',
            end: '2020-11-20T12:30:00'
         }
      ]
    });
  

    

    $(".HOME_ACTION").click(function(){
      generateHome();
    });

    $(".STUDENTS_ACTION").click(function(){
      generateStudents();
    });

    $(".GRADES_ACTION").click(function(){
      generateGrades(cookie_decoded_parsed['role']);
    });

    $(".LATEST_NEWS_ACTION").click(function(){
      window.location.href = "#aside";
    });

    $(".NEXT_EVENTS_ACTION").click(function(){
      window.location.href = "#aside";
    });

    $(".LABS_ACTION").click(function(){
      outofscope();
    });

    $(".DISCOVER_ACTION").click(function(){
      outofscope();
    });

    $(".LOGOUT_ACTION").click(function(){
      if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('cookie_in_use'); 
        window.location.href = "auth.html";
      }
    });

    $( ".CALENDAR_ACTION" ).click(function() {
      var  popup_height = window.innerHeight * 0.6;
      var popup_width = window.innerWidth * 0.6;
      $( "#calendar" ).dialog({ autoOpen: false, height: popup_height, width: popup_width, modal:true, position: { my: "top", at: "top", of: "main" }});
      $( "#calendar" ).dialog( "open" );
      calendar.render();
    });
});

function generateHome(){
  $("#feed").html(atob("PGFydGljbGU+PGRpdiBjbGFzcz0iZmVlZHN0YWNrIj4gPGltZyBjbGFzcz0iaWNvbiBjb2wtMyB0YWJsZXQtZGlzYWJsZWQgcGhvbmUtZGlzYWJsZWQiIHNyYz0iaW1hZ2VzL1hTUy1JY29uLnBuZyIgYWx0PSJ4c3MtaWNvbiI+PGRpdiBjbGFzcz0iY29sLTkgY29sLXMtMTIiPjxoMj5Dcm9zcy1zaXRlIHNjcmlwdGluZyAoWFNTKTwvaDI+IDxiciBjbGFzcz0icGhvbmUtZGlzYWJsZWQiPjxwIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+Q3Jvc3Mtc2l0ZSBzY3JpcHRpbmcgKFhTUykgaXMgYSB0eXBlIG9mIHNlY3VyaXR5IHZ1bG5lcmFiaWxpdHkgdHlwaWNhbGx5IGZvdW5kIGluIHdlYiBhcHBsaWNhdGlvbnMuIFhTUyBhdHRhY2tzIGVuYWJsZSBhdHRhY2tlcnMgdG8gaW5qZWN0IGNsaWVudC1zaWRlIHNjcmlwdHMgaW50byB3ZWIgcGFnZXMgdmlld2VkIGJ5IG90aGVyIHVzZXJzLjwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJmZWVkc3RhY2siPiA8dmlkZW8gY2xhc3M9ImNvbC01IHRhYmxldC1kaXNhYmxlZCBwaG9uZS1kaXNhYmxlZCIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvWFNTMS5tcDQiIHR5cGU9InZpZGVvL21wNCI+IE9oIG5vLCB0aGUgdmlkZW8gaXMgbm90IGxvYWRpbmcuIDwvdmlkZW8+PGRpdiBjbGFzcz0iY29sLTcgY29sLXMtMTIiPiA8YnIgY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCBwaG9uZS1kaXNhYmxlZCI+PGgzPkNyYWNraW5nIFdlYnNpdGVzIHdpdGggQ3Jvc3MgU2l0ZSBTY3JpcHRpbmc8L2gzPiA8YnIgY2xhc3M9InBob25lLWRpc2FibGVkIj48cCBjbGFzcz0icGhvbmUtZGlzYWJsZWQiPkphdmFTY3JpcHQgaXMgZGFuZ2Vyb3VzISBXaHk/IEhvdyBhcmUgd2Vic2l0ZXMgdnVsbmVyYWJsZSB0byBpdD8gRmluZCBvdXQgYWJvdXQgYnVnLWJvdW50aWVzIGZyb20gVG9tIFNjb3R0LjwvcD48L2Rpdj4gPHZpZGVvIGNsYXNzPSJsYXB0b3AtZGlzYWJsZWQgY29sLXMtMTIiIGNvbnRyb2xzPiA8c291cmNlIHNyYz0iaW1hZ2VzL1hTUzEubXA0IiB0eXBlPSJ2aWRlby9tcDQiPiBPaCBubywgdGhlIHZpZGVvIGlzIG5vdCBsb2FkaW5nLiA8L3ZpZGVvPjwvZGl2PjxkaXYgY2xhc3M9ImZlZWRzdGFjayI+IDx2aWRlbyBjbGFzcz0iY29sLTUgdGFibGV0LWRpc2FibGVkIHBob25lLWRpc2FibGVkIiBjb250cm9scz4gPHNvdXJjZSBzcmM9ImltYWdlcy9YU1MyLm1wNCIgdHlwZT0idmlkZW8vbXA0Ij4gT2ggbm8sIHRoZSB2aWRlbyBpcyBub3QgbG9hZGluZy4gPC92aWRlbz48ZGl2IGNsYXNzPSJjb2wtNyBjb2wtcy0xMiI+IDxiciBjbGFzcz0ibGFwdG9wLWRpc2FibGVkIj48aDM+V2hhdCBpcyBQSFAgYW5kIHdoeSBpcyBYU1Mgc28gY29tbW9uIHRoZXJlPzwvaDM+IDxiciBjbGFzcz0icGhvbmUtZGlzYWJsZWQiPjxwIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+V2UgbGVhcm4gYWJvdXQgc2ltcGxlIHBocCB3ZWIgYXBwcyBhbmQgd2h5IGl0J3Mgc28gY29tbW9uIHRoYXQgcGhwIGFwcGxpY2F0aW9ucyBoYXZlIFhTUyBpc3N1ZXMuPC9wPjwvZGl2PiA8dmlkZW8gY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCBjb2wtcy0xMiIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvWFNTMi5tcDQiIHR5cGU9InZpZGVvL21wNCI+IE9oIG5vLCB0aGUgdmlkZW8gaXMgbm90IGxvYWRpbmcuIDwvdmlkZW8+PC9kaXY+PGRpdiBjbGFzcz0iZmVlZHN0YWNrIj4gPHZpZGVvIGNsYXNzPSJjb2wtNSB0YWJsZXQtZGlzYWJsZWQgcGhvbmUtZGlzYWJsZWQiIGNvbnRyb2xzPiA8c291cmNlIHNyYz0iaW1hZ2VzL1hTUzMubXA0IiB0eXBlPSJ2aWRlby9tcDQiPiBPaCBubywgdGhlIHZpZGVvIGlzIG5vdCBsb2FkaW5nLiA8L3ZpZGVvPjxkaXYgY2xhc3M9ImNvbC03IGNvbC1zLTEyIj4gPGJyIGNsYXNzPSJsYXB0b3AtZGlzYWJsZWQiPjxoMz5YU1Mgb24gR29vZ2xlIFNlYXJjaCAtIFNhbml0aXppbmcgSFRNTCBpbiBUaGUgQ2xpZW50PzwvaDM+IDxiciBjbGFzcz0icGhvbmUtZGlzYWJsZWQiPjxwIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+QW4gYWN0dWFsIFhTUyBvbiBnb29nbGUuY29tLiBJdCBhYnVzZXMgYSBwYXJzaW5nIGRpZmZlcmVudGlhbCBiZXR3ZWVuIGEgSmF2YVNjcmlwdCBlbmFibGVkIGFuZCBkaXNhYmxlZCBjb250ZXh0LjwvcD48L2Rpdj4gPHZpZGVvIGNsYXNzPSJsYXB0b3AtZGlzYWJsZWQgY29sLXMtMTIiIGNvbnRyb2xzPiA8c291cmNlIHNyYz0iaW1hZ2VzL1hTUzMubXA0IiB0eXBlPSJ2aWRlby9tcDQiPiBPaCBubywgdGhlIHZpZGVvIGlzIG5vdCBsb2FkaW5nLiA8L3ZpZGVvPjwvZGl2PiA8L2FydGljbGU+PGhyPiA8YXJ0aWNsZT48ZGl2IGNsYXNzPSJmZWVkc3RhY2siPiA8aW1nIGNsYXNzPSJpY29uIGNvbC0zIHRhYmxldC1kaXNhYmxlZCBwaG9uZS1kaXNhYmxlZCIgc3JjPSJpbWFnZXMvQ1NSRi1JY29uLnBuZyIgYWx0PSJDU1JGLUljb24ucG5nIj48ZGl2IGNsYXNzPSJjb2wtOSBjb2wtcy0xMiI+PGgyPkNyb3NzLXNpdGUgcmVxdWVzdCBmb3JnZXJ5IChDU1JGKTwvaDI+IDxiciBjbGFzcz0icGhvbmUtZGlzYWJsZWQiPjxwIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+SW4gYSBDU1JGIGF0dGFjaywgYW4gaW5ub2NlbnQgZW5kIHVzZXIgaXMgdHJpY2tlZCBieSBhbiBhdHRhY2tlciBpbnRvIHN1Ym1pdHRpbmcgYSB3ZWIgcmVxdWVzdCB0aGF0IHRoZXkgZGlkIG5vdCBpbnRlbmQuPC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImZlZWRzdGFjayI+IDx2aWRlbyBjbGFzcz0iY29sLTUgdGFibGV0LWRpc2FibGVkIHBob25lLWRpc2FibGVkIiBjb250cm9scz4gPHNvdXJjZSBzcmM9ImltYWdlcy9DU1JGMS5tcDQiIHR5cGU9InZpZGVvL21wNCI+IE9oIG5vLCB0aGUgdmlkZW8gaXMgbm90IGxvYWRpbmcuIDwvdmlkZW8+PGRpdiBjbGFzcz0iY29sLTcgY29sLXMtMTIiPiA8YnIgY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCBwaG9uZS1kaXNhYmxlZCI+PGgzPkNTUkYgSW50cm9kdWN0aW9uIGFuZCB3aGF0IGlzIHRoZSBTYW1lLU9yaWdpbiBQb2xpY3k/PC9oMz4gPGJyIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+PHAgY2xhc3M9InBob25lLWRpc2FibGVkIj5XaGF0IGlzIGNyb3NzIHNpdGUgcmVxdWVzdCBmb3JnZXJ5IGFuZCB3aGF0IGRvZXMgaXQgaGF2ZSB0byBkbyB3aXRoIHRoZSBzYW1lLW9yaWdpbiBwb2xpY3kuPC9wPjwvZGl2PiA8dmlkZW8gY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCBjb2wtcy0xMiIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvQ1NSRjEubXA0IiB0eXBlPSJ2aWRlby9tcDQiPiBPaCBubywgdGhlIHZpZGVvIGlzIG5vdCBsb2FkaW5nLiA8L3ZpZGVvPjwvZGl2PjxkaXYgY2xhc3M9ImZlZWRzdGFjayI+IDx2aWRlbyBjbGFzcz0iY29sLTUgdGFibGV0LWRpc2FibGVkIHBob25lLWRpc2FibGVkIiBjb250cm9scz4gPHNvdXJjZSBzcmM9ImltYWdlcy9DU1JGMi5tcDQiIHR5cGU9InZpZGVvL21wNCI+IE9oIG5vLCB0aGUgdmlkZW8gaXMgbm90IGxvYWRpbmcuIDwvdmlkZW8+PGRpdiBjbGFzcz0iY29sLTcgY29sLXMtMTIiPiA8YnIgY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCI+PGgzPkNyb3NzLVNpdGUgUmVxdWVzdCBGb3JnZXJ5IEF0dGFjazwvaDM+IDxiciBjbGFzcz0icGhvbmUtZGlzYWJsZWQiPjxwIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+QSB2aWRlbyBleHBsYWluaW5nIENTUkYgYW5kIHNvbWUgZGlmZmVyZW50IHR5cGVzIG9mIGF0dGFja3MuPC9wPjwvZGl2PiA8dmlkZW8gY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCBjb2wtcy0xMiIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvQ1NSRjIubXA0IiB0eXBlPSJ2aWRlby9tcDQiPiBPaCBubywgdGhlIHZpZGVvIGlzIG5vdCBsb2FkaW5nLiA8L3ZpZGVvPjwvZGl2PjxkaXYgY2xhc3M9ImZlZWRzdGFjayI+IDx2aWRlbyBjbGFzcz0iY29sLTUgdGFibGV0LWRpc2FibGVkIHBob25lLWRpc2FibGVkIiBjb250cm9scz4gPHNvdXJjZSBzcmM9ImltYWdlcy9DU1JGMy5tcDQiIHR5cGU9InZpZGVvL21wNCI+IE9oIG5vLCB0aGUgdmlkZW8gaXMgbm90IGxvYWRpbmcuIDwvdmlkZW8+PGRpdiBjbGFzcz0iY29sLTcgY29sLXMtMTIiPiA8YnIgY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCI+PGgzPkNyb3NzIFNpdGUgUmVxdWVzdCBGb3JnZXJ5PC9oMz4gPGJyIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+PHAgY2xhc3M9InBob25lLWRpc2FibGVkIj5JZiB5b3UgZG9uJ3Qgc2VjdXJlIHlvdXIgd2ViIGZvcm1zLCBvbmUgbWlzdGFrZW4gY2xpY2sgY291bGQgYmUgYWxsIGl0IHRha2VzIGZvciB5b3VyIHVzZXJzIHRvIGRlbGV0ZSB0aGVpciBvd24gYWNjb3VudHMuIFRvbSBTY290dCBleHBsYWlucy48L3A+PC9kaXY+IDx2aWRlbyBjbGFzcz0ibGFwdG9wLWRpc2FibGVkIGNvbC1zLTEyIiBjb250cm9scz4gPHNvdXJjZSBzcmM9ImltYWdlcy9DU1JGMy5tcDQiIHR5cGU9InZpZGVvL21wNCI+IE9oIG5vLCB0aGUgdmlkZW8gaXMgbm90IGxvYWRpbmcuIDwvdmlkZW8+PC9kaXY+IDwvYXJ0aWNsZT48aHI+IDxhcnRpY2xlPjxkaXYgY2xhc3M9ImZlZWRzdGFjayI+IDxpbWcgY2xhc3M9Imljb24gY29sLTMgdGFibGV0LWRpc2FibGVkIHBob25lLWRpc2FibGVkIiBzcmM9ImltYWdlcy9PUy1JbmplY3Rpb24tSWNvbi5qcGVnIiBhbHQ9Ik9TLUluamVjdGlvbi1JY29uIj48ZGl2IGNsYXNzPSJjb2wtOSBjb2wtcy0xMiI+PGgyPk9TIENvbW1hbmQgSW5qZWN0aW9uPC9oMj4gPGJyIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+PHAgY2xhc3M9InBob25lLWRpc2FibGVkIj5PUyBjb21tYW5kIGluamVjdGlvbiBpcyBhIHdlYiBzZWN1cml0eSB2dWxuZXJhYmlsaXR5IHRoYXQgYWxsb3dzIGFuIGF0dGFja2VyIHRvIGV4ZWN1dGUgYXJiaXRyYXJ5IG9wZXJhdGluZyBzeXN0ZW0gY29tbWFuZHMgb24gdGhlIHNlcnZlciBydW5uaW5nIGFuIGFwcGxpY2F0aW9uLjwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJmZWVkc3RhY2siPiA8dmlkZW8gY2xhc3M9ImNvbC01IHRhYmxldC1kaXNhYmxlZCBwaG9uZS1kaXNhYmxlZCIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvT1MxLm1wNCIgdHlwZT0idmlkZW8vbXA0Ij4gT2ggbm8sIHRoZSB2aWRlbyBpcyBub3QgbG9hZGluZy4gPC92aWRlbz48ZGl2IGNsYXNzPSJjb2wtNyBjb2wtcy0xMiI+IDxiciBjbGFzcz0ibGFwdG9wLWRpc2FibGVkIHBob25lLWRpc2FibGVkIj48aDM+V2hhdCBpcyBjb21tYW5kIGluamVjdGlvbj88L2gzPiA8YnIgY2xhc3M9InBob25lLWRpc2FibGVkIj48cCBjbGFzcz0icGhvbmUtZGlzYWJsZWQiPkNvbW1hbmQgaW5qZWN0aW9uIGlzIGFuIGF0dGFjayBpbiB3aGljaCB0aGUgZ29hbCBpcyBleGVjdXRpb24gb2YgYXJiaXRyYXJ5IGNvbW1hbmRzLi4uPC9wPjwvZGl2PiA8dmlkZW8gY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCBjb2wtcy0xMiIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvT1MxLm1wNCIgdHlwZT0idmlkZW8vbXA0Ij4gT2ggbm8sIHRoZSB2aWRlbyBpcyBub3QgbG9hZGluZy4gPC92aWRlbz48L2Rpdj48ZGl2IGNsYXNzPSJmZWVkc3RhY2siPiA8dmlkZW8gY2xhc3M9ImNvbC01IHRhYmxldC1kaXNhYmxlZCBwaG9uZS1kaXNhYmxlZCIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvT1MyLm1wNCIgdHlwZT0idmlkZW8vbXA0Ij4gT2ggbm8sIHRoZSB2aWRlbyBpcyBub3QgbG9hZGluZy4gPC92aWRlbz48ZGl2IGNsYXNzPSJjb2wtNyBjb2wtcy0xMiI+IDxiciBjbGFzcz0ibGFwdG9wLWRpc2FibGVkIj48aDM+T1MgQ29tbWFuZCBJbmplY3Rpb24gVXNpbmcgQnVycHN1aXRlICYgSG93IHRvIFByZXZlbnQgaXQ8L2gzPiA8YnIgY2xhc3M9InBob25lLWRpc2FibGVkIj48cCBjbGFzcz0icGhvbmUtZGlzYWJsZWQiPkJ1cnAgU3VpdGUgaXMgYW4gaW50ZWdyYXRlZCBwbGF0Zm9ybSBmb3IgcGVyZm9ybWluZyBzZWN1cml0eSB0ZXN0aW5nIG9mIHdlYiBhcHBsaWNhdGlvbnMuPC9wPjwvZGl2PiA8dmlkZW8gY2xhc3M9ImxhcHRvcC1kaXNhYmxlZCBjb2wtcy0xMiIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvT1MyLm1wNCIgdHlwZT0idmlkZW8vbXA0Ij4gT2ggbm8sIHRoZSB2aWRlbyBpcyBub3QgbG9hZGluZy4gPC92aWRlbz48L2Rpdj48ZGl2IGNsYXNzPSJmZWVkc3RhY2siPiA8dmlkZW8gY2xhc3M9ImNvbC01IHRhYmxldC1kaXNhYmxlZCBwaG9uZS1kaXNhYmxlZCIgY29udHJvbHM+IDxzb3VyY2Ugc3JjPSJpbWFnZXMvT1MzLm1wNCIgdHlwZT0idmlkZW8vbXA0Ij4gT2ggbm8sIHRoZSB2aWRlbyBpcyBub3QgbG9hZGluZy4gPC92aWRlbz48ZGl2IGNsYXNzPSJjb2wtNyBjb2wtcy0xMiI+IDxiciBjbGFzcz0ibGFwdG9wLWRpc2FibGVkIj48aDM+Q29tbWFuZCBJbmplY3Rpb24gRXhwbGFpbmVkIC0gUGFydCAxOiBUaGUgQmFzaWNzPC9oMz4gPGJyIGNsYXNzPSJwaG9uZS1kaXNhYmxlZCI+PHAgY2xhc3M9InBob25lLWRpc2FibGVkIj5BbHRob3VnaCBPUyBjb21tYW5kIGluamVjdGlvbiB2dWxuZXJhYmlsaXRpZXMgYXJlbid0IGFzIGNvbW1vbiBhcyB0aGV5IHVzZWQgdG8gYmUsIHRoZXJlIGFyZSBzdGlsbCBzb21lIG91dCB0aGVyZS4uLjwvcD48L2Rpdj4gPHZpZGVvIGNsYXNzPSJsYXB0b3AtZGlzYWJsZWQgY29sLXMtMTIiIGNvbnRyb2xzPiA8c291cmNlIHNyYz0iaW1hZ2VzL09TMy5tcDQiIHR5cGU9InZpZGVvL21wNCI+IE9oIG5vLCB0aGUgdmlkZW8gaXMgbm90IGxvYWRpbmcuIDwvdmlkZW8+PC9kaXY+IDwvYXJ0aWNsZT4="));
}

function generateStudents(){
  var students = ["Matteo Armendáriz Sánchez", "Fiona Díaz Camacho", "Cuyén Hernández Armas", "Nuria Rocosa Bruquetas", "Tomas Budo Cebeiro", "Karla Koenig-Sacks", "Fatima Armendariz Ablanque", "Caly O. Ronald", "Amadeo Hinojosas Chamoso", "Diana Pineda Aragón", "Adrián Palmier Atrari", "Xavier Anelo Lagua"];
  var emails = ["masanchez@outlook.com", "foleyed@rhyta.com", "macy1976@gmail.com", "ccbruquetas2@yopmail.com", "tomasito1@yahoo.com", "hmsarvott12@gmail.com", "fatimaa@gmail.com", "jocaly14@yopmail.com", "ekchamoso10@gmail.com", "fomujal14@yahoo.com", "corazonpalmito@hotmail.com", "xlagua@inf.uc3m.es"];
  var write_buffer = "<h2 class=\"text-center\">Students:</h2><br><article>";
  var counter;
  for (counter = 0; counter < students.length; counter++){
    write_buffer += "<div class=\"feedstack\"><img class=\"icon col-3 col-s-3\" src=\"images/student"+ (counter + 1) + ".jpeg\" alt=\"student-photo\"><div class=\"col-9 col-s-9\"><h3>" + students[counter] + "</h3><p>" + emails[counter] + "</p><br><p>Send Message:</p><a href=\"mailto:" + emails[counter] + "\"><img class=\"email-icon\" src=\"images/email.png\" alt=\"email-icon\"/></a></div></div>"
  }
  $("#feed").html(write_buffer);
}

function generateForum(){}

function generateGrades(role){
  if(role == "Administrator" || role == "Teacher"){
    $("#feed").html("<article><h3 id=\"table_title\">Web Security 101: Student Grades</h3><br><table id=\"grades_table\" class=\"col-12 col-s-12\"><caption><\/caption><thead><tr><th>Student<br><\/th><th>Activity 1<br><\/th><th>Activity 2<br><\/th><th>Activity 3<br><\/th><\/tr><\/thead><tbody><tr><td>Matteo Armend\u00E1riz S\u00E1nchez<br><\/td><td>8.5<\/td><td>9<br><\/td><td>10<br><\/td><\/tr><tr><td>Fiona D\u00EDaz Camacho<\/td><td>10<br><\/td><td>10<br><\/td><td>9.5<br><\/td><\/tr><tr><td>Cuy\u00E9n Hern\u00E1ndez Armas<br><\/td><td>2<br><\/td><td>3<br><\/td><td>0.5<br><\/td><\/tr><tr><td>Nuria Rocosa Bruquetas<br><\/td><td>6<br><\/td><td>7.2<br><\/td><td>5.9<br><\/td><\/tr><tr><td>Tomas Budo Cebeiro<br><\/td><td>8<br><\/td><td>6.9<br><\/td><td>10<br><\/td><\/tr><tr><td>Karla Koenig-Sacks<br><\/td><td>9<br><\/td><td>9<br><\/td><td>8.9<br><\/td><\/tr><tr><td>Fatima Armendariz Ablanque<br><\/td><td>8.7<br><\/td><td>6<br><\/td><td>5<br><\/td><\/tr><tr><td>Caly O. Ronald<br><\/td><td>5<br><\/td><td>4.5<br><\/td><td>5.3<br><\/td><\/tr><tr><td>Amadeo Hinojosas Chamoso<br><\/td><td>5<br><\/td><td>3.2<br><\/td><td>1.5<br><\/td><\/tr><tr><td>Diana Pineda Arag\u00F3n<br><\/td><td>7.2<br><\/td><td>7.5<br><\/td><td>8<br><\/td><\/tr><tr><td>Adri\u00E1n Palmier Atrari<br><\/td><td>10<br><\/td><td>9.5<br><\/td><td>9.6<br><\/td><\/tr><tr><td>Xavier Anelo Lagua<br><\/td><td>0<br><\/td><td>0<br><\/td><td>0<br><\/td><\/tr><tbody><\/table> <\/article>");
    exportGenerator();
  } else if(role == "Student"){
    $("#feed").html("<article><h3 id=\"table_title\">Web Security 101: Your grades<\/h3><table id=\"grades_table\" class=\"col-12 col-s-12\"><caption><\/caption><thead><tr><th>Assignment<\/th><th>Grade<\/th><\/tr><\/thead><tbody><tr><td>CSRF Testcases<br><\/td><td>8.5<br><\/td><\/tr><tr><td>Introduction to SQL Injection<br><\/td><td>8<\/td><\/tr><tr><td>Lab 1<\/td><td>10<\/td><\/tr><\/tbody><\/table> <\/article>");
    exportGenerator();
  }
}

function generateMyCourses(){}

function outofscope(){
	alert("Warning: Tab out of scope");
}

function exportGenerator(){
  TableExport(document.getElementsByTagName("table"), {
    headers: true,                      // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
    footers: true,                      // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
    formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
    filename: "id",                     // (id, String), filename for the downloaded file, (default: 'id')
    bootstrap: false,                   // (Boolean), style buttons using bootstrap, (default: true)
    exportButtons: true,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
    position: "bottom",                 // (top, bottom), position of the caption element relative to table, (default: 'bottom')
    ignoreRows: null,                   // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
    ignoreCols: null,                   // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
    trimWhitespace: true,               // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
    RTL: false,                         // (Boolean), set direction of the worksheet to right-to-left (default: false)
    sheetname: "id"                     // (id, String), sheet name for the exported spreadsheet, (default: 'id')
  });
}


























































/*#########################################################################################################################################################################################*/
/* PASAR ESTO A JQUERY*/



/*This javascript allows us to implement the overlay when pressing the hamburger menu. It changes the CSS properties of the overlay*/
function hamburger_menu_overlay_on() {
  document.getElementById("hamburger-menu-overlay").style.display = "block";
}

function hamburger_menu_overlay_off() {
  document.getElementById("hamburger-menu-overlay").style.display = "none";
}

/*#########################################################################################################################################################################################*/