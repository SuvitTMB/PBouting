MenuFooter();

function OpenPopMenu() {
  var xLine = "";
  xLine += '<div style="height: 50px;">';
  xLine += '<div style="height: 92px;background-color: #00ae3d; width:100%; padding-top:10px;">';
  xLine += '<div style="color:#fff; font-size: 15px; font-weight: 600; padding:20px;">Private Banker & Branch Manager<br>Outing & Orientation</div>';
  xLine += '</div><div class="clr" style="height:3px;"></div>';
  xLine += '<div class="clr"></div>';
  //xLine += '<div><img src="./img/gift-99.gif" style="width:200px; margin:15px auto;"></div>';
  //xLine += '<div style="line-height: 1.3;margin:20px 25px 10px 25px; text-align:center; color:#fff;"><b>LINE Retail Society</b> ชวนคุณร่วมส่งความสุขเนื่องในเทศกาล Merry Christmas and Happy New Year 2024 ด้วยการส่งการ์ดอวยพรปีใหม่ 2024 ...</div>';
  xLine += '<div style="margin:5px auto; width:200px;">';
  xLine += '<div class="menu-box1" onclick="window.location.href=\'home.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icon-me.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">ข้อมูลคุณ</div></div>';
  xLine += '<div class="menu-box1" onclick="window.location.href=\'agenda.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/schedule.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">กำหนดการ</div></div>';
  xLine += '<div class="menu-box1" onclick="window.location.href=\'teamwork.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icon-member.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">ทีมคุณ</div></div>';
  xLine += '<div class="clr"></div>';

  xLine += '<div class="menu-box1" onclick="window.location.href=\'member.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icon-team.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">สมาชิก</div></div>';
  xLine += '<div class="menu-box1" onclick="window.location.href=\'buddygame.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icon-buddygame.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">บัดดีคุณ</div></div>';
  xLine += '</div></div>';
  xLine += '<div class="clr" style="height:18px;"></div>';
  xLine += '<center><div class="btn-t2" onclick="CloseMenu()" style="background-color:#fff;">Close Menu</div></center>';
  xLine += '<div class="clr" style="height:25px;"></div>';
  $("#MenuSociety").html(xLine); 
  document.getElementById('menu').style.display='block';
}


function MenuFooter() {
  var str = "";
  str += '<div class="footer-top"><div class="container">';
  str += '<div class="row"><div class="col-lg-4 col-md-6 footer-newsletter">';
  str += '<div style="margin-top:0px;margin-left:30px;">';
  str += '<div class="menu-box1" onclick="window.location.href=\'home.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-menu1.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">หน้าแรก</div></div>';
  str += '<div class="menu-box1" onclick="window.location.href=\'timeline.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-history.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">กำหนดการ</div></div>';
  str += '<div class="menu-box1" onclick="window.location.href=\'rule.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-menu3.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">รายละเอียด</div></div>';
  str += '<div class="menu-box1" onclick="window.location.href=\'rule.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-menu4.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">บอกต่อเพื่อน</div></div>';
  str += '</div>';
  str += '</div></div></div></div>';
  str += '<div class="container d-md-flex py-4"><div class="mr-md-auto text-center text-md-left">';
  str += '<div class="copyright">@<span>LINE Retail Society</span></div></div></div>';
  $("#DisplayFooter").html(str);  
}


function ClickLink(x) {
  if(x==1) {
    location.href = "loykrathong.html";
  } else if(x==2) { 
    location.href = "home.html";
  }
}


function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function CloseMenu() {
  document.getElementById('menu').style.display='none';
}

