var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var ShortDate = "";
var xNameColor = "";
var xCodeColor = "";
var txtCheckBuddy = "";
var ArrEmpID = [];



$(document).ready(function () {
/*
  var str = "";
  if(sessionStorage.getItem("EmpID_Outing")==null) { location.href = "index.html"; }
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
  str += '<div class="NameLine" style="margin-top:8px;">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
*/
  Connect_DB();
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  LoadEmpIDArray();
  loadUser();
});



function LoadEmpIDArray() {
  ArrEmpID = [];
  dbRSOCMember
  .get().then((snapshot)=> {
  snapshot.forEach(doc=>{
    //var xLinePicture = "";
    //if(doc.data().LinePicture!="") { xLinePicture = doc.data().LinePicture; }
      //ArrEmpID.push({ id: doc.id, RewardsName: doc.data().RewardsName, RewardsCode: doc.data().RewardsCode, RewardsDetail: doc.data().RewardsDetail, RewardsPrice: doc.data().RewardsPrice, RewardsStock: doc.data().RewardsStock, RewardsRedeem: doc.data().RewardsRedeem, WheelRandom: doc.data().WheelRandom });
      ArrEmpID.push({ EmpID: doc.data().EmpID, EmpName: doc.data().EmpName, LinePicture: doc.data().LinePicture, EmpPosition: doc.data().EmpPosition, EmpBranch: doc.data().EmpBranch, EmpBU: doc.data().EmpBU, EmpZone: doc.data().EmpZone, EmpRH: doc.data().EmpRH, EmpPhone: doc.data().EmpPhone });
      //ArrEmpID.push( { EmpID: doc.data().EmpID, EmpName: doc.data().EmpName, LinePicture: doc.data().LinePicture, LineName: doc.data().LineName });
      //ArrEmpID.push(doc.data().EmpID, doc.data().EmpName, doc.data().LinePicture, doc.data().EmpPhone, doc.id );
    });
    //console.log(ArrEmpID);
  });  
}


function CheckPoll() {
  dbRSOCPoll.where('EmpID','==',sessionStorage.getItem("EmpID_Outing"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      DoneSurvey = 1;
      ShowScore = doc.data().AdvScore;
    });
    document.getElementById('DisplayWait').style.display='none';
    document.getElementById('DisplayPoll').style.display='block';
  });
}


