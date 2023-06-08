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
                                    <td class="txt-box bf">${comment}</td>
                                    <td class="update-input-box af">
                                    </td>

                                    <td>${date}</td>
                                    <td class="btn-box btn-before bf">
                                        <button onclick="update_btn(this)" class="btn-click">수정</button>
                                        <button onclick="delete_btn(${id})" class="btn-click">삭제</button>
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

    let formData = new FormData();
    formData.append('name_give', name);
    formData.append('comment_give', comment);
    formData.append('pw_give', Pw);
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

function delete_btn(a) {
    let num = a;
    let formData = new FormData();
    formData.append('id_give', num);
    fetch('/delete', { method: 'POST', body: formData })
        .then((response) => response.json())
        .then((data) => {
            alert(data['msg']);
            window.location.reload();
        });
}
