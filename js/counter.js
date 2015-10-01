// 总数
var jeffjade_firebase = new Firebase("https://jeffjade.firebaseIO.com");
jeffjade_firebase.child("sum").on("value", function(data) {
  var current_counter = data.val();
  if($("#counter").length > 0  && current_counter > 1){
     $("#counter").html("&nbsp;|&nbsp;本站总访问量&nbsp;<font style='color:white'>"+ current_counter +"</font>&nbsp;次");
  };
});

jeffjade_firebase.child("sum").transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});

// 明细
var current_url = window.location.pathname.replace(new RegExp('\\/|\\.', 'g'),"_");

jeffjade_firebase.child("detail/"+current_url).transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});

var n = new Date();
var time = n.getFullYear()+'-'+(n.getMonth()+1)+'-'+n.getDate()+'_'+n.getHours()+':'+n.getMinutes()+':'+n.getSeconds()+' '+n.getMilliseconds();
jeffjade_firebase.child("lastupdatetime").set({ timer: time, url: current_url });