from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from datetime import datetime #날짜, 시간 가져오는 라이브러리

import bcrypt

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.5lznp6w.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta


@app.route('/')
def home():
   return render_template('index.html')

@app.route("/delete", methods=["POST"]) #삭제 메서드
def delete_post():
    password_receive = request.form['password_give']
    inputPw = password_receive.encode('utf-8')
    id_receive = request.form['id_give']
    id = int(id_receive)
    findComment = db.comment.find_one({'id': id})
    if findComment is None : # DB에 데이터 없을 때 에러
        print("해당 글이 없다")
        return {'msg' : '해당 글이 없습니다!'}
    else:
        password = findComment['password']
        dbPwd = password.encode('utf-8')
        if bcrypt.checkpw(inputPw, dbPwd):
            findComments = list(db.comment.find({},{'_id':False})) # id값 수정 로직
            for a in findComments:  # 비밀번호 로직
                findId = (a['id']) 
                if(findId > id):
                    fixId = findId-1
                    db.comment.update_one({'id': findId},{'$set':{'id':fixId}})
                else:
                    db.comment.delete_one({'id':id})
        else: return {'msg' : '비밀번호가 다릅니다!'}

        return jsonify({'msg' : '삭제 완료!'})

@app.route("/update", methods=["POST"]) #수정 메서드
def update_post():
    password_receive = request.form['password_give']
    inputPw = password_receive.encode('utf-8')
    ucomment_receive = request.form['ucomment_give']
    id_receive = request.form['id_give']
    id = int(id_receive)
    findComment = db.comment.find_one({'id':id})
    password = findComment['password']
    dbPwd = password.encode('utf-8')
    if bcrypt.checkpw(inputPw, dbPwd): # 비밀번호 검증로직
        if not ucomment_receive: # 내용 공백 방지로직
            return jsonify({'msg' : '내용을 입력해주세요!'})
        else:
            db.comment.update_one({'id': id},{'$set':{'comment':ucomment_receive}})
            return {'msg' : '수정 완료!'}
    else: return {'msg' : '비밀번호가 다릅니다!'}

@app.route("/guestbook", methods=["POST"])
def guestbook_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    password_receive = request.form['password_give']
    password = password_receive.encode('utf-8')
    hashed = bcrypt.hashpw(password, bcrypt.gensalt())
    insertPw = hashed.decode()
    now = datetime.now()
    date= "%d년%d월%d일%d시" % (now.year, now.month, now.day, now.hour)
    comment_list = list(db.comment.find({}, {'_id': False}))
    count = len(comment_list) + 1
    doc ={
        "id" : count,
        "name" : name_receive,
        "comment" : comment_receive,
        "date" : date,
        "password" : insertPw
    }
    if not comment_receive or not name_receive or not password_receive: # 내용 공백 방지로직
        return jsonify({'msg' : '내용을 입력해주세요!'})
    else:
        db.comment.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})

@app.route("/guestbook", methods=["GET"])
def guestbook_get():
    findComments = list(db.comment.find({},{'_id':False}))
    return jsonify({'result': findComments})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
