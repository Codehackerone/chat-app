let arr_err=Array(4).fill(true);
const allEqual = arr => arr.every( v => v === arr[0] )

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
    toggle_status('phone',(phone.match(phoneformat)?0:1))
    arr_err[0]=phone.match(phoneformat)?false:true;
}

function checkerrors(){
    document.getElementById('submit').disabled=(allEqual(arr_err) && !arr_err[0])?false:true;
}

function checksubmit(){
    if((allEqual(arr_err) && arr_err[0])|| !(allEqual(arr_err))){
    iziToast.warning({
        title: 'Warning',
        message: 'Please fill up all the fields or correct the values',
    });
    }
}