var GroupColor = "";
var GroupHotel =""; // 1,2 
var GroupRoom = ""; // 0 ไม่ได้สิทธิ , 1 ได้สิทธิ
var GroupBuddy = ""; // empid
//var GroupTeam = "";
function loadUser() { 
  var str = "";
  var str1 = "";
  dbRSOCMember.where('EmpID','==', parseFloat(sessionStorage.getItem("EmpID_Outing")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().EmpTeam!="") {
        //CheckBuddy(doc.data().MapEmpID);

        //CheckBuddy(doc.data().MapEmpID);
        //CheckRoom(doc.data().MapEmpID);
        //str1 +='<div class="box-user">';
        str1 +='<div style="width:100px;text-align: center;padding:8px;margin:auto;"><img src="'+ doc.data().LinePicture +'" class="profile-team1" onerror="javascript:imgError(this)">';
        str1 +='<div style="margin-top:-25px;"><img src="./img/'+ doc.data().GroupColor +'.png" style="width:80px; margin-left:7px;"></div>';
        str1 +='</div>';
        str1 +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
        str1 +='<div class="text-2" style="margin-top:2px; color:#0056ff;">';
        if(doc.data().EmpPosition!="") {
          str1 += ''+doc.data().EmpPosition;
        }
        if(doc.data().EmpBranch!="") {
          str1 += '<br>'+doc.data().EmpBranch;
        }
        if(doc.data().EmpZone!="") {
          str1 += '<br>'+doc.data().EmpZone;
        }
        if(doc.data().EmpBU!="") {
          str1 += '<br>'+doc.data().EmpBU;
        }
        if(doc.data().EmpPhone!="") {
          str1 += '<br>โทร. <b>'+doc.data().EmpPhone+'</b>';
        }

        //str1 += doc.data().EmpPosition +'<br>'+ doc.data().EmpRH +'<br><b>'+ doc.data().EmpPhone +'</b>';
        str1 +='</div>';
        str1 +='<div class="clr"></div>';        
        str1 +='<div class="btn-t4" style="margin-top:30px;">2. สีของทีมคุณ</div>';
        if(doc.data().GroupColor=="") {
          str1 +='<div style="margin:10px auto 0px auto; color:#ff0000;">*** <b>คุณไม่ต้องสังกัดสี</b> ***</div>';
        } else if(doc.data().GroupColor!="") { 
          switch(doc.data().GroupColor) {
            case "Group1" :
              xNameColor = "สีน้ำเงิน";
              xCodeColor = "#12427C";
              break;
            case "Group2" :
              xNameColor = "สีแดง";
              xCodeColor = "#B82822";
              break;
            case "Group3" :
              xNameColor = "สีขาว";
              xCodeColor = "#cccccc";
              break;
            case "Group4" :
              xNameColor = "สีเขียว";
              xCodeColor = "#61973D";
              break;
            case "Group5" :
              xNameColor = "สีฟ้า";
              xCodeColor = "#2E91DC";
              break;
            case "Group6" :
              xNameColor = "สีชมพู";
              xCodeColor = "#DC61AA";
              break;
            case "Group7" :
              xNameColor = "สีเหลือง";
              xCodeColor = "#FFC000";
              break;
            case "Group8" :
              xNameColor = "สีม่วง";
              xCodeColor = "#863AB7";
              break;
            default:
              // code block
          }
          str1 +='<div style="margin:10px auto 0px auto;"><img src="./img/'+ doc.data().GroupColor +'.png" style="width:60px;"><br><b><font color="'+ xCodeColor +'">ทีม ... '+ xNameColor +'</font></b></div>';
        }

        str1 +='<div style="padding-top:10px;"><hr></div>';
        str1 +='<div class="btn-t4">3. Buddy ของคุณ</div>';
        //if(doc.data().GroupHotel!="") {
        //  str1 +='<div style="margin:10px auto 0px auto; color:#ff0000;">*** <b>คุณไม่ต้องจับคู่ Buddy Game</b> ***</div>';
        //} else { 
          if(doc.data().IDBuddy=="") { 
            //str1 +='<div style="margin:10px auto;">*** คุณไม่ต้องจับคู่ ***</div>';
            str1 +='<div style="margin:10px auto;">จับคู่ผลไม้ที่มีชื่อเหมือนกันกับคุณ</div>';
            str1 +='<div style="margin:0px auto; font-size:17px; font-weight: 600; color:#f68b1f;">"'+ doc.data().NameFruit +'"</div>';
            str1 +='<div class="btn-t1" onclick="BuddyGame()" style="margin-top:15px;">ค้นหาบัดดี้ของคุณ</div><div class="clr"></div>';
          } else {
            const results = ArrEmpID.filter(obj => {return obj.EmpID === doc.data().IDBuddy;});
            //console.log("ch="+results[0].EmpName);
            //var x = doc.data().IDBuddy;
            //var x = 8400;
            //console.log("IDBuddy="+x);
            str1 += '<div class="clr"></div><div style="margin-top:20px;"><img src="'+ results[0].LinePicture +'" class="profile-team1" onerror="javascript:imgError(this)"></div>';
            str1 += '<div class="NameLine" style="margin-top:14px;"><b>'+ results[0].EmpName +'</b><br>'+ results[0].EmpPosition +'<br>'+ results[0].EmpBranch +'<br>'+ results[0].EmpZone +'<br>'+ results[0].EmpRH +'<br>'+ results[0].EmpBU +'<br>โทร. '+ results[0].EmpPhone +'</div>';
            //str1 += '<div><img src="'+ results[0].EmpID +'" class="add-profile"></div>';
            //str1 += '<div><img src="'+ results[0].LinePicture +'" class="add-profile"></div>';
      //ArrEmpID.push({ EmpID: doc.data().EmpID, EmpName: doc.data().EmpName, LinePicture: doc.data().LinePicture, EmpPosition: doc.data().EmpPosition, EmpBU: doc.data().EmpBU, EmpBU: doc.data().EmpPhone, EmpBU: doc.data().EmpPhone });

            //str1 += txtCheckBuddy;
          }
        //}

        str1 +='<div style="padding-top:20px;"><hr></div>';
        str1 +='<div class="btn-t4">4. โรงแรมที่พักของคุณ</div>';
        if(doc.data().GroupHotel=="") {
          str1 +='<div style="margin:10px auto 0px auto; color:#ff0000;">*** <b>คุณไม่ได้เข้าพักที่โรงแรม</b> ***</div>';
        } else if(doc.data().GroupHotel=="Hotel1") {
          str1 +='<div style="margin:10px auto 0px auto;"><b>โรงแรม Kokotel Bangkok Surawong</b></div>';
          str1 +='<div class="btn-t1" onclick="ShowMap(1)" style="margin-top:15px;">ดูรายละเอียดโรงแรม</div><div class="clr"></div>';
        } else if(doc.data().GroupHotel=="Hotel2") {
          str1 +='<div style="margin:10px auto 0px auto;"><b>โรงแรม @Nares Hotel</b></div>';
          str1 +='<div class="btn-t1" onclick="ShowMap(2)" style="margin-top:15px;">ดูแผนที่โรงแรม</div><div class="clr"></div>';
        }
        //str1 +='<div style="margin:10px auto 0px auto;"><b>โรงแรม Kokotel Bangkok Surawong</b><br><a href="https://www.kokotel.com/surawong/" target="_blank">เว็บไซต์ โรงแรม Kokotel Bangkok</a><br><a href="https://maps.app.goo.gl/erU5RojMmF6pyCjK7" target="_blank">แผนที่ตั้งโรงแรม</a></div>';
        //str1 +='<div style="margin:10px auto 0px auto;"><b>โรงแรม atNares Hotel</b><br><a href="https://www.atnares.com/" target="_blank">เว็บไซต์ โรงแรม @NARES Bangkok</a><br><a href="https://maps.app.goo.gl/JEBVvfYGTMjEXXwL8" target="_blank">แผนที่ตั้งโรงแรม</a></div>';
        str1 +='<div style="padding-top:20px;"><hr></div>';


        if(doc.data().SumRoomID!=0 && doc.data().GroupHotel!="") { 
          str1 +='<div class="btn-t3">5. ผู้ที่พักร่วมห้องกับคุณ</div>';
          str1 +='<div style="margin:10px auto 0px auto;color:#ff0000;"><b>เข้าพักเฉพาะคืนวันที่ 26 มกราคม 2566<br>ตามโรงแรมที่กำหนดให้เท่านั้น</b></div>';
          if(doc.data().SumRoomID==1) {
            str1 +='<div style="margin:10px auto 0px auto; color:#0056ff;"><b>*** คุณนอนพักท่านเดียว ***</b></div>';
          } else {

            const results_Room = ArrEmpID.filter(obj => {return obj.EmpID === doc.data().IDRoom;});
            str1 += '<div class="clr"></div><div style="margin-top:20px;"><img src="'+ results_Room[0].LinePicture +'" class="profile-team1" onerror="javascript:imgError(this)"></div>';
            str1 += '<div class="NameLine" style="margin-top:14px;"><b>'+ results_Room[0].EmpName +'</b><br>'+ results_Room[0].EmpPosition +'<br>'+ results_Room[0].EmpBranch +'<br>'+ results_Room[0].EmpZone +'<br>'+ results_Room[0].EmpRH +'<br>'+ results_Room[0].EmpBU +'<br>โทร. '+ results_Room[0].EmpPhone +'</div>';


            //str1 +='<div style="width:100px;text-align: center;padding:8px;margin:auto;"><img src="'+ doc.data().LinePicture +'" class="profile-team1">';
            //str1 +='<div style="margin-top:-30px;"><img src="./img/'+ doc.data().EmpTeam +'.png" style="width:40px;"></div>';
            //str1 +='</div>';
            //str1 +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
            //str1 +='<div class="text-2" style="margin-top:8px;">ตำแหน่ง ...<br>'+ doc.data().EmpRH +'<br><b>'+ doc.data().EmpPhone +'</b></div>';
          }
        }



/*
        str +='<div class="box-user">';
        str +='<div style="width:25%;float: left;text-align: center;padding:8px;"><img src="'+ doc.data().LinePicture +'" class="profile-team1">';
        str +='<div style="margin-top:-30px;"><img src="./img/'+ doc.data().EmpTeam +'.png" style="width:40px;"></div></div>';
        str +='<div style="width:75%;float: left;">';
        str +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
        str +='<div class="text-2">'+ doc.data().EmpRH +'<br><b>'+ doc.data().EmpPhone +'</b></div>';
        str +='<div class="btn-t2" style="margin:2px 0 0 0;" onclick="OpenTeam(\''+ doc.data().EmpTeam +'\')">ดูรายละเอียดของทีม</div></div>';
        str +='</div>';
*/
      } else {
        //str1 +='<div class="box-user">';
        str1 +='<div style="width:100px;text-align: center;padding:8px;margin:auto;"><img src="'+ doc.data().LinePicture +'" class="profile-team1">';
        str1 +='</div>';
        str1 +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
        str1 +='<div class="text-2">'+ doc.data().EmpRH +'<br><b>'+ doc.data().EmpPhone +'</b></div>';


        str +='<div class="box-user">';
        str +='<div style="width:25%;float: left;text-align: center;padding:8px; "><img src="'+ doc.data().LinePicture +'" class="profile-team1">';
        str +='</div>';
        str +='<div style="width:75%;float: left;">';
        str +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
        str +='<div class="text-2">'+ doc.data().EmpRH +'<br><b>'+ doc.data().EmpPhone +'</b></div>';
        str +='<div class="btn-t2" style="margin:2px 0 0 0;cursor: default;background:#666;border:1px solid #fff;">ไม่ได้เข้าร่วมแบ่งทีมตามสี</div></div>';
        str +='</div>';
      }
    }); 
    $("#DisplayIMG").html(str1);  
    $("#DisplayYourTeam").html(str);  
  });
}


