let err1=true,err2=true,err3=true,err4=true;

function toggle_status(id_element, change_to) {
    if (change_to == 0) {
        //correct
        document.querySelector('#' + id_element + '-correct').hidden=false ;
        document.querySelector('#' + id_element + '-wrong').hidden=true;
        document.querySelector('#' + id_element).className="border border-green-300 shadow p-3 w-full rounded";
    } else if (change_to == 1) {
        //wrong
        document.querySelector('#' + id_element + '-correct').hidden=true;
        document.querySelector('#' + id_element + '-wrong').hidden=false;
        document.querySelector('#' + id_element).className="border border-red-300 shadow p-3 w-full rounded";
    } 
    else {
        //neutral
        document.querySelector('#' + id_element + '-correct').hidden=true;
        document.querySelector('#' + id_element + '-wrong').hidden=true;
        document.querySelector('#' + id_element).className="border border-gray-300 shadow p-3 w-full rounded";
    }
}

function checkphone() {
    let phone = document.querySelector('#phone').value;
    let phoneformat = /^\d{10}$/;
    if (phone.match(phoneformat)) {
        toggle_status('phone-number', 0);
    } else {
        toggle_status('phone-number', 1);
    }
}

toggle_status('username',0);