$(document).ready(function () {
    $('#comment-update').remove();
    $('#pw-update').remove();
    listing();
});

function listing() {
    fetch('/guestbook')
        .then((res) => res.json())
        .then((data) => {
            let rows = data['result'];
            $('#comments-box').empty();
            rows.forEach((a) => {
                let id = a['id'];
                let name = a['name'];
                let comment = a['comment'];
                let date = a['date'];

                let temp_html = `
                                <tr>
                                    <td>${id}</td>
                                    <td>${name}</td>
                                    <td class="txt-box bf" >${comment}</td>
                                    <td class="update-input-box af">
                                    </td>

                                    <td class="date-txt">${date}</td>
                                    <td class="btn-box btn-before bf">
                                        <button onclick="update_btn(this)" class="btn-click">수정</button>
                                        <button type="button" class="btn-click" data-toggle="modal" data-target="#exampleModal" onclick="a(${id})">
                                        삭제
                                    </button>
                                    </td>
                                    <td class="btn-box btn-after af">
                                        <button onclick="update_scc(${id})" class="btn-click">수정 완료</button>
                                        <button onclick="update_cancle()" class="btn-click">
                                            수정 취소
                                        </button>
                                    </td>
                                </tr>
                            `;
                $('#comments-box').append(temp_html);
            });
        });
}

function save_comment() {
    let name = $('#name-box').val();
    let comment = $('#comment-box').val();
    let Pw = $('#pw-box').val();
    console.log(Pw);
    let formData = new FormData();
    formData.append('name_give', name);
    formData.append('comment_give', comment);
    formData.append('password_give', Pw);
    fetch('/guestbook', { method: 'POST', body: formData })
        .then((response) => response.json())
        .then((data) => {
            let msg = data['msg'];
            if (msg.includes('내용')) {
                alert(msg);
            } else {
                alert(msg);
                window.location.reload();
            }
        });
}

function delete_btn() {
    let num = globalNum
    let pw = $('#pw-box2').val();
    console.log(`입력값은 ${pw}`)
    let formData = new FormData();
    formData.append('id_give', num);
    formData.append('password_give', pw);
    fetch('/delete', { method: 'POST', body: formData })
        .then((response) => response.json())
        .then((data) => {
            alert(data['msg']);
            window.location.reload();
        });
}

var globalNum

function a(id){
    
    return globalNum = id
 } 