//function CheckBuddy(id) {
  //alert(id);
//}

/*
function CheckBuddy(gid) {
  const results = ArrEmpID.filter(obj => {return obj.id === gid;});


  console.log("gid="+results[0].EmpID);
  txtCheckBuddy = "";
  dbRSOCMember.where('EmpID','==',parseInt(gid))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      console.log(gid);
      //txtCheckBuddy += '<div><img src="'+ doc.data().LinePicture +'" class="add-profile"></div>';
      //txtCheckBuddy += '<div class="NameLine" style="margin-top:8px;">'+ doc.data().LineName +'</div>';
      txtCheckBuddy += '<div class="NameLine" style="margin-top:8px;">'+ doc.data().EmpName +'</div>';
    });
    alert("map done");
          //console.log(gid);

  });  
}
*/


function BuddyGame() {
  location.href = 'buddygame.html';
}


function ShowMap(x) {
  var str = "";
  str += '<center>';
  if(x==1) { 
    str += '<div class="btn-t3">โรงแรม Kokotel Bangkok Surawong</div>';
    str += '<div><a href="https://www.kokotel.com/surawong/" target="_blank">เว็บไซต์ โรงแรม Kokotel Bangkok</a></div>';
    str += '<div style="margin-top:15px;"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1937.9249818059027!2d100.524474!3d13.727532000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d3ddd686e5%3A0xaf45a0d806e63bbd!2sKokotel%20Bangkok%20Surawong!5e0!3m2!1sen!2sus!4v1705381833914!5m2!1sen!2sus" width="100%" height="600px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
  } else {
    str += '<div class="btn-t3">โรงแรม atNares Hotel</div>';
    str += '<div><a href="https://www.atnares.com/" target="_blank">เว็บไซต์ โรงแรม @NARES Bangkok</a></div>';
    str += '<div style="margin-top:15px;"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1937.9249818059027!2d100.524474!3d13.727532000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d3ddd686e5%3A0xaf45a0d806e63bbd!2sKokotel%20Bangkok%20Surawong!5e0!3m2!1sen!2sus!4v1705381833914!5m2!1sen!2sus" width="100%" height="600px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
  }
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin:15px auto 25px auto;">ปิดหน้าต่างนี้</div>';
  str += '</center>';
  $("#DisplayMap").html(str);  
  document.getElementById('id01').style.display='block';
}


