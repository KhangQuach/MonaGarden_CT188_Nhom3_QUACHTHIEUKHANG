// let navigate = (link) => {
//     window.location.href = ;
// }

if (location.pathname == "/tintuc.html") {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1500,
        dotsSpeed: 1500,
        autoplayHoverPause: true,

        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })
}
function Validate_lh(form_lh){
    
    var Email_lh = document.getElementById("nhapemail_lh");
    var sdt_lh = document.getElementById("nhapsodt_lh");
    var tendn_lh=document.getElementById("nhapten_lh");
    var loinhan=document.getElementById("nhapln");
   var emailReg= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
   if(tendn_lh.value.length== 0){
        alert("chua nhap ten");
    console.log("dady nne");
        return false;
    }
    if(Email_lh.value.length== 0 ){
        alert("chua nhap mail");
        
        return false;
    }
    if(sdt_lh.value.length== 0 ){
        alert("chua nhap so dien thoai");
        
        return false;
    } 
    if( sdt_lh.value.length != 10 ){
        alert("So dien thoai phai co do dai 10 so");
        
        return false;
    }
   
    if(nhapln.value.length== 0 ){
        alert("chua nhap loi nhan");
        
        return false;
    }
     if(emailReg.test(form_lh.nhapemail_lh.value)== false){
        alert("mail sai dinh dang");
        return false;
    }
   
    
    else return true;
}
