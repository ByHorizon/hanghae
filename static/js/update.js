function update_btn(e) {
    // const parent = $(e).parent();
    // console.log('choose');
    $('#choose').removeAttr('id');
    let gran_parent = $(e).parent().parent();
    gran_parent.attr('id', 'choose');
    let temp_html = `
    <input
    id="comment-update"
    type="text"
    placeholder="수정을 입력해 주세요."
/>
<input id="pw-update" type="text" placeholder="비밀번호" />
                            `;
    $('#choose .update-input-box').append(temp_html);
}

function update_cancle() {
    $('#choose').removeAttr('id');
    $('#comment-update').remove();
    $('#pw-update').remove();
}

function update_scc(a) {
    let num = a;
    let ucomment = $('#comment-update').val();
    let pw = $('#pw-update').val();

    // console.log(pw, ucomment);

    let formData = new FormData();
    formData.append('id_give', num);
    formData.append('ucomment_give', ucomment);
    formData.append('password_give', pw);

    fetch('/update', { method: 'POST', body: formData })
        .then((response) => response.json())
        .then((data) => {
            let msg = data['msg'];
            if (msg.includes('내용')) {
                alert(msg);
                update_cancle();
            } else {
                alert(msg);
                update_cancle();
                window.location.reload();
            }
        });
}