/*
function OpenPage(page) {
  var str = "";
  if(page==1) {
    str += '<div class="slideanim slide"><img src="./img/TeamBuilding.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">เกี่ยวกับ RSOC Team Building</div></center>';
    str += '<div class="text-naviblue">Objective</div>';
    str += '<div class="text-black">For information on direction and team’s work plan<br><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>To introduce organization and work structure</li>';
    str += "<li>To strengthen team's collaboration & Build up staff relationship</li>";
    str += '</ul></div>';
    str += '<div class="text-naviblue">Expected outcome</div>';
    str += '<div class="text-black"><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>Staffs feel more connected can produce better collaboration work</li>';
    str += "<li>Corporate cultures often attract similar types of employees</li>";
    str += "<li>Understanding, appreciating and maximizing team</li>";
    str += '</ul></div>';
    str += '<div class="text-naviblue">Key Message</div>';
    str += '<div class="text-black"><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>To continue the same work directions and to build relationships within the team</li>';
    str += "<li>OKR ทุกฝ่ายมองเห็นเป้าหมายเดียวกันผ่านตัวชี้วัดที่มองเห็นซึ่งกันและกันได</li>";
    str += '</ul></div>';
    str += '<div class="text-naviblue">Activity</div>';
    str += '<div class="text-black">The 2 days -1 night Team building outing which includes townhall is part of the activities for promotion teamwork and communication within team</div>';
    str += '</div>';
  } else if(page==2) {
    str += '<div class="slideanim slide"><img src="./img/agenda.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">กำหนดการ</div></center>';
    str += '<div class="text-naviblue">วันพฤหัสบดีที่ 17 พฤศจิกายน 2565</div>';
    str += '<div class="text-black"><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li><font color="#f68b1f">09:30 น.</font> <br>ลงทะเบียน / แสดงผลตรวจ ATK / รับประทานอาหารว่าง</li>';
    str += '<li><font color="#f68b1f">10:00 น.</font> MC greeting / Ice breaking</li>';
    str += '<li><font color="#f68b1f">10:30 น.</font> RSOC Direction by Khun Natthawan</li>';
    str += '<li><font color="#f68b1f">12:00 น.</font> Lunch</li>';
    str += '<li><font color="#f68b1f">13:15 น.</font> Refreshment / Grouping</li>';
    str += '<li><font color="#f68b1f">13:30 น.</font> <br>กีฬามหาสนุก (Team Building) ชิงถ้วยและเงินรางวัลมูลค่ารวมกว่าหมื่นบาท<ul style="margin-left:-20px;">';
      str += '<li>การแข่งขันกีฬา</li>';
      str += '<li>การประกวดขบวนพาเหรด</li>';
      str += '<li>การประกวดกองเชียร์</li>';
    str += '</ul></li>';
    str += '<li><font color="#f68b1f">17:00 น.</font> Break</li>';
    str += '<li><font color="#f68b1f">17:30 น.</font> Dinner Party</li>';
    str += '</ul></div>';
    str += '</div>';
  } else if(page==3) {
    str += '<div class="slideanim slide"><img src="./img/document.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">เอกสารประกอบการอบรม</div></center>';
    str += '<div class="text-black">เราได้จัดเตรียมเอกสารทั้งหมดไว้ที่นี่ เพื่อให้ทุกท่านได้นำไปทบทวน นำไปปฏิบัติงาน เพื่อให้บรรลุเป้าหมายที่เราได้ร่วมกันกำหนดไว้</div>';
    str += '<div style="margin:20px auto;width:100%;">';

    str += '<div class="box-menu" style="width:46%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/ms-pdf.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร</div>';
    str += '<div class="box-menu" style="width:46%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/ms-powerpoint.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร</div>';
    str += '<div class="box-menu" style="width:46%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/ms-excel.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร</div>';
    str += '<div class="box-menu" style="width:46%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/ms-word.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร</div>';


    str += '</div>';
  } else if(page==4) {
    str += '<div class="slideanim slide"><img src="./img/rewards.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">รางวัลสำหรับการแข่งขัน</div></center>';
    str += '<div class="text-black">เราได้เตรียมรางวัลไว้มากมาย มูลค่ารวมนับแสนมาให้ทุก ๆ ทีมที่สามารถทำคะแนนได้สูงสุด<ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>Gift Voucher Lotus<br><img src="./img/gift-1.jpg" style="width:60%;padding:5px 0 10px 0;"></li>';
    str += '<li>Gift Voucher After You<br><img src="./img/gift-2.jpg" style="width:60%;padding:5px 0 10px 0;"></li>';
    str += '<li>Gift Voucher KFC<br><img src="./img/gift-3.jpg" style="width:60%;padding:5px 0 10px 0;"></li>';
    str += '<li>Gift Voucher PTT<br><img src="./img/gift-4.jpg" style="width:60%;padding:5px 0 10px 0;"></li>';
    str += '</ul></div>';
    str += '</div>';
  } else if(page==5) {
    alert("Open");
    str += '<div class="slideanim slide"><img src="./img/survey.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">ประเมินผลกิจกรรม</div></center>';

    //str += '<div class="text-naviblue">Expected outcome</div>';
    str += '<div class="text-black">ในทุก ๆ กิจกรรมเมื่อกิจกรรมที่ได้ร่วมกันทำสิ้นสุดลง การประเมินผลก็จะเป็นส่วนหนึ่งที่จะบอกว่าอะไรที่คุณชอบ หรือไม่ชอบ มีอะไรที่อยากจะบอกเราเพื่อให้ปรับปรุงกิจกรรมในการจัดในครั้งต่อไป</div>';
    str += '<div style="margin:20px auto;width:50%;">';
    if(DoneSurvey==1) {
        //alert(ShowScore);
        str += '<div class="box-menu" style="width:100%; font-size:11px;height:122px;background:#f2f2f0;color:#0056ff;">';
        str += '<img src="./img/poll.png" style="width:70px;"><br>ผลการประเมินของคุณ<br>'+parseFloat(ShowScore).toFixed(2)+'';
    } else {
        str += '<div class="box-menu" style="width:100%; font-size:11px;height:122px;" onclick="OpenLink(3)">';
        str += '<img src="./img/poll.png" style="width:70px;"><br>คลิกเพื่อทำ<br>แบบประเมินผล';
    }
    str += '</div>';
    //str += '<div class="box-menu" style="width:46%; font-size:11px;">';
    //str += '<img src="./img/poll.png" style="width:70px;"><br>คลิกเพื่อทำ<br>แบบประเมินผล';
    //str += '</div>';
    str += '</div></div>';
  } else if(page==6) {
    str += '<div class="slideanim slide"><img src="./img/activity.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">ประมวลภาพกิจกรรม</div></center>';

    //str += '<div class="text-naviblue">Expected outcome</div>';
    str += '<div class="text-black">เราจะเก็บทุก ๆ ความเคลื่อนไหวของทุก ๆ คนที่เข้าร่วมกิจกรรมรวมไว้ในที่นี่</div>';
    str += '<div style="margin:20px auto;width:50%;">';
    str += '<div class="box-menu" style="width:100%; font-size:11px;height:122px;" onclick="OpenLink(7)">';
    str += '<img src="./img/photo.png" style="width:70px;"><br>คลิกเพื่อ<br>ดูภาพกิจกรรม';
    str += '</div>';
    //str += '<div class="box-menu" style="width:46%; font-size:11px;">';
    //str += '<img src="./img/poll.png" style="width:70px;"><br>คลิกเพื่อทำ<br>แบบประเมินผล';
    //str += '</div>';
    str += '</div></div>';
  } else if(page==7) {
  } else if(page==9) {
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">ข้อมูลยังไม่พร้อมใช้งาน</div></center>';
    str += '<center><img src="./img/Construction1.gif" style="width:100%;margin-top:-0px;"></center>';

    str += '</div>';

  }
  str += '<div class="clr"></div><center>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</div>';
  str += '<div class="clr" style="height: 25px;"></div>';
  $("#DisplayRSOC").html(str);  
  document.getElementById('id01').style.display='block';

}


function OpenLink(page) {
  if(page==1) {
    location.href = 'gotomap.html';
  } else if(page==2) {
    location.href = 'allteam.html';
  } else if(page==3) { // ประเมินผล
    location.href = 'poll.html';
  } else if(page==4) { // ดูภาพกิจกรรม
    location.href = 'leader.html';
  } else if(page==5) { // เอกสารอบรม
    location.href = 'home.html';
  } else if(page==6) {
    location.href = 'rsoc.html';
  } else if(page==7) {
    location.href = 'https://drive.google.com/drive/folders/1ImqFECrSQafDPx2aakZxBxmSBZidH4Nf?usp=sharing';
  } else if(page==8) {
    location.href = 'thevoice.html';
  } else if(page==9) {
    location.href = 'disc.html';
  } else if(page==99) {
    location.href = '#';
  }
}


function OpenTeam(x) {
  location.href = 'team.html?gid='+x;
}
*/


function imgError(image,id) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  //document.getElementById('id02').style.display='none';
}